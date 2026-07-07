var fs = require('fs');
var src = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var tgtFiles = ['en.html', 'zh.html'];

// Extract the key additions from vi.html that are new to en/zh
// 1. CSS: fobptsc-filter-row rules
var cssMatch = src.match(/\/\* FOB PTSC cascading filters \*\/[\s\S]*?@media\(max-width:600px\)\{\.fobptsc-filter-row select\{min-width:100%\}\}/);
var newCss = cssMatch ? cssMatch[0] : null;

// 2. HTML: cascading filter row (between <!-- Cascading filters --> and <div class="fobptsc-grid">)
var htmlMatch = src.match(/<!-- Cascading filters[\s\S]*?<div class="fobptsc-filter-row">[\s\S]*?<\/div>[\s]*\n[\s]*\n[\s]*<div class="fobptsc-grid">/);
var newHtml = htmlMatch ? htmlMatch[0] : null;

// 3. JS: fobPtscFilterCalc function
var jsFuncMatch = src.match(/\/\/ Cascading filter for Machine → Standard → Size[\s\S]*?function fobPtscFilterCalc\(\) \{[\s\S]*?\n\}/);
var newFunc = jsFuncMatch ? jsFuncMatch[0] : null;

console.log('CSS found:', !!newCss, newCss ? newCss.length + ' chars' : '');
console.log('HTML found:', !!newHtml, newHtml ? newHtml.length + ' chars' : '');
console.log('JS func found:', !!newFunc, newFunc ? newFunc.length + ' chars' : '');

tgtFiles.forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var changed = false;
  
  // 1. ADD CSS - insert before .fobptsc-panel CSS
  if (newCss && h.indexOf('fobptsc-filter-row') < 0) {
    h = h.replace('.fobptsc-panel{padding:16px}', newCss + '\n.fobptsc-panel{padding:16px}');
    changed = true;
    console.log(fn + ': CSS added');
  }
  
  // 2. ADD cascading filter HTML after fobptsc-radio-group + fobptsc-check blocks
  // Target: after the closing of fobptsc-check div and before <div class="fobptsc-grid">
  if (newHtml && h.indexOf('fobCalcMachine') < 0) {
    // Find the fobptsc-grid that contains fobProduct
    var gridStart = h.indexOf('<div class="fobptsc-grid">\n      <div class="fobptsc-field"><label>📦 Sản phẩm</label>');
    if (gridStart > 0) {
      var insertion = '<!-- Cascading filters: Machine → Standard → Size -->\n    <div class="fobptsc-filter-row">\n      <select id="fobCalcMachine" onchange="fobPtscFilterCalc()">\n        <option value="">— ' + (fn === 'zh.html' ? '选择机器' : 'Choose machine') + ' —</option>\n      </select>\n      <select id="fobCalcStandard" onchange="fobPtscFilterCalc()">\n        <option value="">— ' + (fn === 'zh.html' ? '选择标准' : 'Choose standard') + ' —</option>\n      </select>\n      <select id="fobCalcSize" onchange="fobPtscFilterCalc()">\n        <option value="">— ' + (fn === 'zh.html' ? '选择尺寸' : 'Choose size') + ' —</option>\n      </select>\n    </div>\n\n';
      h = h.substring(0, gridStart) + insertion + h.substring(gridStart);
      changed = true;
      console.log(fn + ': HTML filter row added');
    }
  }
  
  // 3. Replace fobPtscInitCalc
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (m) {
    var js = m[1];
    var oldInitCalc = js.match(/function fobPtscInitCalc\(\) \{[\s\S]*?\n\}/);
    if (oldInitCalc) {
      var newInitCalc = `function fobPtscInitCalc() {
  fobPtscLoadCfg();
  // Populate cascading filter dropdowns
  var me = document.getElementById('fobCalcMachine');
  var se = document.getElementById('fobCalcStandard');
  var sze = document.getElementById('fobCalcSize');
  if (me && typeof DATA_PRODUCTS !== 'undefined') {
    var machines = {}, standards = {}, sizes = {};
    DATA_PRODUCTS.forEach(function(p) {
      machines[p.machine] = true;
      standards[p.standard] = true;
      sizes[p.size] = true;
    });
    var mk = Object.keys(machines).sort();
    me.innerHTML = '<option value="">— ${fn === 'zh.html' ? '选择机器' : 'Choose machine'} —</option>';
    mk.forEach(function(k) { me.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    if (se) {
      var sk = Object.keys(standards).sort();
      se.innerHTML = '<option value="">— ${fn === 'zh.html' ? '选择标准' : 'Choose standard'} —</option>';
      sk.forEach(function(k) { se.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    }
    if (sze) {
      var szk = Object.keys(sizes).sort();
      sze.innerHTML = '<option value="">— ${fn === 'zh.html' ? '选择尺寸' : 'Choose size'} —</option>';
      szk.forEach(function(k) { sze.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    }
  }
  var sel = document.getElementById('fobProduct');
  if (!sel) return;
  var curVal = sel.value;
  sel.innerHTML = '<option value="">-- ${fn === 'zh.html' ? '选择产品' : 'Select product'} --</option>';
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      var label = p.code + ' | ' + p.spec + ' | ' + p.size;
      if (p.machine) label += ' | ' + p.machine;
      var opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = label;
      sel.appendChild(opt);
    });
  }
  if (curVal) sel.value = curVal;
  fobPtscCalc();
}`;
      js = js.replace(oldInitCalc[0], newInitCalc);
      changed = true;
      console.log(fn + ': fobPtscInitCalc replaced');
    }
    
    // 4. Replace fobPtscFilterProducts
    var oldFilter = js.match(/function fobPtscFilterProducts\(\) \{[\s\S]*?\n\}/);
    if (oldFilter) {
      var newFilter = `function fobPtscFilterProducts() {
  var sel = document.getElementById('fobProduct');
  var searchEl = document.getElementById('fobSearchInput');
  if (!sel || !searchEl) return;
  var q = searchEl.value.toLowerCase().trim();
  var curVal = sel.value;
  // Also apply cascading filters
  var me = document.getElementById('fobCalcMachine');
  var se = document.getElementById('fobCalcStandard');
  var sze = document.getElementById('fobCalcSize');
  var m = me ? me.value : '';
  var s = se ? se.value : '';
  var sz = sze ? sze.value : '';
  sel.innerHTML = '<option value="">-- ${fn === 'zh.html' ? '选择产品' : 'Select product'} --</option>';
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      if (m && String(p.machine) !== m) return;
      if (s && p.standard !== s) return;
      if (sz && p.size !== sz) return;
      var label = p.code + ' | ' + p.spec + ' | ' + p.size;
      if (p.machine) label += ' | ' + p.machine;
      if (q) {
        var haystack = (p.code + ' ' + p.spec + ' ' + p.size + ' ' + (p.machine||'')).toLowerCase();
        if (haystack.indexOf(q) < 0) return;
      }
      var opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = label;
      sel.appendChild(opt);
    });
  }
  if (curVal) { for (var i=0;i<sel.options.length;i++) { if (sel.options[i].value===curVal) { sel.value=curVal; break; } } }
  fobPtscCalc();
}`;
      js = js.replace(oldFilter[0], newFilter);
      changed = true;
      console.log(fn + ': fobPtscFilterProducts replaced');
    }
    
    // 5. Add fobPtscFilterCalc function
    if (js.indexOf('fobPtscFilterCalc') < 0) {
      var insertPoint = js.indexOf('fobPtscCalc();\n}\n\nfunction fobPtscCalc()');
      if (insertPoint > 0) {
        var before = js.substring(0, insertPoint + 'fobPtscCalc();\n}'.length);
        var after = js.substring(insertPoint + 'fobPtscCalc();\n}'.length);
        var newFunc = `\n\n// Cascading filter for Machine → Standard → Size
function fobPtscFilterCalc() {
  var me = document.getElementById('fobCalcMachine');
  var se = document.getElementById('fobCalcStandard');
  var sze = document.getElementById('fobCalcSize');
  if (!me || !se) return;
  var m = me.value, s = se.value;
  
  // Collect standards by machine, sizes by machine+standard
  var standardsByMach = {}, sizesByMachStd = {};
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      var machOk = !m || String(p.machine) === m;
      var stdOk = !s || p.standard === s;
      if (machOk) standardsByMach[p.standard] = true;
      if (machOk && stdOk && sze) sizesByMachStd[p.size] = true;
    });
  }
  
  // Rebuild standard dropdown
  var prevStd = se.value;
  se.innerHTML = '<option value="">— ${fn === 'zh.html' ? '选择标准' : 'Choose standard'} —</option>';
  var sk = Object.keys(standardsByMach).sort();
  sk.forEach(function(k) { se.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : '';
  
  // Rebuild size dropdown
  if (sze) {
    var prevSz = sze.value;
    sze.innerHTML = '<option value="">— ${fn === 'zh.html' ? '选择尺寸' : 'Choose size'} —</option>';
    var szk = Object.keys(sizesByMachStd).sort();
    szk.forEach(function(k) { sze.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : '';
  }
  
  // Filter products
  fobPtscFilterProducts();
}\n\nfunction fobPtscCalc()`;
        js = before + newFunc + after;
        changed = true;
        console.log(fn + ': fobPtscFilterCalc added');
      }
    }
    
    // Rebuild HTML
    var prefix = h.substring(0, m.index + 8);
    var suffix = h.substring(m.index + m[0].length - 9);
    h = prefix + js + suffix;
    
    // Verify syntax
    try {
      new Function(js);
      console.log(fn + ': ✅ JS syntax OK');
      if (changed) {
        fs.writeFileSync(__dirname + '/' + fn, h, 'utf8');
        console.log(fn + ': ✅ written');
      } else {
        console.log(fn + ': ⏭️ no changes needed');
      }
    } catch (e) {
      console.log(fn + ': ❌ JS syntax error:', e.message);
      console.log('  Saving to ' + fn + '.fail');
      fs.writeFileSync(__dirname + '/' + fn + '.fail', h, 'utf8');
    }
  }
});

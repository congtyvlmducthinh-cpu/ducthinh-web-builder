var fs = require('fs');
var trans = {
  en: { machine: 'Choose machine', standard: 'Choose standard', size: 'Choose size', product: 'Select product' },
  zh: { machine: '选择机器', standard: '选择标准', size: '选择尺寸', product: '选择产品' }
};

['en.html','zh.html'].forEach(function(fn) {
  var lang = fn === 'zh.html' ? 'zh' : 'en';
  var t = trans[lang];
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  
  // 1. Add cascading filter HTML before <div class="fobptsc-grid"> that contains fobProduct
  // In en/zh, it's: </div>\n<div class="fobptsc-grid">\n<div class="fobptsc-field"><label>
  var gridBefore = '</div>\n<div class="fobptsc-grid">\n<div class="fobptsc-field"><label>📦 ' + (lang === 'zh' ? '产品' : 'Product') + '</label>';
  var gridIdx = h.indexOf(gridBefore);
  if (gridIdx > 0) {
    var insertion = '</div>\n\n<!-- Cascading filters -->\n<div class="fobptsc-filter-row">\n<select id="fobCalcMachine" onchange="fobPtscFilterCalc()">\n<option value="">— ' + t.machine + ' —</option>\n</select>\n<select id="fobCalcStandard" onchange="fobPtscFilterCalc()">\n<option value="">— ' + t.standard + ' —</option>\n</select>\n<select id="fobCalcSize" onchange="fobPtscFilterCalc()">\n<option value="">— ' + t.size + ' —</option>\n</select>\n</div>\n\n<div class="fobptsc-grid">\n<div class="fobptsc-field"><label>📦 ' + (lang === 'zh' ? '产品' : 'Product') + '</label>';
    h = h.substring(0, gridIdx) + insertion + h.substring(gridIdx + gridBefore.length);
    console.log(fn + ': ✅ filter row HTML added');
  } else {
    // Try finding the grid without specific label
    var altIdx = h.indexOf('<div class="fobptsc-grid">\n<div class="fobptsc-field"><label>');
    if (altIdx > 0) {
      // This is the first fobptsc-grid (config section), skip to second one
      var secondGrid = h.indexOf('<div class="fobptsc-grid">', altIdx + 50);
      if (secondGrid > 0) {
        var beforeGrid = h.lastIndexOf('</div>', secondGrid);
        var insertion = '</div>\n\n<!-- Cascading filters -->\n<div class="fobptsc-filter-row">\n<select id="fobCalcMachine" onchange="fobPtscFilterCalc()">\n<option value="">— ' + t.machine + ' —</option>\n</select>\n<select id="fobCalcStandard" onchange="fobPtscFilterCalc()">\n<option value="">— ' + t.standard + ' —</option>\n</select>\n<select id="fobCalcSize" onchange="fobPtscFilterCalc()">\n<option value="">— ' + t.size + ' —</option>\n</select>\n</div>\n\n<div class="fobptsc-grid">';
        h = h.substring(0, beforeGrid) + insertion + h.substring(beforeGrid + 6);
        console.log(fn + ': ✅ filter row HTML added (alt method)');
      }
    } else {
      console.log(fn + ': ❌ could not find insertion point');
    }
  }
  
  // 2. Add fobptsc-row (fobSearchInput + fobSellPrice) between fobptsc-grid close and fobPtscCalcResult
  // Pattern: </div>\n<div id="fobPtscCalcResult">
  var resultTarget = '</div>\n<div id="fobPtscCalcResult">';
  var resultIdx = h.lastIndexOf(resultTarget);
  if (resultIdx > 0) {
    var fobptscRow = '\n<div class="fobptsc-row">\n<div class="fobptsc-field" style="flex:2">\n<label>🔍 ' + (lang === 'zh' ? '搜索产品' : 'Search products') + '</label>\n<input type="text" id="fobSearchInput" placeholder="' + (lang === 'zh' ? '输入代码、规格、尺寸、机器...' : 'Type code, spec, size, machine...') + '" oninput="fobPtscFilterProducts()">\n</div>\n<div class="fobptsc-field" style="flex:1">\n<label>💰 ' + (lang === 'zh' ? '售价（越南盾/吨）' : 'Sell price (VND/ton)') + ' <span style="font-weight:400;font-size:11px;color:var(--muted)">' + (lang === 'zh' ? '自动最低价' : 'auto min price') + '</span></label>\n<input type="number" id="fobSellPrice" min="0" step="1000" oninput="fobPtscCalc()">\n</div>\n</div>\n';
    h = h.substring(0, resultIdx) + fobptscRow + resultTarget.substring(6) + h.substring(resultIdx + resultTarget.length);
    console.log(fn + ': ✅ fobptsc-row added');
  } else {
    console.log(fn + ': ❌ could not find fobPtscCalcResult insertion point');
  }
  
  // 3. JS modifications
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) { console.log(fn + ': ❌ no script tag'); return; }
  var js = m[1];
  var changed = false;
  
  // 3a. Replace fobPtscInitCalc to populate cascading dropdowns
  var oldInit = js.match(/function fobPtscInitCalc\(\) \{[\s\S]*?\n\}/);
  if (oldInit) {
    var newInit = 'function fobPtscInitCalc() {\n  fobPtscLoadCfg();\n  // Populate cascading filter dropdowns\n  var me = document.getElementById(\'fobCalcMachine\');\n  var se = document.getElementById(\'fobCalcStandard\');\n  var sze = document.getElementById(\'fobCalcSize\');\n  if (me && typeof DATA_PRODUCTS !== \'undefined\') {\n    var machines = {}, standards = {}, sizes = {};\n    DATA_PRODUCTS.forEach(function(p) {\n      machines[p.machine] = true;\n      standards[p.standard] = true;\n      sizes[p.size] = true;\n    });\n    var mk = Object.keys(machines).sort();\n    me.innerHTML = \'<option value="">— ' + t.machine + ' —</option>\';\n    mk.forEach(function(k) { me.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n    if (se) {\n      var sk = Object.keys(standards).sort();\n      se.innerHTML = \'<option value="">— ' + t.standard + ' —</option>\';\n      sk.forEach(function(k) { se.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n    }\n    if (sze) {\n      var szk = Object.keys(sizes).sort();\n      sze.innerHTML = \'<option value="">— ' + t.size + ' —</option>\';\n      szk.forEach(function(k) { sze.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n    }\n  }\n  var sel = document.getElementById(\'fobProduct\');\n  if (!sel) return;\n  var curVal = sel.value;\n  sel.innerHTML = \'<option value="">-- ' + t.product + ' --</option>\';\n  if (typeof DATA_PRODUCTS !== \'undefined\') {\n    DATA_PRODUCTS.forEach(function(p) {\n      var label = p.code + \' | \' + p.spec + \' | \' + p.size;\n      if (p.machine) label += \' | \' + p.machine;\n      var opt = document.createElement(\'option\');\n      opt.value = p.code;\n      opt.textContent = label;\n      sel.appendChild(opt);\n    });\n  }\n  if (curVal) sel.value = curVal;\n  fobPtscCalc();\n}';
    js = js.replace(oldInit[0], newInit);
    changed = true;
    console.log(fn + ': ✅ fobPtscInitCalc updated');
  }
  
  // 3b. Make sure fobPtscFilterProducts includes cascading filter references
  var oldFilter = js.match(/function fobPtscFilterProducts\(\) \{[\s\S]*?\n\}/);
  if (oldFilter) {
    if (oldFilter[0].indexOf('fobCalcMachine') < 0) {
      // Need to update it
      var newFilter = 'function fobPtscFilterProducts() {\n  var sel = document.getElementById(\'fobProduct\');\n  var searchEl = document.getElementById(\'fobSearchInput\');\n  if (!sel || !searchEl) return;\n  var q = searchEl.value.toLowerCase().trim();\n  var curVal = sel.value;\n  // Also apply cascading filters\n  var me = document.getElementById(\'fobCalcMachine\');\n  var se = document.getElementById(\'fobCalcStandard\');\n  var sze = document.getElementById(\'fobCalcSize\');\n  var m = me ? me.value : \'\';\n  var s = se ? se.value : \'\';\n  var sz = sze ? sze.value : \'\';\n  sel.innerHTML = \'<option value="">-- ' + t.product + ' --</option>\';\n  if (typeof DATA_PRODUCTS !== \'undefined\') {\n    DATA_PRODUCTS.forEach(function(p) {\n      if (m && String(p.machine) !== m) return;\n      if (s && p.standard !== s) return;\n      if (sz && p.size !== sz) return;\n      var label = p.code + \' | \' + p.spec + \' | \' + p.size;\n      if (p.machine) label += \' | \' + p.machine;\n      if (q) {\n        var haystack = (p.code + \' \' + p.spec + \' \' + p.size + \' \' + (p.machine||\'\')).toLowerCase();\n        if (haystack.indexOf(q) < 0) return;\n      }\n      var opt = document.createElement(\'option\');\n      opt.value = p.code;\n      opt.textContent = label;\n      sel.appendChild(opt);\n    });\n  }\n  if (curVal) { for (var i=0;i<sel.options.length;i++) { if (sel.options[i].value===curVal) { sel.value=curVal; break; } } }\n  fobPtscCalc();\n}';
      js = js.replace(oldFilter[0], newFilter);
      changed = true;
      console.log(fn + ': ✅ fobPtscFilterProducts updated');
    } else {
      console.log(fn + ': ✅ fobPtscFilterProducts already has cascading filter');
    }
  }
  
  // 3c. Add fobPtscFilterCalc function
  if (js.indexOf('fobPtscFilterCalc') < 0) {
    var insertPoint = js.indexOf('fobPtscCalc();\n}\n\nfunction fobPtscCalc()');
    if (insertPoint > 0) {
      var before = js.substring(0, insertPoint + 'fobPtscCalc();\n}'.length);
      var after = js.substring(insertPoint + 'fobPtscCalc();\n}'.length);
      var newFunc = '\n\n// Cascading filter for Machine → Standard → Size\nfunction fobPtscFilterCalc() {\n  var me = document.getElementById(\'fobCalcMachine\');\n  var se = document.getElementById(\'fobCalcStandard\');\n  var sze = document.getElementById(\'fobCalcSize\');\n  if (!me || !se) return;\n  var m = me.value, s = se.value;\n  \n  // Collect standards by machine, sizes by machine+standard\n  var standardsByMach = {}, sizesByMachStd = {};\n  if (typeof DATA_PRODUCTS !== \'undefined\') {\n    DATA_PRODUCTS.forEach(function(p) {\n      var machOk = !m || String(p.machine) === m;\n      var stdOk = !s || p.standard === s;\n      if (machOk) standardsByMach[p.standard] = true;\n      if (machOk && stdOk && sze) sizesByMachStd[p.size] = true;\n    });\n  }\n  \n  // Rebuild standard dropdown\n  var prevStd = se.value;\n  se.innerHTML = \'<option value="">— ' + t.standard + ' —</option>\';\n  var sk = Object.keys(standardsByMach).sort();\n  sk.forEach(function(k) { se.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : \'\';\n  \n  // Rebuild size dropdown\n  if (sze) {\n    var prevSz = sze.value;\n    sze.innerHTML = \'<option value="">— ' + t.size + ' —</option>\';\n    var szk = Object.keys(sizesByMachStd).sort();\n    szk.forEach(function(k) { sze.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : \'\';\n  }\n  \n  // Filter products\n  fobPtscFilterProducts();\n}\n\nfunction fobPtscCalc()';
      js = before + newFunc + after;
      changed = true;
      console.log(fn + ': ✅ fobPtscFilterCalc added');
    } else {
      console.log(fn + ': ❌ could not find insert point for fobPtscFilterCalc');
    }
  }
  
  // Rebuild HTML
  var prefix = h.substring(0, m.index + 8);
  var suffix = h.substring(m.index + m[0].length - 9);
  var newH = prefix + js + suffix;
  
  try {
    new Function(js);
    console.log(fn + ': ✅ JS syntax OK!');
    fs.writeFileSync(__dirname + '/' + fn, newH, 'utf8');
  } catch (e) {
    console.log(fn + ': ❌ JS syntax error:', e.message);
    fs.writeFileSync(__dirname + '/' + fn + '.fail', newH, 'utf8');
  }
  
  console.log('');
});

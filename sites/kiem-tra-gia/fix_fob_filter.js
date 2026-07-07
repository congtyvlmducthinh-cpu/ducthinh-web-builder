var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');

// 1) Add CSS for cascading filter row
var cssInsert = `
/* FOB PTSC cascading filters */
.fobptsc-filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.fobptsc-filter-row select{flex:1;min-width:120px;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;background:#fff}
.fobptsc-filter-row select:focus{border-color:var(--blue);outline:none}
@media(max-width:600px){.fobptsc-filter-row select{min-width:100%}}
`;
h = h.replace('/* FOB PTSC cascading filters */', cssInsert);
// If the comment doesn't exist, insert before .fobptsc-panel CSS
if (h.indexOf(cssInsert.trim()) < 0) {
  h = h.replace('.fobptsc-panel{padding:16px}', cssInsert + '\n.fobptsc-panel{padding:16px}');
}

// 2) Add cascading dropdown HTML to fobptsc-panel
// Insert after product select block and before the fobptsc-row (search + sell price)
var oldHtml = '<div class="fobptsc-grid">\n      <div class="fobptsc-field"><label>📦 Sản phẩm</label>\n        <select id="fobProduct" onchange="fobPtscCalc()">\n          <option value="">-- Chọn sản phẩm --</option>\n        </select>\n      </div>\n      <div class="fobptsc-field"><label>⚖️ Số tấn</label><input type="number" id="fobTonnage" min="0" step="0.1" oninput="fobPtscCalc()"></div>\n      <div class="fobptsc-field"><label>📅 Số ngày lưu kho</label><input type="number" id="fobWarehouseDays" value="3" min="0" oninput="fobPtscCalc()"></div>\n    </div>';

var newHtml = '<!-- Cascading filters: Machine → Standard → Size -->\n    <div class="fobptsc-filter-row">\n      <select id="fobCalcMachine" onchange="fobPtscFilterCalc()">\n        <option value="">— Chọn máy —</option>\n      </select>\n      <select id="fobCalcStandard" onchange="fobPtscFilterCalc()">\n        <option value="">— Chọn tiêu chuẩn —</option>\n      </select>\n      <select id="fobCalcSize" onchange="fobPtscFilterCalc()">\n        <option value="">— Chọn kích thước —</option>\n      </select>\n    </div>\n\n    <div class="fobptsc-grid">\n      <div class="fobptsc-field"><label>📦 Sản phẩm</label>\n        <select id="fobProduct" onchange="fobPtscCalc()">\n          <option value="">-- Chọn sản phẩm --</option>\n        </select>\n      </div>\n      <div class="fobptsc-field"><label>⚖️ Số tấn</label><input type="number" id="fobTonnage" min="0" step="0.1" oninput="fobPtscCalc()"></div>\n      <div class="fobptsc-field"><label>📅 Số ngày lưu kho</label><input type="number" id="fobWarehouseDays" value="3" min="0" oninput="fobPtscCalc()"></div>\n    </div>';

h = h.replace(oldHtml, newHtml);

// 3) Rewrite fobPtscFilterProducts and add fobPtscFilterCalc + update fobPtscInitCalc
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];

// Replace fobPtscFilterProducts function
var oldFilterFunc = js.match(/function fobPtscFilterProducts\(\) \{[\s\S]*?\n\}/);
if (!oldFilterFunc) {
  console.log('❌ Could not find fobPtscFilterProducts');
  process.exit(1);
}
console.log('Found fobPtscFilterProducts, length:', oldFilterFunc[0].length);

var newFilterFunc = `function fobPtscFilterProducts() {
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
  sel.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';
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

console.log('New filter function length:', newFilterFunc.length);
js = js.replace(oldFilterFunc[0], newFilterFunc);

// Add fobPtscFilterCalc function (cascading filter) and update fobPtscInitCalc
// Find fobPtscInitCalc to add populating cascading selects

var oldInitCalc = js.match(/function fobPtscInitCalc\(\) \{[\s\S]*?\n\}/);
if (oldInitCalc) {
  console.log('Found fobPtscInitCalc, length:', oldInitCalc[0].length);
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
    me.innerHTML = '<option value="">— Chọn máy —</option>';
    mk.forEach(function(k) { me.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    if (se) {
      var sk = Object.keys(standards).sort();
      se.innerHTML = '<option value="">— Chọn tiêu chuẩn —</option>';
      sk.forEach(function(k) { se.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    }
    if (sze) {
      var szk = Object.keys(sizes).sort();
      sze.innerHTML = '<option value="">— Chọn kích thước —</option>';
      szk.forEach(function(k) { sze.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    }
  }
  var sel = document.getElementById('fobProduct');
  if (!sel) return;
  var curVal = sel.value;
  sel.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';
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
  console.log('Replaced fobPtscInitCalc');
} else {
  console.log('⚠️ Could not find fobPtscInitCalc, need manual check');
}

// Add fobPtscFilterCalc function - insert after fobPtscFilterProducts
var insertAfter = 'fobPtscCalc();\n}\n\nfunction fobPtscCalc()';
var newFunc = `fobPtscCalc();
}

// Cascading filter for Machine → Standard → Size
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
  se.innerHTML = '<option value="">— Chọn tiêu chuẩn —</option>';
  var sk = Object.keys(standardsByMach).sort();
  sk.forEach(function(k) { se.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : '';
  
  // Rebuild size dropdown
  if (sze) {
    var prevSz = sze.value;
    sze.innerHTML = '<option value="">— Chọn kích thước —</option>';
    var szk = Object.keys(sizesByMachStd).sort();
    szk.forEach(function(k) { sze.innerHTML += '<option value="' + k.replace(/"/g,'&quot;') + '">' + k + '</option>'; });
    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : '';
  }
  
  // Filter products
  fobPtscFilterProducts();
}

function fobPtscCalc()`;

js = js.replace(insertAfter, newFunc);

// Rebuild HTML
var prefix = h.substring(0, m.index + 8);
var suffix = h.substring(m.index + m[0].length - 9);
var newHtml = prefix + js + suffix;

// Verify JS syntax
try {
  new Function(js);
  console.log('✅ JS syntax OK!');
  fs.writeFileSync(__dirname + '/vi.html', newHtml, 'utf8');
  console.log('✅ Written vi.html with cascading filters');
} catch (e) {
  console.log('❌ JS syntax error:', e.message);
  fs.writeFileSync(__dirname + '/vi.html.fail', newHtml, 'utf8');
  console.log('❌ Saved to vi.html.fail for debugging');
}

const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
let c = 0;

// updateQuotationPreview - fix remaining patterns
// These are the ones in the function body

// Chọn sản phẩm tiêu đề
var r1 = 'h += \'<div class="calc-section-title"><span class="badge blue">📦</span><span class="title-text">Chọn sản phẩm</span></div>\';';
var r1n = 'h += \'<div class="calc-section-title"><span class="badge blue">📦</span><span class="title-text">\'+t(\'calc.section.products\')+\'</span></div>\';';
if (h.indexOf(r1) > -1) { h = h.replace(r1, r1n); c++; console.log("fix: calc section title"); }

// — Chọn sản phẩm —
var r2 = 'h += \'<select class="calc-select" id="calcProduct" onchange="onCalcProductChange()"><option value="">— Chọn sản phẩm —</option></select></div>\';';
var r2n = 'h += \'<select class="calc-select" id="calcProduct" onchange="onCalcProductChange()"><option value="">\'+t(\'calc.select.product\')+\'</option></select></div>\';';
if (h.indexOf(r2) > -1) { h = h.replace(r2, r2n); c++; console.log("fix: calc select placeholder"); }

// "Chọn sản phẩm và bao bì để bắt đầu"
var r3 = 'h += \'<div class="calc-empty-text">Chọn sản phẩm và bao bì để bắt đầu</div>\';';
var r3n = 'h += \'<div class="calc-empty-text">\'+t(\'calc.empty.hint\')+\'</div>\';';
if (h.indexOf(r3) > -1) { h = h.replace(r3, r3n); c++; console.log("fix: calc empty hint"); }

// "Chọn sản phẩm trước" (onCalcProductChange)
var r4 = 'cr.innerHTML = \'<div style="color:var(--muted);font-size:12px">Chọn sản phẩm trước</div>\';';
var r4n = 'cr.innerHTML = \'<div style="color:var(--muted);font-size:12px">\'+t(\'calc.select.first\')+\'</div>\';';
if (h.indexOf(r4) > -1) { h = h.replace(r4, r4n); c++; console.log("fix: calc select first hint"); }

// Add LANG_MAP entries for missing keys
var missing2 = `
  "calc.empty.hint":{vi:"Chọn sản phẩm và bao bì để bắt đầu",en:"Select product and packaging to start",zh:"请选择产品和包装开始"},
  "calc.select.first":{vi:"Chọn sản phẩm trước",en:"Select product first",zh:"请先选择产品"},
  "table.price.incl.pkg.full":{vi:"Giá bao gồm bao bì",en:"Price incl. packaging",zh:"含包装价格"},
  "table.price.sell.full":{vi:"Giá bán (EXW)",en:"Sell Price (EXW)",zh:"售价(EXW)"},
`;

// Insert into LANG_MAP
var inserPos = h.lastIndexOf('};');
var mapOpen = h.indexOf('var LANG_MAP');
var before = h.substring(mapOpen, inserPos);
h = h.substring(0, mapOpen) + before + missing2 + h.substring(inserPos);
console.log("Added more LANG_MAP entries");

fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log("Done! Fixes:", c, "Size:", h.length);

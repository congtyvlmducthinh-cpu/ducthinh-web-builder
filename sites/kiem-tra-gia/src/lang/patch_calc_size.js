var fs = require('fs');

var content = fs.readFileSync('modules/05-calc.js', 'utf8');

// 1. Add size select after the Machine/Standard row (between "row-inline" closing and Product label)
content = content.replace(
  "h += '</select></div>';",
  "h += '</select></div>';"
);
// More targeted: find the line closing the last col div in the row-inline
content = content.replace(
  "'<select class=\"calc-select\" id=\"calcStandard\" onchange=\"filterCalcProducts()\"><option value=\"\">— Chọn tiêu chuẩn —</option></select></div>';",
  "'<select class=\"calc-select\" id=\"calcStandard\" onchange=\"filterCalcProducts()\"><option value=\"\">— Chọn tiêu chuẩn —</option></select></div>';"
);
// Instead, I'll insert a size row right before the product label line
content = content.replace(
  "h += '<div class=\"calc-form-group\"><label class=\"calc-form-label\">🔖 Sản phẩm</label>';",
  "h += '<div class=\"calc-form-group\"><div class=\"calc-row-inline\">';\n" +
  "  h += '<div><label class=\"calc-form-label\">📐 Kích thước</label>';\n" +
  "  h += '<select class=\"calc-select\" id=\"calcSize\" onchange=\"filterCalcProducts()\"><option value=\"\">— Chọn kích thước —</option></select></div>';\n" +
  "  h += '</div></div>';\n" +
  "  h += '<div class=\"calc-form-group\"><label class=\"calc-form-label\">🔖 Sản phẩm</label>';"
);

// 2. Update filterCalcProducts() to include sizeFilter
var oldFilter = `function filterCalcProducts() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value;`;

var newFilter = `function filterCalcProducts() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), sze = document.getElementById("calcSize"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value, sz = sze ? sze.value : "";`;

content = content.replace(oldFilter, newFilter);

// 2b. Update the filter logic: add size to the product matching
var oldProdLoop = `  DATA_PRODUCTS.forEach(function(p) {
    if (!m || String(p.machine) === m) standardsByMach[p.standard] = true;
    if (!s || p.standard === s) machinesByStd[p.machine] = true;
  });`;

var newProdLoop = `  var sizesByMachStd = {};
  DATA_PRODUCTS.forEach(function(p) {
    if (!m || String(p.machine) === m) standardsByMach[p.standard] = true;
    if (!s || p.standard === s) machinesByStd[p.machine] = true;
    if ((!m || String(p.machine) === m) && (!s || p.standard === s)) sizesByMachStd[p.size] = true;
  });`;

content = content.replace(oldProdLoop, newProdLoop);

// 2c. After standards populating, add size populating
var stdPopulateEnd = `  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : "";
  filterCalcProducts_products();`;

var sizePopulate = `  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : "";
  // Populate sizes (if machine/standard is selected, filter)
  var prevSz = sze ? sze.value : "";
  if (sze) {
    sze.innerHTML = '<option value="">—— Chọn kích thước —</option>';
    var szk = Object.keys(sizesByMachStd).sort();
    for (var i = 0; i < szk.length; i++) sze.innerHTML += '<option value="' + szk[i].replace(/"/g, '&quot;') + '">' + szk[i] + '</option>';
    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : "";
  }
  filterCalcProducts_products();`;

content = content.replace(stdPopulateEnd, sizePopulate);

// 3. Update filterCalcProducts_products() to include size filter
var oldProdFilter = `function filterCalcProducts_products() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value;`;

var newProdFilter = `function filterCalcProducts_products() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), sze = document.getElementById("calcSize"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value, sz = sze ? sze.value : "";`;

content = content.replace(oldProdFilter, newProdFilter);

// 3b. Update the product listing filter
var oldProdList = `  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s)) pe.innerHTML += '<option value="' + p.code + '">' + p.code + ' — ' + p.size + '</option>'; });`;

var newProdList = `  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s) && (!sz || p.size === sz)) pe.innerHTML += '<option value="' + p.code + '">' + p.code + ' — ' + p.size + '</option>'; });`;

content = content.replace(oldProdList, newProdList);

// 4. Update resetCalcFilters to include size
var oldReset = `  var me = document.getElementById("calcMachine");
  if (me) me.value = "";
  var se = document.getElementById("calcStandard");
  if (se) se.value = "";
  var pe = document.getElementById("calcProduct");`;

var newReset = `  var me = document.getElementById("calcMachine");
  if (me) me.value = "";
  var se = document.getElementById("calcStandard");
  if (se) se.value = "";
  var sze = document.getElementById("calcSize");
  if (sze) sze.value = "";
  var pe = document.getElementById("calcProduct");`;

content = content.replace(oldReset, newReset);

fs.writeFileSync('modules/05-calc.js', content, 'utf8');
console.log('Updated 05-calc.js');

var fs = require('fs');
var c = fs.readFileSync('modules/05-calc.js', 'utf8');

// 1. Add size row after the machine/standard row and before the product label
c = c.replace(
  "h += '<div class=\"calc-form-group\"><label class=\"calc-form-label\">🔖 Sản phẩm</label>';",
  "h += '<div class=\"calc-form-group\"><div class=\"calc-row-inline\">';\n  h += '<div><label class=\"calc-form-label\">📐 Kích thước</label>';\n  h += '<select class=\"calc-select\" id=\"calcSize\" onchange=\"filterCalcProducts()\"><option value=\"\">— Chọn kích thước —</option></select></div>';\n  h += '</div></div>';\n  h += '<div class=\"calc-form-group\"><label class=\"calc-form-label\">🔖 Sản phẩm</label>';"
);

// 2. Update filterCalcProducts() — add size var
c = c.replace(
  "function filterCalcProducts() {\n  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), pe = document.getElementById(\"calcProduct\");\n  if (!me || !se || !pe) return;\n  var m = me.value, s = se.value;",
  "function filterCalcProducts() {\n  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), sze = document.getElementById(\"calcSize\"), pe = document.getElementById(\"calcProduct\");\n  if (!me || !se || !pe) return;\n  var m = me.value, s = se.value, sz = sze ? sze.value : \"\";"
);

// 3. Add size tracking in the DATA_PRODUCTS loop
c = c.replace(
  "  DATA_PRODUCTS.forEach(function(p) {\n    if (!m || String(p.machine) === m) standardsByMach[p.standard] = true;\n    if (!s || p.standard === s) machinesByStd[p.machine] = true;\n  });",
  "  var sizesByMachStd = {};\n  DATA_PRODUCTS.forEach(function(p) {\n    var machOk = !m || String(p.machine) === m;\n    var stdOk = !s || p.standard === s;\n    if (machOk) standardsByMach[p.standard] = true;\n    if (stdOk) machinesByStd[p.machine] = true;\n    if (machOk && stdOk) sizesByMachStd[p.size] = true;\n  });"
);

// 4. Add size population after standard population, before filterCalcProducts_products()
c = c.replace(
  "  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : \"\";\n  filterCalcProducts_products();",
  "  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : \"\";\n  // Populate sizes (if machine/standard is selected)\n  var prevSz = sze ? sze.value : \"\";\n  if (sze) {\n    sze.innerHTML = '<option value=\"\">— Chọn kích thước —</option>';\n    var szk = Object.keys(sizesByMachStd).sort();\n    for (var i = 0; i < szk.length; i++) sze.innerHTML += '<option value=\"' + szk[i].replace(/\"/g, '&quot;') + '\">' + szk[i] + '</option>';\n    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : \"\";\n  }\n  filterCalcProducts_products();"
);

// 5. Update filterCalcProducts_products() — add size var and filter
c = c.replace(
  "function filterCalcProducts_products() {\n  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), pe = document.getElementById(\"calcProduct\");\n  if (!me || !se || !pe) return;\n  var m = me.value, s = se.value;",
  "function filterCalcProducts_products() {\n  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), sze = document.getElementById(\"calcSize\"), pe = document.getElementById(\"calcProduct\");\n  if (!me || !se || !pe) return;\n  var m = me.value, s = se.value, sz = sze ? sze.value : \"\";"
);

// 6. Update product filter to include size
c = c.replace(
  "  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s)) pe.innerHTML += '<option value=\"' + p.code + '\">' + p.code + ' — ' + p.size + '</option>'; });",
  "  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s) && (!sz || p.size === sz)) pe.innerHTML += '<option value=\"' + p.code + '\">' + p.code + ' — ' + p.size + '</option>'; });"
);

// 7. Update resetCalcFilters() to include size
c = c.replace(
  "  var se = document.getElementById(\"calcStandard\");\n  if (se) se.value = \"\";\n  var pe = document.getElementById(\"calcProduct\");",
  "  var se = document.getElementById(\"calcStandard\");\n  if (se) se.value = \"\";\n  var sze = document.getElementById(\"calcSize\");\n  if (sze) sze.value = \"\";\n  var pe = document.getElementById(\"calcProduct\");"
);

fs.writeFileSync('modules/05-calc.js', c, 'utf8');
console.log('Done');

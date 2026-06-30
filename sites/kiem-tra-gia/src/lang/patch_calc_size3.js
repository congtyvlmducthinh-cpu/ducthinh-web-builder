var fs = require('fs');
var c = fs.readFileSync('modules/05-calc.js', 'utf8');

// 1. Add size row — find the line with 🔖 Sản phẩm label, insert before it
var target = "h += '<div class=\"calc-form-group\"><label class=\"calc-form-label\">🔖 Sản phẩm</label>';";
var insert = "h += '<div class=\"calc-form-group\"><div class=\"calc-row-inline\">' +\n" +
  "  '<div><label class=\"calc-form-label\">📐 Kích thước</label>' +\n" +
  "  '<select class=\"calc-select\" id=\"calcSize\" onchange=\"filterCalcProducts()\"><option value=\"\">— Chọn kích thước —</option></select></div>' +\n" +
  "  '</div></div>' +\n" +
  "  '<div class=\"calc-form-group\"><label class=\"calc-form-label\">🔖 Sản phẩm</label>';";

c = c.split(target).join(insert);

// 2. Update filterCalcProducts() — add size
var old = "function filterCalcProducts() {\n" +
"  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), pe = document.getElementById(\"calcProduct\");\n" +
"  if (!me || !se || !pe) return;\n" +
"  var m = me.value, s = se.value;\n" +
"  // Collect standards by machine, and machines by standard\n" +
"  var machinesByStd = {}, standardsByMach = {};\n" +
"  DATA_PRODUCTS.forEach(function(p) {\n" +
"    if (!m || String(p.machine) === m) standardsByMach[p.standard] = true;\n" +
"    if (!s || p.standard === s) machinesByStd[p.machine] = true;\n" +
"  });\n" +
"  // Populate machines (if standard is selected, filter)\n" +
"  var prevMach = me.value;\n" +
"  me.innerHTML = '<option value=\"\">— Chọn máy —</option>';\n" +
"  var mk = Object.keys(machinesByStd).sort();\n" +
"  for (var i = 0; i < mk.length; i++) me.innerHTML += '<option value=\"' + mk[i].replace(/\"/g, '&quot;') + '\">' + mk[i] + '</option>';\n" +
"  me.value = prevMach && mk.indexOf(prevMach) >= 0 ? prevMach : \"\";\n" +
"  // Populate standards (if machine is selected, filter)\n" +
"  var prevStd = se.value;\n" +
"  se.innerHTML = '<option value=\"\">— Chọn tiêu chuẩn —</option>';\n" +
"  var sk = Object.keys(standardsByMach).sort();\n" +
"  for (var i = 0; i < sk.length; i++) se.innerHTML += '<option value=\"' + sk[i].replace(/\"/g, '&quot;') + '\">' + sk[i] + '</option>';\n" +
"  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : \"\";\n" +
"  filterCalcProducts_products();\n" +
"}";

var newfn = "function filterCalcProducts() {\n" +
"  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), sze = document.getElementById(\"calcSize\"), pe = document.getElementById(\"calcProduct\");\n" +
"  if (!me || !se || !pe) return;\n" +
"  var m = me.value, s = se.value, sz = sze ? sze.value : \"\";\n" +
"  // Collect standards by machine, and machines by standard\n" +
"  var machinesByStd = {}, standardsByMach = {}, sizesByMachStd = {};\n" +
"  DATA_PRODUCTS.forEach(function(p) {\n" +
"    var machOk = !m || String(p.machine) === m;\n" +
"    var stdOk = !s || p.standard === s;\n" +
"    if (machOk) standardsByMach[p.standard] = true;\n" +
"    if (stdOk) machinesByStd[p.machine] = true;\n" +
"    if (machOk && stdOk) sizesByMachStd[p.size] = true;\n" +
"  });\n" +
"  // Populate machines (if standard is selected, filter)\n" +
"  var prevMach = me.value;\n" +
"  me.innerHTML = '<option value=\"\">— Chọn máy —</option>';\n" +
"  var mk = Object.keys(machinesByStd).sort();\n" +
"  for (var i = 0; i < mk.length; i++) me.innerHTML += '<option value=\"' + mk[i].replace(/\"/g, '&quot;') + '\">' + mk[i] + '</option>';\n" +
"  me.value = prevMach && mk.indexOf(prevMach) >= 0 ? prevMach : \"\";\n" +
"  // Populate standards (if machine is selected, filter)\n" +
"  var prevStd = se.value;\n" +
"  se.innerHTML = '<option value=\"\">— Chọn tiêu chuẩn —</option>';\n" +
"  var sk = Object.keys(standardsByMach).sort();\n" +
"  for (var i = 0; i < sk.length; i++) se.innerHTML += '<option value=\"' + sk[i].replace(/\"/g, '&quot;') + '\">' + sk[i] + '</option>';\n" +
"  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : \"\";\n" +
"  // Populate sizes (if machine/standard is selected)\n" +
"  var prevSz = sze ? sze.value : \"\";\n" +
"  if (sze) {\n" +
"    sze.innerHTML = '<option value=\"\">— Chọn kích thước —</option>';\n" +
"    var szk = Object.keys(sizesByMachStd).sort();\n" +
"    for (var i = 0; i < szk.length; i++) sze.innerHTML += '<option value=\"' + szk[i].replace(/\"/g, '&quot;') + '\">' + szk[i] + '</option>';\n" +
"    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : \"\";\n" +
"  }\n" +
"  filterCalcProducts_products();\n" +
"}";

c = c.split(old).join(newfn);

// 3. Update filterCalcProducts_products() — add size
var old2 = "function filterCalcProducts_products() {\n" +
"  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), pe = document.getElementById(\"calcProduct\");\n" +
"  if (!me || !se || !pe) return;\n" +
"  var m = me.value, s = se.value;\n" +
"  var prevProd = pe.value;\n" +
"  pe.innerHTML = '<option value=\"\">— Chọn sản phẩm —</option>';\n" +
"  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s)) pe.innerHTML += '<option value=\"' + p.code + '\">' + p.code + ' — ' + p.size + '</option>'; });\n" +
"  pe.value = prevProd;\n" +
"}";

var newfn2 = "function filterCalcProducts_products() {\n" +
"  var me = document.getElementById(\"calcMachine\"), se = document.getElementById(\"calcStandard\"), sze = document.getElementById(\"calcSize\"), pe = document.getElementById(\"calcProduct\");\n" +
"  if (!me || !se || !pe) return;\n" +
"  var m = me.value, s = se.value, sz = sze ? sze.value : \"\";\n" +
"  var prevProd = pe.value;\n" +
"  pe.innerHTML = '<option value=\"\">— Chọn sản phẩm —</option>';\n" +
"  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s) && (!sz || p.size === sz)) pe.innerHTML += '<option value=\"' + p.code + '\">' + p.code + ' — ' + p.size + '</option>'; });\n" +
"  pe.value = prevProd;\n" +
"}";

c = c.split(old2).join(newfn2);

// 4. Update resetCalcFilters() to include size
c = c.replace(
  "  var se = document.getElementById(\"calcStandard\");\n  if (se) se.value = \"\";\n  var pe = document.getElementById(\"calcProduct\");",
  "  var se = document.getElementById(\"calcStandard\");\n  if (se) se.value = \"\";\n  var sze = document.getElementById(\"calcSize\");\n  if (sze) sze.value = \"\";\n  var pe = document.getElementById(\"calcProduct\");"
);

fs.writeFileSync('modules/05-calc.js', c, 'utf8');
console.log('Done');

var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');

// Fix 1: Add default "Chọn số tấn" to Jumbo tonnage dropdown
src = src.replace(
  "h += '<select class=\"calc-select\" id=\"calcTonnage\" onchange=\"calcPrice()\">';\n  var jumboTons",
  "h += '<select class=\"calc-select\" id=\"calcTonnage\" onchange=\"calcPrice()\">';\n  h += '<option value=\"\">— Chọn số tấn —</option>';\n  var jumboTons"
);

// Fix 2: Add default "Chọn số tấn" to Other tonnage dropdown
src = src.replace(
  "h += '<select class=\"calc-select\" id=\"calcOtherTonnage\" onchange=\"calcPrice()\">';\n  var otherTons",
  "h += '<select class=\"calc-select\" id=\"calcOtherTonnage\" onchange=\"calcPrice()\">';\n  h += '<option value=\"\">— Chọn số tấn —</option>';\n  var otherTons"
);

// Fix 3: Jumbo validation — if no tonnage, show warning, no total
src = src.replace(
  "var isJumbo = bs === \"Jumbo\";\n  // Determine base price",
  "var isJumbo = bs === \"Jumbo\";\n  // Jumbo validation: must select tonnage\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === \"\")) {\n    res.innerHTML = '<div class=\"calc-empty\">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>';\n    return;\n  }\n  // Determine base price"
);

fs.writeFileSync('modules/05-calc.js', src, 'utf-8');
console.log('Done!');

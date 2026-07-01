var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');

// Fix 1: Add "-- Chọn số tấn --" default option to Jumbo tonnage dropdown
var jumboTonsLine = "  var jumboTons = [\"0.5\",\"0.7\",\"1\",\"1.1\",\"1.2\",\"1.25\",\"1.3\",\"1.35\",\"1.375\",\"1.38\",\"1.4\",\"1.5\"];\n  for (var i = 0; i < jumboTons.length; i++) {\n    h += '<option value=\"' + jumboTons[i] + '\">' + jumboTons[i] + ' tấn</option>';\n  }";
var jumboTonsNew = "  h += '<option value=\"\">— Chọn số tấn —</option>';\n  var jumboTons = [\"0.5\",\"0.7\",\"1\",\"1.1\",\"1.2\",\"1.25\",\"1.3\",\"1.35\",\"1.375\",\"1.38\",\"1.4\",\"1.5\"];\n  for (var i = 0; i < jumboTons.length; i++) {\n    h += '<option value=\"' + jumboTons[i] + '\">' + jumboTons[i] + ' tấn</option>';\n  }";
src = src.replace(jumboTonsLine, jumboTonsNew);

// Fix 2: Add "-- Chọn số tấn --" to Other Tonnage too
var otherTonsLine = "  var otherTons = [\"0.5\",\"0.7\",\"1\",\"1.1\",\"1.2\",\"1.25\",\"1.3\",\"1.35\",\"1.375\",\"1.38\",\"1.4\",\"1.5\",\"1.53\",\"1.6\"];\n  for (var i = 0; i < otherTons.length; i++) {\n    h += '<option value=\"' + otherTons[i] + '\">' + otherTons[i] + ' tấn</option>';\n  }";
var otherTonsNew = "  h += '<option value=\"\">— Chọn số tấn —</option>';\n  var otherTons = [\"0.5\",\"0.7\",\"1\",\"1.1\",\"1.2\",\"1.25\",\"1.3\",\"1.35\",\"1.375\",\"1.38\",\"1.4\",\"1.5\",\"1.53\",\"1.6\"];\n  for (var i = 0; i < otherTons.length; i++) {\n    h += '<option value=\"' + otherTons[i] + '\">' + otherTons[i] + ' tấn</option>';\n  }";
src = src.replace(otherTonsLine, otherTonsNew);

// Fix 3: In calcPrice, add Jumbo tonnage validation
// Find the section where it checks bagTons after Jumbo
var target = "  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);\n  var ocode = osel ? osel.value : \"\", otherTons = 1;\n  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);\n  // When Jumbo selected, other spec also divides by bag tonnage\n  if (isJumbo && bagTons > 0) otherTons = bagTons;";

// Actually simpler: after bagTons assignment, check if Jumbo and no tonnage chosen
var injectWarning = "  // Jumbo validation: if Jumbo but no tonnage chosen, warn and skip total\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === \"\")) {\n    res.innerHTML = '<div class=\"calc-empty\">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả tính giá</div>';\n    return;\n  }\n";
// Inject right after isJumbo=bs==="Jumbo" line
var lineAfterIsJumbo = "  var isJumbo = bs === \"Jumbo\";\n";
src = src.replace(lineAfterIsJumbo, lineAfterIsJumbo + injectWarning);

fs.writeFileSync('modules/05-calc.js', src, 'utf-8');
console.log('Done! Fixed Jumbo tonnage default + validation');

var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');

// Remove Jumbo validation from calcCommission() - it was injected wrongly
var wrongBlock = '  var isJumbo = bs === "Jumbo";\n  // Jumbo validation: must select tonnage\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {\n    res.innerHTML = \'<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>\';\n    return;\n  }';

// Find it in calcCommission context: after bagSpecSel
var wrongInContext = '  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");\n  var bs = bagSpecSel ? bagSpecSel.value : "25KG";\n  var isJumbo = bs === "Jumbo";\n  // Jumbo validation: must select tonnage\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {\n    res.innerHTML = \'<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>\';\n    return;\n  }';

var fixed = '  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");\n  var bs = bagSpecSel ? bagSpecSel.value : "25KG";\n  var isJumbo = bs === "Jumbo";';

src = src.replace(wrongInContext, fixed);

// Now add validation to calcPrice() - right after isJumbo assignment
var calcPriceTarget = 'function calcPrice() {\n  var res = document.getElementById("calcResult");\n  if (!res) return;\n  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");\n  var isUsd = currency === "USD", pcode = psel ? psel.value : "";';
src = src.replace(
  calcPriceTarget,
  'function calcPrice() {\n  var res = document.getElementById("calcResult");\n  if (!res) return;\n  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");\n  var isUsd = currency === "USD", pcode = psel ? psel.value : "";'
);

// Instead, insert after isJumbo = bs === "Jumbo"; in calcPrice
// Find that line:
var calcPriceJumboLine = '  var isJumbo = bs === "Jumbo";\n  // Determine base price:';
src = src.replace(
  calcPriceJumboLine,
  '  var isJumbo = bs === "Jumbo";\n  // Jumbo validation: must select tonnage\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {\n    res.innerHTML = \'<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>\';\n    return;\n  }\n  // Determine base price:'
);

fs.writeFileSync('modules/05-calc.js', src, 'utf-8');
console.log('Fixed! Jumbo validation moved to correct function');

// Verify
src = fs.readFileSync('modules/05-calc.js', 'utf-8');
var pos1 = src.indexOf('Vui lòng chọn');
var ctx1 = src.substring(Math.max(0, pos1-300), pos1+50);
console.log('=== Context of warning ===');
var lines = ctx1.split('\n');
lines.forEach(function(l, i) { console.log(i + ': ' + l); });

var fs = require('fs');

var content = fs.readFileSync('modules/05-calc.js', 'utf8');

// 1. Add reset button near section title
content = content.replace(
  "'<div class=\"calc-section-title\"><span class=\"badge blue\">📦</span><span class=\"title-text\">Chọn sản phẩm</span></div>';",
  "'<div class=\"calc-section-title\"><span class=\"badge blue\">📦</span><span class=\"title-text\">Chọn sản phẩm</span><button id=\"resetCalcBtn\" onclick=\"resetCalcFilters()\" title=\"Bỏ lọc\" style=\"margin-left:auto;width:28px;height:28px;padding:0;border:1.5px solid var(--border);border-radius:6px;background:var(--card);color:var(--text-secondary);font-size:13px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s\">↺</button></div>';"
);

// 2. Add resetCalcFilters function at the end
content += `

// ====== RESET CALC FILTERS ======
function resetCalcFilters() {
  var me = document.getElementById("calcMachine");
  if (me) me.value = "";
  var se = document.getElementById("calcStandard");
  if (se) se.value = "";
  var pe = document.getElementById("calcProduct");
  if (pe) pe.value = "";
  var mlsel = document.getElementById("calcMaxLoad");
  if (mlsel) mlsel.value = "";
  filterCalcProducts();
  var bs = document.getElementById("calcBagSpec");
  if (bs) bs.value = "25KG";
  var bg = document.getElementById("calcBag");
  if (bg) bg.innerHTML = '<option value="">— Không chọn bao bì —</option>';
  var ot = document.getElementById("calcOther");
  if (ot) ot.value = "";
  calcPrice();
}
`;

fs.writeFileSync('modules/05-calc.js', content, 'utf8');
console.log('Updated 05-calc.js');

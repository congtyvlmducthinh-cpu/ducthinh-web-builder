import sys
sys.stdout.reconfigure(encoding='utf-8')

path = 'sites/kiem-tra-gia/index.html'
with open(path, 'r', encoding='utf-8') as f:
    data = f.read()

# === STEP 1: Add calc vars after managePassword ===
old1 = 'var managePassword = "Ducthinh@1";'
new1 = old1 + '\nvar calcPriceMode = "exw";\nvar calcLccType = "no";\nvar calcFreightUSD = 0;\nvar EXCHANGE_RATE = 26000;'
if old1 in data:
    data = data.replace(old1, new1)
    print('1) OK: Added calc vars')
else:
    print('1) FAIL: managePassword not found')

# === STEP 2: Replace calc right panel (add mode bar) ===
old_right = """\'<div class="calc-right-header">\';
  h += \'<span class="calc-right-icon">\U0001f4b0</span>\';
  h += \'<span>K\u1ebft qu\u1ea3 t\u00ednh gi\u00e1</span>\';
  h += \'</div>\';
  h += \'<div class="calc-result" id="calcResult">\';
  h += \'<div class="calc-empty">\';
  h += \'<div class="calc-empty-icon">\U0001f4ca</div>\';
  h += \'<div class="calc-empty-text">Ch\u1ecdn s\u1ea3n ph\u1ea9m v\u00e0 bao b\u00ec \u0111\u1ec3 b\u1eaft \u0111\u1ea7u</div>\';
  h += \'</div>\';
  h += \'</div>\';
  h += \'</div>\';
"""

new_right = """\'<div class="calc-right-header">\';
  h += \'<span class="calc-right-icon">\U0001f4b0</span>\';
  h += \'<span>K\u1ebft qu\u1ea3 t\u00ednh gi\u00e1</span>\';
  h += \'</div>\';
  // Price mode bar for calc tab
  h += \'<div class="price-mode-bar" id="calcPriceModeBar" style="margin-bottom:12px;padding:8px 14px">\';
  h += \'<div class="mode-group">\';
  h += \'<button class="mode-btn active" data-mode="exw" onclick="setCalcPriceMode(\\\'exw\\\')">EXW</button>\';
  h += \'<button class="mode-btn" data-mode="fob" onclick="setCalcPriceMode(\\\'fob\\\')">FOB</button>\';
  h += \'<button class="mode-btn" data-mode="cif" onclick="setCalcPriceMode(\\\'cif\\\')">CIF</button>\';
  h += \'</div>\';
  h += \'<div class="lcc-group" id="calcLccGroup" style="display:none">\';
  h += \'<span class="ext-label">Lo\\u1ea1i LCC:</span>\';
  h += \'<button class="lcc-btn active" data-lcc="no" onclick="setCalcLccType(\\\'no\\\')">No Lcc</button>\';
  h += \'<button class="lcc-btn" data-lcc="sub" onclick="setCalcLccType(\\\'sub\\\')">Sub Lcc</button>\';
  h += \'</div>\';
  h += \'<div id="calcFreightGroup" style="display:none">\';
  h += \'<span class="ext-label">\U0001f682 C\\u01b0\\u1edbc bi\\u1ec3n:</span>\';
  h += \'<input type="number" class="ext-input" id="calcFreightInput" value="0" min="0" step="100" oninput="setCalcFreight(this.value)" style="width:100px">\';
  h += \'<span class="ext-label">USD</span>\';
  h += \'</div>\';
  h += \'</div>\';
  h += \'<div class="calc-result" id="calcResult">\';
  h += \'<div class="calc-empty">\';
  h += \'<div class="calc-empty-icon">\U0001f4ca</div>\';
  h += \'<div class="calc-empty-text">Ch\\u1ecdn s\\u1ea3n ph\\u1ea9m v\\u00e0 bao b\\u00ec \\u0111\\u1ec3 b\\u1eaft \\u0111\\u1ea7u</div>\';
  h += \'</div>\';
  h += \'</div>\';
  h += \'</div>\';
"""

if old_right in data:
    data = data.replace(old_right, new_right)
    print('2) OK: Replaced calc right panel with mode bar')
else:
    print('2) FAIL: calc right panel pattern not found')
    # try finding approximate location
    idx = data.find('calc-right-icon')
    print(f'  "calc-right-icon" found at {idx}')
    print(data[idx:idx+380])

# === STEP 3: Add calc price mode helper functions BEFORE "function calcCommission" ===
old_func_start = 'function calcCommission()'
new_funcs = """// ====== CALC PRICE MODE HELPERS ======
function setCalcPriceMode(mode) {
  calcPriceMode = mode;
  var bar = document.getElementById("calcPriceModeBar");
  if (!bar) return;
  bar.querySelectorAll(".mode-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.mode === mode); });
  var lccGrp = document.getElementById("calcLccGroup");
  if (lccGrp) lccGrp.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  var fg = document.getElementById("calcFreightGroup");
  if (fg) fg.style.display = mode === "cif" ? "inline-flex" : "none";
  calcPrice();
}
function setCalcLccType(type) {
  calcLccType = type;
  var bar = document.getElementById("calcPriceModeBar");
  if (bar) bar.querySelectorAll(".lcc-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.lcc === type); });
  calcPrice();
}
function setCalcFreight(val) {
  calcFreightUSD = parseFloat(val) || 0;
  calcPrice();
}
function getCalcBagSpec() {
  var sel = document.getElementById("calcBagSpec");
  return sel ? sel.value : "25KG";
}
function getCalcMaxLoading(prod) {
  var bs = getCalcBagSpec();
  if (bs === "Jumbo") return getMaxLoading(prod.code, "maxJumbo");
  return getMaxLoading(prod.code, "max25");
}
""" + old_func_start

if old_func_start in data:
    data = data.replace(old_func_start, new_funcs)
    print('3) OK: Added calc mode helpers before calcCommission')
else:
    print('3) FAIL: calcCommission not found')

# === STEP 4: Rewrite calcCommission to use EXW/FOB/CIF base ===
old_commission = """function calcCommission() {
  var sp = document.getElementById("calcSellPrice"), cr = document.getElementById("calcCommissionResult");
  if (!sp || !cr || !sp.value) { if (cr) cr.innerHTML = ""; return; }
  var sellPrice = parseFloat(sp.value);
  if (isNaN(sellPrice) || sellPrice <= 0) { cr.innerHTML = ""; return; }
  var psel = document.getElementById("calcProduct");
  if (!psel || !psel.value) { cr.innerHTML = '<div style="color:var(--muted);font-size:12px">Chọn sản phẩm trước</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === psel.value) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { cr.innerHTML = ""; return; }
  var isUsd = currency === "USD", exwMin = isUsd ? prod.exw_usd : prod.exw_vnd, commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var bagPrice = 0, bcode = bsel ? bsel.value : "", isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo", bagTons = 1;"""

new_commission = """function calcCommission() {
  var sp = document.getElementById("calcSellPrice"), cr = document.getElementById("calcCommissionResult");
  if (!sp || !cr || !sp.value) { if (cr) cr.innerHTML = ""; return; }
  var sellPrice = parseFloat(sp.value);
  if (isNaN(sellPrice) || sellPrice <= 0) { cr.innerHTML = ""; return; }
  var psel = document.getElementById("calcProduct");
  if (!psel || !psel.value) { cr.innerHTML = '<div style="color:var(--muted);font-size:12px">Chọn sản phẩm trước</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === psel.value) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { cr.innerHTML = ""; return; }
  var isUsd = currency === "USD";
  // Use the appropriate base price depending on calcPriceMode
  var basePrice = 0, commBase = 0;
  if (calcPriceMode === "fob") {
    var bs = getCalcBagSpec();
    if (bs === "Jumbo") {
      basePrice = isUsd ? getFOBJumboPriceUSD(prod, calcLccType) : getFOBJumboPriceVND(prod, calcLccType);
    } else {
      basePrice = isUsd ? getFOB25PriceUSD(prod, calcLccType) : getFOB25PriceVND(prod, calcLccType);
    }
    commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  } else if (calcPriceMode === "cif") {
    var bs = getCalcBagSpec();
    if (bs === "Jumbo") {
      basePrice = isUsd ? getCIFJumboPriceUSD(prod, calcLccType, calcFreightUSD) : getCIFJumboPriceVND(prod, calcLccType, calcFreightUSD);
    } else {
      basePrice = isUsd ? getCIF25PriceUSD(prod, calcLccType, calcFreightUSD) : getCIF25PriceVND(prod, calcLccType, calcFreightUSD);
    }
    commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  } else {
    basePrice = isUsd ? prod.exw_usd : prod.exw_vnd;
    commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  }
  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var bagPrice = 0, bcode = bsel ? bsel.value : "", isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo", bagTons = 1;"""

if old_commission in data:
    data = data.replace(old_commission, new_commission)
    print('4) OK: Rewrote calcCommission')
else:
    print('4) FAIL: calcCommission pattern not found')
    idx = data.find('function calcCommission')
    print(f'  found at {idx}')
    print(data[idx:idx+500])

# === STEP 5: Rewrite calcPrice to support EXW/FOB/CIF ===
old_calcprice = """function calcPrice() {
  var res = document.getElementById("calcResult");
  if (!res) return;
  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var isUsd = currency === "USD", pcode = psel ? psel.value : "";
  if (!pcode) { res.innerHTML = '<div class="calc-empty">\U0001f448 Vui lòng chọn sản phẩm</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === pcode) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { res.innerHTML = '<div class="calc-empty">\u274c Không tìm thấy sản phẩm</div>'; return; }
  var exwMin = isUsd ? prod.exw_usd : prod.exw_vnd;
  var bagPrice = 0, bagTons = 1, bcode = bsel ? bsel.value : "";
  var isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo";
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var ocode = osel ? osel.value : "", otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  var bagCode = "";
  if (bcode) { for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons; }
  var otherPrice = 0, otherCode = "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; otherCode = DATA_OTHERS[i].code; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }
  var total = exwMin + bagPrice + otherPrice;"""

new_calcprice = """function calcPrice() {
  var res = document.getElementById("calcResult");
  if (!res) return;
  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var isUsd = currency === "USD", pcode = psel ? psel.value : "";
  if (!pcode) { res.innerHTML = '<div class="calc-empty">\U0001f448 Vui lòng chọn sản phẩm</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === pcode) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { res.innerHTML = '<div class="calc-empty">\u274c Không tìm thấy sản phẩm</div>'; return; }
  var bs = bagSpecSel ? bagSpecSel.value : "25KG";
  var isJumbo = bs === "Jumbo";
  // Determine base price: EXW or FOB or CIF
  var exwMin = 0;
  var commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var fobCostPerTon = 0;
  var maxLoad = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
  var isFobMode = calcPriceMode === "fob";
  var isCifMode = calcPriceMode === "cif";

  if (isFobMode) {
    if (isJumbo) exwMin = getFOBJumboPriceVND(prod, calcLccType);
    else exwMin = getFOB25PriceVND(prod, calcLccType);
    fobCostPerTon = getCostFobVND(maxLoad, calcLccType);
    if (isUsd) exwMin = Math.round(exwMin / EXCHANGE_RATE);
  } else if (isCifMode) {
    if (isJumbo) exwMin = getCIFJumboPriceVND(prod, calcLccType, calcFreightUSD);
    else exwMin = getCIF25PriceVND(prod, calcLccType, calcFreightUSD);
    fobCostPerTon = getCostFobVND(maxLoad, calcLccType);
    if (isUsd) exwMin = Math.round(exwMin / EXCHANGE_RATE);
  } else {
    exwMin = isUsd ? prod.exw_usd : prod.exw_vnd;
  }

  var bagPrice = 0, bagTons = 1, bcode = bsel ? bsel.value : "";
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var ocode = osel ? osel.value : "", otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  var bagCode = "";
  if (bcode) { for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons; }
  var otherPrice = 0, otherCode = "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; otherCode = DATA_OTHERS[i].code; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }
  var total = exwMin + bagPrice + otherPrice;"""

if old_calcprice in data:
    data = data.replace(old_calcprice, new_calcprice)
    print('5) OK: Rewrote calcPrice')
else:
    print('5) FAIL: calcPrice pattern not found')
    idx = data.find('function calcPrice')
    print(f'  found at {idx}')
    print(data[idx:idx+600])

# === STEP 6: Update the output section inside calcPrice to show mode info ===
old_result_section = """  h += '<div class="calc-result-item"><span class="calc-rl">\U0001f4b0 EXW t\u1ed1i thi\u1ec3u</span><span class="calc-rv exw">' + Math.round(exwMin).toLocaleString() + ' ' + cc + '</span></div>';
  var bd = ""; if (bcode) { bd = bagCode; if (isJumbo && bagTons > 0) bd += " / " + bagTons + " t\u1ea5n"; h += '<div class="calc-result-item"><span class="calc-rl">\U0001f6cd\ufe0f Bao b\u00ec (' + bd + ')</span><span class="calc-rv bag">' + Math.round(bagPrice).toLocaleString() + ' ' + cc + '</span></div>'; }
  if (ocode) { var od = otherCode; if (!isJumbo && otherTons > 0) od += " / " + otherTons + " t\u1ea5n"; h += '<div class="calc-result-item"><span class="calc-rl">\U0001f4e6 Quy c\u00e1ch kh\u00e1c (' + od + ')</span><span class="calc-rv other">' + Math.round(otherPrice).toLocaleString() + ' ' + cc + '</span></div>'; }
  h += '<div class="calc-result-total-row">';
  h += '<span class="calc-rl">\U0001f3f7\ufe0f T\u1ed5ng gi\u00e1 th\u00e0nh (EXW)</span>';
  h += '<span class="calc-rv total">' + (Math.round(total) || 0).toLocaleString() + ' ' + cc + '</span>';
  h += '</div>';"""

new_result_section = """  var modeLabel = calcPriceMode.toUpperCase();
  if (isFobMode) modeLabel += " (" + (calcLccType === "sub" ? "Sub LCC" : "No LCC") + ")";
  if (isCifMode) modeLabel += " (LCC:" + (calcLccType === "sub" ? "Sub" : "No") + " F:" + calcFreightUSD + "USD)";
  h += '<div class="calc-result-item"><span class="calc-rl">\U0001f4b0 ' + modeLabel + ' t\u1ed1i thi\u1ec3u</span><span class="calc-rv exw">' + Math.round(exwMin).toLocaleString() + ' ' + cc + '</span></div>';
  if (isFobMode && maxLoad) {
    h += '<div class="calc-result-item"><span class="calc-rl">\U0001f69b Ph\u00ed FOB / t\u1ea5n</span><span class="calc-rv other">' + Math.round(fobCostPerTon).toLocaleString() + ' VND</span></div>';
  }
  if (isCifMode) {
    if (fobCostPerTon > 0) {
      h += '<div class="calc-result-item"><span class="calc-rl">\U0001f69b Ph\u00ed FOB / t\u1ea5n</span><span class="calc-rv other">' + Math.round(fobCostPerTon).toLocaleString() + ' VND</span></div>';
    }
    if (maxLoad > 0) {
      var cifFreightPerTon = (calcFreightUSD + 10) * EXCHANGE_RATE / maxLoad;
      h += '<div class="calc-result-item"><span class="calc-rl">\U0001f6a2 Freight / t\u1ea5n</span><span class="calc-rv other">' + Math.round(cifFreightPerTon).toLocaleString() + ' VND</span></div>';
    }
  }
  var bd = ""; if (bcode) { bd = bagCode; if (isJumbo && bagTons > 0) bd += " / " + bagTons + " t\u1ea5n"; h += '<div class="calc-result-item"><span class="calc-rl">\U0001f6cd\ufe0f Bao b\u00ec (' + bd + ')</span><span class="calc-rv bag">' + Math.round(bagPrice).toLocaleString() + ' ' + cc + '</span></div>'; }
  if (ocode) { var od = otherCode; if (!isJumbo && otherTons > 0) od += " / " + otherTons + " t\u1ea5n"; h += '<div class="calc-result-item"><span class="calc-rl">\U0001f4e6 Quy c\u00e1ch kh\u00e1c (' + od + ')</span><span class="calc-rv other">' + Math.round(otherPrice).toLocaleString() + ' ' + cc + '</span></div>'; }
  h += '<div class="calc-result-total-row">';
  h += '<span class="calc-rl">\U0001f3f7\ufe0f T\u1ed5ng gi\u00e1 th\u00e0nh (' + modeLabel + ')</span>';
  h += '<span class="calc-rv total">' + (Math.round(total) || 0).toLocaleString() + ' ' + cc + '</span>';
  h += '</div>';"""

if old_result_section in data:
    data = data.replace(old_result_section, new_result_section)
    print('6) OK: Updated calcPrice result output')
else:
    print('6) FAIL: calcPrice result section not found')
    idx = data.find('EXW tối thiểu')
    print(f'  "EXW tối thiểu" found at {idx}')
    if idx >= 0:
        print(data[idx-20:idx+400])

with open(path, 'w', encoding='utf-8') as f:
    f.write(data)
print('Done!')

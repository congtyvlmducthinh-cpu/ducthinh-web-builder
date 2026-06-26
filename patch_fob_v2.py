import sys
sys.stdout.reconfigure(encoding='utf-8')

path = 'sites/kiem-tra-gia/index.html'
with open(path, 'r', encoding='utf-8') as f:
    data = f.read()

# ============================================================
# STEP 1: Add max loading dropdown in renderCalcTab (after product select)
# ============================================================
old_prod_section_end = """  h += '<div class="calc-row"><label>\U0001f516 S\u1ea3n ph\u1ea9m</label>';
  h += '<select id="calcProduct" onchange="onCalcProductChange()"><option value="">\u2014 Ch\u1ecdn s\u1ea3n ph\u1ea9m \u2014</option></select></div>';
  h += '</div>'; // end calc-section"""

new_prod_section_end = """  h += '<div class="calc-row"><label>\U0001f516 S\u1ea3n ph\u1ea9m</label>';
  h += '<select id="calcProduct" onchange="onCalcProductChange()"><option value="">\u2014 Ch\u1ecdn s\u1ea3n ph\u1ea9m \u2014</option></select></div>';
  // Max loading dropdown (shown only in FOB/CIF mode)
  h += '<div class="calc-row" id="calcMaxLoadRow" style="display:none">';
  h += '<label>\u2696\ufe0f Max loading</label>';
  h += '<select id="calcMaxLoad" onchange="calcPrice()"><option value="">\u2014 T\u1ef1 \u0111\u1ed9ng \u2014</option></select></div>';
  h += '</div>'; // end calc-section"""

if old_prod_section_end in data:
    data = data.replace(old_prod_section_end, new_prod_section_end)
    print('1) OK: Added max loading dropdown')
else:
    print('1) FAIL: product select not found')

# ============================================================
# STEP 2: Fix setCalcPriceMode to show/hide max load dropdown + populate
# ============================================================
old_setMode = """function setCalcPriceMode(mode) {
  calcPriceMode = mode;
  var bar = document.getElementById("calcPriceModeBar");
  if (!bar) return;
  bar.querySelectorAll(".mode-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.mode === mode); });
  var lccGrp = document.getElementById("calcLccGroup");
  if (lccGrp) lccGrp.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  var fg = document.getElementById("calcFreightGroup");
  if (fg) fg.style.display = mode === "cif" ? "inline-flex" : "none";
  calcPrice();
}"""

new_setMode = """function setCalcPriceMode(mode) {
  calcPriceMode = mode;
  var bar = document.getElementById("calcPriceModeBar");
  if (!bar) return;
  bar.querySelectorAll(".mode-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.mode === mode); });
  var lccGrp = document.getElementById("calcLccGroup");
  if (lccGrp) lccGrp.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  var fg = document.getElementById("calcFreightGroup");
  if (fg) fg.style.display = mode === "cif" ? "inline-flex" : "none";
  // Show/hide max loading dropdown
  var mlRow = document.getElementById("calcMaxLoadRow");
  if (mlRow) mlRow.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  if (mode === "fob" || mode === "cif") populateCalcMaxLoad();
  calcPrice();
}"""

if old_setMode in data:
    data = data.replace(old_setMode, new_setMode)
    print('2) OK: Updated setCalcPriceMode')
else:
    print('2) FAIL: setCalcPriceMode not found')

# ============================================================
# STEP 3: Add populateCalcMaxLoad + update onCalcProductChange
# ============================================================
old_onCalcChange = """function onCalcProductChange() { calcPrice(); }"""

new_onCalcChange = """function onCalcProductChange() { populateCalcMaxLoad(); calcPrice(); }
function populateCalcMaxLoad() {
  var psel = document.getElementById("calcProduct"), mlsel = document.getElementById("calcMaxLoad");
  if (!psel || !mlsel) return;
  var pcode = psel.value;
  mlsel.innerHTML = '<option value="">\u2014 T\u1ef1 \u0111\u1ed9ng (theo bao b\u00ec) \u2014</option>';
  if (!pcode || !DATA_MAX_LOADING[pcode]) return;
  var keys = Object.keys(DATA_MAX_LOADING[pcode]).sort();
  for (var i = 0; i < keys.length; i++) {
    var v = DATA_MAX_LOADING[pcode][keys[i]];
    if (v !== undefined && v !== null) {
      var label = keys[i] === "max25" ? "25KG" : keys[i] === "maxJumbo" ? "Jumbo" : keys[i];
      mlsel.innerHTML += '<option value="' + v + '">' + label + ' = ' + v + ' t\u1ea5n</option>';
    }
  }
}"""

if old_onCalcChange in data:
    data = data.replace(old_onCalcChange, new_onCalcChange)
    print('3) OK: Added populateCalcMaxLoad')
else:
    print('3) FAIL: onCalcProductChange not found')

# ============================================================
# STEP 4: Fix calcPrice() - FOB/CIF logic
# ============================================================
old_calcprice_inner = """  if (isFobMode) {
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

new_calcprice_inner = """  // Get selected max loading (or auto from bag spec)
  var mlsel = document.getElementById("calcMaxLoad");
  var selectedMaxLoad = mlsel && mlsel.value ? parseFloat(mlsel.value) : 0;
  if (!selectedMaxLoad) {
    selectedMaxLoad = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
  }
  maxLoad = selectedMaxLoad;

  // Use EXW base (not pkg), add bag + other + fob cost * 1.05 for FOB/CIF
  if (isFobMode || isCifMode) {
    exwMin = isUsd ? prod.exw_usd : prod.exw_vnd;
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
  // For FOB/CIF: (exw + bag + other + fobCost) * 1.05
  var total = 0;
  if (isFobMode || isCifMode) {
    total = (exwMin + bagPrice + otherPrice + fobCostPerTon) * 1.05;
    if (isCifMode && maxLoad > 0) {
      total += (calcFreightUSD + 10) * EXCHANGE_RATE / maxLoad;
    }
  } else {
    total = exwMin + bagPrice + otherPrice;
  }"""

if old_calcprice_inner in data:
    data = data.replace(old_calcprice_inner, new_calcprice_inner)
    print('4) OK: Fixed calcPrice FOB/CIF logic')
else:
    print('4) FAIL: calcPrice inner block not found')
    idx = data.find('if (isFobMode)')
    print(f'  "if (isFobMode)" found at {idx}')
    if idx >= 0:
        print(data[idx:idx+400])

# ============================================================
# STEP 5: Fix calcPrice output - show selected max loading
# ============================================================
old_output_line = """  if (isFobMode && maxLoad) {
    h += '<div class="calc-result-item"><span class="calc-rl">\U0001f69b Ph\u00ed FOB / t\u1ea5n</span><span class="calc-rv other">' + Math.round(fobCostPerTon).toLocaleString() + ' VND</span></div>';
  }"""

new_output_line = """  if ((isFobMode || isCifMode) && maxLoad) {
    h += '<div class="calc-result-item"><span class="calc-rl">\u2696\ufe0f Max loading</span><span class="calc-rv other">' + maxLoad + ' t\u1ea5n</span></div>';
    h += '<div class="calc-result-item"><span class="calc-rl">\U0001f69b Ph\u00ed FOB / t\u1ea5n</span><span class="calc-rv other">' + Math.round(fobCostPerTon).toLocaleString() + ' VND</span></div>';
  }"""

if old_output_line in data:
    data = data.replace(old_output_line, new_output_line)
    print('5) OK: Updated FOB output with max loading')
else:
    print('5) FAIL: FOB output not found')

# ============================================================
# STEP 6: Fix calcCommission() - use proper base for FOB/CIF
# ============================================================
old_commission_inner = """  var isUsd = currency === "USD";
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
  var bagPrice = 0, bcode = bsel ? bsel.value : "", isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo", bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  if (bcode) { for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons; }
  var otherPrice = 0, ocode = osel ? osel.value : "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }
  var totalCost = exwMin + bagPrice + otherPrice;
  var diff = Math.max(0, sellPrice - totalCost);
  var commissionVar = diff * 0.3;
  var totalComm = commBase + commissionVar;"""

new_commission_inner = """  var isUsd = currency === "USD";
  var commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var bagPrice = 0, bcode = bsel ? bsel.value : "", isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo", bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  if (bcode) { for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons; }
  var otherPrice = 0, ocode = osel ? osel.value : "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }
  var exwBase = isUsd ? prod.exw_usd : prod.exw_vnd;
  var totalCost = 0;
  if (calcPriceMode === "fob" || calcPriceMode === "cif") {
    // Compute FOB/CIF the same way as calcPrice
    var mlsel = document.getElementById("calcMaxLoad");
    var cml = mlsel && mlsel.value ? parseFloat(mlsel.value) : 0;
    if (!cml) cml = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
    var cfobCost = getCostFobVND(cml, calcLccType);
    totalCost = (exwBase + bagPrice + otherPrice + cfobCost) * 1.05;
    if (calcPriceMode === "cif" && cml > 0) {
      totalCost += (calcFreightUSD + 10) * EXCHANGE_RATE / cml;
    }
    // Hoa hong FOB/CIF: commBase + (gia ban - gia fob) / 1.05 * 30%
    var diff = Math.max(0, (sellPrice - totalCost) / 1.05);
    var commissionVar = diff * 0.3;
    var totalComm = commBase + commissionVar;
  } else {
    totalCost = exwBase + bagPrice + otherPrice;
    var diff = Math.max(0, sellPrice - totalCost);
    var commissionVar = diff * 0.3;
    var totalComm = commBase + commissionVar;
  }"""

if old_commission_inner in data:
    data = data.replace(old_commission_inner, new_commission_inner)
    print('6) OK: Fixed calcCommission for FOB/CIF')
else:
    print('6) FAIL: calcCommission inner block not found')
    idx = data.find('// Use the appropriate base price')
    print(f'  Found at {idx}')
    if idx >= 0:
        print(data[idx:idx+200])

# ============================================================
# WRITE
# ============================================================
with open(path, 'w', encoding='utf-8') as f:
    f.write(data)
print('DONE!')

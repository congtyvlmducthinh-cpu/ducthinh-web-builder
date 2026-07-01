// ====== RENDER CALC TAB ======
function renderCalcTab() {
  var h = '<div class="calc-grid">';

  // ===== LEFT PANEL =====
  h += '<div class="calc-left">';

  // --- Section: Sản phẩm ---
  h += '<div class="calc-section-title"><span class="badge blue">📦</span><span class="title-text">Chọn sản phẩm</span><button id="resetCalcBtn" onclick="resetCalcFilters()" title="Bỏ lọc" style="margin-left:auto;width:28px;height:28px;padding:0;border:1.5px solid var(--border);border-radius:6px;background:var(--card);color:var(--text-secondary);font-size:13px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s">↺</button></div>';

  // Machine + Standard side by side
  var machines = {};
  DATA_PRODUCTS.forEach(function(p) { machines[p.machine] = true; });
  var machineKeys = Object.keys(machines).sort();
  h += '<div class="calc-form-group"><div class="calc-row-inline">';
  h += '<div><label class="calc-form-label">🏭 Máy</label>';
  h += '<select class="calc-select" id="calcMachine" onchange="filterCalcProducts()"><option value="">— Chọn máy —</option>';
  for (var i = 0; i < machineKeys.length; i++) {
    h += '<option value="' + machineKeys[i].replace(/"/g, '&quot;') + '">' + machineKeys[i] + '</option>';
  }
  h += '</select></div>';
  h += '<div><label class="calc-form-label">📋 Tiêu chuẩn</label>';
  h += '<select class="calc-select" id="calcStandard" onchange="filterCalcProducts()"><option value="">— Chọn tiêu chuẩn —</option></select></div>';
  h += '</div></div>';

  h += '<div class="calc-form-group"><div class="calc-row-inline">' +
  '<div><label class="calc-form-label">📐 Kích thước</label>' +
  '<select class="calc-select" id="calcSize" onchange="filterCalcProducts()"><option value="">— Chọn kích thước —</option></select></div>' +
  '</div></div>' +
  '<div class="calc-form-group"><label class="calc-form-label">🔖 Sản phẩm</label>';
  h += '<select class="calc-select" id="calcProduct" onchange="onCalcProductChange()"><option value="">— Chọn sản phẩm —</option></select></div>';
  // Max loading dropdown (shown only in FOB/CIF mode)
  h += '<div class="calc-form-group" id="calcMaxLoadRow" style="display:none">';
  h += '<label class="calc-form-label">⚖️ Max loading</label>';
  h += '<select class="calc-select" id="calcMaxLoad" onchange="calcPrice()"><option value="">— Tự động —</option></select></div>';

  // --- Section: Bao bì ---
  h += '<div class="calc-section-title" style="margin-top:16px"><span class="badge green">🛍️</span><span class="title-text">Tùy chọn bao bì</span></div>';

  // Bag spec + Bag select side by side
  h += '<div class="calc-form-group"><div class="calc-row-inline">';
  h += '<div><label class="calc-form-label">📏 Quy cách bao</label>';
  h += '<select class="calc-select" id="calcBagSpec" onchange="filterBagSpec()"><option value="25KG">25KG</option><option value="34KG">34KG</option><option value="50KG">50KG</option><option value="Jumbo">Jumbo</option></select></div>';
  h += '<div><label class="calc-form-label">🛍️ Loại bao</label>';
  h += '<select class="calc-select" id="calcBag" onchange="calcPrice()"><option value="">— Không chọn —</option>';
  h += '</select></div>';
  h += '</div></div>';

  // Jumbo tonnage (hidden by default)
  h += '<div class="calc-form-group" id="calcTonnageRow" style="display:none">';
  h += '<label class="calc-form-label">⚖️ Số tấn / bao Jumbo</label>';
  h += '<select class="calc-select" id="calcTonnage" onchange="calcPrice()">';
  h += '<option value="">— Chọn số tấn —</option>';
  var jumboTons = ["0.5","0.7","1","1.1","1.2","1.25","1.3","1.35","1.375","1.38","1.4","1.5"];
  for (var i = 0; i < jumboTons.length; i++) {
    h += '<option value="' + jumboTons[i] + '">' + jumboTons[i] + ' tấn</option>';
  }
  h += '</select></div>';

  // --- Section: Quy cách khác ---
  h += '<div class="calc-section-title" style="margin-top:16px"><span class="badge purple">📦</span><span class="title-text">Quy cách khác</span></div>';

  h += '<div class="calc-form-group"><div class="calc-row-inline">';
  h += '<div><label class="calc-form-label">📋 Loại quy cách</label>';
  h += '<select class="calc-select" id="calcOther" onchange="calcPrice()"><option value="">— Không chọn —</option>';
  for (var i = 0; i < DATA_OTHERS.length; i++) {
    h += '<option value="' + DATA_OTHERS[i].code + '">' + DATA_OTHERS[i].code + '</option>';
  }
  h += '</select></div>';
  h += '<div id="calcOtherTonnageRow"><label class="calc-form-label">⚖️ Số tấn</label>';
  h += '<select class="calc-select" id="calcOtherTonnage" onchange="calcPrice()">';
  h += '<option value="">— Chọn số tấn —</option>';
  var otherTons = ["0.5","0.7","1","1.1","1.2","1.25","1.3","1.35","1.375","1.38","1.4","1.5","1.53","1.6"];
  for (var i = 0; i < otherTons.length; i++) {
    h += '<option value="' + otherTons[i] + '">' + otherTons[i] + ' tấn</option>';
  }
  h += '</select></div>';
  h += '</div></div>';

  h += '</div>'; // end calc-left

  // ===== RIGHT PANEL =====
  h += '<div class="calc-right">';
  h += '<div class="calc-right-header">';
  h += '<span class="icon">💰</span>';
  h += '<span>Kết quả tính giá</span>';
  h += '</div>';
  // Price mode bar for calc tab
  h += '<div class="price-mode-bar" id="calcPriceModeBar" style="margin-bottom:12px;padding:8px 14px">';
  h += '<div class="mode-group">';
  h += '<button class="mode-btn active" data-mode="exw" onclick="setCalcPriceMode(\'exw\')">EXW</button>';
  h += '<button class="mode-btn" data-mode="fob" onclick="setCalcPriceMode(\'fob\')">FOB</button>';
  h += '<button class="mode-btn" data-mode="cif" onclick="setCalcPriceMode(\'cif\')">CIF</button>';
  h += '</div>';
  h += '<div class="lcc-group" id="calcLccGroup" style="display:none">';
  h += '<span class="ext-label">Loại LCC:</span>';
  h += '<button class="lcc-btn active" data-lcc="no" onclick="setCalcLccType(\'no\')">No Lcc</button>';
  h += '<button class="lcc-btn" data-lcc="sub" onclick="setCalcLccType(\'sub\')">Sub Lcc</button>';
  h += '</div>';
  h += '<div id="calcFreightGroup" style="display:none">';
  h += '<span class="ext-label">🚂 Cước biển:</span>';
  h += '<input type="number" class="ext-input" id="calcFreightInput" value="0" min="0" step="100" oninput="setCalcFreight(this.value)" style="width:100px">';
  h += '<span class="ext-label">USD</span>;';
  h += '<button class="ext-label" onclick="showFreightPopup()" style="background:var(--primary);color:white;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:12px;font-weight:600">📡 Tra cước</button>';
  h += '</div>';
  h += '</div>';
      // Currency toggle for calc tab 
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:4px 0">';
  h += '<span style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.03em">💱 Loại tiền:</span>';
  h += '<div class="calc-currency-bar">';
  h += '<button class="mode-btn active" id="calcCcyVnd" onclick="setCalcCurrency(\'VND\')">VND</button>';
  h += '<button class="mode-btn" id="calcCcyUsd" onclick="setCalcCurrency(\'USD\')">USD</button>';
  h += '</div>';
  h += '</div>';
  // Market selector for calc tab
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:4px 0;flex-wrap:wrap">';
  h += '<span style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.03em">🌐 Thị trường:</span>';
  h += '<div class="market-group">';
  h += '<button class="btn-sm" id="calcMarketCn" onclick="setCalcMarket(&apos;cn&apos;)" style="padding:4px 14px;font-size:12px;font-weight:600">🇨🇳 TQ</button>';
  h += '<button class="btn-sm active" id="calcMarketOther" onclick="setCalcMarket(&apos;other&apos;)" style="padding:4px 14px;font-size:12px;font-weight:600">🌏 Khác</button>';
  h += '</div>';
  h += '</div>';
h += '<div class="calc-result" id="calcResult">';
  h += '<div class="calc-empty">';
  h += '<div class="calc-empty-icon">📊</div>';
  h += '<div class="calc-empty-text">Chọn sản phẩm và bao bì để bắt đầu</div>';
  h += '</div>';
  h += '</div>';
  h += '</div>';

  h += '</div>'; // end calc-grid
  return h;
}// ====== CALC FILTER HELPERS ======
function filterCalcProducts() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), sze = document.getElementById("calcSize"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value, sz = sze ? sze.value : "";
  // Collect standards by machine, and machines by standard
  var machinesByStd = {}, standardsByMach = {}, sizesByMachStd = {};
  DATA_PRODUCTS.forEach(function(p) {
    var machOk = !m || String(p.machine) === m;
    var stdOk = !s || p.standard === s;
    if (machOk) standardsByMach[p.standard] = true;
    if (stdOk) machinesByStd[p.machine] = true;
    if (machOk && stdOk) sizesByMachStd[p.size] = true;
  });
  // Populate machines (if standard is selected, filter)
  var prevMach = me.value;
  me.innerHTML = '<option value="">— Chọn máy —</option>';
  var mk = Object.keys(machinesByStd).sort();
  for (var i = 0; i < mk.length; i++) me.innerHTML += '<option value="' + mk[i].replace(/"/g, '&quot;') + '">' + mk[i] + '</option>';
  me.value = prevMach && mk.indexOf(prevMach) >= 0 ? prevMach : "";
  // Populate standards (if machine is selected, filter)
  var prevStd = se.value;
  se.innerHTML = '<option value="">— Chọn tiêu chuẩn —</option>';
  var sk = Object.keys(standardsByMach).sort();
  for (var i = 0; i < sk.length; i++) se.innerHTML += '<option value="' + sk[i].replace(/"/g, '&quot;') + '">' + sk[i] + '</option>';
  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : "";
  // Populate sizes (if machine/standard is selected)
  var prevSz = sze ? sze.value : "";
  if (sze) {
    sze.innerHTML = '<option value="">— Chọn kích thước —</option>';
    var szk = Object.keys(sizesByMachStd).sort();
    for (var i = 0; i < szk.length; i++) sze.innerHTML += '<option value="' + szk[i].replace(/"/g, '&quot;') + '">' + szk[i] + '</option>';
    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : "";
  }
  filterCalcProducts_products();
}function filterCalcProducts_products() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), sze = document.getElementById("calcSize"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value, sz = sze ? sze.value : "";
  var prevProd = pe.value;
  pe.innerHTML = '<option value="">— Chọn sản phẩm —</option>';
  DATA_PRODUCTS.forEach(function(p) { if ((!m || String(p.machine) === m) && (!s || p.standard === s) && (!sz || p.size === sz)) pe.innerHTML += '<option value="' + p.code + '||' + p.standard + '">' + p.code + ' — ' + p.size + '</option>'; });
  pe.value = prevProd;
}function onCalcProductChange() { populateCalcMaxLoad(); calcPrice(); }
function populateCalcMaxLoad() {
  var psel = document.getElementById("calcProduct"), mlsel = document.getElementById("calcMaxLoad");
  if (!psel || !mlsel) return;
  var pcode = psel ? psel.value.split('||')[0] : ''; if (!pcode) return;
  // Collect all unique max loading values from DATA_MAX_LOADING
  var allVals = {};
  for (var k in DATA_MAX_LOADING) {
    var obj = DATA_MAX_LOADING[k];
    for (var spec in obj) {
      var v = obj[spec];
      if (v !== undefined && v !== null) {
        if (!allVals[v]) allVals[v] = {};
        allVals[v][spec] = true;
      }
    }
  }
  // Sort numeric ascending
  var sorted = Object.keys(allVals).map(Number).sort(function(a,b){return a-b;});
  for (var i = 0; i < sorted.length; i++) {
    mlsel.innerHTML += '<option value="' + sorted[i] + '">' + sorted[i] + ' tấn</option>';
  }
}
// ====== FILTER HELPERS ======
function filterBagSpec() {
  var bagSpec = document.getElementById("calcBagSpec").value;
  var bsel = document.getElementById("calcBag");
  if (bsel) {
    var curVal = bsel.value;
    bsel.innerHTML = '<option value="">— Không chọn bao bì —</option>';
    for (var i = 0; i < DATA_BAGS.length; i++) {
      if (DATA_BAGS[i].spec === bagSpec) {
        bsel.innerHTML += '<option value="' + DATA_BAGS[i].code + '">' + DATA_BAGS[i].code + '</option>';
      }
    }
    bsel.value = curVal;
  }
  var tnRow = document.getElementById("calcTonnageRow");
  var otnRow = document.getElementById("calcOtherTonnageRow");
  if (tnRow) tnRow.style.display = (bagSpec === "Jumbo") ? "flex" : "none";
  if (otnRow) otnRow.style.display = (bagSpec === "Jumbo") ? "none" : "flex";
  calcPrice();
}
// ====== CALC FUNCTIONS ======
// ====== CALC PRICE MODE HELPERS ======
function setCalcCurrency(ccy) {
  currency = ccy;
  var vndBtn = document.getElementById("calcCcyVnd");
  var usdBtn = document.getElementById("calcCcyUsd");
  if (vndBtn) vndBtn.classList.toggle("active", ccy === "VND");
  if (usdBtn) usdBtn.classList.toggle("active", ccy === "USD");
  calcPrice();
}
function setCalcPriceMode(mode) {
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
function calcCommission() {
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
  var commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var bs = bagSpecSel ? bagSpecSel.value : "25KG";
  var isJumbo = bs === "Jumbo";
  // 
  var bagPrice = 0, bcode = bsel ? bsel.value : "", bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  var exwBase = 0;
  if (bcode) {
    // User selected a specific bag -> EXW + bagPrice
    exwBase = isUsd ? prod.exw_usd : prod.exw_vnd;
    var bsSpec = document.getElementById("calcBagSpec"); var curBagSpec = bsSpec ? bsSpec.value : ""; for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode && DATA_BAGS[i].spec === curBagSpec) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;
  } else {
    // No bag selected -> use pkg price (includes bag)
    exwBase = isUsd ? (isJumbo ? prod.jumbo_usd : prod.pkg25_usd) : (isJumbo ? prod.jumbo_vnd : prod.pkg25_vnd);
    bagPrice = 0;
  }
  var otherPrice = 0, ocode = osel ? osel.value : "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }
  var totalCost = 0;
  if (calcPriceMode === "fob" || calcPriceMode === "cif") {
    // Compute FOB/CIF the same way as calcPrice
    var mlsel = document.getElementById("calcMaxLoad");
    var cml = mlsel && mlsel.value ? parseFloat(mlsel.value) : 0;
    if (!cml) cml = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
    var cfobCost = getCostFobVND(cml, calcLccType);
    // Convert to USD if needed
    if (isUsd) {
      bagPrice = Math.round(bagPrice / EXCHANGE_RATE);
      otherPrice = Math.round(otherPrice / EXCHANGE_RATE);
      cfobCost = Math.round(cfobCost / EXCHANGE_RATE);
    }
    totalCost = (exwBase + bagPrice + otherPrice + cfobCost) * 1.05;
    if (calcPriceMode === "cif" && cml > 0) {
      totalCost += isUsd ? (calcFreightUSD + 10) / cml : (calcFreightUSD + 10) * EXCHANGE_RATE / cml;
    }
    // Hoa hong FOB/CIF: commBase + (gia ban - gia fob) / 1.05 * 30%
    var diff = Math.max(0, (sellPrice - totalCost) / 1.05);
    var commissionVar = diff * 0.3;
    var effCommBase = sellPrice < totalCost ? 0 : commBase;
    var totalComm = effCommBase + commissionVar;
  } else {
    if (isUsd) {
      bagPrice = Math.round(bagPrice / EXCHANGE_RATE);
      otherPrice = Math.round(otherPrice / EXCHANGE_RATE);
    }
    totalCost = exwBase + bagPrice + otherPrice;
    var diff = Math.max(0, sellPrice - totalCost);
    var commissionVar = diff * 0.3;
    var effCommBase = sellPrice < totalCost ? 0 : commBase;
    var totalComm = effCommBase + commissionVar;
  }
  var h = '<div class="calc-comm-row"><span>Hoa hồng cơ bản</span><strong>' + fmtNum(effCommBase, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row"><span>Chênh lệch (30%)</span><strong>' + fmtNum(commissionVar, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row"><span>Tổng giá vốn</span><strong>' + fmtNum(totalCost, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row calc-total" style="padding:10px 0;border-top:2px solid var(--primary);margin-top:6px"><span>Tổng hoa hồng</span><strong style="color:var(--primary);font-size:16px">' + fmtNum(totalComm, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  cr.innerHTML = h;
}
function calcPrice() {
  var res = document.getElementById("calcResult");
  if (!res) return;
  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var isUsd = currency === "USD", pcode = psel ? psel.value : "";
  if (!pcode) { res.innerHTML = '<div class="calc-empty">👈 Vui lòng chọn sản phẩm</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { var _cp = pcode.split('||'), _cpC = _cp[0], _cpS = _cp[1] || ''; if (DATA_PRODUCTS[i].code === _cpC && DATA_PRODUCTS[i].standard === _cpS) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { res.innerHTML = '<div class="calc-empty">❌ Không tìm thấy sản phẩm</div>'; return; }
  var bs = bagSpecSel ? bagSpecSel.value : "25KG";
  var isJumbo = bs === "Jumbo";
  // Jumbo validation: must select tonnage
  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {
    res.innerHTML = '<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>';
    return;
  }
  // Determine base price: EXW or FOB or CIF
  var exwMin = 0;
  var commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var fobCostPerTon = 0;
  var maxLoad = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
  var isFobMode = calcPriceMode === "fob";
  var isCifMode = calcPriceMode === "cif";

  // Get selected max loading (or auto from bag spec)
  var mlsel = document.getElementById("calcMaxLoad");
  var selectedMaxLoad = mlsel && mlsel.value ? parseFloat(mlsel.value) : 0;
  if (!selectedMaxLoad) {
    selectedMaxLoad = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
  }
  maxLoad = selectedMaxLoad;

  // Determine base price: EXW or pkg (when no bag selected)
  var bcode = bsel ? bsel.value : "";
  var isDefaultBag = !bcode;
  var bagPrice = 0, bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var ocode = osel ? osel.value : "", otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  var bagCode = "";
  var hasBag = false;

  if (bcode) {
    // User selected a specific bag -> use EXW + bagPrice + otherPrice
    hasBag = true;
    exwMin = isUsd ? prod.exw_usd : prod.exw_vnd;
    var curBagSpec = bs; for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode && DATA_BAGS[i].spec === curBagSpec) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;
  } else {
    // No bag selected -> use pkg price (already includes bag)
    exwMin = isUsd ? (isJumbo ? prod.jumbo_usd : prod.pkg25_usd) : (isJumbo ? prod.jumbo_vnd : prod.pkg25_vnd);
    bagPrice = 0;
    bagCode = "Tiêu chuẩn " + bs;
  }
  var otherPrice = 0, otherCode = "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; otherCode = DATA_OTHERS[i].code; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }

  // FOB/CIF mode needs fobCost
  if (isFobMode || isCifMode) {
    fobCostPerTon = getCostFobVND(maxLoad, calcLccType);
  }
  // Convert to USD if needed
  if (isUsd) {
    otherPrice = Math.round(otherPrice / EXCHANGE_RATE);
    bagPrice = Math.round(bagPrice / EXCHANGE_RATE);
    fobCostPerTon = Math.round(fobCostPerTon / EXCHANGE_RATE);
  }
var total = 0;
  if (isFobMode || isCifMode) {
    total = (exwMin + bagPrice + otherPrice + fobCostPerTon) * 1.05;
    if (isCifMode && maxLoad > 0) {
      total += isUsd ? (calcFreightUSD + 10) / maxLoad : (calcFreightUSD + 10) * EXCHANGE_RATE / maxLoad;
    }
  } else {
    total = exwMin + bagPrice + otherPrice;
  }
  var cc = isUsd ? "USD" : "VND";
    var h = '<div class="calc-result-summary">';
  h += '<div class="calc-result-item"><span class="calc-rl">📦 Sản phẩm</span><span class="calc-rv">' + prod.code + '</span></div>';
  h += '<div class="calc-result-item"><span class="calc-rl">⚙️ Máy / Tiêu chuẩn</span><span class="calc-rv">' + prod.machine + ' · ' + prod.standard + '</span></div>';
  h += '<div class="calc-result-item"><span class="calc-rl">📐 Kích thước</span><span class="calc-rv">' + prod.size + '</span></div>';
  var modeLabel = calcPriceMode.toUpperCase();
  if (isFobMode) modeLabel += " (" + (calcLccType === "sub" ? "Sub LCC" : "No LCC") + ")";
  if (isCifMode) modeLabel += " (LCC:" + (calcLccType === "sub" ? "Sub" : "No") + " F:" + calcFreightUSD + "USD)";
  h += '<div class="calc-result-item"><span class="calc-rl">💰 ' + 'EXW' + (hasBag ? ' chưa bao bì' : ' có bao bì') + '</span><span class="calc-rv exw">' + fmtNum(exwMin, isUsd) + ' ' + cc + '</span></div>';
  if (isFobMode && maxLoad) {
    h += '<div class="calc-result-item"><span class="calc-rl">⚖️ Max loading</span><span class="calc-rv other">' + maxLoad + ' tấn</span></div>';
    h += '<div class="calc-result-item"><span class="calc-rl">🚛 Phí FOB / tấn</span><span class="calc-rv other">' + fmtNum(fobCostPerTon, isUsd) + ' ' + cc + '</span></div>';
  }
  if (isCifMode) {
    if (maxLoad > 0) {
      h += '<div class="calc-result-item"><span class="calc-rl">⚖️ Max loading</span><span class="calc-rv other">' + maxLoad + ' tấn</span></div>';
      h += '<div class="calc-result-item"><span class="calc-rl">🚛 Phí FOB / tấn</span><span class="calc-rv other">' + fmtNum(fobCostPerTon, isUsd) + ' ' + cc + '</span></div>';
      var cifFreightPerTon = isUsd ? (calcFreightUSD + 10) / maxLoad : (calcFreightUSD + 10) * EXCHANGE_RATE / maxLoad;
      h += '<div class="calc-result-item"><span class="calc-rl">🚢 Freight / tấn</span><span class="calc-rv other">' + fmtNum(cifFreightPerTon, isUsd) + ' ' + cc + '</span></div>';
    }
  }
  var bd = ""; if (bcode || isDefaultBag) { if (hasBag) { bd = bagCode; } else { bd = bagCode; } if (isJumbo && bagTons > 0) bd += " / " + bagTons + " tấn"; h += '<div class="calc-result-item"><span class="calc-rl">🛍️ Bao bì (' + bd + ')</span><span class="calc-rv bag">' + fmtNum(bagPrice, isUsd) + ' ' + cc + '</span></div>'; if (!hasBag) h += '<div class="calc-result-item"><span style="font-size:11px;color:#f59e0b;font-style:italic">⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!</span></div>'; }
  if (ocode) { var od = otherCode; if (!isJumbo && otherTons > 0) od += " / " + otherTons + " tấn"; h += '<div class="calc-result-item"><span class="calc-rl">📦 Quy cách khác (' + od + ')</span><span class="calc-rv other">' + fmtNum(otherPrice, isUsd) + ' ' + cc + '</span></div>'; }
  h += '<div class="calc-result-total-row">';
  h += '<span class="calc-rl">🏷️ Tổng giá thành (' + modeLabel + ')</span>';
  h += '<span class="calc-rv total">' + fmtNum(total, isUsd) + ' ' + cc + '</span>';
  h += '</div>';
  h += '</div>';
  h += '<div class="calc-commission-wrap">';
  h += '<div class="calc-sell-input"><span>💰 Giá bán</span><input type="number" id="calcSellPrice" placeholder="Nhập giá bán..." oninput="calcCommission()"></div>';
  h += '<div class="calc-comm-result" id="calcCommissionResult"></div>';
  h += '<div style="margin-top:12px;text-align:center"><button onclick="showQuotationPopup()" style="background:var(--primary);color:white;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;box-shadow:0 4px 12px rgba(37,99,235,0.3)">📄 Lên báo giá</button></div>';
  h += '</div>';
  res.innerHTML = h;
}




// ====== RESET CALC FILTERS ======
function resetCalcFilters() {
  var me = document.getElementById("calcMachine");
  if (me) me.value = "";
  var se = document.getElementById("calcStandard");
  if (se) se.value = "";
  var sze = document.getElementById("calcSize");
  if (sze) sze.value = "";
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

// ====== CALC MARKET SELECTOR ======
function setCalcMarket(mkt) {
  currentMarket = mkt;
  var cnBtn = document.getElementById("calcMarketCn");
  var otherBtn = document.getElementById("calcMarketOther");
  if (cnBtn && otherBtn) {
    cnBtn.classList.toggle("active", mkt === "cn");
    otherBtn.classList.toggle("active", mkt === "other");
  }
  applyMarket();
  calcPrice();
}

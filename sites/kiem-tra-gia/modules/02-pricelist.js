// ====== PRICE MODE CONTROLS (Giá bán tab) ======
function setPriceMode(mode) {
  priceMode = mode;
  var bar = document.getElementById("priceModeBar");
  if (!bar) return;
  bar.querySelectorAll(".mode-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.mode === mode); });
  var lccGrp = document.getElementById("lccGroup");
  if (lccGrp) lccGrp.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  var fg = document.getElementById("freightGroup");
  if (fg) fg.style.display = mode === "cif" ? "inline-flex" : "none";
  render();
}
function setLccType(type) {
  lccType = type;
  var bar = document.getElementById("priceModeBar");
  if (bar) bar.querySelectorAll(".lcc-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.lcc === type); });
  render();
}
function setFreight(val) {
  freightUSD = parseFloat(val) || 0;
  var fi = document.getElementById("freightInput");
  if (fi) fi.value = val;
  render();
}
function onFreightChange() {
  var fi = document.getElementById("freightInput");
  if (fi) setFreight(fi.value);
}

// ====== RENDER PRICE TAB ======
function renderPriceTab() {
  var search = (document.getElementById("searchInput") && document.getElementById("searchInput").value || "").toLowerCase();
  var specFilter = document.getElementById("specFilter") && document.getElementById("specFilter").value || "";
  var machineFilter = document.getElementById("machineFilter") && document.getElementById("machineFilter").value || "";
  var sizeFilter = document.getElementById("sizeFilter") && document.getElementById("sizeFilter").value || "";
  var isUsd = currency === "USD";
  var filtered = DATA_PRODUCTS.filter(function(p) {
    if (search && (!p.code || p.code.toLowerCase().indexOf(search) < 0) && (!p.size || p.size.toLowerCase().indexOf(search) < 0) && (!p.machine || p.machine.toLowerCase().indexOf(search) < 0) && (!p.standard || p.standard.toLowerCase().indexOf(search) < 0)) return false;
    if (specFilter && p.standard !== specFilter) return false;
    if (machineFilter && String(p.machine) !== machineFilter) return false;
    if (sizeFilter && p.size !== sizeFilter) return false;
    return true;
  });
  var isFob = priceMode === "fob";
  var isCif = priceMode === "cif";
  var showFobCif = isFob || isCif;

  var h = "";

  // Freight warning
  if (isCif && (!freightUSD || freightUSD <= 0)) {
    h += '<div class="freight-warning">⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.</div>';
  }

  // Summary + thống kê
  var uniqueCodes = {}, uniqueSpecs = {}, uniqueMachines = {};
  filtered.forEach(function(p) { uniqueCodes[p.code] = true; uniqueSpecs[p.standard] = true; uniqueMachines[p.machine] = true; });
  var sum25=0, cnt25=0, max25=0;
  var sumJ=0, cntJ=0, maxJ=0;
  var sumExw=0, cntExw=0, maxExw=0;
  filtered.forEach(function(p) {
    var v25 = isFob ? getFOB25PriceVND(p, lccType) : (isCif ? getCIF25PriceVND(p, lccType, freightUSD) : p.pkg25_vnd);
    if (v25 && v25 > 0) { sum25 += v25; cnt25++; if (v25 > max25) max25 = v25; }
    var vJ = isFob ? getFOBJumboPriceVND(p, lccType) : (isCif ? getCIFJumboPriceVND(p, lccType, freightUSD) : p.jumbo_vnd);
    if (vJ && vJ > 0) { sumJ += vJ; cntJ++; if (vJ > maxJ) maxJ = vJ; }
    if (p.exw_vnd && p.exw_vnd > 0) { sumExw += p.exw_vnd; cntExw++; if (p.exw_vnd > maxExw) maxExw = p.exw_vnd; }
  });
  var fmt = function(v) { return (v || 0).toLocaleString('vi-VN'); };
  h += '<div class="summary-bar">';
  h += '<div class="summary-card"><div class="lbl">Sản phẩm</div><div class="val">' + filtered.length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Tiêu chuẩn</div><div class="val">' + Object.keys(uniqueSpecs).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Máy</div><div class="val">' + Object.keys(uniqueMachines).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Ngày</div><div class="val" style="font-size:16px">25/06/2026</div></div>';
  h += '</div>';
  h += '<button class="btn-sm" id="mlToggleBtn" onclick="toggleMaxLoad()" style="margin:0 0 0 auto;font-size:12px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">📋 Hiện max tải</button>\n<div class="market-group">\n<span class="ext-label">{{MARKET_LABEL}}</span>\n<button class="btn-sm' + (currentMarket === 'cn' ? ' active' : '') + '" id="marketCn" onclick="setMarket(\'cn\')">{{MARKET_CN}}</button>\n<button class="btn-sm' + (currentMarket === 'other' ? ' active' : '') + '" id="marketOther" onclick="setMarket(\'other\')">{{MARKET_OTHER}}</button>\n</div>'
  h += '<div class="summary-bar" style="margin-top:4px;gap:6px">';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f0f9ff;border-color:#bae6fd"><div class="lbl" style="font-size:10px">TB 25KG</div><div class="val" style="font-size:15px">' + fmt(cnt25?Math.round(sum25/cnt25):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fef2f2;border-color:#fecaca"><div class="lbl" style="font-size:10px">C.nhất 25KG</div><div class="val" style="font-size:15px">' + fmt(max25) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f0fdf4;border-color:#bbf7d0"><div class="lbl" style="font-size:10px">TB Jumbo</div><div class="val" style="font-size:15px">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fefce8;border-color:#fde68a"><div class="lbl" style="font-size:10px">C.nhất Jumbo</div><div class="val" style="font-size:15px">' + fmt(maxJ) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f5f3ff;border-color:#ddd6fe"><div class="lbl" style="font-size:10px">TB EXW</div><div class="val" style="font-size:15px">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fff1f2;border-color:#fecdd3"><div class="lbl" style="font-size:10px">C.nhất EXW</div><div class="val" style="font-size:15px">' + fmt(maxExw) + '</div></div>';
  h += '</div>';

  // Table
  h += '<div class="table-wrap pricelist"><table><thead>';
  h += '<tr><th colspan="4">Thông tin</th><th colspan="2" class="ml-toggle">Max tải</th><th colspan="2">' + (priceMode==="exw"?"Giá bán (EXW)":"Giá bao gồm bao bì") + '</th>';
  if (!showFobCif) h += '<th colspan="2">' + (priceMode==="exw"?"EXW chưa bao bì":"Giá bán (EXW)") + '</th>';
  h += '</tr>';
  h += '<tr><th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th><th class="ml-toggle">Max 25KG <span class="info-row">(tấn)</span></th><th class="ml-toggle">Max Jumbo <span class="info-row">(tấn)</span></th><th>' + (priceMode==="exw"?"EXW 25KG bao tiêu chuẩn":"25KG") + ' <span class="info-row">(VND)</span></th><th>' + (priceMode==="exw"?"EXW jumbo bao tiêu chuẩn":"Jumbo") + ' <span class="info-row">(VND)</span></th>';
  if (!showFobCif) {
    h += '<th>' + (priceMode==="exw"?"EXW chưa bao bì":"EXW") + ' <span class="info-row">' + (isUsd ? '(USD)' : '(VND)') + '</span></th><th>' + (priceMode==="exw"?"Hoa hồng cơ bản":"Hoa hồng") + ' <span class="info-row">' + (isUsd ? '(USD)' : '(VND)') + '</span></th>';
  }
  h += '</tr></thead><tbody>';

  for (var i = 0; i < filtered.length; i++) {
    var p = filtered[i];
    h += '<tr>';
    h += '<td><strong>' + p.code + '</strong></td>';
    h += '<td>' + p.size + '</td>';
    h += '<td><span class="badge-spec badge-' + p.standard.replace(/-/g, '').replace(/\+/g, '') + '">' + p.standard + '</span></td>';
    h += '<td>' + p.machine + '</td>';
    h += '<td class="text-right ml-toggle">' + formatMaxLoading(getMaxLoading(p.code, "max25")) + '</td>';
    h += '<td class="text-right ml-toggle">' + formatMaxLoading(getMaxLoading(p.code, "maxJumbo")) + '</td>';

    if (isFob) {
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getFOB25PriceUSD(p, lccType), true) : formatCurrency(getFOB25PriceVND(p, lccType), false)) + '</td>';
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getFOBJumboPriceUSD(p, lccType), true) : formatCurrency(getFOBJumboPriceVND(p, lccType), false)) + '</td>';
    } else if (isCif) {
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getCIF25PriceUSD(p, lccType, freightUSD), true) : formatCurrency(getCIF25PriceVND(p, lccType, freightUSD), false)) + '</td>';
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getCIFJumboPriceUSD(p, lccType, freightUSD), true) : formatCurrency(getCIFJumboPriceVND(p, lccType, freightUSD), false)) + '</td>';
    } else {
      h += '<td class="text-right">' + (p.pkg25_vnd ? (isUsd ? formatCurrency(p.pkg25_usd, true) : formatCurrency(p.pkg25_vnd, false)) : '—') + '</td>';
      h += '<td class="text-right">' + (p.jumbo_vnd ? (isUsd ? formatCurrency(p.jumbo_usd, true) : formatCurrency(p.jumbo_vnd, false)) : '—') + '</td>';
    }
    if (!showFobCif) {
      h += '<td class="text-right"><strong>' + formatCurrency(isUsd ? p.exw_usd : p.exw_vnd, isUsd) + '</strong></td>';
      h += '<td class="text-right"><span class="tag-profit">' + formatCurrency(isUsd ? p.comm_usd : p.comm_vnd, isUsd) + '</span></td>';
    }
    h += '</tr>';
  }
  h += '</tbody></table></div>';

  return h;
}

// ====== FILTER POPULATOR ======
function populateFilters() {
  // Read current values from all filters
  var search = (document.getElementById("searchInput") && document.getElementById("searchInput").value || "").toLowerCase();
  var curSpec = document.getElementById("specFilter") ? document.getElementById("specFilter").value : "";
  var curMachine = document.getElementById("machineFilter") ? document.getElementById("machineFilter").value : "";
  var curSize = document.getElementById("sizeFilter") ? document.getElementById("sizeFilter").value : "";

  // Helper: check if a product matches search
  function matchesSearch(p) {
    if (!search) return true;
    return (p.code && p.code.toLowerCase().indexOf(search) >= 0) ||
           (p.size && p.size.toLowerCase().indexOf(search) >= 0) ||
           (p.machine && p.machine.toLowerCase().indexOf(search) >= 0) ||
           (p.standard && p.standard.toLowerCase().indexOf(search) >= 0);
  }

  // === specFilter: show standards available given search + machine + size ===
  var sf = document.getElementById("specFilter");
  if (sf) {
    var standards = {};
    DATA_PRODUCTS.forEach(function(p) {
      if (!matchesSearch(p)) return;
      if (curMachine && String(p.machine) !== curMachine) return;
      if (curSize && p.size !== curSize) return;
      standards[p.standard] = true;
    });
    var sk = Object.keys(standards).sort();
    sf.innerHTML = '<option value="">Tất cả tiêu chuẩn</option>';
    for (var i = 0; i < sk.length; i++) sf.innerHTML += '<option value="' + sk[i].replace(/"/g, '&quot;') + '">' + sk[i] + '</option>';
    sf.value = curSpec && sk.indexOf(curSpec) >= 0 ? curSpec : "";
  }

  // === machineFilter: show machines available given search + spec + size ===
  var mf = document.getElementById("machineFilter");
  if (mf) {
    var machines = {};
    DATA_PRODUCTS.forEach(function(p) {
      if (!matchesSearch(p)) return;
      if (curSpec && p.standard !== curSpec) return;
      if (curSize && p.size !== curSize) return;
      machines[p.machine] = true;
    });
    var mk = Object.keys(machines).sort(function(a,b) { return Number(a) - Number(b); });
    mf.innerHTML = '<option value="">Tất cả máy</option>';
    for (var i = 0; i < mk.length; i++) mf.innerHTML += '<option value="' + mk[i].replace(/"/g, '&quot;') + '">' + mk[i] + '</option>';
    mf.value = curMachine && mk.indexOf(curMachine) >= 0 ? curMachine : "";
  }

  // === sizeFilter: show sizes available given search + spec + machine ===
  var szf = document.getElementById("sizeFilter");
  if (szf) {
    var sizes = {};
    DATA_PRODUCTS.forEach(function(p) {
      if (!matchesSearch(p)) return;
      if (curSpec && p.standard !== curSpec) return;
      if (curMachine && String(p.machine) !== curMachine) return;
      sizes[p.size] = true;
    });
    var sk2 = Object.keys(sizes).sort();
    szf.innerHTML = '<option value="">Tất cả kích thước</option>';
    for (var i = 0; i < sk2.length; i++) szf.innerHTML += '<option value="' + sk2[i].replace(/"/g, '&quot;') + '">' + sk2[i] + '</option>';
    szf.value = curSize && sk2.indexOf(curSize) >= 0 ? curSize : "";
  }
}

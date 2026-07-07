var fs = require('fs');
var path = require('path');

var file = process.argv[2] || __dirname + '/vi.html';
var h = fs.readFileSync(file, 'utf8');

// === CHANGE 1: fobPtscLoadCfg — load from localStorage ===
var oldLoad = h.match(/function fobPtscLoadCfg\(\) \{[\s\S]*?^[ \t]*\}/m);
if (!oldLoad) { console.log('ERROR: fobPtscLoadCfg not found'); process.exit(1); }

var newLoad = `function fobPtscLoadCfg() {
  // Load from localStorage if available
  var saved;
  try { saved = JSON.parse(localStorage.getItem('fobptsc_config')); } catch(e) {}
  var c = saved || FOB_PTSC_CONFIG || FOB_PTSC_DEFAULTS;
  if (saved) FOB_PTSC_CONFIG = saved;
  var map = {
    fobCfgTransport: 'transport',
    fobCfgUnloadTruck: 'unloadTruck',
    fobCfgLoadWharf: 'loadWharf',
    fobCfgTransship: 'transship',
    fobCfgLoadShip: 'loadShip',
    fobCfgWarehouseDay: 'warehouseDay',
    fobCfgWarehouseOps: 'warehouseOps',
    fobCfgCustoms: 'customs'
  };
  for (var id in map) {
    var el = document.getElementById(id);
    if (el) el.value = c[map[id]] || 0;
  }
}`;
h = h.replace(oldLoad[0], newLoad);

// === CHANGE 2: fobPtscSaveCfg — save to localStorage ===
var oldSave = h.match(/function fobPtscSaveCfg\(\) \{[\s\S]*?^[ \t]*\}/m);
if (!oldSave) { console.log('ERROR: fobPtscSaveCfg not found'); process.exit(1); }

var newSave = `function fobPtscSaveCfg() {
  var map = {
    fobCfgTransport: 'transport',
    fobCfgUnloadTruck: 'unloadTruck',
    fobCfgLoadWharf: 'loadWharf',
    fobCfgTransship: 'transship',
    fobCfgLoadShip: 'loadShip',
    fobCfgWarehouseDay: 'warehouseDay',
    fobCfgWarehouseOps: 'warehouseOps',
    fobCfgCustoms: 'customs'
  };
  for (var id in map) {
    var el = document.getElementById(id);
    if (el) FOB_PTSC_CONFIG[map[id]] = parseFloat(el.value) || 0;
  }
  localStorage.setItem('fobptsc_config', JSON.stringify(FOB_PTSC_CONFIG));
  fobPtscCalc();
}`;
h = h.replace(oldSave[0], newSave);

// === CHANGE 3: Add search + sell price HTML after the fobptsc-grid close ===
var gridClose = '    </div>\n\n    <div id="fobPtscCalcResult">';
// Check if we already added the search row
if (h.indexOf('fobSearchInput') >= 0) {
  console.log('SKIP: fobSearchInput already exists');
} else {
  var searchHtml = `    </div>

    <div class="fobptsc-row">
      <div class="fobptsc-field" style="flex:2">
        <label>🔍 Tìm sản phẩm</label>
        <input type="text" id="fobSearchInput" placeholder="Gõ mã, spec, kích thước, máy..." oninput="fobPtscFilterProducts()">
      </div>
      <div class="fobptsc-field" style="flex:1">
        <label>💰 Giá bán (VNĐ/tấn) <span style="font-weight:400;font-size:11px;color:var(--muted)">giá tối thiểu tự động</span></label>
        <input type="number" id="fobSellPrice" min="0" step="1000" oninput="fobPtscCalc()">
      </div>
    </div>

    <div id="fobPtscCalcResult">`;
  h = h.replace(gridClose, searchHtml);
  console.log('Added search + sell price HTML');
}

// === CHANGE 4: Add fobPtscFilterProducts function before fobPtscCalc ===
// Find the boundary between fobPtscInitCalc and fobPtscCalc
var initCalcEnd = h.indexOf('function fobPtscCalc()');
if (h.indexOf('fobPtscFilterProducts') >= 0) {
  console.log('SKIP: fobPtscFilterProducts already exists');
} else {
  var filterFn = `
function fobPtscFilterProducts() {
  var sel = document.getElementById('fobProduct');
  var searchEl = document.getElementById('fobSearchInput');
  if (!sel || !searchEl) return;
  var q = searchEl.value.toLowerCase().trim();
  var curVal = sel.value;
  sel.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      var label = p.code + ' | ' + p.spec + ' | ' + p.size;
      if (p.machine) label += ' | ' + p.machine;
      if (q) {
        var haystack = (p.code + ' ' + p.spec + ' ' + p.size + ' ' + (p.machine||'')).toLowerCase();
        if (haystack.indexOf(q) < 0) return;
      }
      var opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = label;
      sel.appendChild(opt);
    });
  }
  if (curVal) { for (var i=0;i<sel.options.length;i++) { if (sel.options[i].value===curVal) { sel.value=curVal; break; } } }
  fobPtscCalc();
}
`;
  h = h.slice(0, initCalcEnd) + filterFn + h.slice(initCalcEnd);
  console.log('Added fobPtscFilterProducts');
}

// === CHANGE 5: Rewrite fobPtscCalc to include sell price + commission ===
var calcStart = h.indexOf('function fobPtscCalc()');
var calcEnd = h.indexOf('\n// Init fobPtsc config fields', calcStart);
if (calcEnd < 0) calcEnd = h.indexOf('\n// Init fob', calcStart);
if (calcEnd < 0) { console.log('ERROR: end of fobPtscCalc not found'); process.exit(1); }

var oldCalcWhole = h.substring(calcStart, calcEnd);
var newCalcWhole = `function fobPtscCalc() {
  var sel = document.getElementById('fobProduct');
  var tonEl = document.getElementById('fobTonnage');
  var whDaysEl = document.getElementById('fobWarehouseDays');
  var exportCb = document.getElementById('fobExportCb');
  var spEl = document.getElementById('fobSellPrice');
  var resultEl = document.getElementById('fobPtscCalcResult');
  
  if (!sel || !tonEl || !resultEl) return;
  
  var productCode = sel.value;
  var tonnage = parseFloat(tonEl.value) || 0;
  var whDays = parseInt(whDaysEl ? whDaysEl.value : '3') || 0;
  var isExport = exportCb ? exportCb.checked : true;
  var mode = FOB_PTSC_MODE || 'direct';
  
  if (!productCode || tonnage <= 0) {
    resultEl.innerHTML = '<div class="fobptsc-empty"><div class="icon">🚢</div><div>Chọn sản phẩm và nhập số tấn để tính giá</div></div>';
    return;
  }
  
  var prod = null;
  if (typeof DATA_PRODUCTS !== 'undefined') {
    for (var i = 0; i < DATA_PRODUCTS.length; i++) {
      if (DATA_PRODUCTS[i].code === productCode) { prod = DATA_PRODUCTS[i]; break; }
    }
  }
  if (!prod) {
    resultEl.innerHTML = '<div class="fobptsc-empty"><div class="icon">❌</div><div>Không tìm thấy sản phẩm</div></div>';
    return;
  }
  
  var exwPrice = prod.exw_vnd || 0;
  var cfg = FOB_PTSC_CONFIG || FOB_PTSC_DEFAULTS;
  var fees = [];
  
  fees.push({ label: '🚛 Vận chuyển NM → PTSC', value: cfg.transport || 0 });
  fees.push({ label: '🚢 Bốc xếp & giao nhận (cầu cảng → tàu)', value: cfg.loadShip || 0 });
  
  if (mode === 'warehouse') {
    fees.push({ label: '🚛 Bốc dỡ & giao nhận (ô tô → kho cảng)', value: cfg.unloadTruck || 0 });
    fees.push({ label: '🏗️ Bốc xếp & giao nhận (kho → cầu cảng)', value: cfg.loadWharf || 0 });
    fees.push({ label: '🔄 Chuyển tải hàng hóa', value: cfg.transship || 0 });
    var whCost = (cfg.warehouseDay || 0) * whDays;
    fees.push({ label: '🏭 Thuê kho cảng (' + whDays + ' ngày)', value: whCost });
    fees.push({ label: '📦 Vận hành kho (pallet + KCS)', value: cfg.warehouseOps || 0 });
  }
  
  if (isExport) {
    fees.push({ label: '📋 Hải quan (lấy mẫu + Vilas + Tham vấn)', value: cfg.customs || 0 });
  }
  
  var totalFees = 0;
  fees.forEach(function(f) { totalFees += f.value; });
  
  var costBeforeTax = exwPrice + totalFees;
  var exportTax = 0;
  var finalCost = costBeforeTax;
  
  if (isExport) {
    exportTax = Math.round(costBeforeTax * 0.05);
    finalCost = costBeforeTax + exportTax;
  }
  
  // Sell price + commission
  var sellPrice = spEl ? parseFloat(spEl.value) : 0;
  var minPrice = isExport ? Math.round(finalCost / 1.05) : finalCost;
  
  // Auto-fill min price if sell price is empty or 0
  if (spEl && (!spEl.value || parseFloat(spEl.value) <= 0)) {
    spEl.value = minPrice;
    sellPrice = minPrice;
  }
  
  var commBase = prod.comm_vnd || 0;
  var diff, commissionVar, effCommBase, totalComm;
  
  if (isExport) {
    diff = Math.max(0, (sellPrice - finalCost) / 1.05);
  } else {
    diff = Math.max(0, sellPrice - finalCost);
  }
  commissionVar = diff * 0.3;
  effCommBase = sellPrice < finalCost ? 0 : commBase;
  totalComm = effCommBase + commissionVar;
  
  var h = '<div class="fobptsc-result">';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
  h += '<div><strong>' + (prod.code || '') + '</strong> | ' + (prod.spec || '') + ' | ' + (prod.size || '') + '</div>';
  h += '<div style="font-size:13px;color:var(--muted)">' + tonnage + ' tấn | ' + (mode === 'direct' ? 'Không lưu kho' : 'Có lưu kho') + (isExport ? ' | 🌍 Xuất khẩu' : '') + '</div>';
  h += '</div>';
  
  h += '<table class="fobptsc-result-table">';
  h += '<tr><td>💰 Giá EXW gốc</td><td>' + Math.round(exwPrice).toLocaleString() + ' VNĐ/tấn</td></tr>';
  
  fees.forEach(function(f) {
    h += '<tr><td>' + f.label + '</td><td>' + f.value.toLocaleString() + ' VNĐ/tấn</td></tr>';
  });
  
  h += '<tr class="total-row"><td>📊 Tổng chi phí FOB / tấn</td><td>' + totalFees.toLocaleString() + ' VNĐ</td></tr>';
  h += '<tr><td style="font-weight:600">Giá thành FOB (chưa thuế)</td><td style="font-weight:600">' + costBeforeTax.toLocaleString() + ' VNĐ/tấn</td></tr>';
  
  if (isExport) {
    h += '<tr><td>📋 Thuế xuất khẩu 5%</td><td>' + exportTax.toLocaleString() + ' VNĐ/tấn</td></tr>';
    h += '<tr class="grand-row"><td>💰💎 Giá thành FOB (đã bao gồm XK)</td><td>' + finalCost.toLocaleString() + ' VNĐ/tấn</td></tr>';
  }
  
  h += '<tr class="total-row"><td>🔽 Giá tối thiểu (có thể bán)</td><td>' + minPrice.toLocaleString() + ' VNĐ/tấn</td></tr>';
  
  h += '</table>';
  
  var totalForShipment = Math.round(finalCost * tonnage);
  h += '<div class="summary">';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">';
  h += '<div><div class="lbl">Giá thành FOB / tấn</div><div class="big">' + finalCost.toLocaleString() + ' VNĐ</div></div>';
  h += '<div><div class="lbl">Tổng giá thành lô hàng (' + tonnage + ' tấn)</div><div class="big">' + totalForShipment.toLocaleString() + ' VNĐ</div></div>';
  h += '</div>';
  
  if (isExport) {
    var totalExw = Math.round(exwPrice * tonnage);
    var totalFeesShip = Math.round(totalFees * tonnage);
    var totalTaxShip = Math.round(exportTax * tonnage);
    h += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #86efac;font-size:12px;color:var(--muted)">';
    h += 'EXW: ' + totalExw.toLocaleString() + ' VNĐ | Phí: ' + totalFeesShip.toLocaleString() + ' VNĐ | Thuế XK: ' + totalTaxShip.toLocaleString() + ' VNĐ';
    h += '</div>';
  }
  
  h += '</div>'; // close summary
  
  // Commission section
  h += '<div class="calc-comm-result" style="margin-top:8px">';
  h += '<div class="calc-comm-row"><span>💰 Giá bán</span><strong>' + Math.round(sellPrice).toLocaleString() + ' VNĐ/tấn</strong></div>';
  h += '<div class="calc-comm-row"><span>Hoa hồng cơ bản</span><strong>' + Math.round(effCommBase).toLocaleString() + ' VNĐ</strong></div>';
  h += '<div class="calc-comm-row"><span>Chênh lệch (30%)</span><strong>' + Math.round(commissionVar).toLocaleString() + ' VNĐ</strong></div>';
  h += '<div class="calc-comm-row"><span>Tổng giá vốn</span><strong>' + Math.round(finalCost).toLocaleString() + ' VNĐ</strong></div>';
  h += '<div class="calc-comm-row calc-total" style="padding:10px 0;border-top:2px solid var(--primary);margin-top:6px"><span>Tổng hoa hồng</span><strong style="color:var(--primary);font-size:16px">' + Math.round(totalComm).toLocaleString() + ' VNĐ</strong></div>';
  h += '</div>'; // close comm
  
  h += '</div>'; // close fobptsc-result
  
  resultEl.innerHTML = h;
}`;
h = h.slice(0, calcStart) + newCalcWhole + h.slice(calcEnd);

// === CHANGE 6: Add CSS for .fobptsc-row ===
var cssMarker = '.fobptsc-empty{';
var cssInsert = `.fobptsc-row{display:flex;gap:12px;margin-top:12px}
.fobptsc-row .fobptsc-field{flex:1}
.fobptsc-row input[type="text"],
.fobptsc-row input[type="number"]{width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;outline:none;font-family:var(--font);color:var(--text);background:var(--card);box-sizing:border-box}
.fobptsc-row input:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
`;
if (h.indexOf('.fobptsc-row') >= 0) {
  console.log('SKIP: .fobptsc-row CSS already exists');
} else {
  h = h.replace('.fobptsc-empty{', cssInsert + '\n.fobptsc-empty{');
  console.log('Added CSS for .fobptsc-row');
}

fs.writeFileSync(file, h, 'utf8');
console.log('DONE: ' + file);

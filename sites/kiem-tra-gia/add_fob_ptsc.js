var fs = require('fs');
var html = fs.readFileSync(__dirname + '/vi.html', 'utf8');

// ====== 1. TAB BUTTON ======
var appsBtnEnd = html.indexOf('<button class="tab-btn" data-tab="apps"');
appsBtnEnd = html.indexOf('</button>', appsBtnEnd) + '</button>'.length;
var tabInsert = '<button class="tab-btn" data-tab="fobptsc" onclick="switchTab(\'fobptsc\')"><span>🚢 FOB PTSC</span><br><small style="font-weight:400;font-size:10px;opacity:.7">Tàu rời & chi phí</small></button>\n</div>';
html = html.slice(0, appsBtnEnd) + tabInsert + html.slice(appsBtnEnd);

// ====== 2. CSS ======
var cssBlock = `
/* ====== FOB PTSC ====== */
.fobptsc-panel{max-width:960px;margin:0 auto;padding:16px}
.fobptsc-section{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:16px}
.fobptsc-section h3{font-size:15px;font-weight:700;color:var(--text);margin:0 0 16px 0;padding-bottom:10px;border-bottom:2px solid var(--border)}
.fobptsc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:600px){.fobptsc-grid{grid-template-columns:1fr}}
.fobptsc-field{display:flex;flex-direction:column;gap:4px}
.fobptsc-field label{font-size:12px;font-weight:600;color:var(--muted)}
.fobptsc-field input,.fobptsc-field select{padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);color:var(--text);background:var(--card);outline:none;transition:border .2s}
.fobptsc-field input:focus,.fobptsc-field select:focus{border-color:var(--blue)}
.fobptsc-field input[type=number]{text-align:right}
.fobptsc-check{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.fobptsc-check input[type=checkbox]{width:18px;height:18px;cursor:pointer}
.fobptsc-check label{cursor:pointer;font-size:14px;font-weight:600;color:var(--text)}
.fobptsc-radio-group{display:flex;gap:8px;margin-bottom:12px}
.fobptsc-radio-btn{padding:8px 16px;border:1.5px solid var(--border);border-radius:8px;background:var(--card);cursor:pointer;font-size:13px;font-weight:600;font-family:var(--font);transition:all .2s;color:var(--text)}
.fobptsc-radio-btn.active{border-color:var(--blue);background:#eff6ff;color:var(--blue)}
.fobptsc-result{margin-top:16px}
.fobptsc-result-table{width:100%;border-collapse:collapse;margin-top:8px}
.fobptsc-result-table td{padding:8px 12px;font-size:13px;border-bottom:1px solid var(--border)}
.fobptsc-result-table td:last-child{text-align:right;font-weight:600}
.fobptsc-result-table tr.total-row td{border-top:2px solid var(--blue);font-weight:700;color:var(--blue);padding-top:12px}
.fobptsc-result-table tr.grand-row td{border-top:3px double #059669;font-weight:800;color:#059669;font-size:15px;padding-top:14px}
.fobptsc-result .summary{background:#f0fdf4;border:1.5px solid #86efac;border-radius:var(--radius);padding:16px;margin-top:12px}
.fobptsc-result .summary .big{font-size:22px;font-weight:800;color:#059669}
.fobptsc-result .summary .lbl{font-size:12px;color:var(--muted)}
.fobptsc-empty{text-align:center;padding:40px 20px;color:var(--muted);font-size:14px}
.fobptsc-empty .icon{font-size:48px;margin-bottom:12px}
`;
html = html.replace('</style>', cssBlock + '\n</style>');

// ====== 3. DATA OBJECT (after var DATA_COST_FOB) ======
var fobDataBlock = `
var FOB_PTSC_DEFAULTS = {
  transport: 50000,
  unloadTruck: 20000,
  loadWharf: 15000,
  transship: 10000,
  loadShip: 25000,
  warehouseDay: 8000,
  warehouseOps: 12000,
  customs: 25000
};
var FOB_PTSC_CONFIG = JSON.parse(JSON.stringify(FOB_PTSC_DEFAULTS));
var FOB_PTSC_WAREHOUSE_DAYS = 3;
`;
html = html.replace('var DATA_COST_FOB', fobDataBlock + '\nvar DATA_COST_FOB');

// ====== 4. HTML PANEL (before password modal) ======
var fobPtscPanelHtml = `
<!-- ====== FOB PTSC PANEL ====== -->
<div class="fobptsc-panel" id="fobptscPanel" style="display:none">
  <!-- === SETUP === -->
  <div class="fobptsc-section">
    <h3>⚙️ Cấu hình chi phí FOB PTSC</h3>
    <p style="font-size:13px;color:var(--muted);margin:-8px 0 16px">Nhập giá mặc định (VNĐ/tấn) cho từng khoản phí. Có thể sửa lại khi tính.</p>
    <div class="fobptsc-grid">
      <div class="fobptsc-field"><label>🚛 Vận chuyển NM → PTSC</label><input type="number" id="fobCfgTransport" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>🚛 Bốc dỡ & giao nhận (ô tô → kho cảng)</label><input type="number" id="fobCfgUnloadTruck" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>🏗️ Bốc xếp & giao nhận (kho cảng → cầu cảng)</label><input type="number" id="fobCfgLoadWharf" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>🔄 Chuyển tải hàng hóa</label><input type="number" id="fobCfgTransship" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>🚢 Bốc xếp & giao nhận (cầu cảng → tàu)</label><input type="number" id="fobCfgLoadShip" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>🏭 Thuê kho cảng (VNĐ/tấn/ngày)</label><input type="number" id="fobCfgWarehouseDay" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>📦 Vận hành kho (pallet lưu kho + KCS)</label><input type="number" id="fobCfgWarehouseOps" oninput="fobPtscSaveCfg()"></div>
      <div class="fobptsc-field"><label>📋 Hải quan (lấy mẫu + Vilas + Tham vấn)</label><input type="number" id="fobCfgCustoms" oninput="fobPtscSaveCfg()"></div>
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn-confirm" onclick="fobPtscResetCfg()">↺ Đặt lại mặc định</button>
      <button class="btn-cancel" onclick="alert('✅ Cấu hình đã lưu (dùng trong phiên này).')">💾 Lưu</button>
    </div>
  </div>

  <!-- === TÍNH TOÁN === -->
  <div class="fobptsc-section">
    <h3>🚢 Tính giá FOB PTSC</h3>
    
    <div class="fobptsc-radio-group">
      <button class="fobptsc-radio-btn active" data-fobmode="direct" onclick="fobPtscSetMode('direct')">🚛 Không lưu kho</button>
      <button class="fobptsc-radio-btn" data-fobmode="warehouse" onclick="fobPtscSetMode('warehouse')">📦 Có lưu kho</button>
    </div>

    <div class="fobptsc-check">
      <input type="checkbox" id="fobExportCb" checked onchange="fobPtscCalc()">
      <label for="fobExportCb">🌍 Xuất khẩu (thuế XK 5% + hải quan)</label>
    </div>

    <div class="fobptsc-grid">
      <div class="fobptsc-field"><label>📦 Sản phẩm</label>
        <select id="fobProduct" onchange="fobPtscCalc()">
          <option value="">-- Chọn sản phẩm --</option>
        </select>
      </div>
      <div class="fobptsc-field"><label>⚖️ Số tấn</label><input type="number" id="fobTonnage" min="0" step="0.1" oninput="fobPtscCalc()"></div>
      <div class="fobptsc-field"><label>📅 Số ngày lưu kho</label><input type="number" id="fobWarehouseDays" value="3" min="0" oninput="fobPtscCalc()"></div>
    </div>

    <div id="fobPtscCalcResult"></div>
  </div>
</div>
`;
html = html.replace('<div class="modal-overlay" id="pwModal">', fobPtscPanelHtml + '\n<div class="modal-overlay" id="pwModal">');

// ====== 5. Update switchTab() ======
html = html.replace(
  'if (mp) mp.classList.toggle("open", tab === "manage");',
  'if (mp) mp.classList.toggle("open", tab === "manage");\n  var fp = document.getElementById("fobptscPanel");\n  if (fp) fp.style.display = (tab === "fobptsc") ? "block" : "none";'
);
html = html.replace(
  'if (tab === "quotation") {\n    render();\n  }',
  'if (tab === "quotation") {\n    render();\n  }\n  if (tab === "fobptsc") {\n    fobPtscInitCalc();\n  }'
);

// ====== 6. Update render() ======
html = html.replace(
  '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else {\n    container.innerHTML = "";\n  }',
  '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else if (activeTab === "fobptsc") {\n    container.innerHTML = "";\n  } else {\n    container.innerHTML = "";\n  }'
);

// ====== 7. JS FUNCTIONS (insert before last </script>) ======
var fobJsFunctions = `
// ====== FOB PTSC ======
var FOB_PTSC_MODE = 'direct';

function fobPtscSetMode(mode) {
  FOB_PTSC_MODE = mode;
  var btns = document.querySelectorAll('.fobptsc-radio-btn');
  btns.forEach(function(b) { b.classList.toggle('active', b.dataset.fobmode === mode); });
  fobPtscCalc();
}

function fobPtscLoadCfg() {
  var c = FOB_PTSC_CONFIG || FOB_PTSC_DEFAULTS;
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
}

function fobPtscSaveCfg() {
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
  fobPtscCalc();
}

function fobPtscResetCfg() {
  FOB_PTSC_CONFIG = JSON.parse(JSON.stringify(FOB_PTSC_DEFAULTS));
  fobPtscLoadCfg();
  fobPtscCalc();
}

function fobPtscInitCalc() {
  fobPtscLoadCfg();
  var sel = document.getElementById('fobProduct');
  if (!sel) return;
  var curVal = sel.value;
  sel.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      var label = p.code + ' | ' + p.spec + ' | ' + p.size;
      if (p.machine) label += ' | ' + p.machine;
      var opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = label;
      sel.appendChild(opt);
    });
  }
  if (curVal) sel.value = curVal;
  fobPtscCalc();
}

function fobPtscCalc() {
  var sel = document.getElementById('fobProduct');
  var tonEl = document.getElementById('fobTonnage');
  var whDaysEl = document.getElementById('fobWarehouseDays');
  var exportCb = document.getElementById('fobExportCb');
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
  
  h += '</div></div>';
  
  resultEl.innerHTML = h;
}

// Init fobPtsc config fields if panel is visible
setTimeout(function() {
  var fp = document.getElementById('fobptscPanel');
  if (fp && fp.style.display !== 'none') fobPtscLoadCfg();
}, 500);
`;

// Insert JS functions into the main <script> block
var scriptStart = html.indexOf('<script>') + '<script>'.length;
var scriptEnd = html.lastIndexOf('</script>');

var beforeScript = html.slice(0, scriptStart);
var originalJs = html.slice(scriptStart, scriptEnd);
var afterScript = html.slice(scriptEnd);

// Append FOB PTSC functions to original JS
var newJs = originalJs + fobJsFunctions;
html = beforeScript + newJs + afterScript;

fs.writeFileSync(__dirname + '/vi.html', html, 'utf8');
console.log('✅ vi.html — FOB PTSC added successfully');

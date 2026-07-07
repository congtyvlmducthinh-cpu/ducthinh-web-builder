var fs = require('fs');

var en = fs.readFileSync(__dirname + '/en.html', 'utf8');

// 1. Tab button
var ae = en.indexOf('<button class="tab-btn" data-tab="apps"');
ae = en.indexOf('</button>', ae) + '</button>'.length;
en = en.slice(0, ae) + '<button class="tab-btn" data-tab="fobptsc" onclick="switchTab(\'fobptsc\')"><span>\u{1F6A2} FOB PTSC</span><br><small style="font-weight:400;font-size:10px;opacity:.7">Bulk vessel & costs</small></button>\n</div>' + en.slice(ae);

// 2. CSS
en = en.replace('</style>', `
/* FOB PTSC */
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

</style>`);

// 3. Data object
en = en.replace('var DATA_COST_FOB', '\nvar FOB_PTSC_DEFAULTS = {"transport":50000,"unloadTruck":20000,"loadWharf":15000,"transship":10000,"loadShip":25000,"warehouseDay":8000,"warehouseOps":12000,"customs":25000};\nvar FOB_PTSC_CONFIG=JSON.parse(JSON.stringify(FOB_PTSC_DEFAULTS));\nvar FOB_PTSC_WAREHOUSE_DAYS=3;\n\nvar DATA_COST_FOB');

// 4. Panel HTML (English)
var panel = `
<!-- FOB PTSC PANEL -->
<div class="fobptsc-panel" id="fobptscPanel" style="display:none">
<div class="fobptsc-section"><h3>\u2699\uFE0F FOB PTSC Cost Setup</h3>
<p style="font-size:13px;color:var(--muted);margin:-8px 0 16px">Enter default fees (VND/ton). Adjustable during calculation.</p>
<div class="fobptsc-grid">
<div class="fobptsc-field"><label>\u{1F69B} Transport: Factory \u2192 PTSC</label><input type="number" id="fobCfgTransport" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F69B} Unloading & handling (truck \u2192 port whse)</label><input type="number" id="fobCfgUnloadTruck" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F3D7}\uFE0F Loading & handling (whse \u2192 wharf)</label><input type="number" id="fobCfgLoadWharf" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F504} Transshipment</label><input type="number" id="fobCfgTransship" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F6A2} Loading & handling (wharf \u2192 vessel)</label><input type="number" id="fobCfgLoadShip" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F3ED} Port whse rental (VND/ton/day)</label><input type="number" id="fobCfgWarehouseDay" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F4E6} Warehouse ops (pallet + KCS)</label><input type="number" id="fobCfgWarehouseOps" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F4CB} Customs (sampling + Vilas + Consult)</label><input type="number" id="fobCfgCustoms" oninput="fobPtscSaveCfg()"></div>
</div>
<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
<button class="btn-confirm" onclick="fobPtscResetCfg()">\u21BA Reset defaults</button>
<button class="btn-cancel" onclick="alert('\u2705 Config saved (this session).')">\u{1F4BE} Save</button>
</div></div>

<div class="fobptsc-section"><h3>\u{1F6A2} FOB PTSC Calculation</h3>
<div class="fobptsc-radio-group">
<button class="fobptsc-radio-btn active" data-fobmode="direct" onclick="fobPtscSetMode('direct')">\u{1F69B} Direct (no warehouse)</button>
<button class="fobptsc-radio-btn" data-fobmode="warehouse" onclick="fobPtscSetMode('warehouse')">\u{1F4E6} With warehouse</button>
</div>
<div class="fobptsc-check">
<input type="checkbox" id="fobExportCb" checked onchange="fobPtscCalc()">
<label for="fobExportCb">\u{1F30D} Export (tax 5% + customs)</label>
</div>
<div class="fobptsc-grid">
<div class="fobptsc-field"><label>\u{1F4E6} Product</label>
<select id="fobProduct" onchange="fobPtscCalc()">
<option value="">-- Select product --</option>
</select></div>
<div class="fobptsc-field"><label>\u2696\uFE0F Tonnage</label><input type="number" id="fobTonnage" min="0" step="0.1" oninput="fobPtscCalc()"></div>
<div class="fobptsc-field"><label>\u{1F4C5} Warehouse days</label><input type="number" id="fobWarehouseDays" value="3" min="0" oninput="fobPtscCalc()"></div>
</div>
<div id="fobPtscCalcResult"></div>
</div>
</div>
`;
en = en.replace('<div class="modal-overlay" id="pwModal">', panel + '<div class="modal-overlay" id="pwModal">');

// 5. switchTab
en = en.replace(
  'if (mp) mp.classList.toggle("open", tab === "manage");',
  'if (mp) mp.classList.toggle("open", tab === "manage");\n  var fp = document.getElementById("fobptscPanel");\n  if (fp) fp.style.display = (tab === "fobptsc") ? "block" : "none";'
);
en = en.replace(
  'if (tab === "quotation") {\n    render();\n  }',
  'if (tab === "quotation") {\n    render();\n  }\n  if (tab === "fobptsc") {\n    fobPtscInitCalc();\n  }'
);

// 6. render
en = en.replace(
  '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else {\n    container.innerHTML = "";\n  }',
  '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else if (activeTab === "fobptsc") {\n    container.innerHTML = "";\n  } else {\n    container.innerHTML = "";\n  }'
);

// 7. JS functions (English)
var js = `
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
  var map = {fobCfgTransport:'transport',fobCfgUnloadTruck:'unloadTruck',fobCfgLoadWharf:'loadWharf',fobCfgTransship:'transship',fobCfgLoadShip:'loadShip',fobCfgWarehouseDay:'warehouseDay',fobCfgWarehouseOps:'warehouseOps',fobCfgCustoms:'customs'};
  for (var id in map) { var el = document.getElementById(id); if (el) el.value = c[map[id]] || 0; }
}

function fobPtscSaveCfg() {
  var map = {fobCfgTransport:'transport',fobCfgUnloadTruck:'unloadTruck',fobCfgLoadWharf:'loadWharf',fobCfgTransship:'transship',fobCfgLoadShip:'loadShip',fobCfgWarehouseDay:'warehouseDay',fobCfgWarehouseOps:'warehouseOps',fobCfgCustoms:'customs'};
  for (var id in map) { var el = document.getElementById(id); if (el) FOB_PTSC_CONFIG[map[id]] = parseFloat(el.value) || 0; }
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
  sel.innerHTML = '<option value="">-- Select product --</option>';
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      var label = p.code + ' | ' + p.size;
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
    resultEl.innerHTML = '<div class="fobptsc-empty"><div class="icon">🚢</div><div>Select a product and enter tonnage to calculate</div></div>';
    return;
  }
  var prod = null;
  if (typeof DATA_PRODUCTS !== 'undefined') {
    for (var i = 0; i < DATA_PRODUCTS.length; i++) {
      if (DATA_PRODUCTS[i].code === productCode) { prod = DATA_PRODUCTS[i]; break; }
    }
  }
  if (!prod) {
    resultEl.innerHTML = '<div class="fobptsc-empty"><div class="icon">❌</div><div>Product not found</div></div>';
    return;
  }
  var exwPrice = prod.exw_vnd || 0;
  var cfg = FOB_PTSC_CONFIG || FOB_PTSC_DEFAULTS;
  var fees = [];
  fees.push({ label: '🚛 Transport: Factory → PTSC', value: cfg.transport || 0 });
  fees.push({ label: '🚢 Loading & handling (wharf → vessel)', value: cfg.loadShip || 0 });
  if (mode === 'warehouse') {
    fees.push({ label: '🚛 Unloading & handling (truck → port whse)', value: cfg.unloadTruck || 0 });
    fees.push({ label: '🏗️ Loading & handling (whse → wharf)', value: cfg.loadWharf || 0 });
    fees.push({ label: '🔄 Transshipment', value: cfg.transship || 0 });
    var whCost = (cfg.warehouseDay || 0) * whDays;
    fees.push({ label: '🏭 Port whse rental (' + whDays + ' days)', value: whCost });
    fees.push({ label: '📦 Warehouse ops (pallet + KCS)', value: cfg.warehouseOps || 0 });
  }
  if (isExport) {
    fees.push({ label: '📋 Customs (sampling + Vilas + Consult)', value: cfg.customs || 0 });
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
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div><strong>' + (prod.code || '') + '</div>';
  h += '<div style="font-size:13px;color:var(--muted)">' + tonnage + ' tons | ' + (mode === 'direct' ? 'No warehouse' : 'With warehouse') + (isExport ? ' | 🌍 Export' : '') + '</div></div>';
  h += '<table class="fobptsc-result-table">';
  h += '<tr><td>💰 Base EXW price</td><td>' + Math.round(exwPrice).toLocaleString() + ' VND/ton</td></tr>';
  fees.forEach(function(f) {
    h += '<tr><td>' + f.label + '</td><td>' + f.value.toLocaleString() + ' VND/ton</td></tr>';
  });
  h += '<tr class="total-row"><td>📊 Total FOB costs / ton</td><td>' + totalFees.toLocaleString() + ' VND</td></tr>';
  h += '<tr><td style="font-weight:600">FOB price (pre-tax)</td><td style="font-weight:600">' + costBeforeTax.toLocaleString() + ' VND/ton</td></tr>';
  if (isExport) {
    h += '<tr><td>📋 Export tax 5%</td><td>' + exportTax.toLocaleString() + ' VND/ton</td></tr>';
    h += '<tr class="grand-row"><td>💰💎 FOB price (incl. export)</td><td>' + finalCost.toLocaleString() + ' VND/ton</td></tr>';
  }
  h += '</table>';
  var totalForShipment = Math.round(finalCost * tonnage);
  h += '<div class="summary"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div><div class="lbl">FOB price / ton</div><div class="big">' + finalCost.toLocaleString() + ' VND/ton</div></div>';
  h += '<div><div class="lbl">Total shipment price (' + tonnage + ' tons)</div><div class="big">' + totalForShipment.toLocaleString() + ' VND</div></div></div>';
  if (isExport) {
    var tExw = Math.round(exwPrice * tonnage);
    var tFees = Math.round(totalFees * tonnage);
    var tTax = Math.round(exportTax * tonnage);
    h += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #86efac;font-size:12px;color:var(--muted)">EXW: ' + tExw.toLocaleString() + ' VND | Fees: ' + tFees.toLocaleString() + ' VND | Tax: ' + tTax.toLocaleString() + ' VND</div>';
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

// Insert into script
var ss = en.lastIndexOf('<script>') + 8;
var se = en.lastIndexOf('</script>');
en = en.slice(0, ss) + en.slice(ss, se) + '\n' + js + '\n' + en.slice(se);

fs.writeFileSync(__dirname + '/en.html', en, 'utf8');
console.log('✅ en.html done (' + js.length + ' bytes JS)');

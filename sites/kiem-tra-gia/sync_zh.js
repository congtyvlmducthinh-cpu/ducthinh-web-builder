var fs = require('fs');

var zh = fs.readFileSync(__dirname + '/zh.html', 'utf8');

// 1. Tab button
var ae = zh.indexOf('<button class="tab-btn" data-tab="apps"');
ae = zh.indexOf('</button>', ae) + '</button>'.length;
zh = zh.slice(0, ae) + '<button class="tab-btn" data-tab="fobptsc" onclick="switchTab(\'fobptsc\')"><span>\u{1F6A2} FOB PTSC</span><br><small style="font-weight:400;font-size:10px;opacity:.7">\u6563\u8D27\u8239\u4E0E\u8D39\u7528</small></button>\n</div>' + zh.slice(ae);

// 2. CSS
zh = zh.replace('</style>', `
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
zh = zh.replace('var DATA_COST_FOB', '\nvar FOB_PTSC_DEFAULTS = {"transport":50000,"unloadTruck":20000,"loadWharf":15000,"transship":10000,"loadShip":25000,"warehouseDay":8000,"warehouseOps":12000,"customs":25000};\nvar FOB_PTSC_CONFIG=JSON.parse(JSON.stringify(FOB_PTSC_DEFAULTS));\nvar FOB_PTSC_WAREHOUSE_DAYS=3;\n\nvar DATA_COST_FOB');

// 4. Panel HTML (Chinese)
var panel = `
<!-- FOB PTSC PANEL -->
<div class="fobptsc-panel" id="fobptscPanel" style="display:none">
<div class="fobptsc-section"><h3>\u2699\uFE0F FOB PTSC \u8D39\u7528\u8BBE\u7F6E</h3>
<p style="font-size:13px;color:var(--muted);margin:-8px 0 16px">\u8F93\u5165\u6BCF\u9879\u8D39\u7528\u7684\u9ED8\u8BA4\u503C\uFF08\u8D8A\u5357\u76FE/\u5428\uFF09\u3002\u8BA1\u7B97\u65F6\u53EF\u8C03\u6574\u3002</p>
<div class="fobptsc-grid">
<div class="fobptsc-field"><label>\u{1F69B} \u8FD0\u8F93\uFF1A\u5DE5\u5382 \u2192 PTSC</label><input type="number" id="fobCfgTransport" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F69B} \u5378\u8D27\u4E0E\u4EA4\u63A5\uFF08\u5361\u8F66 \u2192 \u6E2F\u53E3\u4ED3\u5E93\uFF09</label><input type="number" id="fobCfgUnloadTruck" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F3D7}\uFE0F \u88C5\u8D27\u4E0E\u4EA4\u63A5\uFF08\u4ED3\u5E93 \u2192 \u7801\u5934\uFF09</label><input type="number" id="fobCfgLoadWharf" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F504} \u8D27\u7269\u8F6C\u8FD0</label><input type="number" id="fobCfgTransship" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F6A2} \u88C5\u8D27\u4E0E\u4EA4\u63A5\uFF08\u7801\u5934 \u2192 \u8239\u8236\uFF09</label><input type="number" id="fobCfgLoadShip" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F3ED} \u6E2F\u53E3\u4ED3\u5E93\u79DF\u8D41\uFF08\u8D8A\u5357\u76FE/\u5428/\u5929\uFF09</label><input type="number" id="fobCfgWarehouseDay" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F4E6} \u4ED3\u5E93\u8FD0\u8425\uFF08\u6258\u76D8 + KCS\uFF09</label><input type="number" id="fobCfgWarehouseOps" oninput="fobPtscSaveCfg()"></div>
<div class="fobptsc-field"><label>\u{1F4CB} \u6D77\u5173\uFF08\u53D6\u6837 + Vilas + \u54A8\u8BE2\uFF09</label><input type="number" id="fobCfgCustoms" oninput="fobPtscSaveCfg()"></div>
</div>
<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
<button class="btn-confirm" onclick="fobPtscResetCfg()">\u21BA \u6062\u590D\u9ED8\u8BA4</button>
<button class="btn-cancel" onclick="alert('\u2705 \u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF08\u672C\u6B21\u4F1A\u8BDD\u6709\u6548\uFF09\u3002')">\u{1F4BE} \u4FDD\u5B58</button>
</div></div>

<div class="fobptsc-section"><h3>\u{1F6A2} FOB PTSC \u4EF7\u683C\u8BA1\u7B97</h3>
<div class="fobptsc-radio-group">
<button class="fobptsc-radio-btn active" data-fobmode="direct" onclick="fobPtscSetMode('direct')">\u{1F69B} \u4E0D\u542B\u4ED3\u50A8</button>
<button class="fobptsc-radio-btn" data-fobmode="warehouse" onclick="fobPtscSetMode('warehouse')">\u{1F4E6} \u542B\u4ED3\u50A8</button>
</div>
<div class="fobptsc-check">
<input type="checkbox" id="fobExportCb" checked onchange="fobPtscCalc()">
<label for="fobExportCb">\u{1F30D} \u51FA\u53E3\uFF08\u51FA\u53E3\u7A0E5% + \u6D77\u5173\uFF09</label>
</div>
<div class="fobptsc-grid">
<div class="fobptsc-field"><label>\u{1F4E6} \u4EA7\u54C1</label>
<select id="fobProduct" onchange="fobPtscCalc()">
<option value="">-- \u9009\u62E9\u4EA7\u54C1 --</option>
</select></div>
<div class="fobptsc-field"><label>\u2696\uFE0F \u5428\u6570</label><input type="number" id="fobTonnage" min="0" step="0.1" oninput="fobPtscCalc()"></div>
<div class="fobptsc-field"><label>\u{1F4C5} \u4ED3\u50A8\u5929\u6570</label><input type="number" id="fobWarehouseDays" value="3" min="0" oninput="fobPtscCalc()"></div>
</div>
<div id="fobPtscCalcResult"></div>
</div>
</div>
`;
zh = zh.replace('<div class="modal-overlay" id="pwModal">', panel + '<div class="modal-overlay" id="pwModal">');

// 5. switchTab
zh = zh.replace(
  'if (mp) mp.classList.toggle("open", tab === "manage");',
  'if (mp) mp.classList.toggle("open", tab === "manage");\n  var fp = document.getElementById("fobptscPanel");\n  if (fp) fp.style.display = (tab === "fobptsc") ? "block" : "none";'
);
zh = zh.replace(
  'if (tab === "quotation") {\n    render();\n  }',
  'if (tab === "quotation") {\n    render();\n  }\n  if (tab === "fobptsc") {\n    fobPtscInitCalc();\n  }'
);

// 6. render
zh = zh.replace(
  '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else {\n    container.innerHTML = "";\n  }',
  '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else if (activeTab === "fobptsc") {\n    container.innerHTML = "";\n  } else {\n    container.innerHTML = "";\n  }'
);

// 7. JS functions (Chinese)
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
  sel.innerHTML = '<option value="">-- \u9009\u62E9\u4EA7\u54C1 --</option>';
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
    resultEl.innerHTML = '<div class="fobptsc-empty"><div class="icon">\u{1F6A2}</div><div>\u8BF7\u9009\u62E9\u4EA7\u54C1\u5E76\u8F93\u5165\u5428\u6570\u4EE5\u8BA1\u7B97\u4EF7\u683C</div></div>';
    return;
  }
  var prod = null;
  if (typeof DATA_PRODUCTS !== 'undefined') {
    for (var i = 0; i < DATA_PRODUCTS.length; i++) {
      if (DATA_PRODUCTS[i].code === productCode) { prod = DATA_PRODUCTS[i]; break; }
    }
  }
  if (!prod) {
    resultEl.innerHTML = '<div class="fobptsc-empty"><div class="icon">\u274C</div><div>\u672A\u627E\u5230\u4EA7\u54C1</div></div>';
    return;
  }
  var exwPrice = prod.exw_vnd || 0;
  var cfg = FOB_PTSC_CONFIG || FOB_PTSC_DEFAULTS;
  var fees = [];
  fees.push({ label: '\u{1F69B} \u8FD0\u8F93\uFF1A\u5DE5\u5382 \u2192 PTSC', value: cfg.transport || 0 });
  fees.push({ label: '\u{1F6A2} \u88C5\u8D27\u4E0E\u4EA4\u63A5\uFF08\u7801\u5934 \u2192 \u8239\u8236\uFF09', value: cfg.loadShip || 0 });
  if (mode === 'warehouse') {
    fees.push({ label: '\u{1F69B} \u5378\u8D27\u4E0E\u4EA4\u63A5\uFF08\u5361\u8F66 \u2192 \u6E2F\u53E3\u4ED3\u5E93\uFF09', value: cfg.unloadTruck || 0 });
    fees.push({ label: '\u{1F3D7}\uFE0F \u88C5\u8D27\u4E0E\u4EA4\u63A5\uFF08\u4ED3\u5E93 \u2192 \u7801\u5934\uFF09', value: cfg.loadWharf || 0 });
    fees.push({ label: '\u{1F504} \u8D27\u7269\u8F6C\u8FD0', value: cfg.transship || 0 });
    var whCost = (cfg.warehouseDay || 0) * whDays;
    fees.push({ label: '\u{1F3ED} \u6E2F\u53E3\u4ED3\u5E93\u79DF\u8D41\uFF08' + whDays + ' \u5929\uFF09', value: whCost });
    fees.push({ label: '\u{1F4E6} \u4ED3\u5E93\u8FD0\u8425\uFF08\u6258\u76D8 + KCS\uFF09', value: cfg.warehouseOps || 0 });
  }
  if (isExport) {
    fees.push({ label: '\u{1F4CB} \u6D77\u5173\uFF08\u53D6\u6837 + Vilas + \u54A8\u8BE2\uFF09', value: cfg.customs || 0 });
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
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div><strong>' + (prod.code || '') + '</strong></div>';
  h += '<div style="font-size:13px;color:var(--muted)">' + tonnage + ' \u5428 | ' + (mode === 'direct' ? '\u4E0D\u542B\u4ED3\u50A8' : '\u542B\u4ED3\u50A8') + (isExport ? ' | \u{1F30D} \u51FA\u53E3' : '') + '</div></div>';
  h += '<table class="fobptsc-result-table">';
  h += '<tr><td>\u{1F4B0} EXW \u539F\u4EF7</td><td>' + Math.round(exwPrice).toLocaleString() + ' \u8D8A\u5357\u76FE/\u5428</td></tr>';
  fees.forEach(function(f) {
    h += '<tr><td>' + f.label + '</td><td>' + f.value.toLocaleString() + ' \u8D8A\u5357\u76FE/\u5428</td></tr>';
  });
  h += '<tr class="total-row"><td>\u{1F4CA} FOB \u603B\u8D39\u7528 / \u5428</td><td>' + totalFees.toLocaleString() + ' \u8D8A\u5357\u76FE</td></tr>';
  h += '<tr><td style="font-weight:600">FOB \u4EF7\u683C\uFF08\u7A0E\u524D\uFF09</td><td style="font-weight:600">' + costBeforeTax.toLocaleString() + ' \u8D8A\u5357\u76FE/\u5428</td></tr>';
  if (isExport) {
    h += '<tr><td>\u{1F4CB} \u51FA\u53E3\u7A0E5%</td><td>' + exportTax.toLocaleString() + ' \u8D8A\u5357\u76FE/\u5428</td></tr>';
    h += '<tr class="grand-row"><td>\u{1F4B0}\u{1F48E} FOB \u4EF7\u683C\uFF08\u542B\u51FA\u53E3\u7A0E\uFF09</td><td>' + finalCost.toLocaleString() + ' \u8D8A\u5357\u76FE/\u5428</td></tr>';
  }
  h += '</table>';
  var totalForShipment = Math.round(finalCost * tonnage);
  h += '<div class="summary"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div><div class="lbl">FOB \u4EF7\u683C / \u5428</div><div class="big">' + finalCost.toLocaleString() + ' \u8D8A\u5357\u76FE/\u5428</div></div>';
  h += '<div><div class="lbl">\u6574\u6279\u8D27\u7269\u603B\u4EF7\uFF08' + tonnage + ' \u5428\uFF09</div><div class="big">' + totalForShipment.toLocaleString() + ' \u8D8A\u5357\u76FE</div></div></div>';
  if (isExport) {
    var tExw = Math.round(exwPrice * tonnage);
    var tFees = Math.round(totalFees * tonnage);
    var tTax = Math.round(exportTax * tonnage);
    h += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #86efac;font-size:12px;color:var(--muted)">EXW: ' + tExw.toLocaleString() + ' \u8D8A\u5357\u76FE | \u8D39\u7528\uFF1A' + tFees.toLocaleString() + ' \u8D8A\u5357\u76FE | \u7A0E\uFF1A' + tTax.toLocaleString() + ' \u8D8A\u5357\u76FE</div>';
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
var ss = zh.lastIndexOf('<script>') + 8;
var se = zh.lastIndexOf('</script>');
zh = zh.slice(0, ss) + zh.slice(ss, se) + '\n' + js + '\n' + zh.slice(se);

fs.writeFileSync(__dirname + '/zh.html', zh, 'utf8');
console.log('✅ zh.html done (' + js.length + ' bytes JS)');

var fs = require('fs');

function addFobPtsc(file, lang) {
  var html = fs.readFileSync(file, 'utf8');

  // 1. Tab button
  var btn = lang==='en'
    ? '<button class="tab-btn" data-tab="fobptsc" onclick="switchTab(\'fobptsc\')"><span>🚢 FOB PTSC</span><br><small style="font-weight:400;font-size:10px;opacity:.7">Bulk vessel & costs</small></button>\n</div>'
    : '<button class="tab-btn" data-tab="fobptsc" onclick="switchTab(\'fobptsc\')"><span>🚢 FOB PTSC</span><br><small style="font-weight:400;font-size:10px;opacity:.7">散货船与费用</small></button>\n</div>';
  var ae = html.indexOf('<button class="tab-btn" data-tab="apps"');
  ae = html.indexOf('</button>', ae) + '</button>'.length;
  html = html.slice(0, ae) + btn + html.slice(ae);

  // 2. CSS
  html = html.replace('</style>', '\n/* FOB PTSC */\n.fobptsc-panel{max-width:960px;margin:0 auto;padding:16px}\n.fobptsc-section{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:16px}\n.fobptsc-section h3{font-size:15px;font-weight:700;color:var(--text);margin:0 0 16px 0;padding-bottom:10px;border-bottom:2px solid var(--border)}\n.fobptsc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n@media(max-width:600px){.fobptsc-grid{grid-template-columns:1fr}}\n.fobptsc-field{display:flex;flex-direction:column;gap:4px}\n.fobptsc-field label{font-size:12px;font-weight:600;color:var(--muted)}\n.fobptsc-field input,.fobptsc-field select{padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);color:var(--text);background:var(--card);outline:none;transition:border .2s}\n.fobptsc-field input:focus,.fobptsc-field select:focus{border-color:var(--blue)}\n.fobptsc-field input[type=number]{text-align:right}\n.fobptsc-check{display:flex;align-items:center;gap:8px;margin-bottom:12px}\n.fobptsc-check input[type=checkbox]{width:18px;height:18px;cursor:pointer}\n.fobptsc-check label{cursor:pointer;font-size:14px;font-weight:600;color:var(--text)}\n.fobptsc-radio-group{display:flex;gap:8px;margin-bottom:12px}\n.fobptsc-radio-btn{padding:8px 16px;border:1.5px solid var(--border);border-radius:8px;background:var(--card);cursor:pointer;font-size:13px;font-weight:600;font-family:var(--font);transition:all .2s;color:var(--text)}\n.fobptsc-radio-btn.active{border-color:var(--blue);background:#eff6ff;color:var(--blue)}\n.fobptsc-result{margin-top:16px}\n.fobptsc-result-table{width:100%;border-collapse:collapse;margin-top:8px}\n.fobptsc-result-table td{padding:8px 12px;font-size:13px;border-bottom:1px solid var(--border)}\n.fobptsc-result-table td:last-child{text-align:right;font-weight:600}\n.fobptsc-result-table tr.total-row td{border-top:2px solid var(--blue);font-weight:700;color:var(--blue);padding-top:12px}\n.fobptsc-result-table tr.grand-row td{border-top:3px double #059669;font-weight:800;color:#059669;font-size:15px;padding-top:14px}\n.fobptsc-result .summary{background:#f0fdf4;border:1.5px solid #86efac;border-radius:var(--radius);padding:16px;margin-top:12px}\n.fobptsc-result .summary .big{font-size:22px;font-weight:800;color:#059669}\n.fobptsc-result .summary .lbl{font-size:12px;color:var(--muted)}\n.fobptsc-empty{text-align:center;padding:40px 20px;color:var(--muted);font-size:14px}\n.fobptsc-empty .icon{font-size:48px;margin-bottom:12px}\n\n</style>');
  
  // 3. Data object
  var fd = '\nvar FOB_PTSC_DEFAULTS = {"transport":50000,"unloadTruck":20000,"loadWharf":15000,"transship":10000,"loadShip":25000,"warehouseDay":8000,"warehouseOps":12000,"customs":25000};\nvar FOB_PTSC_CONFIG=JSON.parse(JSON.stringify(FOB_PTSC_DEFAULTS));\nvar FOB_PTSC_WAREHOUSE_DAYS=3;\n';
  html = html.replace('var DATA_COST_FOB', fd + '\nvar DATA_COST_FOB');

  // 4. HTML panel
  var vi = fs.readFileSync(__dirname + '/vi.html', 'utf8');
  var vs = vi.indexOf('<!--', vi.indexOf('FOB PTSC PANEL'));
  var ve = vi.indexOf('<div class="modal-overlay" id="pwModal">', vs);
  var panelHtml = vi.substring(vs, ve);

  // Translate panel
  if (lang === 'en') {
    var enMap = [
      ['⚙️ Cấu hình chi phí FOB PTSC','⚙️ FOB PTSC Cost Setup'],
      ['Nhập giá mặc định (VNĐ/tấn) cho từng khoản phí. Có thể sửa lại khi tính.','Enter default fees (VND/ton). Adjustable during calculation.'],
      ['🚛 Vận chuyển NM → PTSC','🚛 Transport: Factory → PTSC'],
      ['🚛 Bốc dỡ & giao nhận (ô tô → kho cảng)','🚛 Unloading & handling (truck → port whse)'],
      ['🏗️ Bốc xếp & giao nhận (kho cảng → cầu cảng)','🏗️ Loading & handling (whse → wharf)'],
      ['🔄 Chuyển tải hàng hóa','🔄 Transshipment'],
      ['🚢 Bốc xếp & giao nhận (cầu cảng → tàu)','🚢 Loading & handling (wharf → vessel)'],
      ['🏭 Thuê kho cảng (VNĐ/tấn/ngày)','🏭 Port whse rental (VND/ton/day)'],
      ['📦 Vận hành kho (pallet lưu kho + KCS)','📦 Warehouse ops (pallet + KCS)'],
      ['📋 Hải quan (lấy mẫu + Vilas + Tham vấn)','📋 Customs (sampling + Vilas + Consult)'],
      ['↺ Đặt lại mặc định','↺ Reset defaults'],
      ['✅ Cấu hình đã lưu (dùng trong phiên này).','✅ Config saved (this session).'],
      ['💾 Lưu','💾 Save'],
      ['🚢 Tính giá FOB PTSC','🚢 FOB PTSC Calculation'],
      ['🚛 Không lưu kho','🚛 Direct (no warehouse)'],
      ['📦 Có lưu kho','📦 With warehouse'],
      ['🌍 Xuất khẩu (thuế XK 5% + hải quan)','🌍 Export (tax 5% + customs)'],
      ['📦 Sản phẩm','📦 Product'],
      ['-- Chọn sản phẩm --','-- Select product --'],
      ['⚖️ Số tấn','⚖️ Tonnage'],
      ['📅 Số ngày lưu kho','📅 Warehouse days']
    ];
    enMap.forEach(function(p){ panelHtml = panelHtml.split(p[0]).join(p[1]); });
  } else {
    var zhMap = [
      ['⚙️ Cấu hình chi phí FOB PTSC','⚙️ FOB PTSC 费用设置'],
      ['Nhập giá mặc định (VNĐ/tấn) cho từng khoản phí. Có thể sửa lại khi tính.','输入每项费用的默认值（越南盾/吨）。计算时可调整。'],
      ['🚛 Vận chuyển NM → PTSC','🚛 运输：工厂 → PTSC'],
      ['🚛 Bốc dỡ & giao nhận (ô tô → kho cảng)','🚛 卸货与交接（卡车 → 港口仓库）'],
      ['🏗️ Bốc xếp & giao nhận (kho cảng → cầu cảng)','🏗️ 装货与交接（仓库 → 码头）'],
      ['🔄 Chuyển tải hàng hóa','🔄 货物转运'],
      ['🚢 Bốc xếp & giao nhận (cầu cảng → tàu)','🚢 装货与交接（码头 → 船舶）'],
      ['🏭 Thuê kho cảng (VNĐ/tấn/ngày)','🏭 港口仓库租赁（越南盾/吨/天）'],
      ['📦 Vận hành kho (pallet lưu kho + KCS)','📦 仓库运营（托盘存储 + KCS）'],
      ['📋 Hải quan (lấy mẫu + Vilas + Tham vấn)','📋 海关（取样 + Vilas + 咨询）'],
      ['↺ Đặt lại mặc định','↺ 恢复默认'],
      ['✅ Cấu hình đã lưu (dùng trong phiên này).','✅ 设置已保存（本次会话有效）。'],
      ['💾 Lưu','💾 保存'],
      ['🚢 Tính giá FOB PTSC','🚢 FOB PTSC 价格计算'],
      ['🚛 Không lưu kho','🚛 不含仓储'],
      ['📦 Có lưu kho','📦 含仓储'],
      ['🌍 Xuất khẩu (thuế XK 5% + hải quan)','🌍 出口（出口税5% + 海关）'],
      ['📦 Sản phẩm','📦 产品'],
      ['-- Chọn sản phẩm --','-- 选择产品 --'],
      ['⚖️ Số tấn','⚖️ 吨数'],
      ['📅 Số ngày lưu kho','📅 仓储天数']
    ];
    zhMap.forEach(function(p){ panelHtml = panelHtml.split(p[0]).join(p[1]); });
  }
  html = html.replace('<div class="modal-overlay" id="pwModal">', panelHtml + '\n<div class="modal-overlay" id="pwModal">');

  // 5. switchTab
  html = html.replace(
    'if (mp) mp.classList.toggle("open", tab === "manage");',
    'if (mp) mp.classList.toggle("open", tab === "manage");\n  var fp = document.getElementById("fobptscPanel");\n  if (fp) fp.style.display = (tab === "fobptsc") ? "block" : "none";'
  );
  html = html.replace(
    'if (tab === "quotation") {\n    render();\n  }',
    'if (tab === "quotation") {\n    render();\n  }\n  if (tab === "fobptsc") {\n    fobPtscInitCalc();\n  }'
  );

  // 6. render
  html = html.replace(
    '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else {\n    container.innerHTML = "";\n  }',
    '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else if (activeTab === "fobptsc") {\n    container.innerHTML = "";\n  } else {\n    container.innerHTML = "";\n  }'
  );

  // 7. JS functions — extract from vi.html's LAST <script> tag
  // Split by the last <script> (the main one, not CDN)
  var viLastScript = vi.lastIndexOf('<script>');
  var viScriptContent = vi.substring(viLastScript + '<script>'.length, vi.lastIndexOf('</script>'));
  var fobStart = viScriptContent.indexOf('// ====== FOB PTSC ======');
  var fobEnd = viScriptContent.indexOf('setTimeout(function(){', fobStart);
  fobEnd = viScriptContent.indexOf('}, 500);', fobEnd) + '}, 500);'.length;
  var fobJs = viScriptContent.substring(fobStart, fobEnd);

  // Translate JS strings
  if (lang === 'en') {
    var enJsMap = [
      ['Chọn sản phẩm và nhập số tấn để tính giá','Select a product and enter tonnage to calculate'],
      ['Không tìm thấy sản phẩm','Product not found'],
      ['🚛 Vận chuyển NM → PTSC','🚛 Transport: Factory → PTSC'],
      ['🚢 Bốc xếp & giao nhận (cầu cảng → tàu)','🚢 Loading & handling (wharf → vessel)'],
      ['🚛 Bốc dỡ & giao nhận (ô tô → kho cảng)','🚛 Unloading & handling (truck → port whse)'],
      ['🏗️ Bốc xếp & giao nhận (kho → cầu cảng)','🏗️ Loading & handling (whse → wharf)'],
      ['🔄 Chuyển tải hàng hóa','🔄 Transshipment'],
      ['🏭 Thuê kho cảng','🏭 Port whse rental'],
      ['📦 Vận hành kho (pallet + KCS)','📦 Warehouse ops (pallet + KCS)'],
      ['📋 Hải quan (lấy mẫu + Vilas + Tham vấn)','📋 Customs (sampling + Vilas + Consult)'],
      ['💰 Giá EXW gốc','💰 Base EXW price'],
      ['📊 Tổng chi phí FOB / tấn','📊 Total FOB costs / ton'],
      ['Giá thành FOB (chưa thuế)','FOB price (pre-tax)'],
      ['📋 Thuế xuất khẩu 5%','📋 Export tax 5%'],
      ['💰💎 Giá thành FOB (đã bao gồm XK)','💰💎 FOB price (incl. export)'],
      ['Giá thành FOB / tấn','FOB price / ton'],
      ['Tổng giá thành lô hàng','Total shipment price'],
      ['Không lưu kho','No warehouse'],
      ['Có lưu kho','With warehouse'],
      ['🌍 Xuất khẩu','🌍 Export'],
      ['ngày','days'],
      ['tấn','tons'],
      ['VNĐ/tấn','VND/ton'],
      ['Phí:','Fees:'],
      ['Thuế XK:','Export tax:']
    ];
    enJsMap.forEach(function(p){ fobJs = fobJs.split(p[0]).join(p[1]); });
  } else {
    var zhJsMap = [
      ['Chọn sản phẩm và nhập số tấn để tính giá','请选择产品并输入吨数以计算价格'],
      ['Không tìm thấy sản phẩm','未找到产品'],
      ['🚛 Vận chuyển NM → PTSC','🚛 运输：工厂 → PTSC'],
      ['🚢 Bốc xếp & giao nhận (cầu cảng → tàu)','🚢 装货与交接（码头 → 船舶）'],
      ['🚛 Bốc dỡ & giao nhận (ô tô → kho cảng)','🚛 卸货与交接（卡车 → 港口仓库）'],
      ['🏗️ Bốc xếp & giao nhận (kho → cầu cảng)','🏗️ 装货与交接（仓库 → 码头）'],
      ['🔄 Chuyển tải hàng hóa','🔄 货物转运'],
      ['🏭 Thuê kho cảng','🏭 港口仓库租赁'],
      ['📦 Vận hành kho (pallet + KCS)','📦 仓库运营（托盘 + KCS）'],
      ['📋 Hải quan (lấy mẫu + Vilas + Tham vấn)','📋 海关（取样 + Vilas + 咨询）'],
      ['💰 Giá EXW gốc','💰 EXW 原价'],
      ['📊 Tổng chi phí FOB / tấn','📊 FOB 总费用 / 吨'],
      ['Giá thành FOB (chưa thuế)','FOB 价格（税前）'],
      ['📋 Thuế xuất khẩu 5%','📋 出口税5%'],
      ['💰💎 Giá thành FOB (đã bao gồm XK)','💰💎 FOB 价格（含出口税）'],
      ['Giá thành FOB / tấn','FOB 价格 / 吨'],
      ['Tổng giá thành lô hàng','整批货物总价'],
      ['Không lưu kho','不含仓储'],
      ['Có lưu kho','含仓储'],
      ['🌍 Xuất khẩu','🌍 出口'],
      ['ngày','天'],
      [' VNĐ/tấn',' 越南盾/吨'],
      ['Phí:','费用：'],
      ['Thuế XK:','出口税：']
    ];
    zhJsMap.forEach(function(p){ fobJs = fobJs.split(p[0]).join(p[1]); });
  }

  // Insert into en/zh.html's LAST <script> tag
  var ss = html.lastIndexOf('<script>') + '<script>'.length;
  var se = html.lastIndexOf('</script>');
  html = html.slice(0, ss) + html.slice(ss, se) + '\n' + fobJs + '\n' + html.slice(se);

  fs.writeFileSync(file, html, 'utf8');
  console.log('✅ ' + lang + '.html done (' + fobJs.length + ' bytes JS)');
}

addFobPtsc(__dirname + '/en.html', 'en');
addFobPtsc(__dirname + '/zh.html', 'zh');

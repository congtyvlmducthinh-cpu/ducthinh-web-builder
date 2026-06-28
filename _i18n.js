const fs = require('fs');
const path = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html';
let c = fs.readFileSync(path, 'utf-8');

// ===== TRANSLATION DICT =====
const T = {
  "Kiểm Tra Giá": {"en":"Price Check","zh":"价格查询"},
  "Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh": {"en":"Price Check - Duc Thinh New Materials","zh":"价格查询 - 德盛新材料"},
  "Vật Liệu Mới Đức Thịnh - Bảng giá tháng 06/2026": {"en":"Duc Thinh New Materials - Pricelist June 2026","zh":"德盛新材料 - 2026年6月价目表"},
  "🏭 CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH": {"en":"🏭 DUC THINH NEW MATERIALS TECHNOLOGY CO., LTD","zh":"🏭 德盛新材料科技有限公司"},
  "ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM": {"en":"ADDR: NGHIA DAN IP, NGHIA THO COMMUNE, NGHE AN PROVINCE, VIETNAM","zh":"地址：义坛工业区，义寿乡，义安省，越南"},
  // Tab buttons
  "💰 Giá bán": {"en":"💰 Pricelist","zh":"💰 价格表"},
  "📋 Giá bán": {"en":"📋 Pricelist","zh":"📋 价格表"},
  "📦 Bao bì": {"en":"📦 Packaging","zh":"📦 包装"},
  "📐 Quy cách khác": {"en":"📐 Other Specs","zh":"📐 其他规格"},
  "⚙️ Quản lý": {"en":"⚙️ Manage","zh":"⚙️ 管理"},
  "📝 Tính giá": {"en":"📝 Cost Calc","zh":"📝 成本计算"},
  // Filters
  "Tất cả hãng": {"en":"All brands","zh":"所有品牌"},
  "Tất cả loại": {"en":"All types","zh":"所有类型"},
  "Tất cả máy": {"en":"All machines","zh":"所有机器"},
  "Tất cả nước": {"en":"All countries","zh":"所有国家"},
  "Tất cả tiêu chuẩn": {"en":"All standards","zh":"所有标准"},
  "💱 Loại tiền:": {"en":"💱 Currency:","zh":"💱 货币:"},
  "🌏 Thị trường:": {"en":"🌏 Market:","zh":"🌏 市场:"},
  "📡 Tra cước": {"en":"📡 Freight","zh":"📡 运费"},
  "📡 Tra cước biển": {"en":"📡 Freight lookup","zh":"📡 运费查询"},
  "📋 Ẩn max tải": {"en":"📋 Hide max load","zh":"📋 隐藏最大装载"},
  "📋 Hiện max tải": {"en":"📋 Show max load","zh":"📋 显示最大装载"},
  "⬇ Tải dữ liệu": {"en":"⬇ Download","zh":"⬇ 下载数据"},
  // Tab content
  "Nội địa": {"en":"Domestic","zh":"国内"},
  "Xuất khẩu": {"en":"Export","zh":"出口"},
  "Sản phẩm": {"en":"Product","zh":"产品"},
  "Mã bao": {"en":"Bag code","zh":"袋编码"},
  "Quy cách bao": {"en":"Bag spec","zh":"袋规格"},
  "Hãng": {"en":"Brand","zh":"品牌"},
  "Loại": {"en":"Type","zh":"类型"},
  "Nước đến": {"en":"Destination","zh":"目的国"},
  "Cước (USD)": {"en":"Freight (USD)","zh":"运费(美元)"},
  "Giá": {"en":"Price","zh":"价格"},
  "Giá bán": {"en":"Price","zh":"售价"},
  "Giá vốn": {"en":"Cost","zh":"成本"},
  "Lợi nhuận": {"en":"Profit","zh":"利润"},
  "Tiền tệ": {"en":"Currency","zh":"货币"},
  "Số lượng": {"en":"Qty","zh":"数量"},
  "ĐVT": {"en":"Unit","zh":"单位"},
  "Thông tin bao bì": {"en":"Packaging info","zh":"包装信息"},
  "Tên sản phẩm": {"en":"Product name","zh":"产品名称"},
  "Quy cách": {"en":"Spec","zh":"规格"},
  "Bảng giá": {"en":"Pricelist","zh":"价格表"},
  // Summary
  "Tổng loại bao": {"en":"Bag types","zh":"袋类型"},
  "Tổng quy cách": {"en":"Total specs","zh":"规格总计"},
  "Bao bì": {"en":"Packaging","zh":"包装"},
  // Calc tab
  "Chọn sản phẩm và bao bì để bắt đầu": {"en":"Select product & packaging","zh":"选择产品与包装"},
  "👈 Vui lòng chọn sản phẩm": {"en":"👈 Select a product","zh":"👈 请选择产品"},
  "❌ Không tìm thấy sản phẩm": {"en":"❌ Product not found","zh":"❌ 未找到产品"},
  "Kết quả tính giá": {"en":"Result","zh":"计算结果"},
  "Chọn sản phẩm trước": {"en":"Select product first","zh":"请先选择产品"},
  "🔖 Sản phẩm": {"en":"🔖 Product","zh":"🔖 产品"},
  "🏭 Máy": {"en":"🏭 Machine","zh":"🏭 机器"},
  "📋 Tiêu chuẩn": {"en":"📋 Standard","zh":"📋 标准"},
  "📋 Loại quy cách": {"en":"📋 Spec type","zh":"📋 规格类型"},
  "🛍️ Loại bao": {"en":"🛍️ Bag type","zh":"🛍️ 袋类型"},
  "📏 Quy cách bao": {"en":"📏 Bag spec","zh":"📏 袋规格"},
  "⚖️ Số tấn": {"en":"⚖️ Tons","zh":"⚖️ 吨数"},
  "— Chọn sản phẩm —": {"en":"— Select product —","zh":"— 选择产品 —"},
  "— Chọn máy —": {"en":"— Select machine —","zh":"— 选择机器 —"},
  "— Chọn tiêu chuẩn —": {"en":"— Select standard —","zh":"— 选择标准 —"},
  "— Không chọn —": {"en":"— None —","zh":"— 不选择 —"},
  "— Tự động —": {"en":"— Auto —","zh":"— 自动 —"},
  "— Tự động (theo quy cách bao) —": {"en":"— Auto (per bag spec) —","zh":"— 自动(按袋规格) —"},
  "— Không chọn bao bì —": {"en":"— No packaging —","zh":"— 无包装 —"},
  "Tấn": {"en":"Ton","zh":"吨"},
  "🎒 Bao bì": {"en":"🎒 Packaging","zh":"🎒 包装"},
  "Quy cách khác": {"en":"Other specs","zh":"其他规格"},
  "Tính giá thành": {"en":"Cost calc","zh":"成本计算"},
  "Hoa hồng cơ bản": {"en":"Base commission","zh":"基本佣金"},
  "Chênh lệch (30%)": {"en":"Margin share (30%)","zh":"差额(30%)"},
  "Tổng giá vốn": {"en":"Total cost","zh":"总成本"},
  "Tổng hoa hồng": {"en":"Total commission","zh":"总佣金"},
  // Manage
  "🔒 Chức năng quản lý yêu cầu mật khẩu": {"en":"🔒 Password required","zh":"🔒 需要密码"},
  "🔒 Nhập mật khẩu để tải / upload / cập nhật dữ liệu": {"en":"🔒 Enter password to manage data","zh":"🔒 输入密码管理数据"},
  "🔐 Nhập mật khẩu": {"en":"🔐 Enter password","zh":"🔐 输入密码"},
  "🔑 Đăng nhập": {"en":"🔑 Login","zh":"🔑 登录"},
  "❌ Sai mật khẩu!": {"en":"❌ Wrong password!","zh":"❌ 密码错误!"},
  "Xác nhận": {"en":"Confirm","zh":"确认"},
  "Hủy": {"en":"Cancel","zh":"取消"},
  "Đóng": {"en":"Close","zh":"关闭"},
  "Upload dữ liệu": {"en":"Upload data","zh":"上传数据"},
  "Kéo thả file vào đây": {"en":"Drop file here","zh":"拖放文件到此处"},
  "hoặc bấm để chọn": {"en":"or click to select","zh":"或点击选择"},
  "📤 Upload dữ liệu mới": {"en":"📤 Upload new data","zh":"📤 上传新数据"},
  "📄 Mẫu bao bì": {"en":"📄 Packing template","zh":"📄 包装模板"},
  "📄 Mẫu giá bán": {"en":"📄 Price template","zh":"📄 价格模板"},
  "📄 Mẫu max tải": {"en":"📄 Max load template","zh":"📄 最大装载模板"},
  "📄 Mẫu quy cách khác": {"en":"📄 Other spec template","zh":"📄 其他规格模板"},
  "📊 Mẫu đầy đủ": {"en":"📊 Full template","zh":"📊 完整模板"},
  "⚙️ Quản lý dữ liệu": {"en":"⚙️ Data management","zh":"⚙️ 数据管理"},
  "Cập nhật": {"en":"Update","zh":"更新"},
  // Quotation
  "📄 BÁO GIÁ": {"en":"📄 QUOTATION","zh":"📄 报价单"},
  "📄 Lên báo giá": {"en":"📄 Quotation","zh":"📄 生成报价单"},
  "Khách hàng": {"en":"Customer","zh":"客户"},
  "Người liên hệ": {"en":"Contact person","zh":"联系人"},
  "Cảng đi": {"en":"Port of loading","zh":"装运港"},
  "Giao hàng": {"en":"Delivery","zh":"交货"},
  "Người phụ trách": {"en":"Salesperson","zh":"负责人"},
  "Thanh toán": {"en":"Payment terms","zh":"付款条件"},
  "Hiệu lực": {"en":"Validity","zh":"有效期"},
  "Ghi chú": {"en":"Notes","zh":"备注"},
  "Báo giá - ": {"en":"Quotation - ","zh":"报价 - "},
  "15 ngày": {"en":"15 days","zh":"15天"},
  "30 ngày": {"en":"30 days","zh":"30天"},
  "7 ngày": {"en":"7 days","zh":"7天"},
  "Kể từ ngày ký": {"en":"From signing date","zh":"自签署之日起"},
  "Giá không bao gồm thuế VAT": {"en":"Excluding VAT","zh":"不含增值税"},
  "Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)": {"en":"Min: 1x20ft container (~21 tons)","zh":"最低：1x20尺柜(~21吨)"},
  "📦 Số lượng (tấn)": {"en":"📦 Quantity (tons)","zh":"📦 数量(吨)"},
  "💵 Điều kiện thanh toán": {"en":"💵 Payment terms","zh":"💵 付款条件"},
  "📅 Hiệu lực": {"en":"📅 Validity","zh":"📅 有效期"},
  "📞 Liên hệ": {"en":"📞 Contact","zh":"📞 联系方式"},
  "👤 Khách hàng": {"en":"👤 Customer","zh":"👤 客户"},
  "👤 Người phụ trách": {"en":"👤 Salesperson","zh":"👤 负责人"},
  "📝 Ghi chú": {"en":"📝 Notes","zh":"📝 备注"},
  "🌊 Cảng đi": {"en":"🌊 Port of loading","zh":"🌊 装运港"},
  "🚚 Giao hàng": {"en":"🚚 Delivery","zh":"🚚 交货"},
  "Chọn sản phẩm và tính giá trước khi lên báo giá": {"en":"Select product & calc price first","zh":"请先选择产品并计算价格"},
  "Chọn sản phẩm": {"en":"Select product","zh":"选择产品"},
  // Price mode
  "Loại LCC:": {"en":"LCC Type:","zh":"LCC类型:"},
  "🚂 Cước biển:": {"en":"🚂 Sea freight:","zh":"🚂 海运费:"},
  "Phụ phí": {"en":"Surcharge","zh":"附加费"},
  "🌏 Khác": {"en":"🌏 Other","zh":"🌏 其他"},
  "✅ Chọn tuyến": {"en":"✅ Select route","zh":"✅ 选择航线"},
  "Chọn": {"en":"Select","zh":"选择"},
  // Labels
  "⚖️ Max tải": {"en":"⚖️ Max load","zh":"⚖️ 最大装载"},
  "⚖️ Số tấn / bao Jumbo": {"en":"⚖️ Tons / Jumbo bag","zh":"⚖️ 吨/吨袋"},
  "🚛 Phí FOB / tấn": {"en":"🚛 FOB fee / ton","zh":"🚛 离岸费/吨"},
  "📐 Kích thước": {"en":"📐 Dimensions","zh":"📐 尺寸"},
  "⚙️ Máy / Tiêu chuẩn": {"en":"⚙️ Machine / Standard","zh":"⚙️ 机器/标准"},
  "📦 Sản phẩm": {"en":"📦 Product","zh":"📦 产品"},
  "Tùy chọn bao bì": {"en":"Packing options","zh":"包装选项"},
  // Lengthy
  "Giá chưa bao gồm chi phí vận chuyển đến kho người mua": {"en":"Price excludes delivery to buyer's warehouse","zh":"不含运输至买方仓库费用"},
  "Giá đã bao gồm chi phí vận chuyển đến kho người mua": {"en":"Price includes delivery to buyer's warehouse","zh":"已含运输至买方仓库费用"},
  "⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!": {"en":"⚠️ Using standard packaging cost. Select correctly for different types!","zh":"⚠️ 使用标准包装费用,不同包装请准确选择!"},
  // Quotation labels
  "Khách hàng:": {"en":"Customer:","zh":"客户："},
  "Người liên hệ:": {"en":"Contact:","zh":"联系人："},
  "Cảng đi:": {"en":"Port:","zh":"装运港："},
  "Điều kiện:": {"en":"Terms:","zh":"条件："},
  "Người phụ trách:": {"en":"Salesperson:","zh":"负责人："},
  "Thanh toán:": {"en":"Payment:","zh":"付款："},
  "Hiệu lực:": {"en":"Validity:","zh":"有效期："},
  "Ghi chú:": {"en":"Notes:","zh":"备注："},
  "Ngày:": {"en":"Date:","zh":"日期："},
  // Placeholders
  "Nhập giá bán...": {"en":"Enter price...","zh":"输入售价..."},
  "Nhân viên phụ trách...": {"en":"Salesperson...","zh":"负责人..."},
  "Tên khách hàng...": {"en":"Customer name...","zh":"客户名称..."},
  "Người liên hệ...": {"en":"Contact person...","zh":"联系人..."},
  "Cảng đi (nếu có)...": {"en":"Port (if any)...","zh":"装运港(如有)..."},
  "Điều kiện giao hàng...": {"en":"Delivery terms...","zh":"交货条件..."},
  "Email khách hàng...": {"en":"Customer email...","zh":"客户邮箱..."},
  "Ghi chú thêm...": {"en":"Additional notes...","zh":"附加备注..."},
  // Freight popup
  "Tra cước biển": {"en":"Freight lookup","zh":"运费查询"},
  // Other
  "25KG": {"en":"25KG","zh":"25公斤"},
  "Jumbo": {"en":"Jumbo","zh":"吨袋"},
  // Price table header in price tab
  "Giá": {"en":"Price","zh":"价格"},
  "Cước": {"en":"Freight","zh":"运费"},
  // Empty option
  "Thị trường:": {"en":"Market:","zh":"市场:"},
  "Cước biển:": {"en":"Sea freight:","zh":"海运费:"},
};

const langJson = JSON.stringify(T, null, 2);

// ===== 1. INJECT LANG OBJECT AFTER CDN SCRIPT =====
const cdnScriptEnd = c.indexOf('</script>') + 9; // after first </script> (CDN)
const langCode = '\n<script>\n// ===== ĐA NGÔN NGỮ =====\nvar LANG = ' + langJson + ';\n\nvar CURRENT_LANG = localStorage.getItem("ktg_lang") || "vi";\nfunction __(s) {\n  if (!s || typeof s !== "string") return s;\n  var t = LANG[CURRENT_LANG] && LANG[CURRENT_LANG][s];\n  return t !== undefined ? t : s;\n}\nfunction switchLang(l) {\n  CURRENT_LANG = l;\n  localStorage.setItem("ktg_lang", l);\n  var btns = document.querySelectorAll(".lang-btn");\n  btns.forEach(function(b) { b.classList.toggle("active", b.dataset.lang === CURRENT_LANG); });\n  document.documentElement.lang = CURRENT_LANG === "vi" ? "vi" : CURRENT_LANG === "en" ? "en" : "zh";\n  render();\n}\n</script>\n';

c = c.slice(0, cdnScriptEnd) + langCode + c.slice(cdnScriptEnd);

// ===== 2. ADD LANG BUTTONS TO HEADER =====
const langUI = `<div style="display:flex;gap:3px;margin-left:auto;z-index:1;position:relative">
<button class="lang-btn active" data-lang="vi" onclick="switchLang('vi')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">🇻🇳</button>
<button class="lang-btn" data-lang="en" onclick="switchLang('en')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">🇬🇧</button>
<button class="lang-btn" data-lang="zh" onclick="switchLang('zh')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">🇨🇳</button>
</div>
<style>.lang-btn.active{background:rgba(255,255,255,0.2)!important;border-color:#fff!important;box-shadow:0 0 0 1px rgba(255,255,255,0.4)}.lang-btn:hover{background:rgba(255,255,255,0.1)}</style>`;
c = c.replace('</header>', langUI + '\n</header>');

// ===== 3. REPLACE STRINGS IN JS CODE =====
// For each Vietnamese string, find it inside JS single/double quotes and wrap with __('')

const lines = c.split('\n');

// Find JS block boundaries
let inEarlyStyle = false;
let inScriptTag = false;  // the main inline script, not the LANG one
let scriptTagCount = 0;
let changed = 0;

// We need to know when we're in the main script block (the last <script>)
// and not in the LANG script or the CDN script
let mainScriptStart = -1;
let mainScriptEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('src=') && lines[i].includes('xlsx')) {
    // CDN script, skip
    continue;
  }
  if (lines[i].includes('<script>')) {
    // This might be the main script - track it
    if (mainScriptStart < 0) {
      mainScriptStart = i;
    } else {
      // Second <script> tag - this is the LANG one or there might be others
    }
  }
  if (lines[i].includes('</script>')) {
    if (mainScriptStart >= 0 && mainScriptEnd < 0) {
      mainScriptEnd = i;
    }
  }
}

// Actually let's just find the last <script> block which is the main render code
// The main script starts after the LANG injection
const langScriptIdx = c.indexOf('// ===== ĐA NGÔN NGỮ =====');
const mainScriptIdx = c.lastIndexOf('<script>');

console.log('LANG script at index:', langScriptIdx);
console.log('Main script at index:', mainScriptIdx);

// Process lines - find the main script content
let inMainScript = false;
let outputLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Detect entering main script (after LANG script)
  if (line.includes('<script>') && !line.includes('src=') && !inMainScript) {
    // Check if this is the main script (after the LANG block)
    if (i > 2 && lines[i-2] && lines[i-2].includes('ĐA NGÔN NGỮ')) {
      // This is the main script (we have LANG above)
      inMainScript = true;
    } else {
      // First <script> might be LANG or another one
      // Actually the LANG script has </script> which resets
    }
  }
  
  // Actually let me re-think: after our injection, the structure is:
  // <script src="xlsx..."></script>\n<script>\nLANG...\n</script>\n...<script>MAIN</script>
  // So the MAIN script is the LAST <script> tag
  
  // Reset: find the last opening <script> that's not CDN
}

// Simpler approach: just iterate through all lines, find the last <script> block
let lastScriptStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<script>') && !lines[i].includes('src=')) {
    lastScriptStart = i;
  }
}

let lastScriptEnd = -1;
for (let i = lastScriptStart + 1; i < lines.length; i++) {
  if (lines[i].includes('</script>')) {
    lastScriptEnd = i;
    break;
  }
}

console.log('Main script lines:', lastScriptStart, '-', lastScriptEnd);

// Now replace strings only in the main script area
const sortedKeys = Object.keys(T).sort((a,b) => b.length - a.length);

for (let i = 0; i < lines.length; i++) {
  // Only modify lines inside the main script
  if (i <= lastScriptStart || i >= lastScriptEnd) continue;
  
  let line = lines[i];
  let modified = false;
  
  for (const key of sortedKeys) {
    if (key.length < 2) continue;
    
    // Check for 'key' (single-quoted) or "key" (double-quoted)
    const sqKey = "'" + key.replace(/'/g, "\\'") + "'";
    const dqKey = '"' + key.replace(/"/g, '\\"') + '"';
    
    if (line.includes(sqKey)) {
      // Replace 'key' with __('key') inside JS string context
      // But the replacement needs to be: '+ __('key') +'
      // Only if the surrounding context is concatenation
      
      // If line has the form: '...' + 'key' + '...' -> we need 
      // '...' + __('key') + '...'
      
      line = line.split(sqKey).join("'+ __(" + sqKey + ") +'");
      modified = true;
    }
    
    if (line.includes(dqKey)) {
      line = line.split(dqKey).join('"+ __("' + key.replace(/"/g, '\\"') + '") +"');
      modified = true;
    }
  }
  
  if (modified) changed++;
  lines[i] = line;
}

c = lines.join('\n');
fs.writeFileSync(path, c, 'utf-8');
console.log('Changed', changed, 'lines');
console.log('Done');

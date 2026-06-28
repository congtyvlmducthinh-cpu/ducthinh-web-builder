const fs = require('fs');
const path = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html';
let c = fs.readFileSync(path, 'utf-8');

const T = {
  'Kiểm Tra Giá': {en:'Price Check',zh:'价格查询'},
  'Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh': {en:'Price Check - Duc Thinh New Materials',zh:'价格查询 - 德盛新材料'},
  '🏭 CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH': {en:'🏭 DUC THINH NEW MATERIALS TECHNOLOGY CO., LTD',zh:'🏭 德盛新材料科技有限公司'},
  'ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM': {en:'ADDR: NGHIA DAN IP, NGHIA THO COMMUNE, NGHE AN PROVINCE, VIETNAM',zh:'地址：义坛工业区，义寿乡，义安省，越南'},
  '💰 Giá bán': {en:'💰 Pricelist',zh:'💰 价格表'},
  '📋 Giá bán': {en:'📋 Pricelist',zh:'📋 价格表'},
  '📦 Bao bì': {en:'📦 Packaging',zh:'📦 包装'},
  '📐 Quy cách khác': {en:'📐 Other Specs',zh:'📐 其他规格'},
  '⚙️ Quản lý': {en:'⚙️ Manage',zh:'⚙️ 管理'},
  '📝 Tính giá': {en:'📝 Cost Calc',zh:'📝 成本计算'},
  '📡 Tra cước': {en:'📡 Freight',zh:'📡 运费'},
  '📡 Tra cước biển': {en:'📡 Freight lookup',zh:'📡 运费查询'},
  '📋 Ẩn max tải': {en:'📋 Hide max load',zh:'📋 隐藏最大装载'},
  '📋 Hiện max tải': {en:'📋 Show max load',zh:'📋 显示最大装载'},
  '⬇ Tải dữ liệu': {en:'⬇ Download',zh:'⬇ 下载数据'},
  'Nội địa': {en:'Domestic',zh:'国内'},
  'Xuất khẩu': {en:'Export',zh:'出口'},
  'Tất cả hãng': {en:'All brands',zh:'所有品牌'},
  'Tất cả loại': {en:'All types',zh:'所有类型'},
  'Tất cả máy': {en:'All machines',zh:'所有机器'},
  'Tất cả nước': {en:'All countries',zh:'所有国家'},
  'Tất cả tiêu chuẩn': {en:'All standards',zh:'所有标准'},
  '💱 Loại tiền:': {en:'💱 Currency:',zh:'💱 货币:'},
  '🌏 Thị trường:': {en:'🌏 Market:',zh:'🌏 市场:'},
  'Sản phẩm': {en:'Product',zh:'产品'},
  'Mã bao': {en:'Bag code',zh:'袋编码'},
  'Quy cách bao': {en:'Bag spec',zh:'袋规格'},
  'Hãng': {en:'Brand',zh:'品牌'},
  'Loại': {en:'Type',zh:'类型'},
  'Nước đến': {en:'Destination',zh:'目的国'},
  'Cước (USD)': {en:'Freight (USD)',zh:'运费(美元)'},
  'Giá': {en:'Price',zh:'价格'},
  'Giá bán': {en:'Price',zh:'售价'},
  'Giá vốn': {en:'Cost',zh:'成本'},
  'Lợi nhuận': {en:'Profit',zh:'利润'},
  'Tiền tệ': {en:'Currency',zh:'货币'},
  'Số lượng': {en:'Qty',zh:'数量'},
  'ĐVT': {en:'Unit',zh:'单位'},
  'Thông tin bao bì': {en:'Packaging info',zh:'包装信息'},
  'Tên sản phẩm': {en:'Product name',zh:'产品名称'},
  'Quy cách': {en:'Spec',zh:'规格'},
  'Bảng giá': {en:'Pricelist',zh:'价格表'},
  'Tổng loại bao': {en:'Bag types',zh:'袋类型'},
  'Tổng quy cách': {en:'Total specs',zh:'规格总计'},
  'Bao bì': {en:'Packaging',zh:'包装'},
  'Chọn sản phẩm và bao bì để bắt đầu': {en:'Select product',zh:'选择产品'},
  '👈 Vui lòng chọn sản phẩm': {en:'👈 Select a product',zh:'👈 请选择产品'},
  '❌ Không tìm thấy sản phẩm': {en:'❌ Product not found',zh:'❌ 未找到产品'},
  'Kết quả tính giá': {en:'Result',zh:'计算结果'},
  'Chọn sản phẩm trước': {en:'Select product first',zh:'请先选择产品'},
  '🔖 Sản phẩm': {en:'🔖 Product',zh:'🔖 产品'},
  '🏭 Máy': {en:'🏭 Machine',zh:'🏭 机器'},
  '📋 Tiêu chuẩn': {en:'📋 Standard',zh:'📋 标准'},
  '📋 Loại quy cách': {en:'📋 Spec type',zh:'📋 规格类型'},
  '🛍️ Loại bao': {en:'🛍️ Bag type',zh:'🛍️ 袋类型'},
  '📏 Quy cách bao': {en:'📏 Bag spec',zh:'📏 袋规格'},
  '⚖️ Số tấn': {en:'⚖️ Tons',zh:'⚖️ 吨数'},
  '— Chọn sản phẩm —': {en:'— Select product —',zh:'— 选择产品 —'},
  '— Chọn máy —': {en:'— Select machine —',zh:'— 选择机器 —'},
  '— Chọn tiêu chuẩn —': {en:'— Select standard —',zh:'— 选择标准 —'},
  '— Không chọn —': {en:'— None —',zh:'— 不选择 —'},
  '— Tự động —': {en:'— Auto —',zh:'— 自动 —'},
  '— Không chọn bao bì —': {en:'— No packaging —',zh:'— 无包装 —'},
  '— Tự động (theo quy cách bao) —': {en:'— Auto (per bag spec) —',zh:'— 自动(按袋规格) —'},
  'Tấn': {en:'Ton',zh:'吨'},
  '⚖️ Max tải': {en:'⚖️ Max load',zh:'⚖️ 最大装载'},
  '⚖️ Số tấn / bao Jumbo': {en:'⚖️ Tons / Jumbo bag',zh:'⚖️ 吨/吨袋'},
  '🚛 Phí FOB / tấn': {en:'🚛 FOB fee / ton',zh:'🚛 离岸费/吨'},
  '📐 Kích thước': {en:'📐 Dimensions',zh:'📐 尺寸'},
  '⚙️ Máy / Tiêu chuẩn': {en:'⚙️ Machine / Standard',zh:'⚙️ 机器/标准'},
  '📦 Sản phẩm': {en:'📦 Product',zh:'📦 产品'},
  'Tùy chọn bao bì': {en:'Packing options',zh:'包装选项'},
  'Tính giá thành': {en:'Cost calc',zh:'成本计算'},
  'Hoa hồng cơ bản': {en:'Base commission',zh:'基本佣金'},
  'Chênh lệch (30%)': {en:'Margin share (30%)',zh:'差额(30%)'},
  'Tổng giá vốn': {en:'Total cost',zh:'总成本'},
  'Tổng hoa hồng': {en:'Total commission',zh:'总佣金'},
  '🔒 Chức năng quản lý yêu cầu mật khẩu': {en:'🔒 Password required',zh:'🔒 需要密码'},
  '🔒 Nhập mật khẩu để tải / upload / cập nhật dữ liệu': {en:'🔒 Enter password to manage',zh:'🔒 输入密码管理数据'},
  '🔐 Nhập mật khẩu': {en:'🔐 Enter password',zh:'🔐 输入密码'},
  '🔑 Đăng nhập': {en:'🔑 Login',zh:'🔑 登录'},
  '❌ Sai mật khẩu!': {en:'❌ Wrong password!',zh:'❌ 密码错误!'},
  'Xác nhận': {en:'Confirm',zh:'确认'},
  'Hủy': {en:'Cancel',zh:'取消'},
  'Đóng': {en:'Close',zh:'关闭'},
  'Upload dữ liệu': {en:'Upload data',zh:'上传数据'},
  'Kéo thả file vào đây': {en:'Drop file here',zh:'拖放文件'},
  'hoặc bấm để chọn': {en:'or click',zh:'或点击选择'},
  '📤 Upload dữ liệu mới': {en:'📤 Upload',zh:'📤 上传'},
  '📄 Mẫu bao bì': {en:'📄 Packing template',zh:'📄 包装模板'},
  '📄 Mẫu giá bán': {en:'📄 Price template',zh:'📄 价格模板'},
  '📄 Mẫu max tải': {en:'📄 Max load template',zh:'📄 最大装载模板'},
  '📄 Mẫu quy cách khác': {en:'📄 Other spec template',zh:'📄 其他规格模板'},
  '📊 Mẫu đầy đủ': {en:'📊 Full template',zh:'📊 完整模板'},
  '⚙️ Quản lý dữ liệu': {en:'⚙️ Data management',zh:'⚙️ 数据管理'},
  'Cập nhật': {en:'Update',zh:'更新'},
  '📄 BÁO GIÁ': {en:'📄 QUOTATION',zh:'📄 报价单'},
  '📄 Lên báo giá': {en:'📄 Quotation',zh:'📄 报价'},
  'Khách hàng': {en:'Customer',zh:'客户'},
  'Người liên hệ': {en:'Contact person',zh:'联系人'},
  'Cảng đi': {en:'Port of loading',zh:'装运港'},
  'Giao hàng': {en:'Delivery',zh:'交货'},
  'Người phụ trách': {en:'Salesperson',zh:'负责人'},
  'Thanh toán': {en:'Payment terms',zh:'付款条件'},
  'Hiệu lực': {en:'Validity',zh:'有效期'},
  'Ghi chú': {en:'Notes',zh:'备注'},
  '15 ngày': {en:'15 days',zh:'15天'},
  '30 ngày': {en:'30 days',zh:'30天'},
  '7 ngày': {en:'7 days',zh:'7天'},
  'Kể từ ngày ký': {en:'From signing date',zh:'自签署之日起'},
  'Giá không bao gồm thuế VAT': {en:'Excluding VAT',zh:'不含增值税'},
  'Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)': {en:'Min: 1x20ft container (~21 tons)',zh:'最低：1x20尺柜(~21吨)'},
  '📦 Số lượng (tấn)': {en:'📦 Quantity (tons)',zh:'📦 数量(吨)'},
  '💵 Điều kiện thanh toán': {en:'💵 Payment terms',zh:'💵 付款条件'},
  '📅 Hiệu lực': {en:'📅 Validity',zh:'📅 有效期'},
  '📞 Liên hệ': {en:'📞 Contact',zh:'📞 联系方式'},
  '👤 Khách hàng': {en:'👤 Customer',zh:'👤 客户'},
  '👤 Người phụ trách': {en:'👤 Salesperson',zh:'👤 负责人'},
  '📝 Ghi chú': {en:'📝 Notes',zh:'📝 备注'},
  '🌊 Cảng đi': {en:'🌊 Port of loading',zh:'🌊 装运港'},
  '🚚 Giao hàng': {en:'🚚 Delivery',zh:'🚚 交货'},
  'Chọn sản phẩm và tính giá trước khi lên báo giá': {en:'Select product first',zh:'请先选择产品'},
  'Chọn sản phẩm': {en:'Select product',zh:'选择产品'},
  'Loại LCC:': {en:'LCC Type:',zh:'LCC类型:'},
  '🚂 Cước biển:': {en:'🚂 Sea freight:',zh:'🚂 海运费:'},
  'Phụ phí': {en:'Surcharge',zh:'附加费'},
  '🌏 Khác': {en:'🌏 Other',zh:'🌏 其他'},
  '✅ Chọn tuyến': {en:'✅ Select route',zh:'✅ 选择航线'},
  'Chọn': {en:'Select',zh:'选择'},
  'Giá chưa bao gồm chi phí vận chuyển đến kho người mua': {en:'Price excludes delivery',zh:'不含运输费'},
  'Giá đã bao gồm chi phí vận chuyển đến kho người mua': {en:'Price includes delivery',zh:'已含运输费'},
  '⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!': {en:'⚠️ Using standard packaging cost',zh:'⚠️ 标准包装费用'},
  'Khách hàng:': {en:'Customer:',zh:'客户：'},
  'Người liên hệ:': {en:'Contact:',zh:'联系人：'},
  'Cảng đi:': {en:'Port:',zh:'装运港：'},
  'Điều kiện:': {en:'Terms:',zh:'条件：'},
  'Người phụ trách:': {en:'Salesperson:',zh:'负责人：'},
  'Thanh toán:': {en:'Payment:',zh:'付款：'},
  'Hiệu lực:': {en:'Validity:',zh:'有效期：'},
  'Ghi chú:': {en:'Notes:',zh:'备注：'},
  'Ngày:': {en:'Date:',zh:'日期：'},
  'Nhập giá bán...': {en:'Enter price...',zh:'输入售价...'},
  'Nhân viên phụ trách...': {en:'Salesperson...',zh:'负责人...'},
  'Tên khách hàng...': {en:'Customer name...',zh:'客户名称...'},
  'Người liên hệ...': {en:'Contact person...',zh:'联系人...'},
  'Cảng đi (nếu có)...': {en:'Port (if any)...',zh:'装运港...'},
  'Điều kiện giao hàng...': {en:'Delivery terms...',zh:'交货条件...'},
  'Email khách hàng...': {en:'Customer email...',zh:'客户邮箱...'},
  'Ghi chú thêm...': {en:'Additional notes...',zh:'附加备注...'},
  'Quy cách khác': {en:'Other specs',zh:'其他规格'},
};

const langJson = JSON.stringify(T, null, 2);

// Step 1: LANG object after CDN script
const idx = c.indexOf('</script>');
const langCode = '\n<script>\n// ===== ĐA NGÔN NGỮ =====\nvar LANG = ' + langJson + ';\n\nvar CURRENT_LANG = localStorage.getItem("ktg_lang") || "vi";\nfunction __(s) {\n  if (!s || typeof s !== "string") return s;\n  var t = LANG[CURRENT_LANG] && LANG[CURRENT_LANG][s];\n  return t !== undefined ? t : s;\n}\nfunction switchLang(l) {\n  CURRENT_LANG = l;\n  localStorage.setItem("ktg_lang", l);\n  var btns = document.querySelectorAll(".lang-btn");\n  btns.forEach(function(b) { b.classList.toggle("active", b.dataset.lang === CURRENT_LANG); });\n  document.documentElement.lang = CURRENT_LANG === "vi" ? "vi" : CURRENT_LANG === "en" ? "en" : "zh";\n  render();\n}\n</script>\n';
c = c.slice(0, idx + 9) + langCode + c.slice(idx + 9);

// Step 2: Lang buttons in header
const headerEnd = c.indexOf('</header>');
const langUI = '<div style="display:flex;gap:3px;margin-left:auto;z-index:1;position:relative">\n<button class="lang-btn active" data-lang="vi" onclick="switchLang(\'vi\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\uD83C\uDDFB\uD83C\uDDF3</button>\n<button class="lang-btn" data-lang="en" onclick="switchLang(\'en\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\uD83C\uDDEC\uD83C\uDDE7</button>\n<button class="lang-btn" data-lang="zh" onclick="switchLang(\'zh\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\uD83C\uDDE8\uD83C\uDDF3</button>\n</div>\n<style>.lang-btn.active{background:rgba(255,255,255,0.2)!important;border-color:#fff!important;box-shadow:0 0 0 1px rgba(255,255,255,0.4)}.lang-btn:hover{background:rgba(255,255,255,0.1)}</style>\n';
c = c.slice(0, headerEnd) + langUI + c.slice(headerEnd);

// Step 3: Simple replacement for known patterns
// Find all occurrences of each key and replace them manually

// Do NOT replace in data lines
const dataSectionStart = c.indexOf('var DATA_PRODUCTS');
const dataSectionEnd = c.indexOf('function getProductDataIndex');
// Find the boundary - DATA_PRODUCTS to before getProductDataIndex
// Actually let's find the exact end of the DATA array
let dataEnd = dataSectionEnd;
// DATA section goes from DATA_PRODUCTS assignment until before "function"s start
let funcStart = c.indexOf('\nfunction ', dataSectionStart);

const sortedKeys = Object.keys(T).sort((a,b) => b.length - a.length);

// Process line by line
const lines = c.split('\n');
let changed = 0;
let inData = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Skip data declaration sections
  if (line.includes('var DATA_PRODUCTS') || line.includes('var DATA_BAGS') || 
      line.includes('var DATA_OTHERS') || line.includes('var DATA_MAX_LOADING')) {
    inData = true;
    continue;
  }
  if (inData && line.includes('];')) {
    inData = false;
    continue;
  }
  if (inData) continue;
  // Also skip the data.js section if there is one
  
  let orig = line;
  
  for (const vn of sortedKeys) {
    if (vn.length < 2) continue;
    if (vn === '25KG' || vn === 'Jumbo') continue; // These are data values, not display strings
    
    // Replace 'vn' or "vn" only in JS string context
    // Must be: some'vn'some or some"vn"some
    const esc = vn.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const escDq = vn.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    
    // Replace single-quoted: 'vn'
    // But NOT if it's in: spec: '25KG', or 'vn' in data
    const reSq = new RegExp("'" + vn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'", 'g');
    line = line.replace(reSq, function(m) {
      return "'+ __('" + esc + "') +'";
    });
    
    // Replace double-quoted
    const reDq = new RegExp('"' + vn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g');
    line = line.replace(reDq, function(m) {
      return '"+ __("' + escDq + '") +"';
    });
  }
  
  if (line !== orig) changed++;
  lines[i] = line;
}

c = lines.join('\n');
fs.writeFileSync(path, c, 'utf-8');
console.log('Changed lines:', changed);
console.log('Done');

/**
 * build.js — Build pipeline for Kiểm Tra Giá
 * node build.js [lang1] [lang2] ... (default: vi en zh)
 *
 * Lang translations:
 * - Template: replace {{KEY}} from LANG_TEMPLATE
 * - JS modules: replace Vietnamese strings with target language
 * - Company info in quotation uses the same template key
 */
const fs = require('fs'), path = require('path');
const ROOT = __dirname, SRC = path.join(ROOT, 'src'), MODS = path.join(ROOT, 'modules');

var LANGS = {
  vi: { html: 'vi', label: 'VI' },
  en: { html: 'en', label: 'EN' },
  zh: { html: 'zh', label: 'ZH' }
};

// Load lang strings
function loadLang(lang) {
  var l = {};
  var content = fs.readFileSync(path.join(SRC, 'lang', lang + '.js'), 'utf-8');
  // Evaluate the JS object
  eval(content);
  return LANG_TEMPLATE;
}

// JS Vietnamese → English/Chinese replacement map
function getJSReplMap(lang) {
  // These are Vietnamese strings used in JS modules that need translation
  // Only define non-VI entries; for VI, keep as-is
  if (lang === 'vi') return {};

  var maps = {
    en: {
      // Price list tab
      '⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.': '⚠️ CIF mode requires freight input. Please enter Freight USD in the toolbar above.',
      'Sản phẩm': 'Product',
      'Tiêu chuẩn': 'Standard',
      'Máy': 'Machine',
      'Ngày': 'Date',
      '📋 Hiện max tải': '📋 Show max load',
      'C.nhất 25KG': '25KG Bag',
      'C.nhất Jumbo': 'Jumbo Bag',
      'C.nhất EXW': 'EXW (no bag)',
      'Giá bán (EXW)': 'Selling price (EXW)',
      'Giá bao gồm bao bì': 'Price with packaging',
      'EXW chưa bao bì': 'EXW without packaging',
      'EXW 25KG bao tiêu chuẩn': 'EXW 25KG standard bag',
      'EXW jumbo bao tiêu chuẩn': 'EXW jumbo standard bag',
      'Hoa hồng cơ bản': 'Basic commission',
      'Hoa hồng': 'Commission',
      'Max tải': 'Max load',
      'Giá bán (EXW)': 'Selling price (EXW)',
      'Thông tin': 'Info',
      'Mã': 'Code',
      'Kích thước': 'Size',
      // Bags tab
      'Thông tin bao bì': 'Bag info',
      'Giá': 'Price',
      'Mã bao': 'Bag code',
      'Quy cách': 'Spec',
      'Số lượng': 'Quantity',
      'Giá vốn': 'Cost price',
      'Giá bán': 'Selling price',
      'Lợi nhuận': 'Profit',
      'Tổng loại bao': 'Total bag types',
      // Others tab
      'Quy cách khác': 'Other specs',
      'Tổng quy cách': 'Total specs',
      // Calculator tab
      'Chọn sản phẩm': 'Select product',
      '🏭 Máy': '🏭 Machine',
      '— Chọn máy —': '— Select machine —',
      '📋 Tiêu chuẩn': '📋 Standard',
      '— Chọn tiêu chuẩn —': '— Select standard —',
      '🔖 Sản phẩm': '🔖 Product',
      '— Chọn sản phẩm —': '— Select product —',
      '— Tự động —': '— Auto —',
      'Tùy chọn bao bì': 'Packaging options',
      '📏 Quy cách bao': '📏 Bag spec',
      '🛍️ Loại bao': '🛍️ Bag type',
      '— Không chọn —': '— None —',
      '⚖️ Số tấn / bao Jumbo': '⚖️ Tons / Jumbo bag',
      'Quy cách khác': 'Other specs',
      '📋 Loại quy cách': '📋 Spec type',
      '⚖️ Số tấn': '⚖️ Tons',
      'Kết quả tính giá': 'Price calculation result',
      '📡 Tra cước': '📡 Check freight',
      '💱 Loại tiền:': '💱 Currency:',
      'Chọn sản phẩm và bao bì để bắt đầu': 'Select product and packaging to start',
      '— Tự động (theo quy cách bao) —': '— Auto (based on bag spec) —',
      '— Không chọn bao bì —': '— No packaging —',
      'Chọn sản phẩm trước': 'Select product first',
      'Hoa hồng cơ bản': 'Basic commission',
      'Chênh lệch (30%)': 'Margin (30%)',
      'Tổng giá vốn': 'Total cost',
      'Tổng hoa hồng': 'Total commission',
      '👈 Vui lòng chọn sản phẩm': '👈 Please select a product',
      '❌ Không tìm thấy sản phẩm': '❌ Product not found',
      'Tiêu chuẩn ': 'Standard ',
      '📦 Sản phẩm': '📦 Product',
      '⚙️ Máy / Tiêu chuẩn': '⚙️ Machine / Standard',
      '📐 Kích thước': '📐 Size',
      ' có bao bì': ' with packaging',
      '🚛 Phí FOB / tấn': '🚛 FOB fee / ton',
      '🚢 Freight / tấn': '🚢 Freight / ton',
      '🏷️ Tổng giá thành (': '🏷️ Total cost (',
      '💰 Giá bán': '💰 Selling price',
      '📄 Lên báo giá': '📄 Create quotation',
      // Manage tab
      '❌ Chỉ hỗ trợ file Excel (.xlsx)': '❌ Only Excel files supported (.xlsx)',
      '⏳ Đang xử lý file...': '⏳ Processing file...',
      'Giá bán tối thiểu': 'Minimum selling price',
      'giá bán tối thiểu': 'minimum selling price',
      '✅ Đã cập nhật ': '✅ Updated ',
      ' bảng dữ liệu!': ' data table(s)!',
      '❌ Lỗi: ': '❌ Error: ',
      // Main
      '⏳ Đang lưu...': '⏳ Saving...',
      '✅ Đã lưu lên server! Tải lại en.html, zh.html để thấy dữ liệu mới.': '✅ Saved to server! Reload en.html, zh.html to see new data.',
      '❌ Không thể kết nối server!': '❌ Cannot connect to server!',
      // Freight
      ' tuyến': ' route(s)',
      // Quotation
      'Chọn sản phẩm và tính giá trước khi lên báo giá!': 'Select products and calculate price before creating quotation!',
      'Mã: ': 'Code: ',
      ' | Số: ': ' | No: ',
      'Chọn sản phẩm và tính giá trước khi lên báo giá': 'Select products and calculate price before creating quotation',
      'Khách hàng': 'Customer',
      'Người liên hệ': 'Contact person',
      'Người phụ trách': 'Assigned to',
      'Ngày:': 'Date:',
      'Cảng đi:': 'Port:',
      'STT': 'No',
      'Tên sản phẩm': 'Product name',
      'Spec': 'Spec',
      'Quy cách bao': 'Bag spec',
      'ĐVT': 'Unit',
      'SL': 'Qty',
      'Giá': 'Price',
      'Tiền tệ': 'Currency',
      'Điều kiện:': 'Terms:',
      'Hiệu lực:': 'Validity:',
      'Thanh toán:': 'Payment:',
      'Ghi chú:': 'Notes:',
      '- Giá không bao gồm thuế VAT': '- Price does not include VAT',
      'Giá chưa bao gồm chi phí vận chuyển đến kho người mua': 'Price does not include delivery to buyer warehouse',
      'Giá đã bao gồm chi phí vận chuyển đến kho người mua': 'Price includes delivery to buyer warehouse',
      '- Báo giá này có hiệu lực trong vòng ': '- This quotation is valid for ',
      '- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)': '- Minimum quantity: 1x20ft container (approx 21 tons)',
      'Chưa có dữ liệu sản phẩm': 'No product data',
      'Khách hàng: ': 'Customer: ',
      'Người liên hệ: ': 'Contact: ',
      'Người phụ trách: ': 'Assigned to: ',
      'Sản phẩm: ': 'Product: ',
      'Quy cách bao: ': 'Bag spec: ',
      'Số lượng: ': 'Quantity: ',
      'Điều kiện: ': 'Terms: ',
      'Cảng đi: ': 'Port: ',
      'Giá bán: ': 'Price: ',
      'Hiệu lực: ': 'Validity: ',
      'Thanh toán: ': 'Payment: ',
      'Ghi chú: ': 'Notes: ',
      'Giá chưa bao gồm chi phí vận chuyển': 'Price excludes shipping cost',
      'Giá đã bao gồm chi phí vận chuyển': 'Price includes shipping cost',
      '- Báo giá này có hiệu lực ': '- This quotation is valid ',
      '✅ Đã copy báo giá vào clipboard': '✅ Quotation copied to clipboard',
      'Copy đoạn text dưới đây:': 'Copy the text below:',
      'Chọn sản phẩm và tính giá trước!': 'Select product and calculate price first!',
      '- Giá không bao gồm thuế VAT<br>- ': '- Price does not include VAT<br>- ',
      'Tại kho nhà máy Đức Thịnh': 'At Duc Thinh factory warehouse',
      '<br>- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)<br><br><strong>': '<br>- Minimum quantity: 1x20ft container (approx 21 tons)<br><br><strong>',
      '<br>- Báo giá này có hiệu lực trong vòng ': '<br>- This quotation is valid for ',
      // Market
      'Mã SP': 'Product Code',
      'Mã sản phẩm': 'Product Code',
      'Cỡ hạt': 'Grain size',
      'Máy chạy': 'Machine',
      'Hoa hồng (VND)': 'Commission (VND)',
      'Hoa hồng(VND)': 'Commission(VND)',
      'Hoa hồng (USD)': 'Commission (USD)',
      'Hoa hồng(USD)': 'Commission(USD)',
    },
    zh: {
      // Same structure but Chinese
      '⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.': '⚠️ CIF模式需要输入运费。请在工具栏中输入运费USD。',
      'Sản phẩm': '产品',
      'Tiêu chuẩn': '标准',
      'Máy': '机器',
      'Ngày': '日期',
      '📋 Hiện max tải': '📋 显示最大装载',
      'C.nhất 25KG': '25KG袋',
      'C.nhất Jumbo': '吨袋',
      'C.nhất EXW': 'EXW(无袋)',
      'Giá bán (EXW)': '售价(EXW)',
      'Giá bao gồm bao bì': '含包装价格',
      'EXW chưa bao bì': 'EXW不含包装',
      'EXW 25KG bao tiêu chuẩn': 'EXW 25KG标准袋',
      'EXW jumbo bao tiêu chuẩn': 'EXW吨袋标准袋',
      'Hoa hồng cơ bản': '基本佣金',
      'Hoa hồng': '佣金',
      'Max tải': '最大装载量',
      'Thông tin': '信息',
      'Mã': '代码',
      'Kích thước': '尺寸',
      // Bags
      'Thông tin bao bì': '袋子信息',
      'Giá': '价格',
      'Mã bao': '袋代码',
      'Quy cách': '规格',
      'Số lượng': '数量',
      'Giá vốn': '成本价',
      'Giá bán': '售价',
      'Lợi nhuận': '利润',
      'Tổng loại bao': '袋类总数',
      // Others
      'Quy cách khác': '其他规格',
      'Tổng quy cách': '规格总数',
      // Calculator
      'Chọn sản phẩm': '选择产品',
      '🏭 Máy': '🏭 机器',
      '— Chọn máy —': '— 选择机器 —',
      '📋 Tiêu chuẩn': '📋 标准',
      '— Chọn tiêu chuẩn —': '— 选择标准 —',
      '🔖 Sản phẩm': '🔖 产品',
      '— Chọn sản phẩm —': '— 选择产品 —',
      '— Tự động —': '— 自动 —',
      'Tùy chọn bao bì': '包装选项',
      '📏 Quy cách bao': '📏 袋规格',
      '🛍️ Loại bao': '🛍️ 袋类型',
      '— Không chọn —': '— 不选 —',
      '⚖️ Số tấn / bao Jumbo': '⚖️ 吨数/吨袋',
      '📋 Loại quy cách': '📋 规格类型',
      '⚖️ Số tấn': '⚖️ 吨数',
      'Kết quả tính giá': '价格计算结果',
      '📡 Tra cước': '📡 查询运费',
      '💱 Loại tiền:': '💱 货币:',
      'Chọn sản phẩm và bao bì để bắt đầu': '请先选择产品和包装',
      '— Tự động (theo quy cách bao) —': '— 自动(根据袋规格) —',
      '— Không chọn bao bì —': '— 不选包装 —',
      'Chọn sản phẩm trước': '请先选择产品',
      'Chênh lệch (30%)': '差额(30%)',
      'Tổng giá vốn': '总成本',
      'Tổng hoa hồng': '总佣金',
      '👈 Vui lòng chọn sản phẩm': '👈 请选择产品',
      '❌ Không tìm thấy sản phẩm': '❌ 未找到产品',
      'Tiêu chuẩn ': '标准 ',
      '📦 Sản phẩm': '📦 产品',
      '⚙️ Máy / Tiêu chuẩn': '⚙️ 机器/标准',
      '📐 Kích thước': '📐 尺寸',
      ' có bao bì': ' 带包装',
      '🚛 Phí FOB / tấn': '🚛 FOB费用/吨',
      '🚢 Freight / tấn': '🚢 运费/吨',
      '🏷️ Tổng giá thành (': '🏷️ 总成本(',
      '💰 Giá bán': '💰 售价',
      '📄 Lên báo giá': '📄 创建报价',
      // Manage
      '❌ Chỉ hỗ trợ file Excel (.xlsx)': '❌ 仅支持Excel文件(.xlsx)',
      '⏳ Đang xử lý file...': '⏳ 正在处理文件...',
      'Giá bán tối thiểu': '最低售价',
      'giá bán tối thiểu': '最低售价',
      '✅ Đã cập nhật ': '✅ 已更新 ',
      ' bảng dữ liệu!': ' 个数据表!',
      '❌ Lỗi: ': '❌ 错误: ',
      // Main
      '⏳ Đang lưu...': '⏳ 正在保存...',
      '✅ Đã lưu lên server! Tải lại en.html, zh.html để thấy dữ liệu mới.': '✅ 已保存到服务器！刷新en.html、zh.html可查看新数据。',
      '❌ Không thể kết nối server!': '❌ 无法连接服务器!',
      // Freight
      ' tuyến': ' 条航线',
      // Quotation
      'Chọn sản phẩm và tính giá trước khi lên báo giá!': '请先选择产品和计算价格再创建报价!',
      'Mã: ': '代码: ',
      ' | Số: ': ' | 编号: ',
      'Chọn sản phẩm và tính giá trước khi lên báo giá': '请先选择产品和计算价格再创建报价',
      'Khách hàng': '客户',
      'Người liên hệ': '联系人',
      'Người phụ trách': '负责人',
      'Ngày:': '日期:',
      'Cảng đi:': '装运港:',
      'Tên sản phẩm': '产品名称',
      'Spec': '规格',
      'STT': '序号',
      'Quy cách bao': '袋规格',
      'ĐVT': '单位',
      'SL': '数量',
      'Giá': '价格',
      'Tiền tệ': '货币',
      'Điều kiện:': '条件:',
      'Hiệu lực:': '有效期:',
      'Thanh toán:': '付款:',
      'Ghi chú:': '备注:',
      '- Giá không bao gồm thuế VAT': '- 价格不含增值税',
      'Giá chưa bao gồm chi phí vận chuyển đến kho người mua': '价格不含至买方仓库的运费',
      'Giá đã bao gồm chi phí vận chuyển đến kho người mua': '价格含至买方仓库的运费',
      '- Báo giá này có hiệu lực trong vòng ': '- 此报价有效期 ',
      '- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)': '- 最低数量：1x20英尺集装箱（约21吨）',
      'Chưa có dữ liệu sản phẩm': '暂无产品数据',
      'Khách hàng: ': '客户: ',
      'Người liên hệ: ': '联系人: ',
      'Người phụ trách: ': '负责人: ',
      'Sản phẩm: ': '产品: ',
      'Quy cách bao: ': '袋规格: ',
      'Số lượng: ': '数量: ',
      'Điều kiện: ': '条件: ',
      'Cảng đi: ': '装运港: ',
      'Giá bán: ': '价格: ',
      'Hiệu lực: ': '有效期: ',
      'Thanh toán: ': '付款: ',
      'Ghi chú: ': '备注: ',
      'Giá chưa bao gồm chi phí vận chuyển': '价格不含运费',
      'Giá đã bao gồm chi phí vận chuyển': '价格含运费',
      '- Báo giá này có hiệu lực ': '- 此报价有效期 ',
      '✅ Đã copy báo giá vào clipboard': '✅ 报价已复制到剪贴板',
      'Copy đoạn text dưới đây:': '复制以下文本:',
      'Chọn sản phẩm và tính giá trước!': '请先选择产品和计算价格!',
      '- Giá không bao gồm thuế VAT<br>- ': '- 价格不含增值税<br>- ',
      'Tại kho nhà máy Đức Thịnh': '在德盛工厂仓库',
      '<br>- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)<br><br><strong>': '<br>- 最低数量：1x20英尺集装箱（约21吨）<br><br><strong>',
      '<br>- Báo giá này có hiệu lực trong vòng ': '<br>- 此报价有效期 ',
      // Market  
      'Mã SP': '产品代码',
      'Mã sản phẩm': '产品代码',
      'Cỡ hạt': '粒度',
      'Máy chạy': '机器',
      'Hoa hồng (VND)': '佣金(VND)',
      'Hoa hồng(VND)': '佣金(VND)',
      'Hoa hồng (USD)': '佣金(USD)',
      'Hoa hồng(USD)': '佣金(USD)',
    }
  };

  return maps[lang] || {};
}

function build(lang) {
  console.log('\n\u001b[94m\u27a1\ufe0f ' + lang.toUpperCase() + '\u001b[0m');
  var langStrings = loadLang(lang);
  var tpl = fs.readFileSync(path.join(SRC, 'template.html'), 'utf-8');

  // STEP 1: Replace all {{KEY}} in template
  Object.keys(langStrings).forEach(function(key) {
    var pattern = '{{' + key + '}}';
    var value = langStrings[key];
    // Use function callback to avoid $ patterns
    tpl = tpl.replace(pattern, function() { return value; });
  });

  var data = fs.readFileSync(path.join(SRC, 'data.js'), 'utf-8');
  var modules = fs.readdirSync(MODS).filter(function(f) { return f.endsWith('.js'); }).sort()
    .map(function(f) { return '// ' + f + '\n' + fs.readFileSync(path.join(MODS, f), 'utf-8'); }).join('\n');
  var langJs = fs.readFileSync(path.join(SRC, lang + '.js'), 'utf-8');
  var fullJs = data + '\n' + modules + '\n' + langJs;

  // STEP 2: Replace Vietnamese strings in JS with target language
  if (lang !== 'vi') {
    var jsRepl = getJSReplMap(lang);
    // Sort by length descending to replace longer matches first
    var sortedKeys = Object.keys(jsRepl).sort(function(a, b) { return b.length - a.length; });
    sortedKeys.forEach(function(vi) {
      var en = jsRepl[vi];
      fullJs = fullJs.split(vi).join(en);
    });
  }

  // Replace {{JS_INLINE}}
  var html = tpl.replace('{{JS_INLINE}}', function() { return fullJs; });
  // Replace {{LANG_SWITCHER}}
  html = html.replace('{{LANG_SWITCHER}}', function() { 
    var links = Object.keys(LANGS).map(function(l) {
      var cls = l === lang ? ' active' : '';
      return '<a href="' + LANGS[l].html + '.html" class="' + cls + '">' + LANGS[l].label + '</a>';
    });
    return '<div class="lang-switcher">' + links.join('') + '</div>';
  });
  html = html.replace('lang="vi"', 'lang="' + LANGS[lang].html + '"');

  fs.writeFileSync(path.join(ROOT, lang + '.html'), html, 'utf-8');
  var sizeKb = (fs.statSync(path.join(ROOT, lang + '.html')).size / 1024).toFixed(1);
  console.log('   \u2192 ' + lang + '.html (' + sizeKb + ' KB)');
}

var targets = process.argv.slice(2).filter(function(l) { return LANGS[l]; });
if (targets.length) targets.forEach(build);
else Object.keys(LANGS).forEach(build);
console.log('\n\u001b[92m\u2705 Done\u001b[0m');

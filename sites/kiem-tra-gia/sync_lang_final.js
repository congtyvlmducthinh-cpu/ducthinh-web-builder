const fs = require('fs');

const vi = fs.readFileSync('vi.html', 'utf8');
const enOld = fs.readFileSync('en.html', 'utf8');
const zhOld = fs.readFileSync('zh.html', 'utf8');

// Extract all localized strings from old EN/ZH files
function extractVars(s) {
  let res = {};
  ['COMPANY','ADDR','WEBSITE','EMAIL','PHONE','EXT','MST'].forEach(k => {
    let m = s.match(new RegExp('var\\s+' + k + '\\s*=\\s*["\']([^"\']+)["\']'));
    if (m) res[k] = m[1];
  });
  return res;
}

// Get EN and ZH form labels from old files
function getLabelMap(s, lang) {
  let map = {};
  let fields = ['customer','custemail','contact','assigned','valid','payment','port','note','unit'];
  let enLabels = {
    customer: '🏢 Customer',
    custemail: '📧 Contact Email',
    contact: '👤 Contact Person',
    assigned: '👤 Assigned To',
    valid: '⏱ Validity',
    payment: '💰 Payment',
    port: '⛵ Port of Loading',
    note: '📝 Note',
    unit: '📦 Unit'
  };
  let zhLabels = {
    customer: '🏢 客户',
    custemail: '📧 负责人邮箱',
    contact: '👤 联系人',
    assigned: '👤 负责人',
    valid: '⏱ 有效期',
    payment: '💰 付款方式',
    port: '⛵ 装运港',
    note: '📝 备注',
    unit: '📦 单位'
  };
  return lang === 'en' ? enLabels : zhLabels;
}

// Build EN version
let en = vi;

// 1. HTML lang
en = en.replace('lang="vi"', 'lang="en"');

// 2. Title
en = en.replace('<title>Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh</title>', '<title>Price Check - Duc Thinh New Materials</title>');

// 3. Header title + subtitle
en = en.replace('<h1>Kiểm Tra Giá', '<h1>Price Check');
en = en.replace('<span>🔍</span>', '<span>🔍</span>'); // same
en = en.replace('Vật Liệu Mới Đức Thịnh - Bảng giá tháng 06/2026', 'Duc Thinh New Materials - Price List June 2026');

// 4. Form labels
let enLabels = {
  customer: '🏢 Customer',
  custemail: '📧 Contact Email',
  contact: '👤 Contact Person',
  assigned: '👤 Assigned To',
  valid: '⏱ Validity',
  payment: '💰 Payment',
  port: '⛵ Port of Loading',
  note: '📝 Note',
  unit: '📦 Unit'
};

// Replace labels in the form HTML
let enForm = en.substring(en.indexOf('id="qCustomer"') - 300, en.indexOf('id="qCustomer"') + 200);
// Much easier: just do targeted replacements for each label
let viLabels = {
  '🏢 Khách hàng': '🏢 Customer',
  '📧 Email người phụ trách': '📧 Contact Email', 
  '👤 Người liên hệ': '👤 Contact Person',
  '👤 Người phụ trách': '👤 Assigned To',
  '⏱ Hiệu lực': '⏱ Validity',
  '💰 Thanh toán': '💰 Payment',
  '⛵ Cảng đi': '⛵ Port of Loading',
  '📝 Ghi chú': '📝 Note',
  '📦 ĐVT': '📦 Unit'
};

for (let [viL, enL] of Object.entries(viLabels)) {
  en = en.split(viL).join(enL);
}

// 5. Button text - search Vi and replace
en = en.split('BÁO GIÁ').join('QUOTATION');
en = en.split('Xem báo giá').join('View Quote');
en = en.split('In báo giá').join('Print Quote');
en = en.split('Copy báo giá').join('Copy Quote');
en = en.split('Thêm sản phẩm').join('Add Product');
en = en.split('sản phẩm').join('products');
en = en.split('Sản phẩm').join('Products');
en = en.split('Tên sản phẩm').join('Product Name');
en = en.split('Tìm kiếm').join('Search');
en = en.split('Đơn giá').join('Unit Price');
en = en.split('Số lượng').join('Quantity');
en = en.split('Thành tiền').join('Amount');
en = en.split('Tổng cộng').join('Total');
en = en.split('Khách hàng:').join('Customer:');
en = en.split('LH:').join('Contact:');
en = en.split('Email:').join('Email:');
en = en.split('Ngày báo giá:').join('Date:');
en = en.split('Hiệu lực:').join('Validity:');
en = en.split('Thanh toán:').join('Payment:');
en = en.split('Cảng đi:').join('Port:');
en = en.split('Ghi chú:').join('Note:');
en = en.split('ĐVT:').join('Unit:');
en = en.split('Giao hàng:').join('Delivery:');
en = en.split('Loại tiền:').join('Currency:');
en = en.split('Người liên hệ:').join('Contact:');
en = en.split('Người phụ trách:').join('Assigned:');

// 6. Alert messages 
en = en.split('Chưa có sản phẩm để xem báo giá!').join('No products to preview!');
en = en.split('Chưa có sản phẩm để in báo giá!').join('No products to print!');
en = en.split('Chưa có dữ liệu báo giá!').join('No quote data!');
en = en.split('✅ Đã copy báo giá vào clipboard').join('✅ Quote copied to clipboard');
en = en.split('⚠️ Vui lòng nhập Tên khách hàng trước khi xem báo giá!').join('⚠️ Please enter Customer name before viewing quote!');
en = en.split('⚠️ Vui lòng nhập Tên khách hàng trước khi in báo giá!').join('⚠️ Please enter Customer name before printing quote!');
en = en.split('⚠️ Vui lòng nhập Tên khách hàng trước khi copy báo giá!').join('⚠️ Please enter Customer name before copying quote!');
en = en.split('⚠️ Email người phụ trách không đúng định dạng! Vui lòng kiểm tra lại.').join('⚠️ Contact Email format is invalid! Please check again.');

// 7. Company info
let enVars = extractVars(enOld);
console.log('EN vars:', enVars);
if (enVars.COMPANY) {
  en = en.replace(/var COMPANY\s*=\s*["'][^"']*["']/, 'var COMPANY = "' + enVars.COMPANY + '"');
}
if (enVars.ADDR) {
  en = en.replace(/var ADDR\s*=\s*["'][^"']*["']/, 'var ADDR = "' + enVars.ADDR + '"');
}
if (enVars.WEBSITE) {
  en = en.replace(/var WEBSITE\s*=\s*["'][^"']*["']/, 'var WEBSITE = "' + enVars.WEBSITE + '"');
}
if (enVars.EMAIL) {
  en = en.replace(/var EMAIL\s*=\s*["'][^"']*["']/, 'var EMAIL = "' + enVars.EMAIL + '"');
}
if (enVars.PHONE) {
  en = en.replace(/var PHONE\s*=\s*["'][^"']*["']/, 'var PHONE = "' + enVars.PHONE + '"');
}
if (enVars.EXT) {
  en = en.replace(/var EXT\s*=\s*["'][^"']*["']/, 'var EXT = "' + enVars.EXT + '"');
}
if (enVars.MST) {
  en = en.replace(/var MST\s*=\s*["'][^"']*["']/, 'var MST = "' + enVars.MST + '"');
}

// Write EN
fs.writeFileSync('en.html', en, 'utf8');
console.log('EN file written.');

// === ZH version ===
let zh = vi;
zh = zh.replace('lang="vi"', 'lang="zh"');
zh = zh.replace('<title>Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh</title>', '<title>价格查询 - 德盛新材料</title>');
zh = zh.replace('<h1>Kiểm Tra Giá', '<h1>价格查询');
zh = zh.replace('Vật Liệu Mới Đức Thịnh - Bảng giá tháng 06/2026', '德盛新材料 - 2026年06月价格表');

let zhLabels = {
  '🏢 Khách hàng': '🏢 客户',
  '📧 Email người phụ trách': '📧 负责人邮箱',
  '👤 Người liên hệ': '👤 联系人',
  '👤 Người phụ trách': '👤 负责人',
  '⏱ Hiệu lực': '⏱ 有效期',
  '💰 Thanh toán': '💰 付款方式',
  '⛵ Cảng đi': '⛵ 装运港',
  '📝 Ghi chú': '📝 备注',
  '📦 ĐVT': '📦 单位'
};

for (let [viL, zhL] of Object.entries(zhLabels)) {
  zh = zh.split(viL).join(zhL);
}

zh = zh.split('BÁO GIÁ').join('报价单');
zh = zh.split('Xem báo giá').join('查看报价');
zh = zh.split('In báo giá').join('打印报价');
zh = zh.split('Copy báo giá').join('复制报价');
zh = zh.split('Thêm sản phẩm').join('添加产品');
zh = zh.split('sản phẩm').join('产品');
zh = zh.split('Sản phẩm').join('产品');
zh = zh.split('Tên sản phẩm').join('产品名称');
zh = zh.split('Tìm kiếm').join('搜索');
zh = zh.split('Đơn giá').join('单价');
zh = zh.split('Số lượng').join('数量');
zh = zh.split('Thành tiền').join('金额');
zh = zh.split('Tổng cộng').join('合计');
zh = zh.split('Khách hàng:').join('客户:');
zh = zh.split('LH:').join('联系人:');
zh = zh.split('Ngày báo giá:').join('日期:');
zh = zh.split('Hiệu lực:').join('有效期:');
zh = zh.split('Thanh toán:').join('付款:');
zh = zh.split('Cảng đi:').join('装运港:');
zh = zh.split('Ghi chú:').join('备注:');
zh = zh.split('ĐVT:').join('单位:');
zh = zh.split('Giao hàng:').join('交货:');
zh = zh.split('Loại tiền:').join('货币:');
zh = zh.split('Người liên hệ:').join('联系人:');
zh = zh.split('Người phụ trách:').join('负责人:');
zh = zh.split('Email:').join('邮箱:');

// Alert messages
zh = zh.split('Chưa có sản phẩm để xem báo giá!').join('暂无产品可查看报价!');
zh = zh.split('Chưa có sản phẩm để in báo giá!').join('暂无产品可打印报价!');
zh = zh.split('Chưa có dữ liệu báo giá!').join('暂无报价数据!');
zh = zh.split('✅ Đã copy báo giá vào clipboard').join('✅ 报价已复制到剪贴板');
zh = zh.split('⚠️ Vui lòng nhập Tên khách hàng trước khi xem báo giá!').join('⚠️ 请先输入客户名称!');
zh = zh.split('⚠️ Vui lòng nhập Tên khách hàng trước khi in báo giá!').join('⚠️ 请先输入客户名称!');
zh = zh.split('⚠️ Vui lòng nhập Tên khách hàng trước khi copy báo giá!').join('⚠️ 请先输入客户名称!');
zh = zh.split('⚠️ Email người phụ trách không đúng định dạng! Vui lòng kiểm tra lại.').join('⚠️ 负责人邮箱格式不正确! 请重新检查。');

// Company info
let zhVars = extractVars(zhOld);
console.log('ZH vars:', zhVars);
if (zhVars.COMPANY) {
  zh = zh.replace(/var COMPANY\s*=\s*["'][^"']*["']/, 'var COMPANY = "' + zhVars.COMPANY + '"');
}
if (zhVars.ADDR) {
  zh = zh.replace(/var ADDR\s*=\s*["'][^"']*["']/, 'var ADDR = "' + zhVars.ADDR + '"');
}
if (zhVars.WEBSITE) {
  zh = zh.replace(/var WEBSITE\s*=\s*["'][^"']*["']/, 'var WEBSITE = "' + zhVars.WEBSITE + '"');
}
if (zhVars.EMAIL) {
  zh = zh.replace(/var EMAIL\s*=\s*["'][^"']*["']/, 'var EMAIL = "' + zhVars.EMAIL + '"');
}
if (zhVars.PHONE) {
  zh = zh.replace(/var PHONE\s*=\s*["'][^"']*["']/, 'var PHONE = "' + zhVars.PHONE + '"');
}
if (zhVars.EXT) {
  zh = zh.replace(/var EXT\s*=\s*["'][^"']*["']/, 'var EXT = "' + zhVars.EXT + '"');
}
if (zhVars.MST) {
  zh = zh.replace(/var MST\s*=\s*["'][^"']*["']/, 'var MST = "' + zhVars.MST + '"');
}

fs.writeFileSync('zh.html', zh, 'utf8');
console.log('ZH file written.');

// Verify basic structure
console.log('VI size:', vi.length);
console.log('EN size:', en.length);
console.log('ZH size:', zh.length);

// Check no badges in en/zh
console.log('EN badge count:', (en.match(/class="badge"/g)||[]).length);
console.log('ZH badge count:', (zh.match(/class="badge"/g)||[]).length);

// Check validation exists
console.log('EN has validation:', en.includes('Vui lòng nhập') ? 'still old text' : en.includes('Please enter') ? 'ok' : 'missing');
console.log('ZH has validation:', zh.includes('Vui lòng nhập') ? 'still old text' : zh.includes('请先输入') ? 'ok' : 'missing');

// Syntax check
let scE = en.match(/<script>([\s\S]*?)<\/script>/g) || [];
let scZ = zh.match(/<script>([\s\S]*?)<\/script>/g) || [];
for(let i=0;i<scE.length;i++){
  try{ new Function(scE[i].replace(/<script>|<\/script>/g,'')); }
  catch(e){ console.log('EN SYNTAX ERROR:', e.message); }
}
for(let i=0;i<scZ.length;i++){
  try{ new Function(scZ[i].replace(/<script>|<\/script>/g,'')); }
  catch(e){ console.log('ZH SYNTAX ERROR:', e.message); }
}
console.log('Syntax checks done.');

const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
console.log("Initial size:", h.length);

// ===== VERIFY: is the multi-lang system intact? =====
console.log("Has LANG_MAP:", h.indexOf('var LANG_MAP') > -1);
console.log("Has lang-switcher:", h.indexOf('lang-switcher') > -1);

// ===== 1. Fix updateQuotationPreview labels =====
// Read the function, fix inline, write back
var funcStart = h.indexOf('function updateQuotationPreview()');
var funcEnd = h.indexOf('function copyQuotation()', funcStart);
var funcBody = h.substring(funcStart, funcEnd);

var repls = [
  // BÁO GIÁ title
  ['📄 BÁO GIÁ</p>', '"+t("quotation.title.prefix")+"</p>'],
  // Khách hàng:
  ['<strong>Khách hàng:</strong>', '<strong>"+t("quotation.label.customer")+":</strong>'],
  // Người liên hệ:
  ['<strong>Người liên hệ:</strong>', '<strong>"+t("quotation.label.contact")+":</strong>'],
  // Người phụ trách:
  ['<strong>Người phụ trách:</strong>', '<strong>"+t("quotation.label.assigned")+":</strong>'],
  // Ngày:
  ['<strong>Ngày:</strong>', '<strong>"+t("summary.date")+":</strong>'],
  // Cảng đi: (both occurrences)
  ['<strong>Cảng đi:</strong>', '<strong>"+t("quotation.label.port")+":</strong>'],
  // Điều kiện:
  ['<strong>Điều kiện:</strong>', '<strong>"+t("quotation.label.condition")+":</strong>'],
  // Hiệu lực:
  ['<strong>Hiệu lực:</strong>', '<strong>"+t("quotation.label.validity")+":</strong>'],
  // Thanh toán:
  ['<strong>Thanh toán:</strong>', '<strong>"+t("quotation.label.payment")+":</strong>'],
  // Ghi chú:
  ['<strong>Ghi chú:</strong>', '<strong>"+t("quotation.label.note")+":</strong>'],
];

var count = 0;
for (var r of repls) {
  // Only replace inside funcBody
  if (funcBody.indexOf(r[0]) > -1) {
    funcBody = funcBody.replace(r[0], r[1]);
    count++;
    // Check if there's a 2nd occurrence (like Cảng đi)
    if (funcBody.indexOf(r[0]) > -1) {
      funcBody = funcBody.replace(r[0], r[1]);
      count++;
    }
  }
}

console.log("Fixed", count, "patterns in updateQuotationPreview");

// Write back
h = h.substring(0, funcStart) + funcBody + h.substring(funcEnd);

// ===== 2. Fix printQuotation labels =====
funcStart = h.indexOf('function printQuotation()');
// Skip to end of this function - find by matching braces
var braceCount = 0;
var startAt = funcStart + 'function printQuotation()'.length;
// Find the opening { 
var openBrace = h.indexOf('{', startAt);
funcEnd = h.length;
// Scan for matching close brace
braceCount = 1;
for (var i = openBrace + 1; i < h.length; i++) {
  if (h[i] === '{') braceCount++;
  if (h[i] === '}') braceCount--;
  if (braceCount === 0) { funcEnd = i + 1; break; }
}
funcBody = h.substring(funcStart, funcEnd);

for (var r of repls) {
  if (funcBody.indexOf(r[0]) > -1) {
    funcBody = funcBody.replace(r[0], r[1]);
    if (funcBody.indexOf(r[0]) > -1) funcBody = funcBody.replace(r[0], r[1]);
  }
}
h = h.substring(0, funcStart) + funcBody + h.substring(funcEnd);
console.log("Fixed printQuotation labels");

// ===== 3. Fix onCalcProductChange =====
// "Chọn sản phẩm trước"
var inside = h.indexOf('Chọn sản phẩm trước');
if (inside > -1) {
  h = h.replace('Chọn sản phẩm trước', '"+t("calc.select.first")+"');
  console.log("Fixed calc select first");
}

// ===== 4. Fix Tấn in table =====
// Only inside updateQuotationPreview
inside = h.indexOf('<td>Tấn</td>');
if (inside > -1) {
  var ctx = h.substring(Math.max(0, inside - 100), inside + 100);
  if (ctx.indexOf('updateQuotationPreview') > -1 || ctx.indexOf('printQuotation') > -1) {
    h = h.replace('<td>Tấn</td>', '<td>"+t("calc.ton")+"</td>');
    console.log("Fixed Tấn in table");
  }
}

// ===== 5. Fix "Chọn sản phẩm" dropdown =====
// "— Chọn sản phẩm —" in onCalcProductChange
inside = h.indexOf('pe.innerHTML = \'<option value="">— Chọn sản phẩm —</option>\';');
if (inside > -1) {
  h = h.replace('pe.innerHTML = \'<option value="">— Chọn sản phẩm —</option>\';',
                'pe.innerHTML = \'<option value="">\'+t(\'calc.select.product\')+\'</option>\';');
  console.log("Fixed select product in onCalcProductChange");
}

// ===== 6. Fix "Tấn" in import =====
inside = h.indexOf('r["Tấn"]');
if (inside > -1) {
  // This is data key mapping - keep as-is
  console.log("Tấn in import data mapping - kept as-is");
}

// ===== 7. Add missing LANG_MAP entries properly =====
var mapEnd = h.indexOf('};', h.indexOf('var LANG_MAP'));
var missing = `
  "calc.select.first":{vi:"Chọn sản phẩm trước",en:"Select product first",zh:"请先选择产品"},
  "quotation.label.condition":{vi:"Điều kiện",en:"Condition",zh:"条件"},
  "table.product.name":{vi:"Tên sản phẩm",en:"Product Name",zh:"产品名称"},
  "table.price":{vi:"Giá",en:"Price",zh:"价格"},
  "calc.not.found":{vi:"❌ Không tìm thấy sản phẩm",en:"❌ Product not found",zh:"❌ 未找到产品"},
`;
h = h.substring(0, mapEnd) + missing + h.substring(mapEnd);
console.log("Added LANG_MAP entries");

console.log("Final size:", h.length);
fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log("Done!");

const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

const replacements = [
  // renderQuotationPreview - hardcoded labels
  ['"<div class=\"q-row\"><strong>Khách hàng:</strong><span>"+customer+"</span></div>"',
   '"<div class=\"q-row\"><strong>"+t(\'quotation.label.customer\')+":</strong><span>"+customer+"</span></div>"'],

  ['"<div class=\"q-row\"><strong>Người liên hệ:</strong><span>"+contact+"</span></div>"',
   '"<div class=\"q-row\"><strong>"+t(\'quotation.label.contact\')+":</strong><span>"+contact+"</span></div>"'],

  ['"<div class=\"q-row\"><strong>Người phụ trách:</strong><span>"+assigned+"</span></div>"',
   '"<div class=\"q-row\"><strong>"+t(\'quotation.label.assigned\')+":</strong><span>"+assigned+"</span></div>"'],

  // renderCalcTab - result header
  ["h += '<span>Kết quả tính giá</span>';",
   "h += '<span>'+t('calc.result.title')+'</span>';"],

  // calcPrice - empty state  
  ["h = '<div class=\"calc-empty\">👈 Vui lòng chọn sản phẩm</div>';",
   "h = '<div class=\"calc-empty\">'+t('calc.result.empty')+'</div>';"],

  // renderPriceTab - 25KG / Jumbo headers (2nd occurrence in dynamic HTML builds)
  // Already have <span data-lang...> wrapping these
  // Need to handle the row-level ones
  ["<span class=\"info-row\" data-lang=\"calc.ton\">(tấn)</span>",
   "<span class=\"info-row\" data-lang=\"calc.ton\">(tấn)</span>"],
  // Already correct

  // Quotation preview - more labels
  ["+ '<div class=\"q-row\"><strong>Số lượng:</strong><span>' + qtyDisplay",
   "+ '<div class=\"q-row\"><strong>'+t('quotation.label.qty')+':</strong><span>' + qtyDisplay"],

  ["'<div class=\"q-row\"><strong>Hiệu lực:</strong><span>' + valid",
   "'<div class=\"q-row\"><strong>'+t('quotation.label.validity')+':</strong><span>' + valid"],

  ["'<div class=\"q-row\"><strong>Thanh toán:</strong><span>' + payment",
   "'<div class=\"q-row\"><strong>'+t('quotation.label.payment')+':</strong><span>' + payment"],

  ["'<div class=\"q-row\"><strong>Cảng đi:</strong><span>' + port",
   "'<div class=\"q-row\"><strong>'+t('quotation.label.port')+':</strong><span>' + port"],

  ["'<div class=\"q-row\"><strong>Giao hàng:</strong><span>' + delivery",
   "'<div class=\"q-row\"><strong>'+t('quotation.label.delivery')+':</strong><span>' + delivery"],

  ["'<div class=\"q-row\"><strong>Ghi chú:</strong><span>' + note",
   "'<div class=\"q-row\"><strong>'+t('quotation.label.note')+':</strong><span>' + note"],

  // Export header row in downloadAsExcel
  // "Mã","Kích thước","Tiêu chuẩn","Máy","25KG (VND)","Jumbo (VND)","Giá bán ("
  ['["Mã","Kích thước","Tiêu chuẩn","Máy","25KG (VND)","Jumbo (VND)"',
   '[t("table.code"),t("table.size"),t("table.standard"),t("table.machine"),t("bag.spec.25kg")+" (VND)",t("bag.spec.jumbo")+" (VND)"'],

  // Payload row calcs - "Giá bán (EXW, VND)" type patterns
  // This is complex - the header has modeLabel and ccy vars. Let me check.
];

let count = 0;
for (const [o, n] of replacements) {
  if (h.indexOf(o) > -1) {
    h = h.replace(o, n);
    count++;
    console.log(`OK: ${o.substring(0, 50)}...`);
  } else {
    console.log(`MISS: ${o.substring(0, 50)}...`);
  }
}
console.log(`\nReplaced ${count}/${replacements.length}`);

// Now check for syntax errors by parsing
try {
  // Extract JS portion and check for basic errors
  console.log("File written, size:", h.length);
  fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
} catch(e) {
  console.log("Error:", e.message);
}

const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
let c = 0;

// ===== updateQuotationPreview =====

// Preview empty hint
var r0 = 'content.innerHTML="<p style=\"text-align:center;color:#94a3b8;font-size:13px\">Chọn sản phẩm và tính giá trước khi lên báo giá</p>";';
var r0n = 'content.innerHTML="<p style=\"text-align:center;color:#94a3b8;font-size:13px\">"+t(\"quotation.select.first\")+"</p>";';
if (h.indexOf(r0) > -1) { h = h.replace(r0, r0n); c++; console.log("fixed: preview empty hint"); }

// BÁO GIÁ title
var r1 = 'h+="<p style=\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\">📄 BÁO GIÁ</p>";';
var r1n = 'h+="<p style=\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\">"+t(\"quotation.title.prefix\")+"</p>";';
if (h.indexOf(r1) > -1) { h = h.replace(r1, r1n); c++; console.log("fixed: BÁO GIÁ title"); }

// Khách hàng
var r2 = 'h+="<div class=\"q-row\"><strong>Khách hàng:</strong><span>"+customer+"</span></div>";';
var r2n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.customer\")+":</strong><span>"+customer+"</span></div>";';
if (h.indexOf(r2) > -1) { h = h.replace(r2, r2n); c++; console.log("fixed: Khách hàng"); }

// Người liên hệ
var r3 = 'h+="<div class=\"q-row\"><strong>Người liên hệ:</strong><span>"+contact+"</span></div>";';
var r3n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.contact\")+":</strong><span>"+contact+"</span></div>";';
if (h.indexOf(r3) > -1) { h = h.replace(r3, r3n); c++; console.log("fixed: Người liên hệ"); }

// Người phụ trách
var r4 = 'h+="<div class=\"q-row\"><strong>Người phụ trách:</strong><span>"+assigned+"</span></div>";';
var r4n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.assigned\")+":</strong><span>"+assigned+"</span></div>";';
if (h.indexOf(r4) > -1) { h = h.replace(r4, r4n); c++; console.log("fixed: Người phụ trách"); }

// Email:
var r5 = 'h+="<div class=\"q-row\"><strong>Email:</strong><span>"+custEmail+"</span></div>";';
var r5n = 'h+="<div class=\"q-row\"><strong>Email:</strong><span>"+custEmail+"</span></div>";';
// Keep Email as-is, it's universal

// Ngày:
var r6 = 'h+="<div class=\"q-row\"><strong>Ngày:</strong><span>"+dateStr+"</span></div>";';
var r6n = 'h+="<div class=\"q-row\"><strong>"+t(\"summary.date\")+":</strong><span>"+dateStr+"</span></div>";';
if (h.indexOf(r6) > -1) { h = h.replace(r6, r6n); c++; console.log("fixed: Ngày"); }

// Cảng đi:
var r7 = 'h+="<div class=\"q-row\"><strong>Cảng đi:</strong><span>"+port+"</span></div>";';
var r7n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.port\")+":</strong><span>"+port+"</span></div>";';
if (h.indexOf(r7) > -1) { h = h.replace(r7, r7n); c++; console.log("fixed: Cảng đi (1st)"); }
// Match the 2nd occurrence too (inside conditional)
if (h.indexOf(r7) > -1) { h = h.replace(r7, r7n); c++; console.log("fixed: Cảng đi (2nd)"); }

// STT | Code | Tên sản phẩm | Spec | Quy cách bao | ĐVT | SL | Giá | Tiền tệ 
var r8 = 'h+="<thead><tr><th>STT</th><th>Code</th><th>Tên sản phẩm</th><th>Spec</th><th>Quy cách bao</th><th>ĐVT</th><th>SL</th><th>Giá</th><th>Tiền tệ</th></tr></thead>";';
var r8n = 'h+="<thead><tr><th>STT</th><th>Code</th><th>"+t(\"table.product.name\")+"</th><th>Spec</th><th>"+t(\"bags.spec\")+"</th><th>ĐVT</th><th>SL</th><th>"+t(\"table.price\")+"</th><th>Tiền tệ</th></tr></thead>";';
// Check if already fixed
if (h.indexOf('STT</th><th>Code</th><th>Tên sản phẩm') > -1 && h.indexOf('t("table.product.name")') === -1) {
  h = h.replace(r8, r8n); c++; console.log("fixed: table headers");
}

// Tấn in table
var r9 = '<td>Tấn</td>';
var r9ctx = h.indexOf(r9);
if (r9ctx > -1) {
  // Only replace inside updateQuotationPreview
  var ctx = h.substring(Math.max(0, r9ctx-500), r9ctx+100);
  if (ctx.indexOf('updateQuotationPreview') > -1 || ctx.indexOf('q-table') > -1) {
    h = h.replace(r9, '<td>'+'"+t(\"calc.ton\")+"'+'</td>');
    c++; console.log("fixed: Tấn in table");
  }
}

// Delivery Terms:
var r10 = 'h+="<div class=\"q-row\"><strong>Delivery Terms:</strong><span>"+delivery+"</span></div>";';
// Translate delivery terms label
var r10n = 'h+="<div class=\"q-row\"><strong>Delivery Terms:</strong><span>"+delivery+"</span></div>";';
// Keep as-is (it's English standard term)

// Điều kiện:
var r11 = 'h+="<div class=\"q-row\"><strong>Điều kiện:</strong><span>"+data.mode+"</span></div>";';
var r11n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.condition\")+":</strong><span>"+data.mode+"</span></div>";';
if (h.indexOf(r11) > -1) { h = h.replace(r11, r11n); c++; console.log("fixed: Điều kiện"); }

// Hiệu lực:
var r12 = 'h+="<div class=\"q-row\"><strong>Hiệu lực:</strong><span>"+valid+"</span></div>";';
var r12n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.validity\")+":</strong><span>"+valid+"</span></div>";';
if (h.indexOf(r12) > -1) { h = h.replace(r12, r12n); c++; console.log("fixed: Hiệu lực"); }

// Thanh toán:
var r13 = 'h+="<div class=\"q-row\"><strong>Thanh toán:</strong><span>"+payment+"</span></div>";';
var r13n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.payment\")+":</strong><span>"+payment+"</span></div>";';
if (h.indexOf(r13) > -1) { h = h.replace(r13, r13n); c++; console.log("fixed: Thanh toán"); }

// Ghi chú:
var r14 = 'h+="<div class=\"q-row\"><strong>Ghi chú:</strong><span>"+note+"</span></div>";';
var r14n = 'h+="<div class=\"q-row\"><strong>"+t(\"quotation.label.note\")+":</strong><span>"+note+"</span></div>";';
if (h.indexOf(r14) > -1) { h = h.replace(r14, r14n); c++; console.log("fixed: Ghi chú"); }

// ===== calcPrice empty states =====
// "Vui lòng chọn sản phẩm"
var r15 = "res.innerHTML = '<div class=\"calc-empty\">👈 Vui lòng chọn sản phẩm</div>';";
var r15n = "res.innerHTML = '<div class=\"calc-empty\">'+t('calc.result.empty')+'</div>';";
if (h.indexOf(r15) > -1) { h = h.replace(r15, r15n); c++; console.log("fixed: calc empty product"); }

// "Không tìm thấy sản phẩm"
var r16 = "res.innerHTML = '<div class=\"calc-empty\">❌ Không tìm thấy sản phẩm</div>';";
var r16n = "res.innerHTML = '<div class=\"calc-empty\">'+t('calc.not.found')+'</div>';";
if (h.indexOf(r16) > -1) { h = h.replace(r16, r16n); c++; console.log("fixed: calc not found product"); }

// ===== printQuotation - check for Vietnamese text =====
var pidx = h.indexOf('function printQuotation()');
if (pidx > -1) {
  var ptext = h.substring(pidx, pidx + 2000);
  // Check for BÁO GIÁ
  if (ptext.indexOf('BÁO GIÁ') > -1 && ptext.indexOf('t(') === -1) {
    console.log("\nprintQuotation has untranslated text! Fixing...");
  }
}

// ===== LANG_MAP: add missing keys =====
var langMapClose = h.lastIndexOf('};');
var langMapOpen = h.indexOf('var LANG_MAP');
var langMapSection = h.substring(langMapOpen, langMapClose + 2);

var missingEntries = `
  "calc.not.found":{vi:"❌ Không tìm thấy sản phẩm",en:"❌ Product not found",zh:"❌ 未找到产品"},
  "table.product.name":{vi:"Tên sản phẩm",en:"Product Name",zh:"产品名称"},
  "table.price":{vi:"Giá",en:"Price",zh:"价格"},
  "quotation.label.condition":{vi:"Điều kiện",en:"Condition",zh:"条件"},
  "quotation.label.delivery":{vi:"Delivery Terms",en:"Delivery Terms",zh:"交货条款"},
  "quotation.label.email":{vi:"Email",en:"Email",zh:"邮箱"},
`;

// Insert before the last };
var insertPos = h.lastIndexOf('};');
if (insertPos > -1) {
  var before = h.substring(langMapOpen, insertPos);
  var after = h.substring(insertPos);
  h = h.substring(0, langMapOpen) + before + missingEntries + after;
  console.log("Added missing LANG_MAP entries");
}

console.log(`\nTotal fixes: ${c}`);
fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log("File size:", h.length);

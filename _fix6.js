const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
let c = 0;

// Find the exact content of updateQuotationPreview and use precise replacements
// The problem: h+="..." not h += "..."

var r = [
  ['h+="<p style=\\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\\">📄 BÁO GIÁ</p>";',
   'h+="<p style=\\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\\">"+t("quotation.title.prefix")+"</p>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Khách hàng:</strong><span>"+customer+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.customer")+":</strong><span>"+customer+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Người liên hệ:</strong><span>"+contact+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.contact")+":</strong><span>"+contact+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Người phụ trách:</strong><span>"+assigned+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.assigned")+":</strong><span>"+assigned+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Ngày:</strong><span>"+dateStr+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("summary.date")+":</strong><span>"+dateStr+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Cảng đi:</strong><span>"+port+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.port")+":</strong><span>"+port+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Điều kiện:</strong><span>"+data.mode+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.condition")+":</strong><span>"+data.mode+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Hiệu lực:</strong><span>"+valid+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.validity")+":</strong><span>"+valid+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Thanh toán:</strong><span>"+payment+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.payment")+":</strong><span>"+payment+"</span></div>";'],
   
  ['h+="<div class=\\"q-row\\"><strong>Ghi chú:</strong><span>"+note+"</span></div>";',
   'h+="<div class=\\"q-row\\"><strong>"+t("quotation.label.note")+":</strong><span>"+note+"</span></div>";'],
];

var qidx = h.indexOf('function updateQuotationPreview()');
var qend = h.indexOf('// ====== COPY QUOTATION', qidx);
var qcontent = h.substring(qidx, qend);

for (var pair of r) {
  var oldStr = pair[0]; var newStr = pair[1];
  if (qcontent.indexOf(oldStr) > -1) {
    qcontent = qcontent.replace(oldStr, newStr);
    c++;
  } else {
    console.log("MISSED:", oldStr.substring(0, 60));
  }
}

// Replace the function body
h = h.substring(0, qidx) + qcontent + h.substring(qend);

console.log(`Fixed ${c} quotes in updateQuotationPreview`);
fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log("Done, size:", h.length);

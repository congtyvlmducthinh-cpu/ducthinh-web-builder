// Fix remaining Vietnamese strings in JS render functions
const fs = require('fs');
const h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// ============================================================
// renderBagsTab - table headers
// ============================================================
// The original line uses proper Unicode chars
// Let me find the exact text

// Fix 1: Header row "Mã bao" etc.
var line1 = "h += '<tr><th>Mã bao</th><th>Quy cách</th><th>Số lượng</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';";
var line1New = "h += '<tr><th>'+t('bags.code')+'</th><th>'+t('bags.spec')+'</th><th>'+t('qty')+'</th><th>'+t('cost.price')+'</th><th>'+t('sell.price')+'</th><th>'+t('profit')+'</th></tr>';";

if (h.indexOf(line1) > -1) {
  h = h.replace(line1, line1New);
  console.log("Fixed: renderBagsTab header row");
} else {
  console.log("NOT FOUND: renderBagsTab header row");
  // Try to find it
  var idx = h.indexOf('<th>Mã bao</th>');
  if (idx > -1) console.log("  Found at char", idx, ":", h.substring(idx-10, idx+80));
}

// Fix 2: "Tổng loại bao" summary
var line2 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Tổng loại bao</div><div class=\"val\">' + DATA_BAGS.length + '</div></div>';";
var line2New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('bags.total')+'</div><div class=\"val\">' + DATA_BAGS.length + '</div></div>';";

if (h.indexOf(line2) > -1) {
  h = h.replace(line2, line2New);
  console.log("Fixed: renderBagsTab tổng loại bao");
} else {
  console.log("NOT FOUND: Tổng loại bao summary");
  var idx = h.indexOf('Tổng loại bao');
  if (idx > -1) console.log("  Found at char", idx, ":", h.substring(idx-10, idx+100));
}

// Fix 3: "Bao 25KG" summary
var line3 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Bao 25KG</div><div class=\"val\">' + bag25 + '</div></div>';";
var line3New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('bag.spec.25kg')+'</div><div class=\"val\">' + bag25 + '</div></div>';";

if (h.indexOf(line3) > -1) {
  h = h.replace(line3, line3New);
  console.log("Fixed: Bao 25KG summary");
} else {
  console.log("NOT FOUND: Bao 25KG");
  var idx = h.indexOf('Bao 25KG');
  if (idx > -1) console.log("  Found at char", idx, ":", h.substring(idx-10, idx+100));
}

// Fix 4: "Bao Jumbo" summary
var line4 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Bao Jumbo</div><div class=\"val\">' + bagJumbo + '</div></div>';";
var line4New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('bag.spec.jumbo')+'</div><div class=\"val\">' + bagJumbo + '</div></div>';";

if (h.indexOf(line4) > -1) {
  h = h.replace(line4, line4New);
  console.log("Fixed: Bao Jumbo summary");
} else {
  console.log("NOT FOUND: Bao Jumbo");
  var idx = h.indexOf('Bao Jumbo');
  if (idx > -1) console.log("  Found at char", idx, ":", h.substring(idx-10, idx+100));
}

// ============================================================
// renderOthersTab
// ============================================================
var idxO1 = h.indexOf("function renderOthersTab()");
if (idxO1 > -1) {
  var oEnd = h.indexOf("// ====== RENDER OTHERS TAB", idxO1 + 20);
  if (oEnd === -1) oEnd = h.indexOf("function render", idxO1 + 100);
  if (oEnd === -1) oEnd = idxO1 + 2000;
  console.log("\nrenderOthersTab starting at", idxO1);
  console.log(h.substring(idxO1, idxO1 + 800));
}

// Fix renderOthersTab header
var lineO1 = "h += '<tr><th>Quy cách khác</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';";
var lineO1New = "h += '<tr><th>'+t('others.title')+'</th><th>'+t('cost.price')+'</th><th>'+t('sell.price')+'</th><th>'+t('profit')+'</th></tr>';";

if (h.indexOf(lineO1) > -1) {
  h = h.replace(lineO1, lineO1New);
  console.log("Fixed: renderOthersTab header");
} else {
  console.log("NOT FOUND: Quy cách khác header");
  var idx = h.indexOf('Quy cách khác</th>');
  if (idx > -1) console.log("  Found at char", idx);
}

// Fix "Tổng quy cách" summary
var lineO2 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Tổng quy cách</div><div class=\"val\">' + DATA_OTHERS.length + '</div></div>';";
var lineO2New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('others.total')+'</div><div class=\"val\">' + DATA_OTHERS.length + '</div></div>';";

if (h.indexOf(lineO2) > -1) {
  h = h.replace(lineO2, lineO2New);
  console.log("Fixed: Tổng quy cách summary");
} else {
  console.log("NOT FOUND: Tổng quy cách");
  var idx = h.indexOf('Tổng quy cách');
  if (idx > -1) console.log("  Found at char", idx);
}

// ============================================================
// renderPriceTab - table headings
// ============================================================
// "Thông tin" header
var lineP1 = "h += '<tr><th colspan=\"4\">Thông tin</th>'";
var lineP1New = "h += '<tr><th colspan=\"4\">'+t('table.info')+'</th>'";

if (h.indexOf(lineP1) > -1) {
  h = h.replace(lineP1, lineP1New);
  console.log("Fixed: Thông tin header");
} else {
  console.log("NOT FOUND: Thông tin header");
  var idx = h.indexOf('Thông tin</th>');
  if (idx > -1) console.log("  Found at char", idx, ":", h.substring(idx-20, idx+80));
}

// Column headers
var lineP2 = "h += '<th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th>'";
var lineP2New = "h += '<th>'+t('table.code')+'</th><th>'+t('table.size')+'</th><th>'+t('table.standard')+'</th><th>'+t('table.machine')+'</th>'";

if (h.indexOf(lineP2) > -1) {
  h = h.replace(lineP2, lineP2New);
  console.log("Fixed: Mã/Kích thước/Tiêu chuẩn/Máy headers");
} else {
  console.log("NOT FOUND: column headers");
  var idx = h.indexOf("Mã</th><th>Kích thước");
  if (idx > -1) console.log("  Found at char", idx, ":", h.substring(idx, idx+80));
}

// Max tải header
var lineP3 = "h += '<th colspan=\"2\" class=\"ml-toggle\">Max tải</th>'";
var lineP3New = "h += '<th colspan=\"2\" class=\"ml-toggle\">'+t('table.maxload')+'</th>'";

if (h.indexOf(lineP3) > -1) {
  h = h.replace(lineP3, lineP3New);
  console.log("Fixed: Max tải header");
}

// Giá bao gồm bao bì
var lineP4 = "h += '<th colspan=\"2\">Giá bao gồm bao bì</th>'";
var lineP4New = "h += '<th colspan=\"2\">'+t('table.price.incl.pkg')+'</th>'";

if (h.indexOf(lineP4) > -1) {
  h = h.replace(lineP4, lineP4New);
  console.log("Fixed: Giá bao gồm bao bì");
} else {
  var idx = h.indexOf('Giá bao gồm bao bì');
  if (idx > -1) console.log("  Found at char", idx);
}

// Giá bán (EXW)
var lineP5 = "h += '<th colspan=\"2\">Giá bán (EXW)</th>'";
var lineP5New = "h += '<th colspan=\"2\">'+t('table.price.sell')+'</th>'";

if (h.indexOf(lineP5) > -1) {
  h = h.replace(lineP5, lineP5New);
  console.log("Fixed: Giá bán EXW");
}

// ============================================================
// renderPriceTab - summary cards  
// ============================================================
// Sản phẩm
var lineS1 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Sản phẩm</div><div class=\"val\">' + Object.keys(uniqueCodes).length + '</div></div>';";
var lineS1New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.products')+'</div><div class=\"val\">' + Object.keys(uniqueCodes).length + '</div></div>';";

if (h.indexOf(lineS1) > -1) {
  h = h.replace(lineS1, lineS1New);
  console.log("Fixed: Sản phẩm summary");
}

// Tiêu chuẩn
var lineS2 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Tiêu chuẩn</div><div class=\"val\">' + Object.keys(uniqueSpecs).length + '</div></div>';";
var lineS2New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.standards')+'</div><div class=\"val\">' + Object.keys(uniqueSpecs).length + '</div></div>';";

if (h.indexOf(lineS2) > -1) {
  h = h.replace(lineS2, lineS2New);
  console.log("Fixed: Tiêu chuẩn summary");
}

// Máy
var lineS3 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Máy</div><div class=\"val\">' + Object.keys(uniqueMachines).length + '</div></div>';";
var lineS3New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.machines')+'</div><div class=\"val\">' + Object.keys(uniqueMachines).length + '</div></div>';";

if (h.indexOf(lineS3) > -1) {
  h = h.replace(lineS3, lineS3New);
  console.log("Fixed: Máy summary");
}

// Ngày
var lineS4 = "h += '<div class=\"summary-card\"><div class=\"lbl\">Ngày</div><div class=\"val\" style=\"font-size:16px\">25/06/2026</div></div>';";
var lineS4New = "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.date')+'</div><div class=\"val\" style=\"font-size:16px\">25/06/2026</div></div>';";

if (h.indexOf(lineS4) > -1) {
  h = h.replace(lineS4, lineS4New);
  console.log("Fixed: Ngày summary");
}

// ============================================================
// renderPriceTab - btn show/hide maxload
// ============================================================
var btn1 = "h += '<button class=\"btn-sm\" id=\"mlToggleBtn\" onclick=\"toggleMaxLoad()\" style=\"margin:0 0 0 auto;font-size:12px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer\">📋 Hiện max tải</button>';";
var btn1New = "h += '<button class=\"btn-sm\" id=\"mlToggleBtn\" onclick=\"toggleMaxLoad()\" style=\"margin:0 0 0 auto;font-size:12px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer\">'+t('btn.show.maxload')+'</button>';";

if (h.indexOf(btn1) > -1) {
  h = h.replace(btn1, btn1New);
  console.log("Fixed: Hiện max tải button");
} else {
  var idx = h.indexOf('Hiện max tải');
  if (idx > -1) console.log("  btn Hiện max tải found at", idx);
}

// toggleMaxLoad inner text
var tgl1 = "btn.textContent = hidden ? '📋 Hiện max tải' : '📋 Ẩn max tải';";
var tgl1New = "btn.textContent = hidden ? t('btn.show.maxload') : t('btn.hide.maxload');";

if (h.indexOf(tgl1) > -1) {
  h = h.replace(tgl1, tgl1New);
  console.log("Fixed: toggleMaxLoad text");
} else {
  var idx = h.indexOf('Hiện max tải');
  var idx2 = h.indexOf('Ẩn max tải');
  if (idx > -1 || idx2 > -1) console.log("  toggleMaxLoad exists, looking for exact match...");
}

// ============================================================
// renderCalcTab - section titles
// ============================================================
// Sản phẩm badge
var cl1 = "h += '<span class=\"badge blue\">📦</span><span class=\"title-text\">Sản phẩm</span>';";
var cl1New = "h += '<span class=\"badge blue\">📦</span><span class=\"title-text\">'+t('calc.section.products')+'</span>';";

if (h.indexOf(cl1) > -1) {
  h = h.replace(cl1, cl1New);
  console.log("Fixed: calc section products");
}

// Bao bì badge
var cl2 = "h += '<span class=\"badge green\">🛍️</span><span class=\"title-text\">Bao bì</span>';";
var cl2New = "h += '<span class=\"badge green\">🛍️</span><span class=\"title-text\">'+t('calc.section.bags')+'</span>';";

if (h.indexOf(cl2) > -1) {
  h = h.replace(cl2, cl2New);
  console.log("Fixed: calc section bags");
}

// Quy cách khác badge
var cl3 = "h += '<span class=\"badge purple\">📐</span><span class=\"title-text\">Quy cách khác</span>';";
var cl3New = "h += '<span class=\"badge purple\">📐</span><span class=\"title-text\">'+t('calc.section.others')+'</span>';";

if (h.indexOf(cl3) > -1) {
  h = h.replace(cl3, cl3New);
  console.log("Fixed: calc section others");
}

// ============================================================
// renderCalcTab - result section
// ============================================================
// Kết quả tính giá
var cl4 = "h += '<span class=\"icon\">📊</span>Kết quả tính giá</div>';";
var cl4New = "h += '<span class=\"icon\">📊</span>'+t('calc.result.title')+'</div>';";

if (h.indexOf(cl4) > -1) {
  h = h.replace(cl4, cl4New);
  console.log("Fixed: Kết quả tính giá title");
}

// Vui lòng chọn sản phẩm
var cl5 = "h += '<div class=\"calc-empty-text\">👈 Vui lòng chọn sản phẩm</div>';";
var cl5New = "h += '<div class=\"calc-empty-text\">'+t('calc.result.empty')+'</div>';";

if (h.indexOf(cl5) > -1) {
  h = h.replace(cl5, cl5New);
  console.log("Fixed: calc empty text");
}

// Giá vốn (EXW)
var cl6 = "h += '<div class=\"calc-rl\">Giá vốn (EXW)</div>';";
var cl6New = "h += '<div class=\"calc-rl\">'+t('calc.result.exw')+'</div>';";

if (h.indexOf(cl6) > -1) {
  h = h.replace(cl6, cl6New);
  console.log("Fixed: Giá vốn EXW");
}

// Giá bao gồm bao bì
var cl7 = "h += '<div class=\"calc-rl\">Giá bao gồm bao bì</div>';";
var cl7New = "h += '<div class=\"calc-rl\">'+t('calc.result.bag')+'</div>';";

if (h.indexOf(cl7) > -1) {
  h = h.replace(cl7, cl7New);
  console.log("Fixed: calc result bag");
}

// Phụ phí
var cl8 = "h += '<div class=\"calc-rl\">Phụ phí</div>';";
var cl8New = "h += '<div class=\"calc-rl\">'+t('calc.result.other')+'</div>';";

if (h.indexOf(cl8) > -1) {
  h = h.replace(cl8, cl8New);
  console.log("Fixed: calc result other");
}

// ============================================================
// getQuotationText
// ============================================================
var q1 = 't+="Khách hàng: "+customer+"\\n";';
var q1New = 't+=t("quotation.label.customer")+": "+customer+"\\n";';

if (h.indexOf(q1) > -1) {
  h = h.replace(q1, q1New);
  console.log("Fixed: quotation customer");
}

var q2 = 't+="Người liên hệ: "+contact+"\\n";';
var q2New = 't+=t("quotation.label.contact")+": "+contact+"\\n";';

if (h.indexOf(q2) > -1) {
  h = h.replace(q2, q2New);
  console.log("Fixed: quotation contact");
}

var q3 = 't+="Người phụ trách: "+assigned+"\\n";';
var q3New = 't+=t("quotation.label.assigned")+": "+assigned+"\\n";';

if (h.indexOf(q3) > -1) {
  h = h.replace(q3, q3New);
  console.log("Fixed: quotation assigned");
}

var q4 = 't+="Sản phẩm: "+data.product+"\\n";';
var q4New = 't+=t("calc.label.product")+": "+data.product+"\\n";';

if (h.indexOf(q4) > -1) {
  h = h.replace(q4, q4New);
  console.log("Fixed: quotation product");
}

var q5 = 't+="Quy cách bao: "+data.bagSpec+"\\n";';
var q5New = 't+=t("bags.spec")+": "+data.bagSpec+"\\n";';

if (h.indexOf(q5) > -1) {
  h = h.replace(q5, q5New);
  console.log("Fixed: quotation bag spec");
}

// Số lượng with tấn
var q6 = 't+="Số lượng: "+qty+" tấn\\n";';
var q6New = 't+=t("quotation.label.qty")+": "+qty+" "+t("calc.ton")+"\\n";';

if (h.indexOf(q6) > -1) {
  h = h.replace(q6, q6New);
  console.log("Fixed: quotation qty");
}

var q7 = 't+="Hiệu lực: "+valid+"\\n";';
var q7New = 't+=t("quotation.label.validity")+": "+valid+"\\n";';

if (h.indexOf(q7) > -1) {
  h = h.replace(q7, q7New);
  console.log("Fixed: quotation validity");
}

var q8 = 't+="Thanh toán: "+payment+"\\n";';
var q8New = 't+=t("quotation.label.payment")+": "+payment+"\\n";';

if (h.indexOf(q8) > -1) {
  h = h.replace(q8, q8New);
  console.log("Fixed: quotation payment");
}

var q9 = 't+="Cảng đi: "+port+"\\n";';
var q9New = 't+=t("quotation.label.port")+": "+port+"\\n";';

if (h.indexOf(q9) > -1) {
  h = h.replace(q9, q9New);
  console.log("Fixed: quotation port");
}

// BÁO GIÁ title in quotation
var q10 = 't+="📄 BÁO GIÁ\\n";';
var q10New = 't+=t("quotation.title.prefix")+"\\n";';

if (h.indexOf(q10) > -1) {
  h = h.replace(q10, q10New);
  console.log("Fixed: quotation title");
}

// ============================================================
// updateDataInfo
// ============================================================
var u1 = 'el.textContent = "📊 " + DATA_PRODUCTS.length + " SP · " + DATA_BAGS.length + " BB · " + DATA_OTHERS.length + " QC";';
var u1New = 'el.textContent = "📊 " + DATA_PRODUCTS.length + " " + t("manage.prods") + " · " + DATA_BAGS.length + " " + t("manage.bags") + " · " + DATA_OTHERS.length + " " + t("manage.other.specs") + "";';

if (h.indexOf(u1) > -1) {
  h = h.replace(u1, u1New);
  console.log("Fixed: dataInfo text");
}

// Fallback: single SP
var u2 = 'el.textContent = "📊 " + DATA_PRODUCTS.length + " SP";';
var u2New = 'el.textContent = "📊 " + DATA_PRODUCTS.length + " " + t("manage.prods");';

if (h.indexOf(u2) > -1) {
  h = h.replace(u2, u2New);
  console.log("Fixed: dataInfo text (fallback)");
}

// ============================================================
// CIF warning text in renderPriceTab
// ============================================================
var cifWarn1 = "h += '<div class=\"freight-warning\">⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.</div>';";
var cifWarn1New = "h += '<div class=\"freight-warning\">'+t('warn.cif.freight')+'</div>';";

if (h.indexOf(cifWarn1) > -1) {
  h = h.replace(cifWarn1, cifWarn1New);
  console.log("Fixed: CIF warning text");
} else {
  var idx = h.indexOf('Chế độ CIF');
  if (idx > -1) console.log("  CIF warning found at", idx);
}

// ============================================================
// alert strings
// ============================================================
var al1 = 'alert("Chọn sản phẩm và tính giá trước khi lên báo giá!")';
var al1New = 'alert(t("quotation.select.first"))';

if (h.indexOf(al1) > -1) {
  h = h.replace(al1, al1New);
  console.log("Fixed: alert chọn sản phẩm trước");
}

var al2 = 'alert("✅ Đã copy báo giá vào clipboard")';
var al2New = 'alert(t("quotation.copied"))';

if (h.indexOf(al2) > -1) {
  h = h.replace(al2, al2New);
  console.log("Fixed: alert copy quotation");
}

// ============================================================
// Write back
// ============================================================
fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log("\nDone! File size:", h.length);

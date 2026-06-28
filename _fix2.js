const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

const replacements = [
  // renderBagsTab - column headers
  ["h += '<tr><th>Mã bao</th><th>Quy cách</th><th>Số lượng</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';",
   "h += '<tr><th>'+t('bags.code')+'</th><th>'+t('bags.spec')+'</th><th>'+t('qty')+'</th><th>'+t('cost.price')+'</th><th>'+t('sell.price')+'</th><th>'+t('profit')+'</th></tr>';"],

  // renderBagsTab - summary totals
  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Tổng loại bao</div><div class=\"val\">' + DATA_BAGS.length + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('bags.total')+'</div><div class=\"val\">' + DATA_BAGS.length + '</div></div>';"],

  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Bao 25KG</div><div class=\"val\">' + bag25 + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('bag.spec.25kg')+'</div><div class=\"val\">' + bag25 + '</div></div>';"],

  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Bao Jumbo</div><div class=\"val\">' + bagJumbo + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('bag.spec.jumbo')+'</div><div class=\"val\">' + bagJumbo + '</div></div>';"],

  // renderOthersTab
  ["h += '<tr><th>Quy cách khác</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';",
   "h += '<tr><th>'+t('others.title')+'</th><th>'+t('cost.price')+'</th><th>'+t('sell.price')+'</th><th>'+t('profit')+'</th></tr>';"],

  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Tổng quy cách</div><div class=\"val\">' + DATA_OTHERS.length + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('others.total')+'</div><div class=\"val\">' + DATA_OTHERS.length + '</div></div>';"],

  // renderPriceTab - table headings
  ["h += '<tr><th colspan=\"4\">Thông tin</th>'",
   "h += '<tr><th colspan=\"4\">'+t('table.info')+'</th>'"],

  ["h += '<th colspan=\"2\" class=\"ml-toggle\">Max tải</th>'",
   "h += '<th colspan=\"2\" class=\"ml-toggle\">'+t('table.maxload')+'</th>'"],

  ["h += '<th colspan=\"2\">Giá bao gồm bao bì</th>'",
   "h += '<th colspan=\"2\">'+t('table.price.incl.pkg')+'</th>'"],

  ["h += '<th colspan=\"2\">Giá bán (EXW)</th>'",
   "h += '<th colspan=\"2\">'+t('table.price.sell')+'</th>'"],

  ["h += '<th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th>'",
   "h += '<th>'+t('table.code')+'</th><th>'+t('table.size')+'</th><th>'+t('table.standard')+'</th><th>'+t('table.machine')+'</th>'"],

  // renderPriceTab - summary cards
  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Sản phẩm</div><div class=\"val\">' + Object.keys(uniqueCodes).length + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.products')+'</div><div class=\"val\">' + Object.keys(uniqueCodes).length + '</div></div>';"],

  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Tiêu chuẩn</div><div class=\"val\">' + Object.keys(uniqueSpecs).length + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.standards')+'</div><div class=\"val\">' + Object.keys(uniqueSpecs).length + '</div></div>';"],

  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Máy</div><div class=\"val\">' + Object.keys(uniqueMachines).length + '</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.machines')+'</div><div class=\"val\">' + Object.keys(uniqueMachines).length + '</div></div>';"],

  ["h += '<div class=\"summary-card\"><div class=\"lbl\">Ngày</div><div class=\"val\" style=\"font-size:16px\">25/06/2026</div></div>';",
   "h += '<div class=\"summary-card\"><div class=\"lbl\">'+t('summary.date')+'</div><div class=\"val\" style=\"font-size:16px\">25/06/2026</div></div>';"],

  // renderPriceTab - ML toggle button
  // This one might use different quote escapes, try escaped unicode for emoji
  ["h += '<button class=\"btn-sm\" id=\"mlToggleBtn\" onclick=\"toggleMaxLoad()\" style=\"margin:0 0 0 auto;font-size:12px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer\">📋 Hiện max tải</button>';",
   "h += '<button class=\"btn-sm\" id=\"mlToggleBtn\" onclick=\"toggleMaxLoad()\" style=\"margin:0 0 0 auto;font-size:12px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer\">'+t('btn.show.maxload')+'</button>';"],

  // toggleMaxLoad
  ["btn.textContent = hidden ? '📋 Hiện max tải' : '📋 Ẩn max tải';",
   "btn.textContent = hidden ? t('btn.show.maxload') : t('btn.hide.maxload');"],

  // renderCalcTab - section titles
  ["h += '<span class=\"badge blue\">📦</span><span class=\"title-text\">Sản phẩm</span>';",
   "h += '<span class=\"badge blue\">📦</span><span class=\"title-text\">'+t('calc.section.products')+'</span>';"],

  ["h += '<span class=\"badge green\">🛍️</span><span class=\"title-text\">Bao bì</span>';",
   "h += '<span class=\"badge green\">🛍️</span><span class=\"title-text\">'+t('calc.section.bags')+'</span>';"],

  ["h += '<span class=\"badge purple\">📐</span><span class=\"title-text\">Quy cách khác</span>';",
   "h += '<span class=\"badge purple\">📐</span><span class=\"title-text\">'+t('calc.section.others')+'</span>';"],

  // calc result
  ["h += '<span class=\"icon\">📊</span>Kết quả tính giá</div>';",
   "h += '<span class=\"icon\">📊</span>'+t('calc.result.title')+'</div>';"],

  ["h += '<div class=\"calc-empty-text\">👈 Vui lòng chọn sản phẩm</div>';",
   "h += '<div class=\"calc-empty-text\">'+t('calc.result.empty')+'</div>';"],

  ["h += '<div class=\"calc-rl\">Giá vốn (EXW)</div>';",
   "h += '<div class=\"calc-rl\">'+t('calc.result.exw')+'</div>';"],

  ["h += '<div class=\"calc-rl\">Giá bao gồm bao bì</div>';",
   "h += '<div class=\"calc-rl\">'+t('calc.result.bag')+'</div>';"],

  ["h += '<div class=\"calc-rl\">Phụ phí</div>';",
   "h += '<div class=\"calc-rl\">'+t('calc.result.other')+'</div>';"],

  // getQuotationText
  ['t+="Khách hàng: "+customer+"\\n";',
   't+=t("quotation.label.customer")+": "+customer+"\\n";'],

  ['t+="Người liên hệ: "+contact+"\\n";',
   't+=t("quotation.label.contact")+": "+contact+"\\n";'],

  ['t+="Người phụ trách: "+assigned+"\\n";',
   't+=t("quotation.label.assigned")+": "+assigned+"\\n";'],

  ['t+="Sản phẩm: "+data.product+"\\n";',
   't+=t("calc.label.product")+": "+data.product+"\\n";'],

  ['t+="Quy cách bao: "+data.bagSpec+"\\n";',
   't+=t("bags.spec")+": "+data.bagSpec+"\\n";'],

  ['t+="Số lượng: "+qty+" tấn\\n";',
   't+=t("quotation.label.qty")+": "+qty+" "+t("calc.ton")+"\\n";'],

  ['t+="Hiệu lực: "+valid+"\\n";',
   't+=t("quotation.label.validity")+": "+valid+"\\n";'],

  ['t+="Thanh toán: "+payment+"\\n";',
   't+=t("quotation.label.payment")+": "+payment+"\\n";'],

  ['t+="Cảng đi: "+port+"\\n";',
   't+=t("quotation.label.port")+": "+port+"\\n";'],

  ['t+="📄 BÁO GIÁ\\n";',
   't+=t("quotation.title.prefix")+"\\n";'],

  // CIF warning
  ["h += '<div class=\"freight-warning\">⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.</div>';",
   "h += '<div class=\"freight-warning\">'+t('warn.cif.freight')+'</div>';"],

  // updateDataInfo
  ['el.textContent = "📊 " + DATA_PRODUCTS.length + " SP · " + DATA_BAGS.length + " BB · " + DATA_OTHERS.length + " QC";',
   'el.textContent = "📊 " + DATA_PRODUCTS.length + " " + t("manage.prods") + " · " + DATA_BAGS.length + " " + t("manage.bags") + " · " + DATA_OTHERS.length + " " + t("manage.other.specs") + "";'],

  ['el.textContent = "📊 " + DATA_PRODUCTS.length + " SP";',
   'el.textContent = "📊 " + DATA_PRODUCTS.length + " " + t("manage.prods");'],

  // alerts
  ['alert("Chọn sản phẩm và tính giá trước khi lên báo giá!")',
   'alert(t("quotation.select.first"))'],

  ['alert("✅ Đã copy báo giá vào clipboard")',
   'alert(t("quotation.copied"))'],

  // calc empty via innerHTML
  ['res.innerHTML = \'<div class="calc-empty-icon">👈</div><div class="calc-empty-text">Vui lòng chọn sản phẩm</div>\';',
   'res.innerHTML = \'<div class="calc-empty-icon">👈</div><div class="calc-empty-text">\'+t(\'calc.result.empty\')+\'</div>\';'],

  // the average/max mini cards in price tab - TB 25KG, C.nhất 25KG etc
  // These are tricky - let me check if they survived
  // For now skip these as they're less critical
];

let count = 0;
for (const [oldStr, newStr] of replacements) {
  if (h.indexOf(oldStr) > -1) {
    h = h.replace(oldStr, newStr);
    count++;
  }
}
console.log(`Replaced ${count} out of ${replacements.length} patterns`);
fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log("File size:", h.length);

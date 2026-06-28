const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
var c = 0;

// 1. Fix table headers in quotation preview
// Exact full line
var fullOld = 'h+="<thead><tr><th>STT</th><th>Code</th><th>Tên sản phẩm</th><th>Spec</th><th>Quy cách bao</th><th>ĐVT</th><th>SL</th><th>Giá</th><th>Tiền tệ</th></tr></thead>";';
var fullNew = 'h+="<thead><tr><th>STT</th><th>Code</th><th>"+t("table.product.name")+"</th><th>Spec</th><th>"+t("bags.spec")+"</th><th>ĐVT</th><th>SL</th><th>"+t("table.price")+"</th><th>Tiền tệ</th></tr></thead>";';
if (h.indexOf(fullOld) > -1) {
  h = h.replace(fullOld, fullNew);
  c++; console.log("1. Table headers");
} else { console.log("1. MISS table headers: not found"); }

// 2. VAT note
var vatOld = 'h+="- Giá không bao gồm thuế VAT<br>";';
var vatNew = 'h+="- "+t("quotation.excl.vat")+"<br>";';
if (h.indexOf(vatOld) > -1) {
  h = h.replace(vatOld, vatNew);
  c++; console.log("2. VAT note");
} else { console.log("2. MISS VAT note"); }

// 3. Min qty note
var minOld = 'h+="- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)";';
var minNew = 'h+="- "+t("quotation.min.qty")+"";';
if (h.indexOf(minOld) > -1) {
  h = h.replace(minOld, minNew);
  c++; console.log("3. Min qty note");
} else { console.log("3. MISS min qty note"); }

// 4. calcPrice empty product
var calc1 = "res.innerHTML = '<div class=\"calc-empty\">👈 Vui lòng chọn sản phẩm</div>';";
var calc1n = "res.innerHTML = '<div class=\"calc-empty\">'+t('calc.result.empty')+'</div>';";
if (h.indexOf(calc1) > -1) {
  h = h.replace(calc1, calc1n);
  c++; console.log("4. Calc empty product");
} else { console.log("4. MISS calc empty"); }

// 5. calcPrice not found product
var calc2 = "res.innerHTML = '<div class=\"calc-empty\">❌ Không tìm thấy sản phẩm</div>';";
var calc2n = "res.innerHTML = '<div class=\"calc-empty\">'+t('calc.not.found')+'</div>';";
if (h.indexOf(calc2) > -1) {
  h = h.replace(calc2, calc2n);
  c++; console.log("5. Calc not found");
} else { console.log("5. MISS calc not found"); }

// 6. Add LANG_MAP entries
var mapEnd = h.indexOf('};', h.indexOf('var LANG_MAP'));
var missing = '\n  "calc.not.found":{vi:"❌ Không tìm thấy sản phẩm",en:"❌ Product not found",zh:"❌ 未找到产品"},\n  "table.product.name":{vi:"Tên sản phẩm",en:"Product Name",zh:"产品名称"},\n  "table.price":{vi:"Giá",en:"Price",zh:"价格"},\n  "quotation.label.condition":{vi:"Điều kiện",en:"Condition",zh:"条件"},\n  "quotation.excl.vat":{vi:"Giá không bao gồm thuế VAT",en:"Price excludes VAT",zh:"价格不含增值税"},\n  "quotation.min.qty":{vi:"Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)",en:"Minimum quantity: 1 x 20ft container (~21 tons)",zh:"最小数量: 1个20英尺柜(约21吨)"},\n';
h = h.substring(0, mapEnd) + missing + h.substring(mapEnd);
console.log("6. Added LANG_MAP entries");

console.log('\nTotal fixes:', c);
fs.writeFileSync('sites/kiem-tra-gia/index.html', h, 'utf8');
console.log('Size:', h.length);

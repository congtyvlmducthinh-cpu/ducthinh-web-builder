var fs = require('fs');
var txt = fs.readFileSync('sites/kiem-tra-gia/modules/05-calc.js', 'utf-8');
txt = txt.replace(/showQuotationPopup\(\)/g, "switchTab('quotation')");
fs.writeFileSync('sites/kiem-tra-gia/modules/05-calc.js', txt, 'utf-8');
console.log('Fixed. showQuotationPopup:', txt.indexOf('showQuotationPopup'));
console.log('Chọn sản phẩm:', txt.indexOf('Ch\u1ECDn s\u1EA3n ph\u1EA9m') >= 0);

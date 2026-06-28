const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Find renderQuotationPreview 
var idx = h.indexOf('function renderQuotationPreview');
console.log('renderQuotationPreview at:', idx);
if (idx > -1) {
  console.log(h.substring(idx, idx + 2000));
}

console.log('\n\n======\n');

// Find calcPrice
idx = h.indexOf('function calcPrice()');
console.log('calcPrice at:', idx);
if (idx > -1) {
  console.log(h.substring(idx, idx + 1500));
}

console.log('\n\n======\n');

// Find downloadAsExcel header row
idx = h.indexOf('downloadAsExcel');
console.log('downloadAsExcel at:', idx);
if (idx > -1) {
  console.log(h.substring(idx, idx + 1200));
}

const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Check what rendering functions we have
var funcs = ['renderPriceTab','renderBagsTab','renderOthersTab','renderCalcTab','calcPrice','showQuotationPopup','getQuotationText','renderQuotationPreview','printQuotation','downloadAsExcel','updateDataInfo'];
for (var f of funcs) {
  var idx = h.indexOf('function ' + f);
  if (idx > -1) console.log(f + ' at ' + idx);
  else console.log(f + ': NOT FOUND');
}

// Find showQuotationPopup
var idx = h.indexOf('function showQuotationPopup');
if (idx > -1) {
  console.log('\n=== showQuotationPopup (first 500) ===');
  console.log(h.substring(idx, idx + 500));
}

// Get the quotation preview rendering HTML lines
// Look for "q-row" patterns which seem to be used for quotation display
console.log('\n=== q-row patterns ===');
var qidx = h.indexOf('q-row');
while (qidx > -1) {
  var start = Math.max(0, qidx - 10);
  var end = qidx + 120;
  var snippet = h.substring(start, end);
  console.log('Found:', snippet.replace(/\n/g, ' ').trim());
  qidx = h.indexOf('q-row', qidx + 1);
}

// Check calcPrice empty state
console.log('\n=== calcPrice empty ===');
var eidx = h.indexOf('calc-empty');
if (eidx > -1) {
  console.log(h.substring(eidx, eidx + 200));
}

// Check downloadAsExcel function
console.log('\n=== downloadAsExcel function ===');
var didx = h.indexOf('function downloadAsExcel');
if (didx > -1) {
  console.log(h.substring(didx, didx + 800));
}

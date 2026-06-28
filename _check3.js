const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// ===== verify the quotation preview =====
var idx = h.indexOf('function updateQuotationPreview()');
var end = h.indexOf('// ====== COPY QUOTATION', idx);
var content = h.substring(idx, end + 1);

console.log("=== updateQuotationPreview ===");
// Check key patterns
var checks = [
  'BÁO GIÁ',
  'Khách hàng:',
  'Người liên hệ:',
  'Người phụ trách:',
  'Ngày:', 
  'Cảng đi:',
  'Điều kiện:',
  'Hiệu lực:',
  'Thanh toán:',
  'Ghi chú:',
  'Tấn',
  'Chọn sản phẩm'
];

for (let s of checks) {
  let found = content.indexOf(s) > -1;
  let hasT = content.indexOf('t(') > -1;
  // Check if this specific pattern has t() in the same line context
  let lines = content.split('\n');
  let lineWithPattern = lines.find(l => l.indexOf(s) > -1);
  if (lineWithPattern) {
    let translated = lineWithPattern.indexOf('t(') > -1 || lineWithPattern.indexOf('t("') > -1;
    console.log(s + ': ' + (translated ? '✅ t()' : '❌ RAW') + ' | ' + lineWithPattern.trim().substring(0, 80));
  } else {
    console.log(s + ': NOT IN THIS FUNCTION');
  }
}

// ===== printQuotation =====
console.log('\n=== printQuotation ===');
var pidx = h.indexOf('function printQuotation()');
if (pidx > -1) {
  var pend = pidx + 3000;
  var ptext = h.substring(pidx, Math.min(pend, h.length));
  for (let s of checks) {
    let found = ptext.indexOf(s) > -1;
    if (found) {
      let lines = ptext.split('\n');
      let lineWithPattern = lines.find(l => l.indexOf(s) > -1);
      let translated = lineWithPattern ? (lineWithPattern.indexOf('t(') > -1 || lineWithPattern.indexOf('t("') > -1) : false;
      console.log(s + ': ' + (translated ? '✅ t()' : '❌ RAW'));
    }
  }
}

// ===== downloadAsExcel =====
console.log('\n=== downloadAsExcel ===');
var didx = h.indexOf('function downloadAsExcel()');
if (didx > -1) {
  var dtext = h.substring(didx, didx + 2000);
  for (let s of checks) {
    let found = dtext.indexOf(s) > -1;
    if (found) console.log(s + ': FOUND in downloadAsExcel');
  }
}

// ===== Check tab/table functionality =====
// Check that the tab buttons still have onclick
var tabClick = h.indexOf("onclick=\"switchTab('pricelist')\"") > -1;
console.log('\n=== Tab functionality ===');
console.log('Tab switch onclick exists:', tabClick);
console.log('switchTab function exists:', h.indexOf('function switchTab') > -1);
console.log('renderPriceTab exists:', h.indexOf('function renderPriceTab') > -1);
console.log('renderBagsTab exists:', h.indexOf('function renderBagsTab') > -1);
console.log('renderOthersTab exists:', h.indexOf('function renderOthersTab') > -1);
console.log('renderCalcTab exists:', h.indexOf('function renderCalcTab') > -1);
console.log('setLang exists:', h.indexOf('function setLang') > -1);

// ===== Check for syntax issues in the JS =====
// Look for quotes in wrong places
console.log('\n=== Syntax sanity ===');
// Check for really broken t() calls like +t('key'+) 
var brokenPatterns = [
  /Math\.round\([^)]+[^)]/,
  /\+t\('[^']+'\+t\('/g,
  /t\("[^"]+"t\("/g,
];
for (let p of brokenPatterns) {
  let matches = h.match(p);
  if (matches) console.log('Found potential issue:', matches.length, 'matches');
}
console.log("All checks done");

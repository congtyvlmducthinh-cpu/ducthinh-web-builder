const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Quick check: verify key functions still work
console.log("switchTab:", h.indexOf('function switchTab') > -1);
console.log("renderPriceTab:", h.indexOf('function renderPriceTab') > -1);
console.log("renderBagsTab:", h.indexOf('function renderBagsTab') > -1);
console.log("renderOthersTab:", h.indexOf('function renderOthersTab') > -1);
console.log("renderCalcTab:", h.indexOf('function renderCalcTab') > -1);
console.log("calcPrice:", h.indexOf('function calcPrice') > -1);
console.log("setLang:", h.indexOf('function setLang') > -1);
console.log("updateQuotationPreview:", h.indexOf('function updateQuotationPreview') > -1);
console.log("printQuotation:", h.indexOf('function printQuotation') > -1);
console.log("downloadAsExcel:", h.indexOf('function downloadAsExcel') > -1);

// Check for untranslated text in updateQuotationPreview
var idx = h.indexOf('function updateQuotationPreview()');
var end = h.indexOf('function copyQuotation()', idx);
var body = h.substring(idx, end);

// Check h+= lines in the function body that still have Vietnamese
var rawLines = [];
var lines = body.split('\n');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.indexOf('h+=') > -1 && l.indexOf('t(') === -1 && l.indexOf('calc.ton') === -1) {
    if (l.indexOf('Khách') > -1 || l.indexOf('Người') > -1 || 
        l.indexOf('BÁO') > -1 || l.indexOf('Cảng') > -1 ||
        l.indexOf('Điều') > -1 || l.indexOf('Hiệu') > -1 ||
        l.indexOf('Thanh') > -1 || l.indexOf('Ghi') > -1 ||
        l.indexOf('Ngày') > -1 || l.indexOf('Tấn') > -1 ||
        l.indexOf('Chọn') > -1 || l.indexOf('Liên hệ') > -1) {
      rawLines.push(l.trim().substring(0, 100));
    }
  }
}

if (rawLines.length === 0) {
  console.log("✅ updateQuotationPreview: All Vietnamese text is translated");
} else {
  console.log("❌ Still untranslated:");
  for (var r of rawLines) console.log("  ", r);
}

// Same check for printQuotation
idx = h.indexOf('function printQuotation()');
// Find matching close brace quickly
var braceCount = 0;
var startAt = h.indexOf('{', idx + 20);
braceCount = 1;
for (var i = startAt + 1; i < h.length; i++) {
  if (h[i] === '{') braceCount++;
  if (h[i] === '}') braceCount--;
  if (braceCount === 0) { end = i + 1; break; }
}
body = h.substring(idx, end);
rawLines = [];
lines = body.split('\n');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.indexOf('h+=') > -1 && l.indexOf('t(') === -1) {
    if (l.indexOf('Khách') > -1 || l.indexOf('Người') > -1 || 
        l.indexOf('BÁO') > -1 || l.indexOf('Cảng') > -1 ||
        l.indexOf('Điều') > -1 || l.indexOf('Hiệu') > -1 ||
        l.indexOf('Thanh') > -1 || l.indexOf('Ghi') > -1 ||
        l.indexOf('Ngày') > -1 || l.indexOf('Tấn') > -1 ||
        l.indexOf('Chọn') > -1 || l.indexOf('Liên hệ') > -1) {
      rawLines.push(l.trim().substring(0, 100));
    }
  }
}

if (rawLines.length === 0) {
  console.log("✅ printQuotation: All Vietnamese text is translated");
} else {
  console.log("❌ Still untranslated in printQuotation:");
  for (var r of rawLines) console.log("  ", r);
}

// Check calcPrice empty states
console.log("\ncalcPrice checks:");
var ci = h.indexOf('calc-empty');
if (ci > -1) {
  var ctx = h.substring(ci, ci + 400);
  console.log("Context:", ctx.substring(0, 300));
}

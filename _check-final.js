const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Check updateQuotationPreview more carefully for stale Vietnamese
var idx = h.indexOf('function updateQuotationPreview()');
var end = h.indexOf('function copyQuotation()', idx);
var body = h.substring(idx, end);
var lines = body.split('\n');

console.log("=== Remaining RAW Vietnamese in updateQuotationPreview ===");
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  // Skip lines that call t() or have dynamic data
  if (l.indexOf('t(') > -1) continue;
  if (l.indexOf('data.') > -1) continue;
  if (l.indexOf('qty') > -1) continue;
  if (l.indexOf('dateStr') > -1) continue;
  if (l.indexOf('totalFmt') > -1) continue;
  if (l.indexOf('delivery') > -1) continue;
  if (l.indexOf('payment') > -1) continue;
  if (l.indexOf('valid') > -1) continue;
  if (l.indexOf('note') > -1) continue;
  if (l.indexOf('customer') > -1) continue;
  if (l.indexOf('contact') > -1) continue;
  if (l.indexOf('assigned') > -1) continue;
  if (l.indexOf('custEmail') > -1) continue;
  if (l.indexOf('port') > -1) continue;
  if (l.indexOf('mode') > -1) continue;
  if (l.indexOf('code') > -1) continue;
  if (l.indexOf('size') > -1) continue;
  if (l.indexOf('spec') > -1) continue;
  if (l.indexOf('bagSpec') > -1) continue;
  if (l.indexOf('cc') > -1) continue;
  if (l.indexOf('calc.ton') > -1) continue;
  
  // Check for Vietnamese text in string literals
  if ((l.indexOf('h+=') > -1 || l.indexOf('content.') > -1 || l.indexOf('innerHTML') > -1) &&
      (l.charCodeAt(0) === 104 || l.indexOf('"') > -1)) {
    // Has quotes with Vietnamese chars
    if (/[\u00C0-\u1EF9]/.test(l)) {
      console.log(`L${i}: ${l.trim().substring(0, 120)}`);
    }
  }
}

console.log("\n=== calcPrice empty states ===");
var ci = h.indexOf('function calcPrice()');
if (ci > -1) {
  var cbody = h.substring(ci, ci + 3000);
  // Find empty states
  var empties = cbody.match(/innerHTML = '[^']+'/g);
  if (empties) {
    for (var e of empties) {
      // Check if not using t()
      if (e.indexOf('t(') === -1 && e.indexOf('calc-empty') > -1) {
        console.log("RAW empty state:", e);
      }
    }
  }
  // Check res.innerHTML patterns
  var ridx = cbody.indexOf('calc-empty');
  while (ridx > -1) {
    var ctx = cbody.substring(Math.max(0, ridx - 30), ridx + 200);
    console.log("Empty state ctx:", ctx.replace(/\n/g, ' ').substring(0, 150));
    ridx = cbody.indexOf('calc-empty', ridx + 1);
  }
}

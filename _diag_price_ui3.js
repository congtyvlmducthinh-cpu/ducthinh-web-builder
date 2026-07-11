var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');

// Proper end: find the last closing brace that's NOT inside a string
var fnEnd = h.indexOf('function initPriceTab()', fnStart);
if (fnEnd < 0) fnEnd = h.indexOf('\nfunction setPriceMode(', fnStart);
if (fnEnd < 0) fnEnd = fnStart + 200000; // safety

var fb = h.substring(fnStart, fnEnd);
console.log('Function size:', fb.length, 'chars');

// Find controlBar actual HTML inside the function
var cbPos = fb.indexOf('id="controlBar"');
console.log('\n=== controlBar ===');
console.log('Found at function offset:', cbPos);
var cbDivStart = fb.lastIndexOf('<div', cbPos);
var depth = 1, pos = cbPos;
while (depth > 0) {
  var nextOpen = fb.indexOf('<div', pos + 1);
  var nextClose = fb.indexOf('</div>', pos + 1);
  if (nextClose < 0) { console.log('ERROR: no matching close'); break; }
  if (nextOpen >= 0 && nextOpen < nextClose) { depth++; pos = nextOpen + 4; }
  else { depth--; pos = nextClose + 5; }
}
var cbEnd = pos;
console.log('controlBar block:', cbDivStart, '->', cbEnd);
console.log('Full HTML block:');
console.log(fb.substring(cbDivStart, cbEnd));

console.log('\n\n=== priceModeBar ===');
var pmPos = fb.indexOf('id="priceModeBar"');
console.log('Found at function offset:', pmPos);
var pmDivStart = fb.lastIndexOf('<div', pmPos);
depth = 1; pos = pmPos;
while (depth > 0) {
  var nextOpen = fb.indexOf('<div', pos + 1);
  var nextClose = fb.indexOf('</div>', pos + 1);
  if (nextClose < 0) { console.log('ERROR: no matching close'); break; }
  if (nextOpen >= 0 && nextOpen < nextClose) { depth++; pos = nextOpen + 4; }
  else { depth--; pos = nextClose + 5; }
}
var pmEnd = pos;
console.log('priceModeBar block:', pmDivStart, '->', pmEnd);
console.log('Full HTML block:');
console.log(fb.substring(pmDivStart, pmEnd));

console.log('\n\n=== class="container" in function ===');
var ci = fb.indexOf('class="container"');
var count = 0;
var lastC = -1;
while (true) {
  var c = fb.indexOf('class="container"', lastC + 1);
  if (c < 0) break;
  count++;
  lastC = c;
  // Find the wrapping div
  var ds = fb.lastIndexOf('<div', c);
  // Find matching close
  var d = 1, p2 = c;
  while (d > 0) {
    var no = fb.indexOf('<div', p2 + 1);
    var nc = fb.indexOf('</div>', p2 + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; p2 = no + 4; }
    else { d--; p2 = nc + 5; }
  }
  console.log('\n  Container #' + count + ' at ' + c + ' (div ' + ds + '->' + (p2-6) + '):');
  console.log('  Content:', fb.substring(ds, Math.min(fb.length, ds + 200)));
}

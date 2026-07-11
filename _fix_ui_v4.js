var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// Find structure
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);

// Get new renderPriceTab from section 2
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2ScriptEnd = h.indexOf('</script>', s2Script);
var s2Js = h.substring(s2Script + 8, s2ScriptEnd);

var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var newRenderPT = s2Js.substring(rpStart, rpEnd);

// Find mode card
var modeIdx = newRenderPT.indexOf('price-card-mode');
console.log('price-card-mode at:', modeIdx);

// Find full mode card div
var msStart = newRenderPT.lastIndexOf('<div', modeIdx - 20);
var depth = 1;
var p = msStart;
while (depth > 0) {
  var no = newRenderPT.indexOf('<div', p + 1);
  var nc = newRenderPT.indexOf('</div>', p + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { depth++; p = no + 4; }
  else { depth--; p = nc + 5; }
}
var msEnd = p;
console.log('Mode card:', msStart, '->', msEnd);
console.log('\nFULL MODE CARD:');
console.log(newRenderPT.substring(msStart, msEnd));

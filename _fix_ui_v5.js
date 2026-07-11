var fs = require('fs');
// Fix: Read LF mode, normalise first
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// === FIND FILE STRUCTURE ===
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);

console.log('Sections:', htmlPos.map(function(x,i){return i+': char='+x;}));
// htmlPos: [0]=17, [1]=155234, [2]=310452, [3]=773487

// Section 0 (first HTML copy)
var s0End = h.indexOf('<!DOCTYPE', htmlPos[1]);
var s0 = h.substring(0, s0End);

// Get CSS + JS from section 2
var s2Style = h.indexOf('<style>', htmlPos[2]);
var s2Css = h.substring(s2Style + 7, h.indexOf('</style>', s2Style));

var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

// === EXTRACT NEW renderPriceTab ===
var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd); // new renderPriceTab

// === FIX CARD 2: price-card-filters ===
// Add reset button + currency toggle after size filter
var fgIdx = rpt.indexOf('price-filter-group');
var fgDiv = rpt.indexOf('>', fgIdx) + 1;
// Find filter-group closing </div>
var fgD = 1, fgPos = fgIdx;
while (fgD > 0) {
  var no = rpt.indexOf('<div', fgPos + 1);
  var nc = rpt.indexOf('</div>', fgPos + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { fgD++; fgPos = no + 4; }
  else { fgD--; fgPos = nc + 5; }
}
// fgPos points past the closing </div>'s 6 chars

// The last child close inside filter-group
var lastChildPos = rpt.lastIndexOf('</div>', fgPos - 3);

// Build the extra buttons HTML node
var extraBtns =
  "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';" +
  "\n  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"B\u1ecf l\u1ecdc\">\u21bb</button>';" +
  "\n  h += '<button class=\"price-btn price-btn-sm' + (isUsd?' active':'') + '\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';" +
  "\n  h += '<button class=\"price-btn price-btn-sm' + (isUsd?'':' active') + '\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';" +
  "\n  h += '</div>';";

rpt = rpt.substring(0, lastChildPos - 6) + '\n' + extraBtns + '\n' + rpt.substring(lastChildPos - 6);

console.log('Filters card: extra buttons added');

// === FIX CARD 4: price-card-mode ===
var modeIdx = rpt.indexOf('price-card-mode');
var msStart = rpt.lastIndexOf('<div', modeIdx - 10);
// Find matching close
var md = 1, mPos = msStart;
while (md > 0) {
  var mno = rpt.indexOf('<div', mPos + 1);
  var mnc = rpt.indexOf('</div>', mPos + 1);
  if (mnc < 0) break;
  if (mno >= 0 && mno < mnc) { md++; mPos = mno + 4; }
  else { md--; mPos = mnc + 5; }
}
var msEnd = mPos;

// Replace entire mode card
var newModeCard =
  "<div class=\"price-card price-card-mode\">';" +
  "\n  h += '<div class=\"price-mode-row\">';" +
  // Row 1: mode buttons + LCC group
  "\n  h += '<div class=\"price-mode-group\"><span class=\"price-mode-label\">Ch\u1ebf \u0111\u1ed9:</span>';" +
  "\n  h += '<button class=\"mode-btn price-pill' + (priceMode==='exw'?' active active-exw':'') + '\" data-mode=\"exw\" onclick=\"setPriceMode('''exw''')\">EXW</button>';" +
  "\n  h += '<button class=\"mode-btn price-pill' + (priceMode==='fob'?' active active-fob':'') + '\" data-mode=\"fob\" onclick=\"setPriceMode('''fob''')\">FOB</button>';" +
  "\n  h += '<button class=\"mode-btn price-pill' + (priceMode==='cif'?' active active-cif':'') + '\" data-mode=\"cif\" onclick=\"setPriceMode('''cif''')\">CIF</button>';" +
  "\n  h += '</div>';";

// Hmm, the onclick needs to be in double quotes but the outer is single quotes.
// Let me think: The JS code uses single quotes for string literals.
// So h +='<button onclick="setPriceMode(\'exw\')">EXW</button>'
// In the output HTML, the onclick attribute value needs double quotes.
// The server-side JS code (the string we're building) must produce:
//   h += '<button ... onclick="setPriceMode(\'exw\')">EXW</button>';
// Which means in this Node.js string I need:
//   "<button class=\"...\" onclick=\"setPriceMode('''exw''')\">EXW</button>"
// Wait no. The JS code will be:
//   h += '<button onclick="setPriceMode(\'exw\')">EXW</button>';
// In the Node.js string, I need to escape:
//   "<button onclick=\"setPriceMode('''exw''')\">EXW</button>"
// The triple-single-quote would be: outer node string delimited by ", inside we have:
// setPriceMode(\'exw\')
// Hmm, let me think again.

// The JavaScript source code of the page needs to contain:
//   h += '<button onclick="setPriceMode(\'exw\')">EXW</button>';
// When this JS runs, it produces the HTML string:
//   <button onclick="setPriceMode('exw')">EXW</button>
// So in the Node.js script that writes this source code, the source code line:
//   h += '<button onclick="setPriceMode(\'exw\')">EXW</button>';
// needs to be a string in Node.js. Using double quotes:
//   "h += '<button onclick=\"setPriceMode(\\'exw\\')\">EXW</button>';"

// This is getting WAY too complex with escaping. Let me take a simpler approach:
// Just do string replacements on the extracted rpt text directly.

console.log('\nLet me try a different approach - extract the exact strings and do replacements.');
process.exit(0);

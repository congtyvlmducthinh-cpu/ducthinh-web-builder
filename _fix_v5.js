var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// Section 0
var s0End = h.indexOf('<!DOCTYPE', 155235);
var s0 = h.substring(0, s0End);

// Section 2 CSS + JS
var s2Style = h.indexOf('<style>', 310453);
var s2Css = h.substring(s2Style + 7, h.indexOf('</style>', s2Style));

var s2Script = h.indexOf('<script>', 310453);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

// Extract new renderPriceTab
var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd);

// === Verify current LCC text ===
console.log('Current LCC label lines:');
var lccPos = rpt.indexOf('LCC:');
while (lccPos >= 0) {
  console.log('  LCC context:', rpt.substring(lccPos - 40, lccPos + 40));
  lccPos = rpt.indexOf('LCC:', lccPos + 1);
}

console.log('\nCurrent Freight lines:');
var frPos = rpt.indexOf('Freight:');
while (frPos >= 0) {
  console.log('  Freight context:', rpt.substring(frPos - 40, frPos + 40));
  frPos = rpt.indexOf('Freight:', frPos + 1);
}

// === FIND the mode card's LCC block ===
// It's: h += '<div class="price-mode-group"><span class="price-mode-label">LCC:</span>';
var lccLine = 'h += \'<div class="price-mode-group"><span class="price-mode-label">LCC:</span>\'';
var lccIdx = rpt.indexOf(lccLine);
console.log('\nLCC block at:', lccIdx);

// Find the div start and end
var lccDivStart = rpt.lastIndexOf('\n', lccIdx - 5) + 1;
// Find the closing h += '</div>'; (the 4th one after lccIdx, counting the opening div too)
// Structure:
//   h += '<div class="...>
//   h += '<button ...>Không</button>
//   h += '<button ...>LCC</button>
//   h += '<button ...>LCC 30</button>
//   h += '</div>';  <-- this is the one we want
var searchPos = lccIdx;
for (var i = 0; i < 5; i++) {
  searchPos = rpt.indexOf("h += '</div>'", searchPos + 1);
}
var lccDivEnd = rpt.indexOf('\n', searchPos);

console.log('LCC block ends at:', searchPos);

var lccBlock = rpt.substring(lccDivStart, lccDivEnd + 1);
console.log('LCC block to replace:\n' + lccBlock);

// === FIND the mode card's Freight block ===
// It's: if (isCif) {\n    h += '<div class="price-mode-group"><span class="price-mode-label">Freight:</span>
// This comes AFTER the market buttons and BEFORE the closing of card 4
var cifLine = 'if (isCif) {';
var cifIdx = rpt.indexOf(cifLine, lccIdx); // Find the one AFTER the LCC block
console.log('\nCIF block (after LCC) at:', cifIdx);

// Find context
console.log('CIF context:', rpt.substring(cifIdx, cifIdx + 200));

// Find the } for this if block — look for the closing brace after the mode card content
var cifClose = rpt.indexOf('\n  }', cifIdx);
if (cifClose < 0) cifClose = rpt.indexOf('\n}', cifIdx);
console.log('CIF close at:', cifClose);
console.log('CIF close context:', rpt.substring(cifClose, cifClose + 300));

var cifBlock = rpt.substring(cifIdx, cifClose + 3);
console.log('Full CIF block:\n' + cifBlock);

// === BUILD replacements ===

// New LCC block
var newLccBlock = 
  "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';\n" +
  "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='no'?' active active-lcc':'') + \\'\" data-lcc=\"no\" onclick=\"setLccType(\\'no\\')\">No Lcc</button>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='sub'?' active active-lcc':'') + \\'\" data-lcc=\"sub\" onclick=\"setLccType(\\'sub\\')\">Sub Lcc</button>';\n" +
  "  h += '</div>';\n";

// But wait -- the backslash escaping in Node.js strings with double-quote delimiters:
// I want the final JS source code to be:
//   h += '<button ... onclick="setLccType(\'no\')">No Lcc</button>';
// In the file, this needs to be literally:
//   h += '<button ... onclick="setLccType(\'no\')">No Lcc</button>';
// In a Node.js double-quoted string:
//   "  h += '<button ... onclick=\"setLccType(\\'no\\')\">No Lcc</button>';\n"
// Let me verify:
//   onclick=\" -> onclick="   ✓
//   setLccType( -> setLccType(  ✓
//   \\' -> \' (\\ produces \, then ' is just ')  ✓
//   no -> no  ✓
//   \\' -> \'  ✓
//   ) -> )  ✓
//   \" -> "  ✓
// Result: onclick="setLccType(\'no\')"  ✓✓✓

var newLccBlock = 
  "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';\n" +
  "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='no'?' active active-lcc':'') + \\'\" data-lcc=\"no\" onclick=\"setLccType(\\'no\\')\">No Lcc</button>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='sub'?' active active-lcc':'') + \\'\" data-lcc=\"sub\" onclick=\"setLccType(\\'sub\\')\">Sub Lcc</button>';\n" +
  "  h += '</div>';\n";

// New freight block
var newCifBlock = 
  "  if (isCif) {\n" +
  "    h += '<div class=\"price-mode-group\" id=\"freightGroup\" style=\"display:inline-flex\">';\n" +
  "    h += '<span class=\"price-mode-label\">\ud83d\udea2 C\u01b0\u1edbc:</span>';\n" +
  "    h += '<input type=\"number\" class=\"price-input price-input-num\" id=\"freightInput\" placeholder=\"USD\" value=\"' + (freightUSD||'') + '\" min=\"0\" step=\"100\" style=\"width:100px\" oninput=\"onFreightChange()\">';\n" +
  "    h += '<span class=\"price-mode-unit\">USD</span>';\n" +
  "    h += '</div>';\n" +
  "  }\n";

// === DO REPLACEMENTS ===
// Replace LCC block
rpt = rpt.substring(0, lccDivStart) + newLccBlock + rpt.substring(lccDivEnd + 1);
console.log('LCC block replaced ✓');

// Replace CIF freight block (need to recalc position since rpt changed)
var newLccLen = newLccBlock.length;
var oldLccLen = lccBlock.length;
var offset = newLccLen - oldLccLen;

var newCifIdx = cifIdx + offset; // adjusted position
var newCifClose = cifClose + offset;

console.log('New CIF block at:', newCifIdx, 'context:', rpt.substring(newCifIdx, newCifIdx + 200));
console.log('New CIF close at:', newCifClose);

rpt = rpt.substring(0, newCifIdx) + newCifBlock + rpt.substring(newCifClose + 3);
console.log('Freight block replaced ✓');

// === Add reset + currency toggle to filters ===
var extraBtns = 
  "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"B\u1ecf l\u1ecdc\">\u21bb</button>';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?\\' active\\':\\'\\') + \\'\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?\\'\\':\\' active\\') + \\'\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';\n" +
  "  h += '</div>';\n";

// Wait, the escaping with \\' is wrong. Let me think again.
// The JavaScript source code needs to contain:
//   h += '<button class="price-btn price-btn-sm\' + (isUsd?\' active\':\'\') + \'" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// 
// Let me carefully construct this. In the source code (the HTML file), the line is:
//   h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
//
// This is valid JS because:
// String 1: '<button class="price-btn price-btn-sm'  (inside the single-quoted string, no escaping needed for " or ')
// The ternary:  + (isUsd?' active':'') + 
// String 2: '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>'
// The ' inside the onclick doesn't need escaping because it's a string delimiter
// Wait... toggleCurrency(this) doesn't have any quotes inside.
// onclick="toggleCurrency(this)" — here " are the attribute value delimiters
// Inside the JS string, we have: onclick=\"toggleCurrency(this)\"
// But since the JS string is using single quotes, the double quotes inside don't need escaping!
// Actually, in JS, ' and " are interchangeable. So:
// h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// Here:
//   '<button class="price-btn price-btn-sm' is a JS string using single quotes
//   + (isUsd?' active':'') + 
//   '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>' is another JS string using single quotes
// Inside the second string, the " are just literal characters, no escaping needed.
// So the actual bytes in the file would be:
//   h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// No backslash escaping at all for these! 

// So in the Node.js double-quoted string:
// "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?\\' active\\':\\'\\') + \\'\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n"
// WTF, this has way too many backslashes.

// Let me just build it from scratch as a template string since there are no nested quotes that need special handling:
// Actually the problem is: in the filter extra buttons, I have:
//   h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// Notice: (isUsd?' active':'') -- the ? ternary has: ' active' (string A) and '' (string B)
// These are inside a single-quote delimited JS string: '...' (outer) containing ...' active'...'' 
// Actually no! The outer is h += '...' and the ternary is inside a concatenation.
// It's: '...btn-sm' (end of first string) + (isUsd?' active':'') + '" data-currency...' (start of third string)
// So the two sub-strings ' active' and '' in the ternary are NOT inside any outer string.
// They are their OWN string literals, each delimited by single quotes.
// So: (isUsd?' active':'') 
// Means: (isUsd? ' active' : '')
// These are independent string literals. The single quotes here don't conflict with anything.

// OK, so the full source code line in the HTML file would be:
//   h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// This is valid:
// String: '<button class="price-btn price-btn-sm' -- OK
// Ternary: (isUsd?' active':'') -- OK, strings ' active' and ''
// String: '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>' -- OK, single quote delimiters

// So in the Node.js string (using double quotes), I need to escape the double quotes:
// "  h += '<button class=\"price-btn price-btn-sm' + (isUsd?' active':'') + '\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n"
// Let me verify each part:
// "  h += '" -> "  h += '"
// "<button class=\"" -> <button class="  [escape: \" -> "]
// "price-btn price-btn-sm' + (isUsd?' active':'') + '" -> price-btn price-btn-sm' + (isUsd?' active':'') + '"
// I need quotes around the -sm part... Hmm let me reconsider.

// Actually the simplest way is:
// The line I want ends up as:
//   h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// In Node.js string, I need to represent these EXACT characters. Using Node.js template literal (backtick):
// `  h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';\n`

// Using template literal (backtick), no escaping needed for single quotes or double quotes within!
// But template literals can still have their own issues. Let me use double quotes and just escape what needs escaping.

var extraBtns2 = 
  '  h += \'<div class="price-filter-item" style="display:flex;gap:4px;align-items:center">\';\n' +
  '  h += \'<button class="price-btn price-btn-sm" id="resetFiltersBtn" onclick="resetFilters()" title="Bỏ lọc">↻</button>\';\n' +
  '  h += \'<button class="price-btn price-btn-sm\' + (isUsd?\' active\':\'\') + \'" data-currency="VND" onclick="toggleCurrency(this)">VND</button>\';\n' +
  '  h += \'<button class="price-btn price-btn-sm\' + (isUsd?\'\':\' active\') + \'" data-currency="USD" onclick="toggleCurrency(this)">USD</button>\';\n' +
  "  h += '</div>';\n";

fs.writeFileSync('memory/_extras_text.txt', extraBtns2, 'utf8');
console.log('\nExtra buttons generated OK');

// Insert after sizeFilter line
var sfLine = '  h += \'<div class="price-filter-item"><select id="sizeFilter"';
var sfIdx = rpt.indexOf(sfLine);
sfIdx = rpt.indexOf('\n', sfIdx);
rpt = rpt.substring(0, sfIdx) + '\n' + extraBtns2 + rpt.substring(sfIdx);
console.log('Filter buttons added ✓');

// === Replace in section 0 JS ===
var s0Script = s0.indexOf('<script>');
var s0ScriptEnd = s0.indexOf('</script>', s0Script);
var s0Js = s0.substring(s0Script + 8, s0ScriptEnd);

var s0RpStart2 = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd2 = s0Js.indexOf('\nfunction populateFilters', s0RpStart2);

var s0JsNew = s0Js.substring(0, s0RpStart2) + '\n' + rpt + '\n' + s0Js.substring(s0RpEnd2);
var finalH = s0.substring(0, s0Script + 8) + s0JsNew + s0.substring(s0ScriptEnd);

// === Add price-card CSS ===
var firstStyle = finalH.indexOf('<style>');
var firstStyleEnd = finalH.indexOf('</style>');
var styleInsert = finalH.substring(firstStyle + 7, firstStyleEnd) + '\n\n/* === PRICE TAB REDESIGN === */\n' + s2Css;
finalH = finalH.substring(0, firstStyle + 7) + styleInsert + finalH.substring(firstStyleEnd);

// === Remove static controlBar and priceModeBar ===
// First controlBar
var staticPart = finalH.substring(0, finalH.indexOf('<script>'));
var cbIdx = staticPart.indexOf('id="controlBar"');
if (cbIdx >= 0) {
  var cbDivStart = staticPart.lastIndexOf('<div', cbIdx);
  var d = 1, pos = cbIdx;
  while (d > 0) {
    var no = staticPart.indexOf('<div', pos + 1);
    var nc = staticPart.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('\nRemove controlBar at: [' + cbDivStart + ',' + pos + ']');
  // Remove from finalH
  // Find in finalH
  var fhCb = finalH.indexOf('id="controlBar"');
  var fhCbDiv = finalH.lastIndexOf('<div', fhCb);
  d = 1; pos = fhCb;
  while (d > 0) {
    var no = finalH.indexOf('<div', pos + 1);
    var nc = finalH.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  finalH = finalH.substring(0, fhCbDiv) + finalH.substring(pos);
  console.log('  Removed from finalH ✓');
}

// Then priceModeBar
var pmIdx = finalH.indexOf('id="priceModeBar"');
if (pmIdx >= 0) {
  var pmDivStart = finalH.lastIndexOf('<div', pmIdx);
  var d = 1, pos = pmIdx;
  while (d > 0) {
    var no = finalH.indexOf('<div', pos + 1);
    var nc = finalH.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('Remove priceModeBar at: [' + pmDivStart + ',' + pos + ']');
  finalH = finalH.substring(0, pmDivStart) + finalH.substring(pos);
  console.log('  Removed from finalH ✓');
}

// === VALIDATE ===
var opens = (finalH.match(/{/g) || []).length;
var closes = (finalH.match(/}/g) || []).length;
var ov = (finalH.match(/<div[^>]*>/g) || []).length;
var cv = (finalH.match(/<\/div>/g) || []).length;
var cr = (finalH.match(/\r\n/g) || []).length;

console.log('\nBraces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov === cv ? 'OK' : 'FAIL'));
console.log('CRLF: ' + cr + ' ' + (cr === 0 ? 'OK' : 'FAIL'));

if (opens !== closes || ov !== cv) { console.log('VALIDATION FAILED'); process.exit(1); }

// JS Parse
var lastScript = finalH.lastIndexOf('<script>');
try {
  new Function(finalH.substring(lastScript + 8, finalH.lastIndexOf('</script>')));
  console.log('JS Parse: OK');
} catch(e) {
  console.log('JS Parse FAIL: ' + e.message);
  process.exit(1);
}

// Verify
var fnBody = finalH.substring(
  finalH.indexOf('function renderPriceTab()'),
  finalH.indexOf('\nfunction populateFilters')
);
console.log('\n=== VERIFY ===');
var checks = ['resetFiltersBtn','toggleCurrency','id=\"lccGroup\"','id=\"freightGroup\"',
  'No Lcc','Sub Lcc','onFreightChange','toggleMaxLoad','setMarket',
  'price-card-header','price-card-filters','price-card-mode',
  "setLccType('no')","setLccType('sub')"];
checks.forEach(function(c) {
  console.log(c + ':', fnBody.indexOf(c) >= 0 ? 'YES' : 'NO');
});

var staticPart2 = finalH.substring(0, finalH.indexOf('<script>'));
console.log('\nStatic HTML:');
console.log('controlBar:', staticPart2.indexOf('id="controlBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('priceModeBar:', staticPart2.indexOf('id="priceModeBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('renderPriceTab count:', (finalH.match(/function renderPriceTab\(\)/g) || []).length);
console.log('price-card CSS:', finalH.indexOf('price-card') < finalH.indexOf('</style>') ? 'YES' : 'NO');
console.log('File size:', finalH.length);
console.log('html count:', (finalH.match(/<html/g) || []).length);

fs.writeFileSync('sites/kiem-tra-gia/vi.html', finalH, 'utf8');
console.log('\n=== WRITTEN OK ===');

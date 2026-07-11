var fs = require('fs');

// Normalise LF
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// Find sections
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);
console.log('Sections:', htmlPos);

// Section 0 = first HTML copy (the one to keep)
var s0End = h.indexOf('<!DOCTYPE', htmlPos[1]);
var s0 = h.substring(0, s0End);

// Section 2 CSS + JS
var s2Style = h.indexOf('<style>', htmlPos[2]);
var s2Css = h.substring(s2Style + 7, h.indexOf('</style>', s2Style));

var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

// Extract new renderPriceTab
var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd);

// =========================================================
// FIX 1: Add reset + currency toggle to filters card
// =========================================================
var extraBtns = `
  h += '<div class="price-filter-item" style="display:flex;gap:4px;align-items:center">';
  h += '<button class="price-btn price-btn-sm" id="resetFiltersBtn" onclick="resetFilters()" title="B\u1ecf l\u1ecdc">\u21bb</button>';
  h += '<button class="price-btn price-btn-sm\\' + (isUsd?\\' active\\':\\'\\') + \\'" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
  h += '<button class="price-btn price-btn-sm\\' + (isUsd?\\'\\':\\' active\\') + \\'" data-currency="USD" onclick="toggleCurrency(this)">USD</button>';
  h += '</div>';
`;

// Hmm, template literals still have the escaping issue with escaped quotes inside.
// Let me just write the exact JS source code to a file and read it back.

// Actually the simplest approach is: write the replacement JS code to separate file
// then read it and do string replacement.

// Let me just build the replacement using the existing patterns in rpt more surgically.
// The rpt source code uses h += '<...>'; lines. The quoation patterns used:
// - Outer string: single quotes
// - HTML attribute values: double quotes
// - The onclick handler uses setPriceMode(\'exw\') with escaped single quotes

// For the currency toggle buttons, the JS code should be:
// h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// This line uses:
// - h += '  --> starts string with single quote
// - <button class="price-btn price-btn-sm' + ... + '" data-...  --> ends/restarts string with single quote

// To write this inside a Node.js string using ESCAPE SEQUENCES:
// The line: h += '<button class="price-btn price-btn-sm\' + (isUsd?\' active\':\'\') + \'" data-...">VND</button>';
// Wait no, that's wrong. The JS source code has:
// h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// 
// In the actual source code, this is a valid JS statement. The single quotes mark string boundaries.
// '\' + (isUsd?' active':'') + \'' is NOT valid because '\' is an escaped single quote.
// Actually: ' + (isUsd?' active':'') + ' is correct JS. The string ' + (isUsd?' active':'') + ' starts with space+plus.
// But wait, it's: 'sm' + (isUsd?' active':'') + '" data...'
// So the string 'sm ' is the end of the first string literal starting with '<button...'
// No, the actual JS is: '...btn-sm' + (isUsd?' active':'') + '" data...'
// So '...btn-sm' is a string, then + concatenation with (ternary), then + with '" data...'
// The string '...btn-sm' ends with single quote.
// Then '" data...' is another string that STARTS with double-quote (character ") and continues.

// So in the actual HTML file's <script> tag, the source code line is:
//   h += '<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
// No escaping needed for quotes because they alternate properly.

// To represent this line in a NODE.JS string (using double quotes for Node string):
// Node string: "h += '<button class=\"price-btn price-btn-sm' + (isUsd?' active':'') + '\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';"
// Or using single quotes for Node string:
// Node string: 'h += \'<button class="price-btn price-btn-sm\' + (isUsd?\' active\':\'\') + \'" data-currency="VND" onclick="toggleCurrency(this)">VND</button>\';'

// OK using double quotes for the Node.js string, and escaping the HTML double quotes:
var ebtn1 = "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';\n";
var ebtn2 = "  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"B\u1ecf l\u1ecdc\">\u21bb</button>';\n";
var ebtn3 = "  h += '<button class=\"price-btn price-btn-sm' + (isUsd?' active':'') + '\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n";
var ebtn4 = "  h += '<button class=\"price-btn price-btn-sm' + (isUsd?'':' active') + '\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';\n";
var ebtn5 = "  h += '</div>';\n";

var extraFilterBtns = "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"B\u1ecf l\u1ecdc\">\u21bb</button>';\n" +
  "  h += '<button class=\"price-btn price-btn-sm' + (isUsd?' active':'') + '\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n" +
  "  h += '<button class=\"price-btn price-btn-sm' + (isUsd?'':' active') + '\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';\n" +
  "  h += '</div>';\n";

fs.writeFileSync('memory/_extra_filter_btns.txt', extraFilterBtns, 'utf8');
console.log('Extra btns written:', extraFilterBtns.length, 'bytes');

// Insert after the sizeFilter line
var sizeFilterLine = '  h += \'<div class="price-filter-item"><select id="sizeFilter"';
var sfIdx = rpt.indexOf(sizeFilterLine);
if (sfIdx < 0) {
  console.log('ERROR: sizeFilter line not found');
  console.log('Searching for sizeFilter...');
  sfIdx = rpt.indexOf('sizeFilter');
  console.log('Context:', rpt.substring(sfIdx - 50, sfIdx + 100));
  process.exit(1);
}
var sfLineEnd = rpt.indexOf('\n', sfIdx);
rpt = rpt.substring(0, sfLineEnd) + '\n' + extraFilterBtns + rpt.substring(sfLineEnd);
console.log('Fix 1: Added filter buttons after sizeFilter, new rpt len:', rpt.length);

// =========================================================
// FIX 2: Replace LCC block
// =========================================================
// Find the LCC div: h += '<div class="price-mode-group"><span class="price-mode-label">LCC:</span>';
var lccLine = 'h += \'<div class="price-mode-group"><span class="price-mode-label">LCC:</span>\'';
var lccIdx = rpt.indexOf(lccLine);
if (lccIdx < 0) {
  // try searching for LCC:
  lccIdx = rpt.indexOf('LCC:');
  console.log('LCC: at:', lccIdx, 'ctx:', rpt.substring(lccIdx - 50, lccIdx + 100));
  process.exit(1);
}

// Find the full lcc div start
var lccDivStart = rpt.lastIndexOf('\n', lccIdx - 5) + 1;
var lccDivEnd = rpt.indexOf("  h += '</div>';\n", lccIdx);
if (lccDivEnd < 0) {
  lccDivEnd = rpt.indexOf('h += \'</div>\'', lccIdx);
  lccDivEnd = rpt.indexOf('\n', lccDivEnd);
}
var lccBlock = rpt.substring(lccDivStart, lccDivEnd);
console.log('Old LCC block:', '\n' + lccBlock + '\n');

// New LCC block
var newLcc = "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';\n" +
  "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='no'?' active active-lcc':'') + \\'\" data-lcc=\"no\" onclick=\"setLccType('''no''')\">No Lcc</button>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='sub'?' active active-lcc':'') + \\'\" data-lcc=\"sub\" onclick=\"setLccType('''sub''')\">Sub Lcc</button>';\n" +
  "  h += '</div>';\n";

// Ugh the onclick handler uses single quotes inside HTML onclick, which is already inside a JS string.
// In the browser source code, the onclick needs to be:
//   onclick="setLccType('no')"
// Inside the h += '...' JS string, this becomes:
//   onclick="setLccType(\'no\')"
// To write this in a Node.js double-quoted string:
//   "onclick=\"setLccType(\\'no\\')\""

// Let me redo:
var newLcc2 = "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';\n" +
  "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='no'?' active active-lcc':'') + \\'\" data-lcc=\"no\" onclick=\"setLccType(\\'no\\')\">No Lcc</button>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='sub'?' active active-lcc':'') + \\'\" data-lcc=\"sub\" onclick=\"setLccType(\\'sub\\')\">Sub Lcc</button>';\n" +
  "  h += '</div>';\n";

// Actually wait. The original code has: onclick="setPriceMode(\'exw\')"
// In the rpt, this would appear as: onclick=\"setPriceMode(\\'exw\\')\"
// No, let me check the actual exact content of rpt
var modeBtnLine = rpt.indexOf("onclick=\"setPriceMode(");
if (modeBtnLine >= 0) {
  console.log('Mode button line:', rpt.substring(modeBtnLine, modeBtnLine + 60));
}

// The rpt content shows: onclick="setPriceMode(\'exw\')"
// So the actual characters in the file are: onclick="setPriceMode(\'exw\')"
// That means in the HTML file, the source code is: onclick="setPriceMode(\'exw\')"
// Which means the JavaScript code in the page has: onclick="setPriceMode(\'exw\')"
// When this HTML attribute value is parsed, it becomes: setPriceMode('exw')
// 
// So in my Node.js string, I need: onclick=\"setPriceMode(\\'exw\\')\"
// Because: 
//   \\" = escaped backslash = \  then " = 
//   Actually no. Let me be very precise.
// The HTML file (the final vi.html) contains:
//   onclick="setPriceMode(\'exw\')"
// In the Node.js script that modifies the file, to produce this text:
//   In a double-quoted Node string: "onclick=\"setPriceMode(\\'exw\\')\""
// Because:
//   \" produces " 
//   \\ produces \
//   ' is just ' inside a double-quoted string
// So: "onclick=\"setPriceMode(\\'exw\\')\"" produces: onclick="setPriceMode(\'exw\')"
// ✓ Correct!

// Now for the LCC buttons:
// Final HTML should have: onclick="setLccType(\'no\')"
// So in Node.js string: "onclick=\"setLccType(\\'no\\')\\\""

// Hmm wait, the ' at the end is confusing. Let me write it out character by character.
// Desired output: onclick="setLccType(\'no\')"
// Inside double-quoted Node.js string:
//   "onclick=\""  --> onclick="
//   "setLccType(" --> setLccType(
//   "\\'" --> \'  (backslash followed by single quote)
//   "no" --> no
//   "\\'" --> \'
//   ")" --> )
//   "\"" --> "
// Full: "onclick=\"setLccType(\\'no\\')\""
// All together in the line:
// "  h += '<button ... onclick=\"setLccType(\\'no\\')\">No Lcc</button>';"

// OK let me be even more careful. What's the ACTUAL character sequence I need in the final file?
// In the final HTML file, the JavaScript code line should be:
//   h += '<button class="lcc-btn ..." data-lcc="no" onclick="setLccType(\'no\')">No Lcc</button>';
// This is valid JS because:
//   - ' starts a string
//   - <button class="lcc-btn ..." data-lcc="no" onclick="setLccType(\'no\')">No Lcc</button>
//   - The string contains the entire HTML snippet
//   - Inside the string, \' is an escaped single quote
// So the actual bytes in the file for the onclick part would be:
//   onclick="setLccType(\'no\')"  (that's the literal text in the HTML file)
// 
// Now, to produce these bytes from a Node.js string (delimited with double quotes):
//   " onclick=\"setLccType(\\'no\\')\" "
// Let me verify:
//   "..." - Node.js string delimiters
//   \", \\, \\\\ have special meaning in Node.js strings
//   "onclick=\"" -> onclick="  (\" produces ")
//   "setLccType(" -> setLccType(
//   "\\'" -> \'  (\\ produces \, then ' is just ')
//   "no" -> no
//   "\\'" -> \'
//   ")" -> )
//   "\"" -> "
// Total: onclick="setLccType(\'no\')" ✓

// But wait, looking back at the original existing code in rpt for mode buttons:
// onclick="setPriceMode(\'exw\')"
// This is literally in the rpt string that I read from the file.
// So in rpt, the bytes are: onclick="setPriceMode(\'exw\')"
// This is JS source code where the string '...<button onclick="setPriceMode(\'exw\')">...' contains escaped single quotes.

// Now when I modify rpt and write it back, I need to produce the same byte pattern.
// The simplest approach: just read the rpt, do text replacements on the raw bytes,
// and write it back. No nesting of string representations needed!

// So: find the old LCC block text in rpt, and replace with new LCC block text.
// Both are raw strings (from the file or constructed).

var newLccBlock = 
  "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';\n" +
  "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm' + (lccType==='no'?' active active-lcc':'') + '\" data-lcc=\"no\" onclick=\"setLccType(\\'no\\')\">No Lcc</button>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm' + (lccType==='sub'?' active active-lcc':'') + '\" data-lcc=\"sub\" onclick=\"setLccType(\\'sub\\')\">Sub Lcc</button>';\n" +
  "  h += '</div>';\n";

var oldLccBlock = rpt.substring(lccDivStart, lccDivEnd);
console.log('Replacing LCC block...');
rpt = rpt.substring(0, lccDivStart) + newLccBlock + rpt.substring(lccDivEnd);
console.log('Fix 2: LCC block replaced');

// =========================================================
// FIX 3: Replace freight block with freightGroup wrapper
// =========================================================
var freightIdx = rpt.indexOf('Freight:');
if (freightIdx < 0) {
  console.log('ERROR: freight block not found');
  process.exit(1);
}
var cifIfStart = rpt.lastIndexOf('if (isCif)', freightIdx - 200);
var cifIfEnd = rpt.indexOf('\n', rpt.indexOf('}', cifIfStart));

console.log('\nOld freight block:', '\n' + rpt.substring(cifIfStart, cifIfEnd + 1));

var newFreightBlock = 
  "  if (isCif) {\n" +
  "    h += '<div class=\"price-mode-group\" id=\"freightGroup\" style=\"display:inline-flex\">';\n" +
  "    h += '<span class=\"price-mode-label\">\ud83d\udea2 C\u01b0\u1edbc:</span>';\n" +
  "    h += '<input type=\"number\" class=\"price-input price-input-num\" id=\"freightInput\" placeholder=\"USD\" value=\"' + (freightUSD||'') + '\" min=\"0\" step=\"100\" style=\"width:100px\" oninput=\"onFreightChange()\">';\n" +
  "    h += '<span class=\"price-mode-unit\">USD</span>';\n" +
  "    h += '</div>';\n" +
  "  }";

rpt = rpt.substring(0, cifIfStart) + newFreightBlock + rpt.substring(cifIfEnd + 1);
console.log('Fix 3: Freight block wrapped with freightGroup');

// Write modified rpt to file for debugging
fs.writeFileSync('memory/_rpt_modified.txt', rpt, 'utf8');

// Now check the check the check
console.log('\n=== RPT length:', rpt.length, '===');

// Replace in section 0
var s0Script = s0.indexOf('<script>');
var s0ScriptEnd = s0.indexOf('</script>', s0Script);
var s0Js = s0.substring(s0Script + 8, s0ScriptEnd);
var s0RpStart = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd = s0Js.indexOf('\nfunction populateFilters', s0RpStart);

var s0JsNew = s0Js.substring(0, s0RpStart) + '\n' + rpt + '\n' + s0Js.substring(s0RpEnd);
var finalH = s0.substring(0, s0Script + 8) + s0JsNew + s0.substring(s0ScriptEnd);

// Add price-card CSS
var firstStyle = finalH.indexOf('<style>');
var firstStyleEnd = finalH.indexOf('</style>');
var styleInsert = finalH.substring(firstStyle + 7, firstStyleEnd) + '\n\n/* === PRICE TAB REDESIGN === */\n' + s2Css;
finalH = finalH.substring(0, firstStyle + 7) + styleInsert + finalH.substring(firstStyleEnd);

// Remove static controlBar
var cbIdx = finalH.indexOf('id="controlBar"');
if (cbIdx >= 0 && cbIdx < finalH.lastIndexOf('<script>')) {
  var cbDivStart = finalH.lastIndexOf('<div', cbIdx);
  var d = 1, pos = cbIdx;
  while (d > 0) {
    var no = finalH.indexOf('<div', pos + 1);
    var nc = finalH.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('Remove controlBar div: [' + cbDivStart + ',' + pos + ']');
  finalH = finalH.substring(0, cbDivStart) + finalH.substring(pos);
}

// Remove static priceModeBar
var pmIdx = finalH.indexOf('id="priceModeBar"');
if (pmIdx >= 0 && pmIdx < finalH.lastIndexOf('<script>')) {
  var pmDivStart = finalH.lastIndexOf('<div', pmIdx);
  var d = 1, pos = pmIdx;
  while (d > 0) {
    var no = finalH.indexOf('<div', pos + 1);
    var nc = finalH.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('Remove priceModeBar div: [' + pmDivStart + ',' + pos + ']');
  finalH = finalH.substring(0, pmDivStart) + finalH.substring(pos);
}

// VALIDATE
var opens = (finalH.match(/{/g) || []).length;
var closes = (finalH.match(/}/g) || []).length;
var ov = (finalH.match(/<div[^>]*>/g) || []).length;
var cv = (finalH.match(/<\/div>/g) || []).length;
var cr = (finalH.match(/\r\n/g) || []).length;

console.log('\nBraces:', opens, 'vs', closes, opens === closes ? 'OK' : 'FAIL');
console.log('Divs:', ov, 'vs', cv, ov === cv ? 'OK' : 'FAIL');
console.log('CRLF:', cr);

if (opens !== closes || ov !== cv) { console.log('VALIDATION FAILED'); process.exit(1); }

// JS Parse
var lastScript = finalH.lastIndexOf('<script>');
try {
  new Function(finalH.substring(lastScript + 8, finalH.lastIndexOf('</script>')));
  console.log('JS Parse: OK');
} catch(e) {
  console.log('JS Parse FAIL: ' + e.message);
  // Write for debugging
  fs.writeFileSync('memory/_last_script.txt', finalH.substring(lastScript + 8, finalH.lastIndexOf('</script>')), 'utf8');
  process.exit(1);
}

// Verify
var fnBody = finalH.substring(
  finalH.indexOf('function renderPriceTab()'),
  finalH.indexOf('\nfunction populateFilters')
);
console.log('\n=== VERIFY ===');
var checks = ['resetFiltersBtn','toggleCurrency','lccGroup','freightGroup',
  'No Lcc','Sub Lcc','onFreightChange','toggleMaxLoad','setMarket',
  'price-card-header','price-card-filters','price-card-mode','price-card-summary'];
checks.forEach(function(c) {
  console.log(c + ':', fnBody.indexOf(c) >= 0 ? 'YES' : 'NO');
});

var staticPart = finalH.substring(0, finalH.indexOf('<script>'));
console.log('\nStatic HTML:');
console.log('Has controlBar:', staticPart.indexOf('id="controlBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('Has priceModeBar:', staticPart.indexOf('id="priceModeBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('renderPriceTab count:', (finalH.match(/function renderPriceTab\(\)/g) || []).length);
console.log('price-card CSS:', finalH.indexOf('price-card') < finalH.indexOf('</style>') ? 'YES' : 'NO');

fs.writeFileSync('sites/kiem-tra-gia/vi.html', finalH, 'utf8');
console.log('\nFile size:', finalH.length, 'bytes');
console.log('=== DONE ===');

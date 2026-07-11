var fs = require('fs');
// Normalise LF first
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// === FIND SECTIONS ===
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);

console.log('Sections:', JSON.stringify(htmlPos));

// Section 0 = before 2nd <html>
var s0End = h.indexOf('<!DOCTYPE', htmlPos[1]);
var s0 = h.substring(0, s0End);

// Get section 2 CSS
var s2Style = h.indexOf('<style>', htmlPos[2]);
var s2Css = h.substring(s2Style + 7, h.indexOf('</style>', s2Style));

// Get section 2 JS
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

// Extract NEW renderPriceTab from section 2
var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd);

// =========================================================
// FIX 1: CARD 2 (FILTERS) — add reset + currency toggle
// =========================================================
// Current filters card ends with:
//   h += '</div></div>';
// I need to insert reset + currency buttons before the filter-group close

var fgClose = "  h += '</div></div>';\n\n  // CARD 3";
var resetCurrencyHtml = "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';\n";
resetCurrencyHtml += "  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"B\u1ecf l\u1ecdc\">\u21bb</button>';\n";
resetCurrencyHtml += "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?' active':'') + \\'\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n";
resetCurrencyHtml += "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?'':' active') + \\'\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';\n";
resetCurrencyHtml += "  h += '</div>';\n";

// Hmm, the escaping with single quotes inside single quotes is tricky.
// The JS code is:  h += '<button class="..." ... onclick="...">...</button>';
// In the rpt string (which is JS source code), the line is:
//   h += '<button class="..." ... onclick="...">...</button>';
// So to add a new line, I need to make it part of the existing JS string in rpt.
// rpt currently contains lines like:
//   h += '<div class="price-filter-item"><select id="sizeFilter" ...></div>';
// I just need to insert the extra lines AFTER the sizeFilter line.

// Actually, let me find the exact line to insert after:
var sizeFilterLine = "  h += '<div class=\"price-filter-item\"><select id=\"sizeFilter\"";
var lineEnd = rpt.indexOf(sizeFilterLine);
if (lineEnd >= 0) {
  // Find end of this line
  lineEnd = rpt.indexOf('\n', lineEnd);
  var insertAfter = lineEnd;
  
  var extraLines = "\n" +
    "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';" + "\n" +
    "  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"Bỏ lọc\">↻</button>';" + "\n" +
    "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?' active':'') + \\'\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';" + "\n" +
    "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?'':' active') + \\'\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';" + "\n" +
    "  h += '</div>';";
  
  rpt = rpt.substring(0, insertAfter) + extraLines + rpt.substring(insertAfter);
  console.log('Fix 1: Added reset + currency buttons to filters card');
} else {
  console.log('ERROR: Could not find sizeFilter line!');
  process.exit(1);
}

// =========================================================
// FIX 2: CARD 4 (MODE) — replace LCC buttons + add wrappers
// =========================================================
// Current LCC section:
//   h += '<div class="price-mode-group"><span class="price-mode-label">LCC:</span>';
//   h += '<button class="price-pill price-pill-sm' + (lccType==='no'?' active active-lcc':'') + '" onclick="setLccType(\'no\')">Không</button>';
//   h += '<button class="price-pill price-pill-sm' + (lccType==='lcc'?' active active-lcc':'') + '" onclick="setLccType(\'lcc\')">LCC</button>';
//   h += '<button class="price-pill price-pill-sm' + (lccType==='lcc30'?' active active-lcc':'') + '" onclick="setLccType(\'lcc30\')">LCC 30</button>';
//   h += '</div>';
// 
// Replace with:
//   h += '<div class="lcc-group price-mode-group" id="lccGroup" style="display: ...">';
//   h += '<span class="price-mode-label">📦 LCC:</span>';
//   h += '<button class="lcc-btn price-pill price-pill-sm ..." onclick="setLccType(\'no\')">No Lcc</button>';
//   h += '<button class="lcc-btn price-pill price-pill-sm ..." onclick="setLccType(\'sub\')">Sub Lcc</button>';
//   h += '</div>';
//
// Also: wrap freight in freightGroup with conditional display

// Find the LCC block
var lccBlockStart = rpt.indexOf('class="price-mode-group"><span class="price-mode-label">LCC:');
if (lccBlockStart < 0) lccBlockStart = rpt.indexOf('<span class="price-mode-label">LCC:');
if (lccBlockStart >= 0) {
  // Find the start of this div (go back to <div)
  var lccDivStart = rpt.lastIndexOf('<div', lccBlockStart - 10);
  // Find the closing of this div
  var lccDivClose = rpt.indexOf('</div>', lccBlockStart);
  
  var oldLccBlock = rpt.substring(lccDivStart, lccDivClose + 6);
  console.log('Found LCC block at:', lccDivStart, '-', lccDivClose + 6);
  console.log('Old LCC:', oldLccBlock.substring(0, 100));
  
  var newLccBlock = 
    "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';" + "\n" +
    "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';" + "\n" +
    "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='no'?' active active-lcc':'') + \\'\" data-lcc=\"no\" onclick=\"setLccType('''no''')\">No Lcc</button>';" + "\n" +
    "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='sub'?' active active-lcc':'') + \\'\" data-lcc=\"sub\" onclick=\"setLccType('''sub''')\">Sub Lcc</button>';" + "\n" +
    "  h += '</div>';";
  
  rpt = rpt.substring(0, lccDivStart) + newLccBlock + rpt.substring(lccDivClose + 6);
  console.log('Fix 2a: Replaced LCC buttons with No Lcc/Sub Lcc + lccGroup');
} else {
  console.log('ERROR: Could not find LCC block!');
}

// Now fix freight — wrap it in freightGroup with conditional display
var freightLine = "  if (isCif) {";
var freightContainer = "  h += '<div class=\"price-mode-group\"><span class=\"price-mode-label\">Freight:";
var freightEnd = "    h += '<div class=\"price-mode-group\""; // after if block

// Find the freight block: search for 'Freight' in all price-mode-group
var freightIdx = rpt.indexOf('Freight:');
if (freightIdx >= 0) {
  // Find the start of the if(isCif) block
  var cifIfStart = rpt.lastIndexOf('if (isCif)', freightIdx - 100);
  var cifEndBlock = rpt.indexOf('}', cifIfStart);
  var cifBlock = rpt.substring(cifIfStart, cifEndBlock + 1);
  console.log('\nFreight block:', cifBlock);
  
  // Replace the freight div — wrap with freightGroup
  var oldFreightDiv = cifBlock.replace('if (isCif) {', '').trim();
  // Remove trailing },
  oldFreightDiv = oldFreightDiv.replace(/}\s*$/, '').trim();
  // Remove the indentation
  oldFreightDiv = oldFreightDiv.replace(/^ {4}/gm, '');
  
  console.log('Old freight HTML:', oldFreightDiv);
  
  var newFreightBlock =
    "  if (isCif) {\n" +
    "    h += '<div class=\"price-mode-group\" id=\"freightGroup\" style=\"display:inline-flex\">';" + "\n" +
    "    h += '<span class=\"price-mode-label\">\ud83d\udea2 C\u01b0\u1edbc:</span>';" + "\n" +
    "    h += '<input type=\"number\" class=\"price-input price-input-num\" id=\"freightInput\" placeholder=\"USD\" value=\"' + (freightUSD||'') + '\" min=\"0\" step=\"100\" style=\"width:100px\" oninput=\"onFreightChange()\">';" + "\n" +
    "    h += '<span class=\"price-mode-unit\">USD</span>';" + "\n" +
    "    h += '</div>';" + "\n" +
    "  }";
  
  rpt = rpt.substring(0, cifIfStart) + newFreightBlock + rpt.substring(cifEndBlock + 1);
  console.log('Fix 2b: Replaced freight block with freightGroup');
} else {
  console.log('ERROR: Could not find freight block!');
}

// =========================================================
// FIX 3: Replace old renderPriceTab in section 0
// =========================================================
var s0Script = s0.indexOf('<script>');
var s0ScriptEnd = s0.indexOf('</script>', s0Script);
var s0Js = s0.substring(s0Script + 8, s0ScriptEnd);
var s0RpStart = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd = s0Js.indexOf('\nfunction populateFilters', s0RpStart);

var s0JsNew = s0Js.substring(0, s0RpStart) + '\n' + rpt + '\n' + s0Js.substring(s0RpEnd);
var finalH = s0.substring(0, s0Script + 8) + s0JsNew + s0.substring(s0ScriptEnd);

// =========================================================
// FIX 4: Add price-card CSS to first style block
// =========================================================
var firstStyle = finalH.indexOf('<style>');
var styleContent = finalH.substring(firstStyle + 7, finalH.indexOf('</style>'));
styleContent += '\n\n/* === PRICE TAB REDESIGN CSS === */\n' + s2Css;
finalH = finalH.substring(0, firstStyle + 7) + styleContent + finalH.substring(finalH.indexOf('</style>'));

// =========================================================
// FIX 5: Remove static controlBar and priceModeBar from HTML
// =========================================================
// Find the FIRST controlBar in static HTML (before any <script>)
var staticPart = finalH.substring(0, finalH.indexOf('<script>'));
var cbStaticIdx = staticPart.indexOf('id="controlBar"');
if (cbStaticIdx >= 0) {
  var cbDiv = staticPart.lastIndexOf('<div', cbStaticIdx);
  // Find matching close
  var d = 1, pos = cbStaticIdx;
  while (d > 0) {
    var no = staticPart.indexOf('<div', pos + 1);
    var nc = staticPart.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('\nRemoving controlBar div:', cbDiv, '->', pos);
  finalH = finalH.substring(0, cbDiv) + finalH.substring(pos - 0 + 0); // offset adjust
  // Actually, we need to remove from finalH, not staticPart
  
  // Re-calculate positions in finalH
  var fbControlBar = finalH.indexOf('id="controlBar"');
  var fbCbDiv = finalH.lastIndexOf('<div', fbControlBar);
  d = 1; pos = fbControlBar;
  while (d > 0) {
    var no = finalH.indexOf('<div', pos + 1);
    var nc = finalH.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('Final controlBar div:', fbCbDiv, '->', pos);
  finalH = finalH.substring(0, fbCbDiv) + finalH.substring(pos);
}

var fbPriceModeBar = finalH.indexOf('id="priceModeBar"');
if (fbPriceModeBar >= 0) {
  var fbPmDiv = finalH.lastIndexOf('<div', fbPriceModeBar);
  var d = 1, pos = fbPriceModeBar;
  while (d > 0) {
    var no = finalH.indexOf('<div', pos + 1);
    var nc = finalH.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  console.log('Removing priceModeBar div:', fbPmDiv, '->', pos);
  finalH = finalH.substring(0, fbPmDiv) + finalH.substring(pos);
}

// =========================================================
// VALIDATE
// =========================================================
var opens = (finalH.match(/{/g) || []).length;
var closes = (finalH.match(/}/g) || []).length;
var ov = (finalH.match(/<div[^>]*>/g) || []).length;
var cv = (finalH.match(/<\/div>/g) || []).length;

console.log('\nBraces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov === cv ? 'OK' : 'FAIL'));

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

// VERIFY
var fnBody = finalH.substring(
  finalH.indexOf('function renderPriceTab()'),
  finalH.indexOf('\nfunction populateFilters')
);
console.log('\nVERIFY:');
console.log('resetFiltersBtn:', fnBody.indexOf('resetFiltersBtn') >= 0 ? 'YES' : 'NO');
console.log('toggleCurrency:', fnBody.indexOf('toggleCurrency') >= 0 ? 'YES' : 'NO');
console.log('lccGroup:', fnBody.indexOf('lccGroup') >= 0 ? 'YES' : 'NO');
console.log('freightGroup:', fnBody.indexOf('freightGroup') >= 0 ? 'YES' : 'NO');
console.log('No Lcc:', fnBody.indexOf('No Lcc') >= 0 ? 'YES' : 'NO');
console.log('Sub Lcc:', fnBody.indexOf('Sub Lcc') >= 0 ? 'YES' : 'NO');
console.log('setLccType no:', fnBody.indexOf("setLccType('no')") >= 0 ? 'YES' : 'NO');
console.log('setLccType sub:', fnBody.indexOf("setLccType('sub')") >= 0 ? 'YES' : 'NO');
console.log('onFreightChange:', fnBody.indexOf('onFreightChange') >= 0 ? 'YES' : 'NO');

var staticPart2 = finalH.substring(0, finalH.indexOf('<script>'));
console.log('\nStatic HTML:');
console.log('Has controlBar:', staticPart2.indexOf('id="controlBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('Has priceModeBar:', staticPart2.indexOf('id="priceModeBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('renderPriceTab count:', (finalH.match(/function renderPriceTab\(\)/g) || []).length);
console.log('File size:', finalH.length);

fs.writeFileSync('sites/kiem-tra-gia/vi.html', finalH, 'utf8');
console.log('\n=== WRITTEN OK ===');

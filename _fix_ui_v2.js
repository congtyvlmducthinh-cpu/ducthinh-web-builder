var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// 1. Find structure
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);
console.log('HTML positions:', htmlPos);

var section0End = h.indexOf('<!DOCTYPE', htmlPos[1]); // before 2nd html
var section0 = h.substring(0, section0End);

// 2. Get CSS from section 2's style block
var s2Style = h.indexOf('<style>', htmlPos[2]);
var s2StyleEnd = h.indexOf('</style>', s2Style);
var s2Css = h.substring(s2Style + 7, s2StyleEnd);

// Get CSS from section 1's style block (between html[1] and style[2])
var s1Style = h.indexOf('<style>', htmlPos[1]);
var s1StyleEnd = h.indexOf('</style>', s1Style);
var s1Css = h.substring(s1Style + 7, s1StyleEnd);

console.log('Section1 CSS length:', s1Css.length);
console.log('Section2 CSS length:', s2Css.length);

// 3. Extract new renderPriceTab function from section 2's script
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2ScriptEnd = h.indexOf('</script>', s2Script);
var s2Js = h.substring(s2Script + 8, s2ScriptEnd);

var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
console.log('renderPriceTab in section2:', rpStart, '->', rpEnd);

if (rpEnd < 0) {
  rpEnd = s2Js.indexOf('\nfunction initPriceTab(', rpStart);
  if (rpEnd < 0) rpEnd = s2Js.indexOf('\nfunction setPriceMode(', rpStart);
}
console.log('renderPriceTab length:', rpEnd - rpStart);

var newRenderPT = s2Js.substring(rpStart, rpEnd);

// 4. Fix Card 2 (Filters) — add reset button + currency toggle
// Find the closing </div> of price-filter-group
var filterGroupClose = newRenderPT.lastIndexOf('</div>', newRenderPT.indexOf('price-card-filters') + 400);
console.log('Filter group closing at offset:', filterGroupClose);

// Insert reset + currency after the last filter item
var insertPoint = newRenderPT.indexOf('</select>', newRenderPT.indexOf('sizeFilter'));
insertPoint = newRenderPT.indexOf('</div>', insertPoint) + 6; // after the last filter-item div
console.log('Insert point after size filter:', insertPoint);

var extraFilters = "' + (isUsd?' active':'');" + // no, this is wrong
'<div class="price-filter-item" style="display:flex;gap:4px;align-items:center">' +
'<button class="price-btn price-btn-sm" id="resetFiltersBtn" onclick="resetFilters()" title="B\u1ecf l\u1ecdc">\u21bb</button>' +
'<button class="price-btn price-btn-sm' + (isUsd?' active':'') + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>' +
'<button class="price-btn price-btn-sm' + (isUsd?'':' active') + '" data-currency="USD" onclick="toggleCurrency(this)">USD</button>' +
'</div>' +
"' + // back to normal: ... wait, this is getting complex
'</div></div>'; 

// Actually, let me do this differently. Find the exact string that represents the filters closing div
// and modify it. The filter-group div is: '<div class="price-filter-group"> ... </div>'
// After the last filter-item, insert the extra buttons before </div></div>

// Let me find what's right before filter-group closing
var filterGroupStart = newRenderPT.indexOf('price-filter-group');
var depth = 1;
var pos = filterGroupStart;
while (depth > 0) {
  var no = newRenderPT.indexOf('<div', pos + 1);
  var nc = newRenderPT.indexOf('</div>', pos + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { depth++; pos = no + 4; }
  else { depth--; pos = nc + 5; }
}
var filterGroupEnd = pos - 6;
console.log('Filter group goes:', filterGroupStart, '->', filterGroupEnd);

// The last child before group close — find the position to insert
var lastChildClose = newRenderPT.lastIndexOf('</div>', filterGroupEnd);
console.log('Last child closing:', lastChildClose);
console.log('Context before group close:', newRenderPT.substring(filterGroupEnd - 100, filterGroupEnd));

// Build the extra filter buttons
var extraHtml = '<div class="price-filter-item" style="display:flex;gap:4px;align-items:center">';
extraHtml += '<button class="price-btn price-btn-sm" id="resetFiltersBtn" onclick="resetFilters()" title="B\u1ecf l\u1ecdc">\u21bb</button>';
// VND toggle — need to escape for single-quote JS string
extraHtml += '<button class="price-btn price-btn-sm\' + (isUsd?\' active\':\'\') + \'" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
extraHtml += '<button class="price-btn price-btn-sm\' + (isUsd?\'\':\' active\') + \'" data-currency="USD" onclick="toggleCurrency(this)">USD</button>';
extraHtml += '</div>';

newRenderPT = newRenderPT.substring(0, lastChildClose) + extraHtml + newRenderPT.substring(filterGroupEnd);

// 5. Replace in section0
var s0ScriptStart = section0.indexOf('<script>');
var s0ScriptEnd = section0.indexOf('</script>', s0ScriptStart);
var s0Js = section0.substring(s0ScriptStart + 8, s0ScriptEnd);
var s0RpStart = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd = s0Js.indexOf('\nfunction populateFilters', s0RpStart);
if (s0RpEnd < 0) s0RpEnd = s0Js.indexOf('\nfunction initPriceTab(', s0RpStart);

console.log('\nReplace in section0:', s0RpStart, '->', s0RpEnd);

var s0JsNew = s0Js.substring(0, s0RpStart) + '\n' + newRenderPT + '\n' + s0Js.substring(s0RpEnd);

var finalH = section0.substring(0, s0ScriptStart + 8) + s0JsNew + section0.substring(s0ScriptEnd);

// 6. Add price CSS to first style block
var firstStyle = finalH.indexOf('<style>');
var firstStyleEnd = finalH.indexOf('</style>');
var styleInsert = finalH.substring(firstStyle + 7, firstStyleEnd) + '\n\n/* === PRICE TAB REDESIGN === */\n' + s2Css;
finalH = finalH.substring(0, firstStyle + 7) + styleInsert + finalH.substring(firstStyleEnd);

// 7. Remove static controlBar div
var cbIdx = finalH.indexOf('id="controlBar"');
if (cbIdx >= 0) {
  var divStart = finalH.lastIndexOf('<div', cbIdx);
  depth = 1; p = cbIdx;
  while (depth > 0) {
    var no = finalH.indexOf('<div', p + 1);
    var nc = finalH.indexOf('</div>', p + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { depth++; p = no + 4; }
    else { depth--; p = nc + 5; }
  }
  console.log('\nRemoved controlBar div:', divStart, '->', p);
  finalH = finalH.substring(0, divStart) + finalH.substring(p);
}

// 8. Remove static priceModeBar div
var pmIdx = finalH.indexOf('id="priceModeBar"');
if (pmIdx >= 0) {
  var divStart = finalH.lastIndexOf('<div', pmIdx);
  depth = 1; p = pmIdx;
  while (depth > 0) {
    var no = finalH.indexOf('<div', p + 1);
    var nc = finalH.indexOf('</div>', p + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { depth++; p = no + 4; }
    else { depth--; p = nc + 5; }
  }
  console.log('Removed priceModeBar div:', divStart, '->', p);
  finalH = finalH.substring(0, divStart) + finalH.substring(p);
}

console.log('\nFile size: old=' + h.length + ' new=' + finalH.length);

// 9. Validate
var opens = (finalH.match(/{/g) || []).length;
var closes = (finalH.match(/}/g) || []).length;
var ov = (finalH.match(/<div[^>]*>/g) || []).length;
var cv = (finalH.match(/<\/div>/g) || []).length;
var cr = (finalH.match(/\r\n/g) || []).length;

console.log('Braces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov === cv ? 'OK' : 'FAIL'));
console.log('CRLF: ' + cr + ' ' + (cr === 0 ? 'OK' : 'FAIL'));

var fail = false;
if (opens !== closes) { console.log('BRACE IMBALANCE'); fail = true; }
if (ov !== cv) { console.log('DIV IMBALANCE'); fail = true; }
if (cr > 0) { console.log('CRLF DETECTED'); fail = true; }
if (fail) process.exit(1);

// 10. JS Parse
var lastScriptTag = finalH.lastIndexOf('<script>');
var lastScriptClose = finalH.lastIndexOf('</script>');
try {
  new Function(finalH.substring(lastScriptTag + 8, lastScriptClose));
  console.log('JS Parse: OK');
} catch(e) {
  console.log('JS Parse FAIL: ' + e.message);
  process.exit(1);
}

// 11. Verify function content
var fnBody = finalH.substring(
  finalH.indexOf('function renderPriceTab()'),
  finalH.indexOf('\nfunction populateFilters')
);
console.log('\n=== VERIFY ===');
console.log('price-card-header:', fnBody.indexOf('price-card-header') >= 0 ? 'YES' : 'NO');
console.log('price-card-filters:', fnBody.indexOf('price-card-filters') >= 0 ? 'YES' : 'NO');
console.log('price-card-mode:', fnBody.indexOf('price-card-mode') >= 0 ? 'YES' : 'NO');
console.log('globalSearch:', fnBody.indexOf('globalSearch') >= 0 ? 'YES' : 'NO');
console.log('toggleCurrency:', fnBody.indexOf('toggleCurrency') >= 0 ? 'YES' : 'NO');
console.log('setPriceMode:', fnBody.indexOf('setPriceMode') >= 0 ? 'YES' : 'NO');
console.log('setLccType:', fnBody.indexOf('setLccType') >= 0 ? 'YES' : 'NO');
console.log('onFreightChange:', fnBody.indexOf('onFreightChange') >= 0 ? 'YES' : 'NO');
console.log('toggleMaxLoad:', fnBody.indexOf('toggleMaxLoad') >= 0 ? 'YES' : 'NO');
console.log('setMarket:', fnBody.indexOf('setMarket') >= 0 ? 'YES' : 'NO');
console.log('No Lcc:', fnBody.indexOf('No Lcc') >= 0 ? 'YES' : 'NO');
console.log('Sub Lcc:', fnBody.indexOf('Sub Lcc') >= 0 ? 'YES' : 'NO');

var staticPart = finalH.substring(0, finalH.indexOf('<script>'));
console.log('\nStatic HTML');
console.log('controlBar:', staticPart.indexOf('id="controlBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('priceModeBar:', staticPart.indexOf('id="priceModeBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('renderPriceTab count:', (finalH.match(/function renderPriceTab\(\)/g) || []).length);
console.log('price-card CSS:', finalH.lastIndexOf('price-card') < finalH.lastIndexOf('</style>') ? 'YES' : 'NO');
console.log('Final file size:', finalH.length);

fs.writeFileSync('sites/kiem-tra-gia/vi.html', finalH, 'utf8');
console.log('\n=== WRITTEN OK ===');

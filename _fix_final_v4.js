var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// Find sections
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);
console.log('Sections:', htmlPos);

// Section 0
var s0End = h.indexOf('<!DOCTYPE', htmlPos[1]);
var s0 = h.substring(0, s0End);

// Section 2 CSS
var s2Style = h.indexOf('<style>', htmlPos[2]);
var s2Css = h.substring(s2Style + 7, h.indexOf('</style>', s2Style));

// Section 2 JS
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

// Extract new renderPriceTab
var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd);

// =========================================================
// FIX 1: Add reset + currency toggle to filters
// =========================================================
var extraBtns = 
  "  h += '<div class=\"price-filter-item\" style=\"display:flex;gap:4px;align-items:center\">';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\" id=\"resetFiltersBtn\" onclick=\"resetFilters()\" title=\"B\u1ecf l\u1ecdc\">\u21bb</button>';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?\\' active\\':\\'\\') + \\'\" data-currency=\"VND\" onclick=\"toggleCurrency(this)\">VND</button>';\n" +
  "  h += '<button class=\"price-btn price-btn-sm\\' + (isUsd?\\'\\':\\' active\\') + \\'\" data-currency=\"USD\" onclick=\"toggleCurrency(this)\">USD</button>';\n" +
  "  h += '</div>';\n";

// Find sizeFilter line end
var sfLine = '  h += \'<div class="price-filter-item"><select id="sizeFilter"';
var sfIdx = rpt.indexOf(sfLine);
sfIdx = rpt.indexOf('\n', sfIdx);
rpt = rpt.substring(0, sfIdx) + '\n' + extraBtns + rpt.substring(sfIdx);

// =========================================================
// FIX 2: Replace LCC block
// =========================================================
var lccLine = 'h += \'<div class="price-mode-group"><span class="price-mode-label">LCC:</span>\'';
var lccIdx = rpt.indexOf(lccLine);
var lccDivStart = rpt.lastIndexOf('\n', lccIdx - 5);
// Find the closing h += '</div>'; after all 3 LCC buttons
var lccSearchFrom = lccIdx;
for (var j = 0; j < 4; j++) {
  lccSearchFrom = rpt.indexOf("h += '</div>'", lccSearchFrom + 1);
}
var lccDivEnd = rpt.indexOf('\n', lccSearchFrom);

var newLcc =
  "  h += '<div class=\"lcc-group price-mode-group\" id=\"lccGroup\" style=\"display:' + (showFobCif?'flex':'none') + '\">';\n" +
  "  h += '<span class=\"price-mode-label\">\ud83d\udce6 LCC:</span>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='no'?' active active-lcc':'') + \\'\" data-lcc=\"no\" onclick=\"setLccType(\\'no\\')\">No Lcc</button>';\n" +
  "  h += '<button class=\"lcc-btn price-pill price-pill-sm\\' + (lccType==='sub'?' active active-lcc':'') + \\'\" data-lcc=\"sub\" onclick=\"setLccType(\\'sub\\')\">Sub Lcc</button>';\n" +
  "  h += '</div>';\n";

rpt = rpt.substring(0, lccDivStart) + newLcc + rpt.substring(lccDivEnd + 1);

// =========================================================
// FIX 3: Replace freight block with freightGroup
// =========================================================
var freightIdx = rpt.indexOf('Freight:');
var cifIfStart = rpt.lastIndexOf('if (isCif)', freightIdx - 200);
// Find the closing } of this if block — look for "  }\n  h += '<div class=..."
var cifIfEnd = rpt.indexOf('\n', cifIfStart);
var cifClose = -1;
var searchFrom = cifIfStart;
// The if block looks like:
//   if (isCif) {
//     h += '<div ...>
//     h += ...
//     h += '</div>';
//   }
// Find 3 "h +=" lines, then a closing }
var closeBrace = rpt.indexOf('}', cifIfStart); // first }
closeBrace = rpt.indexOf('}', closeBrace + 1); // second

// Actually the original code has: if (isCif) { ... \n  }
// Where the } is at the same indent level as if
var ifBlockEnd = rpt.indexOf('\n  }', cifIfStart);
if (ifBlockEnd < 0) ifBlockEnd = rpt.indexOf('\n}', cifIfStart);
// Find the actual newline after this
ifBlockEnd = rpt.indexOf('\n', ifBlockEnd + 1);

// But wait, is the freight the ONLY if(isCif) block? Let me check
// After my LCC replacement, the next block should be the freight block
// Let me find all if (isCif) blocks
var allCifBlocks = [];
var sp = 0;
while ((sp = rpt.indexOf('if (isCif)', sp)) >= 0) {
  allCifBlocks.push(sp);
  sp += 10;
}
console.log('all if(isCif) positions:', allCifBlocks);

// The freight block should be the SECOND one (after the mode section)
// Actually, looking at the structure, there's only one if(isCif) in the mode card
// because the original code has it inside card 4
var ourCifIdx = 0;
for (var i = 0; i < allCifBlocks.length; i++) {
  var pos = allCifBlocks[i];
  // Check if this is within the mode card section
  var beforeSection = rpt.substring(pos - 500, pos);
  if (beforeSection.indexOf('price-card-mode') >= 0) {
    ourCifIdx = i;
    console.log('Found CIF block in mode card at pos:', pos);
    break;
  }
  if (i === allCifBlocks.length - 1) {
    ourCifIdx = i;
    console.log('Using last CIF block at pos:', pos);
  }
}

var cifPos = allCifBlocks[ourCifIdx];
var cifBlockEnd = rpt.indexOf('\n  }', cifPos);
if (cifBlockEnd < 0) cifBlockEnd = rpt.indexOf('\n}', cifPos);
// Find end of line
cifBlockEnd = rpt.indexOf('\n', cifBlockEnd + 1);
var oldCifBlock = rpt.substring(cifPos, cifBlockEnd + 1);
console.log('Old CIF block:\n' + oldCifBlock);

var newFreight = 
  "  if (isCif) {\n" +
  "    h += '<div class=\"price-mode-group\" id=\"freightGroup\" style=\"display:inline-flex\">';\n" +
  "    h += '<span class=\"price-mode-label\">\ud83d\udea2 C\u01b0\u1edbc:</span>';\n" +
  "    h += '<input type=\"number\" class=\"price-input price-input-num\" id=\"freightInput\" placeholder=\"USD\" value=\"' + (freightUSD||'') + '\" min=\"0\" step=\"100\" style=\"width:100px\" oninput=\"onFreightChange()\">';\n" +
  "    h += '<span class=\"price-mode-unit\">USD</span>';\n" +
  "    h += '</div>';\n" +
  "  }\n";

rpt = rpt.substring(0, cifPos) + newFreight + rpt.substring(cifBlockEnd + 1);

// =========================================================
// NEW: Remove 3 container divs from static HTML
// =========================================================
var staticPart = s0.substring(0, s0.indexOf('<script>'));
var oldContainers = [];
var sp2 = 0;
while ((sp2 = staticPart.indexOf('class="container"', sp2)) >= 0) {
  oldContainers.push(sp2);
  sp2 += 18;
}
console.log('\nStatic container divs at:', oldContainers);

// Remove these container divs from s0 static HTML
// Find each div start and end, then strip them
for (var k = oldContainers.length - 1; k >= 0; k--) {
  var idx = oldContainers[k];
  // Only remove if it's a container div in HTML (not in JS)
  // Find the opening <div
  var divStart = staticPart.lastIndexOf('<div', idx);
  var divEnd = staticPart.indexOf('</div>', idx) + 6;
  
  // Make sure this is a standalone div, not nested
  // Check context
  console.log('  Container ' + k + ': ' + divStart + '..' + divEnd + ' ' + staticPart.substring(idx, idx + 40));
  
  // Remove from s0
  s0 = s0.substring(0, divStart) + s0.substring(divEnd);
  // Recalculate staticPart
  staticPart = s0.substring(0, s0.indexOf('<script>'));
}

// =========================================================
// NEW: Remove static controlBar and priceModeBar from s0
// =========================================================
// Find them in reverse order to avoid index shifting
var rems = [];

// controlBar
var cbIdx = s0.indexOf('id="controlBar"');
if (cbIdx >= 0 && cbIdx < s0.indexOf('<script>')) {
  var cbDivStart = s0.lastIndexOf('<div', cbIdx);
  var d = 1, pos = cbIdx;
  while (d > 0) {
    var no = s0.indexOf('<div', pos + 1);
    var nc = s0.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  rems.push({start: cbDivStart, end: pos});
  console.log('controlBar div: [' + cbDivStart + ',' + pos + ']');
}

// priceModeBar
var pmIdx = s0.indexOf('id="priceModeBar"');
if (pmIdx >= 0 && pmIdx < s0.indexOf('<script>')) {
  var pmDivStart = s0.lastIndexOf('<div', pmIdx);
  var d = 1, pos = pmIdx;
  while (d > 0) {
    var no = s0.indexOf('<div', pos + 1);
    var nc = s0.indexOf('</div>', pos + 1);
    if (nc < 0) break;
    if (no >= 0 && no < nc) { d++; pos = no + 4; }
    else { d--; pos = nc + 5; }
  }
  rems.push({start: pmDivStart, end: pos});
  console.log('priceModeBar div: [' + pmDivStart + ',' + pos + ']');
}

// Remove in reverse order
rems.sort(function(a,b) { return b.start - a.start; });
for (var i = 0; i < rems.length; i++) {
  s0 = s0.substring(0, rems[i].start) + s0.substring(rems[i].end);
}

// =========================================================
// Now replace renderPriceTab in s0's JS
// =========================================================
var s0Script = s0.indexOf('<script>');
var s0ScriptEnd = s0.indexOf('</script>', s0Script);
var s0Js = s0.substring(s0Script + 8, s0ScriptEnd);

var s0RpStart2 = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd2 = s0Js.indexOf('\nfunction populateFilters', s0RpStart2);

var s0JsNew = s0Js.substring(0, s0RpStart2) + '\n' + rpt + '\n' + s0Js.substring(s0RpEnd2);
var finalH = s0.substring(0, s0Script + 8) + s0JsNew + s0.substring(s0ScriptEnd);

// Add price-card CSS
var firstStyle = finalH.indexOf('<style>');
var firstStyleEnd = finalH.indexOf('</style>');
var styleInsert = finalH.substring(firstStyle + 7, firstStyleEnd) + '\n\n/* === PRICE TAB REDESIGN === */\n' + s2Css;
finalH = finalH.substring(0, firstStyle + 7) + styleInsert + finalH.substring(firstStyleEnd);

// =========================================================
// VALIDATE
// =========================================================
var opens = (finalH.match(/{/g) || []).length;
var closes = (finalH.match(/}/g) || []).length;
var ov = (finalH.match(/<div[^>]*>/g) || []).length;
var cv = (finalH.match(/<\/div>/g) || []).length;
var cr = (finalH.match(/\r\n/g) || []).length;

console.log('\nBraces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov === cv ? 'OK' : 'FAIL'));
console.log('CRLF: ' + cr + ' ' + (cr === 0 ? 'OK' : 'FAIL'));

var ok = true;
if (opens !== closes) { console.log('BRACE IMBALANCE'); ok = false; }
if (ov !== cv) { console.log('DIV IMBALANCE'); ok = false; }
if (!ok) process.exit(1);

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
var checks = ['resetFiltersBtn','toggleCurrency','lccGroup','freightGroup',
  'No Lcc','Sub Lcc','onFreightChange','toggleMaxLoad','setMarket'];
checks.forEach(function(c) {
  console.log(c + ':', fnBody.indexOf(c) >= 0 ? 'YES' : 'NO');
});

var staticPart = finalH.substring(0, finalH.indexOf('<script>'));
console.log('\nStatic HTML:');
console.log('controlBar:', staticPart.indexOf('id="controlBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('priceModeBar:', staticPart.indexOf('id="priceModeBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('renderPriceTab count:', (finalH.match(/function renderPriceTab\(\)/g) || []).length);
console.log('price-card CSS:', finalH.indexOf('price-card') < finalH.indexOf('</style>') ? 'YES' : 'NO');
console.log('File size:', finalH.length);

// Count sections
console.log('\nhtml count:', (finalH.match(/<html/g) || []).length);
console.log('doctype count:', (finalH.match(/<!DOCTYPE/g) || []).length);

fs.writeFileSync('sites/kiem-tra-gia/vi.html', finalH, 'utf8');
console.log('\n=== WRITTEN OK ===');

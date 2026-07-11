var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// Find structure
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);
console.log('HTML positions:', htmlPos);

// Section 0 (first copy)
var section0End = h.indexOf('<!DOCTYPE', htmlPos[1]);
var section0 = h.substring(0, section0End);

// Get CSS from section 2's style block
var s2Style = h.indexOf('<style>', htmlPos[2]);
var s2StyleEnd = h.indexOf('</style>', s2Style);
var s2Css = h.substring(s2Style + 7, s2StyleEnd);

// Get new renderPriceTab from section 2
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2ScriptEnd = h.indexOf('</script>', s2Script);
var s2Js = h.substring(s2Script + 8, s2ScriptEnd);

var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var newRenderPT = s2Js.substring(rpStart, rpEnd);

// Read the actual contents of the current filter card and mode card from newRenderPT
var fsIdx = newRenderPT.indexOf('price-card-filters');
var fsDiv = newRenderPT.lastIndexOf('<div', fsIdx - 10);

// Write current filter HTML to file for inspection
fs.writeFileSync('memory/_filters_before.txt', newRenderPT.substring(fsDiv, fsDiv + 600), 'utf8');
console.log('Current filters HTML:');
console.log(newRenderPT.substring(fsDiv, fsDiv + 600));

// Check the filter-group children
var fgIdx = newRenderPT.indexOf('price-filter-group', fsIdx);
console.log('\nprice-filter-group at:', fgIdx);
var fgEnd = newRenderPT.indexOf('</div>', fgIdx);
console.log('First child close:', fgEnd);

// Read what's before filter-group closing
var fgDepth = 1;
var fgP = fgIdx;
while (fgDepth > 0) {
  var no = newRenderPT.indexOf('<div', fgP + 1);
  var nc = newRenderPT.indexOf('</div>', fgP + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { fgDepth++; fgP = no + 4; }
  else { fgDepth--; fgP = nc + 5; }
}
console.log('Filter group ends at:', fgP);
console.log('Last 100 chars of filter-group:');
console.log(newRenderPT.substring(fgP - 100, fgP));

// Now construct the fix differently - just find and replace the ENTIRE filter-group inner content
// with one that includes the extra buttons

// First, extract the filter-group children (between <div class="price-filter-group"> and </div>)
var fgStart = newRenderPT.indexOf('>', fgIdx) + 1;
var fgContent = newRenderPT.substring(fgStart, fgP - 6); // -6 for </div>
console.log('\nFilter group content:', fgContent.substring(0, 400));

// Build new filter-group content - same as original but add reset + currency at end
// The original has 4 filter-items (search, machine, standard, size)
// We need to add a 5th item after the last filter-item

// Find the last </div> inside filter-group that closes a filter-item
var lastItemClose = fgContent.lastIndexOf('</div>');
console.log('Last item close:', lastItemClose, '=', fgContent.substring(lastItemClose));

var extraButtons = '<div class="price-filter-item" style="display:flex;gap:4px;align-items:center">';
extraButtons += '<button class="price-btn price-btn-sm" id="resetFiltersBtn" onclick="resetFilters()" title="B\u1ecf l\u1ecdc">\u21bb</button>';
// VND/USD toggle - careful with JS string escape
var escQ = "'";  // single quote
var dbQ = '"';    // double quote
extraButtons += '<button class="price-btn price-btn-sm\\' + escQ + ' + (isUsd?\\' + escQ + ' active\\' + escQ + ': \\' + escQ + ') + \\' + escQ + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
extraButtons += '<button class="price-btn price-btn-sm\\' + escQ + ' + (isUsd?\\' + escQ + ': \\' + escQ + ' active\\' + escQ + ') + \\' + escQ + '" data-currency="USD" onclick="toggleCurrency(this)">USD</button>';
extraButtons += '</div>';

// Wait, this escaping is getting out of hand. Let me use a simple approach:
// The new renderPT already has a good filters card - it just needs reset + currency buttons
// Let me find the exact string and do a simple replace

// Actually let me read the current newRenderPT filters card fully
var fcStart = newRenderPT.lastIndexOf('<div', fsIdx - 20);
var fcDepth = 1;
var fcP = fcStart;
while (fcDepth > 0) {
  var no = newRenderPT.indexOf('<div', fcP + 1);
  var nc = newRenderPT.indexOf('</div>', fcP + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { fcDepth++; fcP = no + 4; }
  else { fcDepth--; fcP = nc + 5; }
}
var fcEnd = fcP;
var currentFiltersCard = newRenderPT.substring(fcStart, fcEnd);
console.log('\n\nFull filters card:');
console.log(currentFiltersCard);

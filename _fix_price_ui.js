var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// 1. Find section boundaries
var firstHtml = h.indexOf('<html');
var doctypeAfter1 = h.indexOf('<!DOCTYPE', firstHtml + 1);
var section0 = h.substring(0, doctypeAfter1);

// 2. Extract NEW renderPriceTab from section 2
var thirdHtml = h.indexOf('<html', h.indexOf('<html', firstHtml + 1) + 1);
var script2Start = h.indexOf('<script>', thirdHtml);
var script2End = h.indexOf('</script>', script2Start);
var js2 = h.substring(script2Start + 8, script2End);

var rpStart = js2.indexOf('function renderPriceTab()');
var rpEnd = js2.indexOf('\nfunction populateFilters', rpStart);
var newRenderPT = js2.substring(rpStart, rpEnd).trim();

// 3. Fix Card 2 (Filters)
var filtersCardIdx = newRenderPT.indexOf('price-card-filters');
var fsStart = newRenderPT.lastIndexOf('<div', filtersCardIdx - 100);
var depth = 1, p = fsStart;
while (depth > 0 && p < newRenderPT.length) {
  var no = newRenderPT.indexOf('<div', p + 1);
  var nc = newRenderPT.indexOf('</div>', p + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { depth++; p = no + 4; }
  else { depth--; p = nc + 5; }
}
var fsEnd = p - 6;

// Build new filters HTML — as a browser-side JS string (not eval'd here)
var q = "'"; // single quote
var dq = '"'; // double quote
var esc = function(s) { return s.replace(/'/g, "\\'"); };

var newFiltersHtml = '<div class="price-card price-card-filters">';
newFiltersHtml += '<div class="price-filter-group">';

// Search
newFiltersHtml += '<div class="price-filter-item price-filter-search">';
newFiltersHtml += '<span class="price-filter-icon">\ud83d\udd0d</span>';
newFiltersHtml += '<input type="text" id="searchInput" class="price-input" placeholder="Tìm mã SP, kích thước..." ';
newFiltersHtml += 'value="' + q + ' + domEscape(search) + ' + q + '" oninput="globalSearch()">';
newFiltersHtml += '</div>';

// Machine
newFiltersHtml += '<div class="price-filter-item">';
newFiltersHtml += '<select id="machineFilter" class="price-select" onchange="render()">';
newFiltersHtml += '<option value="">\ud83c\udfed Máy</option>';
newFiltersHtml += q + ' + DATA_PRODUCTS.map(function(p){return p.machine;}).filter(function(v,i,a){return a.indexOf(v)===i;}).filter(Boolean).sort().map(function(m){return \'<option value="'+dq+domEscape(m)+dq+dq+(m===machineFilter?" selected":"")+dq+'>\'+domEscape(m)+\'</option>\';}).join(' + q + ') + ' + q;
newFiltersHtml += '</select></div>';

// Spec
newFiltersHtml += '<div class="price-filter-item">';
newFiltersHtml += '<select id="specFilter" class="price-select" onchange="render()">';
newFiltersHtml += '<option value="">\ud83d\udcd0 Tiêu chuẩn</option>';
newFiltersHtml += q + ' + DATA_PRODUCTS.map(function(p){return p.standard;}).filter(function(v,i,a){return a.indexOf(v)===i;}).filter(Boolean).sort().map(function(s){return \'<option value="'+dq+domEscape(s)+dq+dq+(s===specFilter?" selected":"")+dq+'>\'+domEscape(s)+\'</option>\';}).join(' + q + ') + ' + q;
newFiltersHtml += '</select></div>';

// Size
newFiltersHtml += '<div class="price-filter-item">';
newFiltersHtml += '<select id="sizeFilter" class="price-select" onchange="render()">';
newFiltersHtml += '<option value="">\ud83d\udccf Kích thước</option>';
newFiltersHtml += q + ' + DATA_PRODUCTS.map(function(p){return p.size;}).filter(function(v,i,a){return a.indexOf(v)===i;}).filter(Boolean).sort().map(function(s){return \'<option value="'+dq+domEscape(s)+dq+dq+(s===sizeFilter?" selected":"")+dq+'>\'+domEscape(s)+\'</option>\';}).join(' + q + ') + ' + q;
newFiltersHtml += '</select></div>';

// Reset + Currency toggle
newFiltersHtml += '<div class="price-filter-item" style="display:flex;gap:4px;align-items:center">';
newFiltersHtml += '<button class="price-btn price-btn-sm" id="resetFiltersBtn" onclick="resetFilters()" title="Bỏ lọc">\u21bb</button>';
newFiltersHtml += '<button class="price-btn price-btn-sm' + q + ' + (isUsd?' + q + ' ' + q + ': ' + q + ') + ' + q + '" data-currency="VND" onclick="toggleCurrency(this)">VND</button>';
newFiltersHtml += '<button class="price-btn price-btn-sm' + q + ' + (!isUsd?' + q + ' ' + q + ': ' + q + ') + ' + q + '" data-currency="USD" onclick="toggleCurrency(this)">USD</button>';
newFiltersHtml += '</div>';

newFiltersHtml += '</div></div>';

newRenderPT = newRenderPT.substring(0, fsStart) + newFiltersHtml + newRenderPT.substring(fsEnd + 6);

// 4. Fix Card 4 (Mode)
var modeCardIdx = newRenderPT.indexOf('price-card-mode');
var msStart = newRenderPT.lastIndexOf('<div', modeCardIdx - 100);
depth = 1; p = msStart;
while (depth > 0 && p < newRenderPT.length) {
  var no = newRenderPT.indexOf('<div', p + 1);
  var nc = newRenderPT.indexOf('</div>', p + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { depth++; p = no + 4; }
  else { depth--; p = nc + 5; }
}
var msEnd = p - 6;

var newModeHtml = '<div class="price-card price-card-mode">';
newModeHtml += '<div class="price-mode-row">';
// Mode buttons
newModeHtml += '<div class="price-mode-group"><span class="price-mode-label">Chế độ:</span>';
newModeHtml += '<button class="mode-btn price-pill' + q + ' + (priceMode===' + q + 'exw' + q + '?' + q + ' active active-exw' + q + ': ' + q + ') + ' + q + '" data-mode="exw" onclick="setPriceMode(' + q + 'exw' + q + ')">EXW</button>';
newModeHtml += '<button class="mode-btn price-pill' + q + ' + (priceMode===' + q + 'fob' + q + '?' + q + ' active active-fob' + q + ': ' + q + ') + ' + q + '" data-mode="fob" onclick="setPriceMode(' + q + 'fob' + q + ')">FOB</button>';
newModeHtml += '<button class="mode-btn price-pill' + q + ' + (priceMode===' + q + 'cif' + q + '?' + q + ' active active-cif' + q + ': ' + q + ') + ' + q + '" data-mode="cif" onclick="setPriceMode(' + q + 'cif' + q + ')">CIF</button>';
newModeHtml += '</div>';

// LCC group
newModeHtml += '<div class="lcc-group price-mode-group" id="lccGroup" style="display:' + q + ' + (showFobCif?' + q + 'flex' + q + ': ' + q + 'none' + q + ') + ' + q + '">';
newModeHtml += '<span class="price-mode-label">\ud83d\udce6 LCC:</span>';
newModeHtml += '<button class="lcc-btn price-pill price-pill-sm' + q + ' + (lccType===' + q + 'no' + q + '?' + q + ' active active-lcc' + q + ': ' + q + ') + ' + q + '" data-lcc="no" onclick="setLccType(' + q + 'no' + q + ')">No Lcc</button>';
newModeHtml += '<button class="lcc-btn price-pill price-pill-sm' + q + ' + (lccType===' + q + 'sub' + q + '?' + q + ' active active-lcc' + q + ': ' + q + ') + ' + q + '" data-lcc="sub" onclick="setLccType(' + q + 'sub' + q + ')">Sub Lcc</button>';
newModeHtml += '</div>';

// Freight group
newModeHtml += '<div class="price-mode-group" id="freightGroup" style="display:' + q + ' + (isCif?' + q + 'inline-flex' + q + ': ' + q + 'none' + q + ') + ' + q + '">';
newModeHtml += '<span class="price-mode-label">\ud83d\udea2 Cước:</span>';
newModeHtml += '<input type="number" class="price-input price-input-num" id="freightInput" value="' + q + ' + (freightUSD||' + q + ') + ' + q + '" min="0" step="100" style="width:100px" oninput="onFreightChange()">';
newModeHtml += '<span class="price-mode-unit">USD</span>';
newModeHtml += '</div>';

// Right side
newModeHtml += '<div class="price-mode-group" style="margin-left:auto">';
newModeHtml += '<button class="price-pill price-pill-sm" id="mlToggleBtn" onclick="toggleMaxLoad()" style="font-size:11px">\ud83d\udccb Max tải</button>';
newModeHtml += '<button class="price-pill price-pill-sm' + q + ' + (currentMarket===' + q + 'cn' + q + '?' + q + ' active active-market' + q + ': ' + q + ') + ' + q + '" id="marketCn" onclick="setMarket(' + q + 'cn' + q + ')">\ud83c\udde8\ud83c\uddf3 TQ</button>';
newModeHtml += '<button class="price-pill price-pill-sm' + q + ' + (currentMarket===' + q + 'other' + q + '?' + q + ' active active-market' + q + ': ' + q + ') + ' + q + '" id="marketOther" onclick="setMarket(' + q + 'other' + q + ')">\ud83c\udf0f Khác</button>';
newModeHtml += '</div>';

newModeHtml += '</div></div>';

newRenderPT = newRenderPT.substring(0, msStart) + newModeHtml + newRenderPT.substring(msEnd + 6);

// 5. Replace old renderPriceTab in section0
var s0ScriptStart = section0.indexOf('<script>');
var s0ScriptEnd = section0.indexOf('</script>', s0ScriptStart);
var s0Js = section0.substring(s0ScriptStart + 8, s0ScriptEnd);
var s0RpStart = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd = s0Js.indexOf('function populateFilters', s0RpStart);
console.log('Old renderPriceTab:', s0RpStart, '->', s0RpEnd, '(' + (s0RpEnd-s0RpStart) + ' chars)');
var s0JsNew = s0Js.substring(0, s0RpStart) + newRenderPT + '\n\n' + s0Js.substring(s0RpEnd);

var finalH = section0.substring(0, s0ScriptStart + 8) + s0JsNew + section0.substring(s0ScriptEnd);

// 6. Add price-card CSS to first style block
var s0StyleStart = finalH.indexOf('<style>');
var s0StyleEnd = finalH.indexOf('</style>');

var s2StyleStart = h.indexOf('<style>', thirdHtml);
var s2StyleEnd = h.indexOf('</style>', s2StyleStart);
var s2Css = h.substring(s2StyleStart + 7, s2StyleEnd);

// Insert price-card CSS before </style>
var newStyleContent = finalH.substring(s0StyleStart + 7, s0StyleEnd) + '\n\n/* === PRICE TAB REDESIGN === */\n' + s2Css;
finalH = finalH.substring(0, s0StyleStart + 7) + newStyleContent + finalH.substring(s0StyleEnd);

// 7. Remove static controlBar
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
  if (p > 0) finalH = finalH.substring(0, divStart) + finalH.substring(p);
}

// 8. Remove static priceModeBar
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
  if (p > 0) finalH = finalH.substring(0, divStart) + finalH.substring(p);
}

// 9. VALIDATE
var opens = (finalH.match(/{/g) || []).length;
var closes = (finalH.match(/}/g) || []).length;
var ov = (finalH.match(/<div[^>]*>/g) || []).length;
var cv = (finalH.match(/<\/div>/g) || []).length;
var cr = (finalH.match(/\r\n/g) || []).length;

console.log('Braces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov === cv ? 'OK' : 'FAIL'));
console.log('CRLF: ' + cr);

var errors = [];
if (opens !== closes) errors.push('braces imbalance');
if (ov !== cv) errors.push('div imbalance');
if (cr > 0) errors.push('CRLF detected');
if (errors.length) { console.log('BLOCKED:', errors.join(', ')); process.exit(1); }

// Parse JS
var lastScript = finalH.lastIndexOf('<script>');
var lastScriptEnd = finalH.lastIndexOf('</script>');
try {
  new Function(finalH.substring(lastScript + 8, lastScriptEnd));
  console.log('JS Parse: OK');
} catch(e) {
  console.log('JS Parse FAIL: ' + e.message);
  process.exit(1);
}

// VERIFY
console.log('\n=== VERIFY ===');
var fnBody = finalH.substring(finalH.indexOf('function renderPriceTab()'), finalH.indexOf('function populateFilters'));
console.log('price-card-header:', fnBody.indexOf('price-card-header') >= 0 ? 'YES' : 'NO');
console.log('price-card-filters:', fnBody.indexOf('price-card-filters') >= 0 ? 'YES' : 'NO');
console.log('globalSearch:', fnBody.indexOf('globalSearch') >= 0 ? 'YES' : 'NO');
console.log('toggleCurrency:', fnBody.indexOf('toggleCurrency') >= 0 ? 'YES' : 'NO');
console.log('setPriceMode:', fnBody.indexOf('setPriceMode') >= 0 ? 'YES' : 'NO');
console.log('setLccType:', fnBody.indexOf('setLccType') >= 0 ? 'YES' : 'NO');
console.log('onFreightChange:', fnBody.indexOf('onFreightChange') >= 0 ? 'YES' : 'NO');
console.log('price-card-mode:', fnBody.indexOf('price-card-mode') >= 0 ? 'YES' : 'NO');
console.log('lccGroup:', fnBody.indexOf('lccGroup') >= 0 ? 'YES' : 'NO');
console.log('freightGroup:', fnBody.indexOf('freightGroup') >= 0 ? 'YES' : 'NO');
console.log('toggleMaxLoad:', fnBody.indexOf('toggleMaxLoad') >= 0 ? 'YES' : 'NO');
console.log('setMarket:', fnBody.indexOf('setMarket') >= 0 ? 'YES' : 'NO');

// Check static HTML
var staticPart = finalH.substring(0, finalH.indexOf('<script>'));
console.log('\nStatic HTML has controlBar:', staticPart.indexOf('id="controlBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('Static HTML has priceModeBar:', staticPart.indexOf('id="priceModeBar"') >= 0 ? 'YES(bad)' : 'NO(ok)');
console.log('renderPriceTab count:', (finalH.match(/function renderPriceTab\(\)/g) || []).length);
console.log('price-card CSS:', finalH.indexOf('price-card') >= 0 && finalH.indexOf('price-card') < finalH.indexOf('</style>') ? 'YES' : 'NO');

fs.writeFileSync('sites/kiem-tra-gia/vi.html', finalH, 'utf8');
console.log('\nFile written OK, size:', finalH.length, 'bytes');

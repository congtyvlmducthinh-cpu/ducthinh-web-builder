var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// The current file has NO duplicate HTML sections - it was already fixed by prior commits
// Check how many <html> tags exist
var htmlCount = (h.match(/<html/g) || []).length;
console.log('Current <html> count:', htmlCount);

// Check section count
var doctypeCount = (h.match(/<!DOCTYPE/g) || []).length;
console.log('<!DOCTYPE> count:', doctypeCount);

// Check if renderPriceTab exists and count
var rptCount = (h.match(/function renderPriceTab\(\)/g) || []).length;
console.log('renderPriceTab count:', rptCount);

// Check for static controlBar and priceModeBar
var staticEnd = h.indexOf('</head>');
var bodyPart = h.substring(h.indexOf('<body', staticEnd), h.indexOf('<script>'));
console.log('\nBody HTML:');
console.log('controlBar:', bodyPart.indexOf('id="controlBar"') >= 0 ? 'YES' : 'NO');
console.log('priceModeBar:', bodyPart.indexOf('id="priceModeBar"') >= 0 ? 'YES' : 'NO');

// Check there IS a price-card-filters already
var rptStart = h.indexOf('function renderPriceTab()');
var populateIdx = h.indexOf('\nfunction populateFilters', rptStart);
var fnBody = h.substring(rptStart, populateIdx);
console.log('\nIn renderPriceTab:');
console.log('price-card-filters:', fnBody.indexOf('price-card-filters') >= 0 ? 'YES' : 'NO');
console.log('resetFiltersBtn:', fnBody.indexOf('resetFiltersBtn') >= 0 ? 'YES' : 'NO');
console.log('toggleCurrency:', fnBody.indexOf('toggleCurrency') >= 0 ? 'YES' : 'NO');
console.log('lccGroup:', fnBody.indexOf('lccGroup') >= 0 ? 'YES' : 'NO');
console.log('freightGroup:', fnBody.indexOf('freightGroup') >= 0 ? 'YES' : 'NO');
console.log('No Lcc:', fnBody.indexOf('No Lcc') >= 0 ? 'YES' : 'NO');
console.log('Sub Lcc:', fnBody.indexOf('Sub Lcc') >= 0 ? 'YES' : 'NO');

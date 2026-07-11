var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');
var fnEnd = h.indexOf('function initPriceTab()', fnStart);
var fb = h.substring(fnStart, fnEnd);
console.log('Function size:', fb.length, 'chars');

// Show full function HTML rendering content (the h += strings)
var firstH = fb.indexOf("h += '");
var lastH = fb.lastIndexOf("h += '");
var renderContent = fb.substring(firstH, fb.indexOf("//", fnStart));
console.log('\n=== HTML RENDERING ===');
console.log(renderContent);

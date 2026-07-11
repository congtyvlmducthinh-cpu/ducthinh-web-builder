var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');
var fnEnd = h.indexOf('function initPriceTab()', fnStart);
var fb = h.substring(fnStart, fnEnd);
// Write the full function to a file for inspection
fs.writeFileSync('memory/_renderPriceTab_full.txt', fb, 'utf8');
console.log('Function length:', fb.length);
console.log('Written to memory/_renderPriceTab_full.txt');
// Show first/last 500 chars
console.log('\n=== FIRST 500 ===');
console.log(fb.substring(0, 500));
console.log('\n=== HTML RENDER START ===');
var hstart = fb.indexOf("h += '");
console.log('position:', hstart);
console.log(fb.substring(hstart-100, hstart+200));
console.log('\n=== LAST 500 ===');
console.log(fb.substring(fb.length - 500));

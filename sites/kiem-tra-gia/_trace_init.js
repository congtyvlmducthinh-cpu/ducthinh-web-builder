var fs = require('fs');
var html = fs.readFileSync('vi.html', 'utf-8');

// Find applyMarket in the built HTML
var idx = html.indexOf('function applyMarket');
console.log('function applyMarket() at', idx);
if (idx >= 0) {
  console.log(html.substring(idx, idx + 300));
}

// Also find the IIFE init - search for vi.js init pattern
var iifeIdx = html.indexOf('(function()');
console.log('\nIIFE at', iifeIdx);
if (iifeIdx >= 0) {
  console.log(html.substring(iifeIdx, iifeIdx + 200));
}

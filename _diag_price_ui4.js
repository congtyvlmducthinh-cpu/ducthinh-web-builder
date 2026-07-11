var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');
var fnEnd = h.indexOf('function initPriceTab()', fnStart);
var fb = h.substring(fnStart, fnEnd);

// Check if there's OLD HTML with class="container" inside function
console.log('=== OLD HTML patterns inside renderPriceTab ===');
console.log('container class:', fb.indexOf('class="container"'));
console.log('id=controlBar:', fb.indexOf('id="controlBar"'));
console.log('id=priceModeBar:', fb.indexOf('id="priceModeBar"'));

// Check ALL rendered HTML content 
console.log('\n=== Checking ALL rendered HTML divs ===');
var hStart = fnStart;
// Find h += string
var idx = fb.indexOf("h += '<div");
var count = 0;
while (idx >= 0) {
  count++;
  var snippet = fb.substring(idx, Math.min(fb.length, idx + 150));
  console.log('div #' + count + ': ' + snippet.replace(/\n/g, ' ').trim().substring(0, 120));
  idx = fb.indexOf("h += '<div", idx + 1);
}
console.log('Total h+=div in function:', count);

// Now check what function OWNS controlBar and priceModeBar
console.log('\n\n=== controlBar owners ===');
var cbPos = -1;
var owners = {};
while ((cbPos = h.indexOf('controlBar', cbPos + 1)) >= 0) {
  var lineStart = h.lastIndexOf('\n', cbPos);
  var lineEnd = h.indexOf('\n', cbPos);
  var line = h.substring(lineStart, lineEnd).trim().substring(0, 200);
  // Find which function this is in
  var funcStart = h.lastIndexOf('\nfunction ', cbPos);
  var funcEnd = h.indexOf('(', funcStart);
  var fnName = funcStart >= 0 ? h.substring(funcStart + 10, funcEnd) : '???';
  console.log('Owned by:', fnName, '| line:', line);
}

console.log('\n=== priceModeBar owners ===');
var pmPos = -1;
while ((pmPos = h.indexOf('priceModeBar', pmPos + 1)) >= 0) {
  var lineStart = h.lastIndexOf('\n', pmPos);
  var lineEnd = h.indexOf('\n', pmPos);
  var line = h.substring(lineStart, lineEnd).trim().substring(0, 200);
  var funcStart = h.lastIndexOf('\nfunction ', pmPos);
  var funcEnd = h.indexOf('(', funcStart);
  var fnName = funcStart >= 0 ? h.substring(funcStart + 10, funcEnd) : '???';
  console.log('Owned by:', fnName, '| line:', line);
}

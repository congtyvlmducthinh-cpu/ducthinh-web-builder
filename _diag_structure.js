var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
console.log('File size:', h.length);

// Find key positions
var htmlPositions = [];
var pos = -1;
while ((pos = h.indexOf('<html', pos + 1)) >= 0) htmlPositions.push(pos);
console.log('<html> positions:', htmlPositions);

var scriptPositions = [];
pos = -1;
while ((pos = h.indexOf('<script>', pos + 1)) >= 0) scriptPositions.push(pos);
console.log('<script> positions:', scriptPositions);

var endScriptPositions = [];
pos = -1;
while ((pos = h.indexOf('</script>', pos + 1)) >= 0) endScriptPositions.push(pos);
console.log('</script> positions:', endScriptPositions);

// Also find renderPriceTab position
var rp = h.indexOf('function renderPriceTab()');
console.log('renderPriceTab at:', rp);

// Check content between html positions
for (var i = 0; i < htmlPositions.length - 1; i++) {
  var a = htmlPositions[i];
  var b = htmlPositions[i+1];
  console.log('\nSection', i, ':', a, '->', b, '(' + (b-a) + ' chars)');
  console.log('  Starts with:', h.substring(a, Math.min(a+50, h.length)).replace(/\n/g, ' '));
  console.log('  Ends with:', h.substring(Math.max(0, b-50), b).replace(/\n/g, ' '));
}

// Last section
var lastHtml = htmlPositions[htmlPositions.length-1];
console.log('\nLast section:', lastHtml, '->', h.length, '(' + (h.length-lastHtml) + ' chars)');
console.log('  Starts with:', h.substring(lastHtml, Math.min(lastHtml+80, h.length)).replace(/\n/g, ' '));

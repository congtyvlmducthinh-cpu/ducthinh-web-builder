var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');
var fnEnd = h.indexOf('\nfunction ', fnStart + 1);
if (fnEnd <= fnStart) fnEnd = h.indexOf('function initPriceTab()', fnStart);
var fb = h.substring(fnStart, fnEnd);

// Find the 3 "class=\"container\"" occurrences
console.log('=== 3 container divs ===');
var lastPos = -1;
for (var i = 0; i < 3; i++) {
  var p = fb.indexOf('class="container"', lastPos + 1);
  if (p < 0) break;
  var start = Math.max(0, p - 200);
  var end = Math.min(fb.length, p + 300);
  console.log('\n--- container #' + (i+1) + ' at ' + p + ' ---');
  console.log(fb.substring(start, end));
  lastPos = p;
}

// Find the exact start of HTML rendering (after CSS string)
console.log('\n\n=== HTML rendering start ===');
// Find the first '+' or string concat after CSS ends
var renderStart = fb.indexOf("'<div");
if (renderStart < 0) renderStart = fb.indexOf('"<div');
console.log('First div in function at:', renderStart);
console.log('Context:', fb.substring(Math.max(0,renderStart-50), renderStart+300));

// Find old controlBar in full HTML context
console.log('\n\n=== OLD controlBar (full context) ===');
var cbPos = fb.indexOf('id="controlBar"');
var divStart = fb.lastIndexOf('<div', cbPos);
var divEnd = fb.indexOf('</div>', cbPos);
// Find matching div close - count nested divs
var nestedDiv = fb.substring(divStart, cbPos);
var openDivs = (nestedDiv.match(/<div/g) || []).length;
var closeDivs = (nestedDiv.match(/<\/div>/g) || []).length + 1; // +1 for the one we're closing
console.log('controlBar div starts at:', divStart, 'ends near:', divEnd);
console.log('controlBar content:', fb.substring(divStart, divEnd + 200));

// Find old priceModeBar in full HTML context
console.log('\n\n=== OLD priceModeBar (full context) ===');
var pmPos = fb.indexOf('id="priceModeBar"');
divStart = fb.lastIndexOf('<div', pmPos);
divEnd = fb.indexOf('</div>', pmPos);
console.log('priceModeBar div starts at:', divStart, 'ends near:', divEnd);
// Find actual closing - look for the matching </div>
var depth = 1;
var searchPos = pmPos;
while (depth > 0 && searchPos < fb.length) {
  var nextOpen = fb.indexOf('<div', searchPos + 1);
  var nextClose = fb.indexOf('</div>', searchPos + 1);
  if (nextClose < 0) break;
  if (nextOpen >= 0 && nextOpen < nextClose) {
    depth++;
    searchPos = nextOpen + 4;
  } else {
    depth--;
    searchPos = nextClose + 5;
  }
}
console.log('Actual closing at:', searchPos - 6);
console.log('Full block:', fb.substring(divStart, searchPos));

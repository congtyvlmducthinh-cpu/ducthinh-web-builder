var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// Section 0 
var s0End = h.indexOf('<!DOCTYPE', 155235);
var s0 = h.substring(0, s0End);
var staticPart = s0.substring(0, s0.indexOf('<script>'));

// Find the container div properly
var ci = staticPart.indexOf('class="container"');
console.log('Container at:', ci);
console.log('Context:', staticPart.substring(ci - 30, ci + 100));

// Walk backward to find the <div
var divStart = staticPart.lastIndexOf('<div', ci);
console.log('Div start char:', divStart);
console.log('Full div open tag:', staticPart.substring(divStart, divStart + 100));

// Walk divs to find matching close
var d = 1, pos = ci;
while (d > 0) {
  var no = staticPart.indexOf('<div', pos + 1);
  var nc = staticPart.indexOf('</div>', pos + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { d++; pos = no + 4; }
  else { d--; pos = nc + 5; }
}
console.log('Container ends at:', pos - 6);
console.log('Last 100:', staticPart.substring(pos - 106, pos));

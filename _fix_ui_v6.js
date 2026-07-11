var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// Find sections
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);

// Get new renderPriceTab from section 2
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd);

// Write rpt to file for inspection
fs.writeFileSync('memory/_rpt_content.txt', rpt, 'utf8');
console.log('RPT written OK, size:', rpt.length);

// Let's look at the exact chars around filter-group close
var fgIdx = rpt.indexOf('price-filter-group');
var fgEnd = rpt.indexOf('</div>', fgIdx);
// Walk through divs
var d = 1, pos = fgEnd + 4;
while (d > 0) {
  var no = rpt.indexOf('<div', pos + 1);
  var nc = rpt.indexOf('</div>', pos + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { d++; pos = no + 4; }
  else { d--; pos = nc + 5; }
}
console.log('Filter group closes at:', pos);
console.log('\nChar at pos-30..pos+10:');
console.log(JSON.stringify(rpt.substring(pos - 30, pos + 10)));

// Now find the mode card closing
var modeIdx = rpt.indexOf('price-card-mode');
var msStart = rpt.lastIndexOf('<div', modeIdx - 10);
d = 1; pos = msStart;
while (d > 0) {
  var no = rpt.indexOf('<div', pos + 1);
  var nc = rpt.indexOf('</div>', pos + 1);
  if (nc < 0) break;
  if (no >= 0 && no < nc) { d++; pos = no + 4; }
  else { d--; pos = nc + 5; }
}
console.log('\nMode card closes at:', pos);
console.log('Char at pos-30..pos+10:');
console.log(JSON.stringify(rpt.substring(pos - 30, pos + 10)));

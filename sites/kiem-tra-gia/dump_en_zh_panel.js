var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  
  var pat = 'fobptscPanel" style="display:none"';
  var idx = h.indexOf(pat);
  if (idx < 0) { console.log(fn + ': pattern not found'); return; }
  
  var openTagStart = h.lastIndexOf('<div', idx);
  var openTagEnd = h.indexOf('>', openTagStart) + 1;
  
  console.log('=== ' + fn + ' fobptsc-panel HTML ===');
  var panel = h.substring(openTagStart, Math.min(h.length, openTagStart + 4000));
  console.log(panel);
  console.log('(end at char ' + (openTagStart + panel.length) + ')');
  
  // Also find where fobptsc-grid content block starts and ends
  var gridIdx = h.indexOf('<div class="fobptsc-grid">', openTagStart);
  if (gridIdx > 0) {
    console.log('\n--- Content around fobptsc-grid in HTML ---');
    var around = h.substring(gridIdx - 200, Math.min(h.length, gridIdx + 800));
    console.log(around);
  }
});

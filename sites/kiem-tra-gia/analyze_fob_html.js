var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var lines = h.split('\n');

// Find fobptsc panel HTML
console.log('=== fobptsc-panel HTML ===');
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('id="fobptscPanel"') >= 0) {
    // Dump the panel HTML
    for (var j = i; j < Math.min(i + 200, lines.length); j++) {
      if (lines[j].indexOf('</div>') >= 0 && (j - i) > 10) {
        // Check if we reached end of fobptsc-panel
        if (lines[j].indexOf('pwModal') >= 0 || lines[j].indexOf('freight') >= 0 || lines[j].indexOf('manage') >= 0 || lines[j].indexOf('mainCalc') >= 0) break;
      }
      console.log('L'+(j+1)+': '+lines[j].substring(0,150));
      if (lines[j].indexOf('<!-- .container -->') >= 0) break;
    }
    break;
  }
}

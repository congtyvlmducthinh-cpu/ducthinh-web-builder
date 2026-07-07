var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// Find the fobptscInitCalc function - this is what sets up the FOB tab
console.log('=== fobPtscInitCalc (L8741) ===');
for (var i = 8740; i < Math.min(8762, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,150));
}

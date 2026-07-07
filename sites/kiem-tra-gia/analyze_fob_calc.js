var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// Dump fobPtscCalc fully
console.log('=== fobPtscCalc (L8786) ===');
for (var i = 8785; i < Math.min(8900, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,160));
}

var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// Dump fobPtscFilterProducts fully
console.log('=== fobPtscFilterProducts (L8762) ===');
for (var i = 8761; i < Math.min(8786, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,150));
}

console.log('\n=== fobPtscCalc (L8786) ===');
for (var i = 8785; i < Math.min(8840, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,150));
}

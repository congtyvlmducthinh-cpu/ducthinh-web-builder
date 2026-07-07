var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// Dump main tab filter function more fully
console.log('=== filterCalcProducts (L755) ===');
for (var i = 754; i < Math.min(789, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,150));
}

console.log('\n=== filterCalcProducts_products (L789) ===');
for (var i = 788; i < Math.min(821, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,150));
}

console.log('\n=== filterBagSpec (L821) ===');
for (var i = 820; i < Math.min(860, lines.length); i++) {
  console.log('L'+(i+1)+': '+lines[i].substring(0,150));
}

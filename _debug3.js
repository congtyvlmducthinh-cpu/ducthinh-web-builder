const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
var jStart = h.indexOf('<script>');
var jEnd = h.lastIndexOf('</script>');
var js = h.substring(jStart + 8, jEnd);
var lines = js.split('\n');

// Look for lines inside render functions that have t() calls in non-function context
// The problem might be that t() is called with the wrong context or syntax

// Show all lines 1680-1710 (the area around our changes)
for (var i = 1675; i < Math.min(1710, lines.length); i++) {
  console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
}

console.log('\n--- Now check for line 190-210 ---');
for (var i = 185; i < Math.min(220, lines.length); i++) {
  console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
}

const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
var jStart = h.indexOf('<script>');
var jEnd = h.lastIndexOf('</script>');

// Get raw context around our changes
var targetIdx = h.indexOf('table.product.name');
if (targetIdx > -1) {
  var ctx = h.substring(targetIdx - 50, targetIdx + 200);
  console.log('table.product.name context:');
  console.log(ctx);
  console.log('\nChar codes:', ctx.split('').map(c => c.charCodeAt(0)).join(' '));
}

// Check what the actual line looks like
var lines = h.substring(jStart, jEnd).split('\n');
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('table.product.name') > -1) {
    console.log('\nExact line:', JSON.stringify(lines[i]));
    console.log('Length:', lines[i].length);
  }
}

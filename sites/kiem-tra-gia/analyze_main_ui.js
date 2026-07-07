var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('=== MAIN TAB: filter dialog/fields ===');
// Find the calc filter HTML structure in main tab
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('id="calcMachine"') >= 0) {
    // Walk back to find the filter section
    for (var j = i - 10; j < i + 40; j++) {
      console.log('L'+(j+1)+': '+lines[j].substring(0,150));
    }
    break;
  }
}

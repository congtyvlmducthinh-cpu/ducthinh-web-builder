var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
var lines = s.split('\n');

// Show raw lines L8686-L8730
for (var i = 8685; i < 8730 && i < lines.length; i++) {
  console.log((i+1) + ': ' + lines[i]);
}

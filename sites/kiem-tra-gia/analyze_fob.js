var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');

// Find fobptscPanel HTML
var i = h.indexOf('id="fobptscPanel"');
if (i < 0) i = h.indexOf("id='fobptscPanel'");
var ctx = h.substring(i, i + 5000);
var lines = ctx.split('\n');
for (var a = 0; a < lines.length; a++) {
  console.log((a + 1) + ': ' + lines[a]);
  if (a > 130) break;
}

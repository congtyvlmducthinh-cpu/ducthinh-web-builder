var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
var lines = s.split('\n');

// Show lines L8690-L8722 with brace tracking
var brace = 0;
var paren = 0;
for (var i = 8689; i < 8730 && i < lines.length; i++) {
  var line = lines[i];
  var bBefore = brace;
  var pBefore = paren;
  for (var j = 0; j < line.length; j++) {
    var ch = line[j];
    if (ch === '{') brace++;
    else if (ch === '}') brace--;
    else if (ch === '(') paren++;
    else if (ch === ')') paren--;
  }
  // Only show if it changed brace/paren
  if (bBefore !== brace || pBefore !== paren) {
    console.log('L' + (i+1) + ' [' + brace + ',' + paren + '] ' + line.substring(0,140));
    console.log('');
  }
}

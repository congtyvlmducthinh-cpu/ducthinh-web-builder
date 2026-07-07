var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) return;
  var s = m[1];
  var lines = s.split('\n');
  
  // Check paren balance
  var paren = 0;
  var parenNeg = null;
  var parenPos = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      var ch = line[j];
      if (ch === '(') paren++;
      else if (ch === ')') paren--;
    }
    if (paren < 0 && !parenNeg) parenNeg = {ln: i+1, text: line.substring(0,100)};
    if (paren > 0) parenPos.push({ln: i+1, paren: paren, text: line.substring(0,100)});
  }
  
  console.log(fn + ': final paren=' + paren);
  if (parenNeg) console.log('  First paren negative at L' + parenNeg.ln);
  // Show last few lines where paren is positive
  if (paren > 0) {
    var lastFew = parenPos.slice(-5);
    lastFew.forEach(function(p) {
      console.log('  Paren+' + p.paren + ' at L' + p.ln + ': ' + p.text);
    });
  }
});

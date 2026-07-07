var fs = require('fs');
['vi.html','en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
  
  // More accurate paren tracker - skip inside strings
  var paren = 0;
  var inStr = false;
  var inStrChar = '';
  var parenErrLines = [];
  
  var lines = s.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      var ch = line[j];
      var prev = j > 0 ? line[j-1] : '';
      
      if (inStr) {
        if (ch === inStrChar && prev !== '\\') {
          inStr = false;
        }
      } else {
        if (ch === '"' || ch === "'" || ch === '`') {
          inStr = true;
          inStrChar = ch;
        } else if (ch === '(') {
          paren++;
        } else if (ch === ')') {
          paren--;
        }
      }
    }
    if (paren < 0) parenErrLines.push(i+1);
  }
  
  console.log(fn + ': Paren=' + paren + ', NegLines=' + parenErrLines.length);
  if (parenErrLines.length > 0) {
    console.log('  First neg at L' + parenErrLines[0]);
  }
});

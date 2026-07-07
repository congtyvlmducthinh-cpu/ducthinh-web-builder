var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];

// Syntax check by wrapping in a function
try {
  eval(s);
  console.log('JS SYNTAX OK');
} catch (e) {
  var lines = s.split('\n');
  var errMsg = e.message;
  console.log('ERROR:', errMsg);
  console.log('Total JS lines:', lines.length);
  
  var braceDepth = 0;
  var parenDepth = 0;
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      var ch = line[j];
      if (ch === '{') braceDepth++;
      else if (ch === '}') braceDepth--;
      else if (ch === '(') parenDepth++;
      else if (ch === ')') parenDepth--;
    }
    if (braceDepth < 0) {
      console.log('NEGATIVE BRACE at line', i+1, ':', line.substring(0,100));
      break;
    }
    if (parenDepth < 0) {
      console.log('NEGATIVE PAREN at line', i+1, ':', line.substring(0,100));
      break;
    }
  }
  
  console.log('Final brace depth:', braceDepth);
  console.log('Final paren depth:', parenDepth);
}

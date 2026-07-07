var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  var js = m[1];
  try {
    new Function(js);
    console.log(fn + ': ✅ JS syntax OK');
  } catch(e) {
    console.log(fn + ': ❌ JS syntax error:', e.message);
  }
  
  // Check brace/paren
  var lines = js.split('\n');
  var brace = 0, paren = 0, inStr = false, inStrChar = '';
  var negBrace = false, negParen = false;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      var ch = line[j], prev = j > 0 ? line[j-1] : '';
      if (inStr) {
        if (ch === inStrChar && prev !== '\\') inStr = false;
      } else {
        if (ch === '"' || ch === "'" || ch === '`') { inStr = true; inStrChar = ch; }
        else if (ch === '{') brace++;
        else if (ch === '}') brace--;
        else if (ch === '(') paren++;
        else if (ch === ')') paren--;
      }
    }
    if (brace < 0 && !negBrace) { negBrace = true; console.log('  NEG BRACE at L'+(i+1)); brace = 0; }
    if (paren < 0 && !negParen) { negParen = true; console.log('  NEG PAREN at L'+(i+1)); paren = 0; }
  }
  console.log('  Final brace:', brace, 'Final paren:', paren);
});

var fs = require('fs');
['vi.html','en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) return;
  var s = m[1];
  var lines = s.split('\n');
  
  console.log('===== ' + fn + ' ====');
  var paren = 0;
  var brace = 0;
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var opens = (line.match(/\(/g) || []).length;
    var closes = (line.match(/\)/g) || []).length;
    paren += opens - closes;
    
    if (lines[i].indexOf('setTimeout') >= 0 || lines[i].indexOf('});') >= 0 || i >= lines.length - 5) {
      console.log('  L'+(i+1)+' paren='+paren+' '+line.substring(0,100));
    }
  }
  
  console.log('  FINAL paren='+paren);
  console.log('');
});

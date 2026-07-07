var fs = require('fs');
['vi.html','en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) return;
  var s = m[1];
  var lines = s.split('\n');
  
  console.log('===== ' + fn + ' last 10 lines =====');
  for (var i = lines.length - 10; i < lines.length; i++) {
    console.log((i+1) + ': ' + lines[i]);
  }
  console.log('');
});

var fs = require('fs');
['vi.html','en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
  var lines = s.split('\n');
  
  console.log('===== ' + fn + ' line 28-32 =====');
  for (var i = 27; i < 33; i++) {
    console.log('  L'+(i+1)+': ' + lines[i].substring(0,120));
  }
  console.log('');
});

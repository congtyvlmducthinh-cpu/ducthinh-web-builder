var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  var js = m[1];
  var lines = js.split('\n');
  
  console.log('=== ' + fn + ' lines 3695-3710 ===');
  for (var i = 3695; i < 3710 && i < lines.length; i++) {
    console.log('L'+(i+1)+': '+lines[i].substring(0,120));
  }
  console.log('');
});

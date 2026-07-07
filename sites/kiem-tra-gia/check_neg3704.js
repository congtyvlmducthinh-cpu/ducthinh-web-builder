var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  var js = m[1];
  var lines = js.split('\n');
  
  console.log('=== ' + fn + ' ===');
  var brace = 0;
  for (var i = 3695; i < 3720 && i < lines.length; i++) {
    var line = lines[i];
    var open = (line.match(/\{/g) || []).length;
    var close = (line.match(/\}/g) || []).length;
    brace += open - close;
    if (open > 0 || close > 0 || brace < 0) {
      console.log('L'+(i+1)+' brace='+brace+' '+line.substring(0,100));
    }
    if (brace < 0) {
      console.log('  *** NEGATIVE at L'+(i+1));
      break;
    }
  }
  console.log('');
});

var fs = require('fs');
['vi.html','en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) return;
  var s = m[1];
  var lines = s.split('\n');
  
  console.log('===== ' + fn + ' =====');
  
  // Find fobPtscLoadCfg
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('function fobPtscLoadCfg') >= 0) {
      console.log('\n--- fobPtscLoadCfg starts at JS line ' + (i+1));
      // Show up to line i+25 or until next function
      for (var j = i; j < Math.min(i+30, lines.length); j++) {
        var marker = '';
        if (lines[j].indexOf('function ') >= 0 && lines[j].indexOf('function fobPtscLoadCfg') < 0) marker = ' <<<< NEXT FUNC';
        console.log('  JS L' + (j+1) + ': ' + lines[j].substring(0,120) + marker);
      }
      break;
    }
  }
  
  // Find fobPtscSaveCfg
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('function fobPtscSaveCfg') >= 0) {
      console.log('\n--- fobPtscSaveCfg starts at JS line ' + (i+1));
      for (var j = i; j < Math.min(i+30, lines.length); j++) {
        var marker = '';
        if (lines[j].indexOf('function ') >= 0 && lines[j].indexOf('function fobPtscSaveCfg') < 0) marker = ' <<<< NEXT FUNC';
        console.log('  JS L' + (j+1) + ': ' + lines[j].substring(0,120) + marker);
      }
      break;
    }
  }
  
  console.log('\n');
});

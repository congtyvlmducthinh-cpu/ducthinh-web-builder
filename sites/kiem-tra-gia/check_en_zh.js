var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) { console.log(fn + ': no script block'); return; }
  var s = m[1];
  var lines = s.split('\n');
  
  // Find fobPtscLoadCfg
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('function fobPtscLoadCfg') >= 0) {
      console.log(fn + ': fobPtscLoadCfg at JS line', i+1);
      console.log('  Next 30 lines:');
      for (var j = i; j < Math.min(i+30, lines.length); j++) {
        console.log('  L'+(j+1)+': '+lines[j].substring(0,100));
      }
      break;
    }
  }
  
  console.log('\n--- ' + fn + ' brace check ---');
  var brace = 0;
  var paren = 0;
  var firstNeg = null;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    for (var j = 0; j < line.length; j++) {
      var ch = line[j];
      if (ch === '{') brace++;
      else if (ch === '}') brace--;
      else if (ch === '(') paren++;
      else if (ch === ')') paren--;
    }
    if (brace < 0 && !firstNeg) firstNeg = { ln: i+1, text: line.substring(0,100) };
  }
  console.log('Final brace:', brace, 'Final paren:', paren);
  if (firstNeg) console.log('First negative at L' + firstNeg.ln + ': ' + firstNeg.text);
});

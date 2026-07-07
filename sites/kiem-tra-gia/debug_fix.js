var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// The issue: the function braces are imbalanced - the `};` found at L8726 (orig L8738) 
// was actually a valid `};` for var map = { ... }; not for the function!
// Let me look at the lines around the fix areas

// Find fobPtscLoadCfg
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscLoadCfg') >= 0) {
    console.log('=== fobPtscLoadCfg at L' + (i+1) + ' ===');
    for (var j = i; j < Math.min(i+25, lines.length); j++) {
      var brace = 0;
      var line = lines[j];
      for (var k = 0; k < line.length; k++) {
        if (line[k] === '{') brace++;
        else if (line[k] === '}') brace--;
      }
      console.log('L'+(j+1)+' ['+(brace)+'] '+line.substring(0,100));
    }
    break;
  }
}

console.log('\n\n=== fobPtscSaveCfg ===');
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscSaveCfg') >= 0) {
    for (var j = i; j < Math.min(i+20, lines.length); j++) {
      var brace = 0;
      var line = lines[j];
      for (var k = 0; k < line.length; k++) {
        if (line[k] === '{') brace++;
        else if (line[k] === '}') brace--;
      }
      console.log('L'+(j+1)+' ['+(brace)+'] '+line.substring(0,100));
    }
    break;
  }
}

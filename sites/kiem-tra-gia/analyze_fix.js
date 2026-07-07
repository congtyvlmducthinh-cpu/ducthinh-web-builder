var fs = require('fs');

// Read original vi.html
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('Original JS lines:', lines.length);

// Find marker lines to understand structure
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscLoadCfg') >= 0) {
    console.log('\nL' + (i+1) + ': function fobPtscLoadCfg');
    // Show surrounding area
    for (var j = i; j < Math.min(i + 28, lines.length); j++) {
      var bOpen = (lines[j].match(/\{/g) || []).length;
      var bClose = (lines[j].match(/\}/g) || []).length;
      var marker = bOpen - bClose > 0 ? ' {' : (bClose - bOpen > 0 ? ' }' : '');
      if (marker) console.log('  L' + (j+1) + marker + ' ' + lines[j].substring(0,110));
      else if (lines[j].indexOf('function ') >= 0 || lines[j].indexOf('for (var id') >= 0 || lines[j].indexOf('};') >= 0)
        console.log('  L' + (j+1) + '     ' + lines[j].substring(0,110));
    }
    break;
  }
}

// Also find fobPtscSaveCfg
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscSaveCfg') >= 0) {
    console.log('\nL' + (i+1) + ': function fobPtscSaveCfg');
    for (var j = i; j < Math.min(i + 25, lines.length); j++) {
      var bOpen = (lines[j].match(/\{/g) || []).length;
      var bClose = (lines[j].match(/\}/g) || []).length;
      var marker = bOpen - bClose > 0 ? ' {' : (bClose - bOpen > 0 ? ' }' : '');
      if (marker || lines[j].indexOf('};') >= 0 || lines[j].indexOf('function ') >= 0 || lines[j].indexOf('for (var') >= 0 || lines[j].indexOf('localStorage') >= 0 || lines[j].indexOf('fobPtscCalc') >= 0)
        console.log('  L' + (j+1) + marker + ' ' + lines[j].substring(0,110));
    }
    break;
  }
}

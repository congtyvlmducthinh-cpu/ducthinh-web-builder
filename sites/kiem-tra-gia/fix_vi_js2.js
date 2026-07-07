var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// Fix 1: fobPtscLoadCfg - L8714 `};` → `}`, remove L8715-L8719
var i = 8713; // L8714 (0-indexed)
console.log('Fix 1: L8714 was:', lines[i]);
lines[i] = '}';
console.log('  fixed to:', lines[i]);
console.log('  Removing lines L8715-L8719');
var removed1 = lines.splice(i+1, 5);
console.log('  Removed:', removed1.map(function(l){return l.trim()}).join(' | '));

// After fix 1, line numbers shifted by -5 (now total 8939)
// Fix 2: fobPtscSaveCfg - find the `};` and duplicate block
// Original L8738 is now at 8733 (8738-5)
// But let's find it dynamically
for (var j = 0; j < lines.length; j++) {
  if (lines[j].indexOf('function fobPtscSaveCfg') >= 0) {
    console.log('\nFix 2: fobPtscSaveCfg at new line', j+1);
    // Walk forward to find `};` and duplicate
    for (var k = j; k < Math.min(j+25, lines.length); k++) {
      if (lines[k].trim() === '};' || lines[k].trim().startsWith('};')) {
        console.log('  Found `};` at L' + (k+1));
        lines[k] = '}';
        console.log('  Fixed to: `}`');
        // Check if next line has duplicate for loop
        if (k+1 < lines.length && lines[k+1].trim().indexOf('for (var id in map)') >= 0) {
          console.log('  Removing duplicate block starting at L' + (k+2));
          // Find where duplicate ends (either empty line or function keyword)
          var dupEnd = k+1;
          while (dupEnd < lines.length) {
            if (lines[dupEnd].trim() === '' || lines[dupEnd].trim().startsWith('function ')) break;
            dupEnd++;
          }
          // Remove from k+1 to dupEnd-1
          var removed2 = lines.splice(k+1, dupEnd - k - 1);
          console.log('  Removed', removed2.length, 'lines');
          removed2.forEach(function(l){console.log('    ' + l.trim());});
        }
        break;
      }
    }
    break;
  }
}

console.log('\nAfter fix - total JS lines:', lines.length);

// Rebuild JS and verify
var newJs = lines.join('\n');
var newHtml = h.substring(0, m.index + 8) + newJs + h.substring(m.index + m[0].length - 8);
fs.writeFileSync(__dirname + '/vi.html.2', newHtml, 'utf8');
console.log('✅ Written vi.html.2');

// Verify syntax
try {
  new Function(newJs);
  console.log('✅ JS syntax OK!');
} catch (e) {
  console.log('❌ JS syntax error:', e.message);
}

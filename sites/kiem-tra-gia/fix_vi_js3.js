var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('Total JS lines:', lines.length);

// CORRECT ANALYSIS:
// fobPtscLoadCfg: L8694-L8719
//   L8714 (idx 8713): `};` -- this is the function close, should be `}`
//   L8715-L8719 (idx 8714-8718): orphan duplicate -- REMOVE

// Fix 1: L8714 `};` → `}`
console.log('Fix 1: L8714:', lines[8713].trim(), '→ }');
lines[8713] = '}';

// Remove L8715-L8719 (indices 8714-8718)
console.log('  Removing L8715-L8719:');
for (var k = 8714; k <= 8718; k++) {
  console.log('    L' + (k+1) + ': ' + lines[k].trim());
}
var removed1 = lines.splice(8714, 5);
console.log('  Removed', removed1.length, 'lines');

// Now line numbers shifted by -5.
// fobPtscSaveCfg was originally L8721-L8744
// Now its lines start at index 8716 (8721-5)
// The `};` was at original L8738, now at 8733 (8738-5)
// The duplicate was L8739-L8744, now at 8734-8739

console.log('\nFix 2: fobPtscSaveCfg');
// L8738 original → now L8733 (0-indexed)
var saveCfgCloseLine = 8732; // 0-indexed
console.log('  L' + (saveCfgCloseLine+1) + ': ' + lines[saveCfgCloseLine].trim() + ' → }');
lines[saveCfgCloseLine] = '}';

// Remove L8739-L8744 original → now L8734-L8739
console.log('  Removing L' + (saveCfgCloseLine+2) + ' to L' + (saveCfgCloseLine+7) + ':');
for (var k = saveCfgCloseLine+1; k <= saveCfgCloseLine+6; k++) {
  console.log('    L' + (k+1) + ': ' + lines[k].trim());
}
var removed2 = lines.splice(saveCfgCloseLine+1, 6);
console.log('  Removed', removed2.length, 'lines');

console.log('\nAfter fix - total JS lines:', lines.length);

// Rebuild and verify
var newJs = lines.join('\n');
var newHtml = h.substring(0, m.index + 8) + newJs + h.substring(m.index + m[0].length - 8);

try {
  new Function(newJs);
  console.log('✅ JS syntax OK!');
  // Write if syntax is good
  fs.writeFileSync(__dirname + '/vi.html', newHtml, 'utf8');
  console.log('✅ Written fixed vi.html');
} catch (e) {
  console.log('❌ JS syntax error:', e.message);
  // Write to .2 for debugging
  fs.writeFileSync(__dirname + '/vi.html.2', newHtml, 'utf8');
  console.log('✅ Written vi.html.2 for debugging');
}

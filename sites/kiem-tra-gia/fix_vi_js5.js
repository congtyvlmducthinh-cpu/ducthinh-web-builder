var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('Total JS lines:', lines.length);

// Fix 1: fobPtscLoadCfg
// L8714 (0-index 8713): `};` → `}`
// L8715-L8719 (0-index 8714-8718): remove (5 lines)
console.log('L8714 was:', lines[8713].trim(), '→ }');
lines[8713] = '}';
var removed1 = lines.splice(8714, 5);
console.log('Removed L8715-8719:', removed1.length, 'lines');

// After removal, lines shift by -5 from index 8714 onwards
// fobPtscSaveCfg `};` was at original L8738, now at 8732
console.log('L8738 was:', lines[8732].trim(), '→ }');
lines[8732] = '}';
// Remove duplicate L8739-L8744 (now at 8733-8738)
var removed2 = lines.splice(8733, 6);
console.log('Removed L8739-8744:', removed2.length, 'lines');

console.log('After fix - total JS lines:', lines.length);

// Rebuild HTML
var newJs = lines.join('\n');
var prefix = h.substring(0, m.index + 8); // up to end of `<script>`
var suffix = h.substring(m.index + m[0].length - 9); // from `<` of `</script>`
var newHtml = prefix + newJs + suffix;

// Verify syntax
try {
  new Function(newJs);
  console.log('✅ JS syntax OK!');
  fs.writeFileSync(__dirname + '/vi.html', newHtml, 'utf8');
  console.log('✅ Written fixed vi.html');
} catch (e) {
  console.log('❌ JS syntax error:', e.message);
  // Write for debugging
  fs.writeFileSync(__dirname + '/vi.html.fail', newHtml, 'utf8');
}

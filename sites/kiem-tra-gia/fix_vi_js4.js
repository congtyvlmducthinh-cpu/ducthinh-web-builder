var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('Total JS lines:', lines.length);

// Fix 1: fobPtscLoadCfg - L8714 `};` → `}`, remove L8715-L8719 (indices 8714-8718)
lines[8713] = '}';
var removed1 = lines.splice(8714, 5);
console.log('Fix 1: removed', removed1.length, 'duplicate lines from fobPtscLoadCfg');

// Fix 2: fobPtscSaveCfg - L8738 `};` → `}`, remove L8739-L8744 (shifted -5)
// Original L8738 is now at index 8733 (8738-5). Removing L8739-L8744 = 8734-8739
lines[8733] = '}';
var removed2 = lines.splice(8734, 6);
console.log('Fix 2: removed', removed2.length, 'duplicate lines from fobPtscSaveCfg');
console.log('After fix - total JS lines:', lines.length);

// Rebuild and verify
var newJs = lines.join('\n');
// m.index is start of `<script>`, m[0] is `<script>...</script>` (8 + len + 9)
// We want: everything before `<script>` + `<script>`(8) + newJs + `</script>`(9) + everything after
var prefix = h.substring(0, m.index + 8); // up to end of `<script>`
var suffix = h.substring(m.index + m[0].length - 9); // from start of `</script>` 
var newHtml = prefix + newJs + suffix;

try {
  new Function(newJs);
  console.log('✅ JS syntax OK!');
  fs.writeFileSync(__dirname + '/vi.html', newHtml, 'utf8');
  console.log('✅ Written fixed vi.html');
} catch (e) {
  console.log('❌ JS syntax error:', e.message);
  fs.writeFileSync(__dirname + '/vi.html.fail', newHtml, 'utf8');
}

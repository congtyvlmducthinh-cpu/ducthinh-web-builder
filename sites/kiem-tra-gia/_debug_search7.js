const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Find all importProducts calls
let idx = 0;
const calls = [];
while ((idx = js.indexOf('importProducts(', idx)) >= 0) {
  let lineStart = js.lastIndexOf('\n', idx);
  lineStart = lineStart < 0 ? 0 : lineStart + 1;
  let lineEnd = js.indexOf('\n', idx);
  lineEnd = lineEnd < 0 ? js.length : lineEnd;
  calls.push(js.substring(lineStart, lineEnd + 1));
  idx += 20;
}
console.log('=== All importProducts calls ===');
calls.forEach((c, i) => console.log(`${i}: ${c}`));

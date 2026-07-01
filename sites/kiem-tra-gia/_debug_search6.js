const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Find importProducts function
const idx = js.indexOf('function importProducts');
console.log('=== importProducts function ===');
console.log(js.substring(idx, idx + 2000));

// Also check if there's a call to importProducts(DATA_PRODUCTS) or similar
const callIdx = js.indexOf('importProducts(');
console.log('\n=== importProducts calls ===');
if (callIdx >= 0) {
  let i = callIdx;
  while (i < js.length && js.substring(i, i+50).includes('importProducts')) {
    let end = js.indexOf('\n', i + 50);
    end = end < 0 ? i + 80 : end;
    console.log(js.substring(i, end + 1));
    i = end + 1;
  }
}

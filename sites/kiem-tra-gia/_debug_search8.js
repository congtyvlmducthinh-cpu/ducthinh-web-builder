const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Find the init call at the very end
let last200 = js.substring(js.length - 500);
console.log('=== Last 500 chars of JS ===');
console.log(last200);

// Check if DATA_PRODUCTS is referenced anywhere with push/duplicate logic
let dpIdx = 0;
let dpRefs = [];
while ((dpIdx = js.indexOf('DATA_PRODUCTS', dpIdx)) >= 0) {
  let chunk = js.substring(Math.max(0, dpIdx - 30), dpIdx + 60);
  dpRefs.push(chunk);
  dpIdx += 14;
  if (dpRefs.length > 30) break;
}
console.log('\n=== DATA_PRODUCTS references (sampled) ===');
dpRefs.forEach((r, i) => console.log(`${i}: ...${r}...`));

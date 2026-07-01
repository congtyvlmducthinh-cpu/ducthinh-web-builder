const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Find any code that calls importProducts with DATA_PRODUCTS as argument
let idx = 0;
while ((idx = js.indexOf('importProducts', idx)) >= 0) {
  // Get context (the next 40 chars)
  let ctx = js.substring(idx, idx + 80);
  console.log('Context: ' + ctx);
  idx += 20;
}

// Search for localStorage loading patterns
let lsIdx = js.indexOf('localStorage.getItem');
console.log('\n=== localStorage.getItem calls ===');
while (lsIdx >= 0) {
  let ctx = js.substring(Math.max(0, lsIdx - 20), lsIdx + 100);
  console.log('  ...' + ctx + '...\n');
  lsIdx = js.indexOf('localStorage.getItem', lsIdx + 1);
}

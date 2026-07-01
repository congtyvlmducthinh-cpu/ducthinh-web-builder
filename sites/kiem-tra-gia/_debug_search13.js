const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Check what localStorage loading code exists for initial page load
let initIdx = js.indexOf('// Init');
console.log('Init section:');
console.log(js.substring(initIdx, initIdx + 500));

// Check if there's any localStorage load that could overwrite data on page load
let lsIdx = 0;
while ((lsIdx = js.indexOf('localStorage.getItem("dq_', lsIdx)) >= 0) {
  let ctx = js.substring(Math.max(0, lsIdx - 10), lsIdx + 80);
  console.log('\nlocalStorage load: ...' + ctx + '...');
  lsIdx += 20;
}

// Check for any "if localStorage" patterns
let ifLs = 0;
while ((ifLs = js.indexOf('localStorage.getItem', ifLs)) >= 0) {
  let start = Math.max(0, ifLs - 50);
  let end = Math.min(js.length, ifLs + 120);
  console.log('\n--- localStorage context ---');
  console.log(js.substring(start, end));
  ifLs += 20;
}

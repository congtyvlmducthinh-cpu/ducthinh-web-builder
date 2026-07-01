const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

let idx = 0;
while ((idx = js.indexOf('importProducts', idx)) >= 0) {
  let ctx = js.substring(Math.max(0, idx - 30), idx + 100);
  console.log('Found at index ' + idx + ': ...' + ctx + '...\n');
  idx += 20;
}

console.log('===========');

// Check if DATA_PRODUCTS is reassigned anywhere (not just arr.forEach)
let reIdx = 0;
let reassignments = 0;
while ((reIdx = js.indexOf('DATA_PRODUCTS =', reIdx)) >= 0) {
  let ctx = js.substring(Math.max(0, reIdx - 30), reIdx + 80);
  console.log('DATA_PRODUCTS reassign at ' + reIdx + ': ...' + ctx + '...\n');
  reassignments++;
  reIdx += 20;
}
console.log('DATA_PRODUCTS reassigned ' + reassignments + ' times');

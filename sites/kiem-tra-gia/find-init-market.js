import fs from 'fs';
let vi = fs.readFileSync('vi.html', 'utf-8');
let idx = vi.indexOf('setMarket("cn")');
console.log('setMarket("cn") at', idx);
if (idx >= 0) {
  console.log('Context:', vi.substring(Math.max(0, idx-200), idx+100));
}
// Also search with single quotes
idx = vi.indexOf("setMarket('cn')");
console.log("setMarket('cn') at", idx);
if (idx >= 0) {
  console.log('Context:', vi.substring(Math.max(0, idx-200), idx+100));
}

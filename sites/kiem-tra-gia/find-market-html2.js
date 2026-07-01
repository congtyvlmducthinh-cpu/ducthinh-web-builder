import fs from 'fs';
let vi = fs.readFileSync('vi.html', 'utf-8');

// Find the inline HTML market-group in pricelist (generated from template)
let idx = vi.indexOf('="market-group"');
console.log('Found class="market-group" at', idx);
if (idx > 0) {
  let start = vi.lastIndexOf('<', idx-2);
  let end = vi.indexOf('</div>', idx) + 6;
  console.log('INLINE HTML:', vi.substring(start, end));
}

// Also find market-group in JS
let jidx = vi.indexOf("market-group'>");
console.log('JS market-group at', jidx);
if (jidx > 0) {
  let end = vi.indexOf("';", jidx);
  console.log('JS context:', vi.substring(jidx, end+2));
}

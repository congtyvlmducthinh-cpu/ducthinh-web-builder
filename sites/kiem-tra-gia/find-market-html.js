import fs from 'fs';
let html = fs.readFileSync('vi.html', 'utf-8');
let pos = 0;
let count = 0;
while (pos < html.length) {
  let next = html.indexOf('market-group', pos);
  if (next < 0) break;
  let before = html.substring(Math.max(0, next-2), next);
  // JS string context means it's in h += '...' 
  let ctx = html.substring(next, next+80);
  if (ctx.indexOf("'>") > 0 || ctx.indexOf(";'>") > 0 || ctx.indexOf("h +=") >= 0) {
    count++;
    console.log(count + ':', ctx);
  }
  pos = next + 1;
}
// Also find the inline HTML market-group (non-JS)
let inlinePos = html.indexOf('="market-group"');
if (inlinePos >= 0) {
  let start = html.lastIndexOf('<', inlinePos);
  let end = html.indexOf('</div>', inlinePos) + 6;
  console.log('INLINE HTML market group:', html.substring(start, end));
}
console.log('Done - found', count, 'JS occurrences');

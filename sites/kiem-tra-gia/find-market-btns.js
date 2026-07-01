import fs from 'fs';
let tpl = fs.readFileSync('src/template.html', 'utf-8');

// Fix title tag (missing closing braces)
tpl = tpl.replace('{{HTML_TITLE}', '{{HTML_TITLE}}');
fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Fixed title tag');

// Find all btn-sm occurrences (non-CSS)
let idx = 0;
let count = 0;
while (true) {
  let next = tpl.indexOf('btn-sm', idx);
  if (next < 0 || count > 50) break;
  let ctx = tpl.substring(Math.max(0, next - 50), Math.min(tpl.length, next + 80));
  // Only show if it looks like HTML (has > or <)
  if (ctx.indexOf('>') > 0 || ctx.indexOf('<') > 0) {
    count++;
    console.log(count, ':', ctx.replace(/\n/g, '\\n'));
  }
  idx = next + 1;
}

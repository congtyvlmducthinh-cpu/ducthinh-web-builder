const fs = require('fs');
['vi.html','en.html','zh.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const idx = c.indexOf('lang-switcher');
  // Find the <div class="lang-switcher"> area
  let start = idx;
  while (start > 0 && c[start] !== '<') start--;
  let end = c.indexOf('</div>', start + 50);
  if (end < 0) end = start + 200;
  console.log('=== ' + f + ' ===');
  console.log(c.substring(start, end + 6));
});

const fs = require('fs');
['vi.html','en.html','zh.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  // Find the last lang-switcher occurrence (the CSS has one, the HTML has another)
  let idx = c.lastIndexOf('lang-switcher');
  if (idx < 0) { console.log('=== ' + f + ': NOT FOUND ==='); return; }
  const start = c.lastIndexOf('<div', idx);
  const end = c.indexOf('</div>', idx + 50) + 6;
  console.log('=== ' + f + ' ===  (last occurrence)');
  // Only show a few lines around it
  console.log(c.substring(start, end));
  console.log();
});

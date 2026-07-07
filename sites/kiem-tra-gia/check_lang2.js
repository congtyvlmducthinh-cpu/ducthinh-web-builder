const fs = require('fs');
['vi.html','en.html','zh.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  // Find the HTML lang-switcher section (after </style> and <body>)
  const idx = c.indexOf('lang-switcher');
  const start = c.indexOf('<div', Math.max(0, idx - 100));
  const end = c.indexOf('</div>', idx + 50) + 6;
  console.log('=== ' + f + ' ===');
  console.log(c.substring(start, end));
  console.log();
});

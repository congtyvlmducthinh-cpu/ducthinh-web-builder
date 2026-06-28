const fs = require('fs');
['sites/portal/template.html', 'sites/doccheck/template.html'].forEach(f => {
  let c = fs.readFileSync(f, 'utf-8');
  c = c.replace('https://cdn.tailwindcss.com', '/static/js/tailwind.min.js');
  fs.writeFileSync(f, c, 'utf-8');
  console.log(f + ': ' + (c.includes('/static/js/tailwind.min.js') ? '✅' : '❌') + ' (no CDN: ' + !c.includes('cdn.tailwindcss.com') + ')');
});

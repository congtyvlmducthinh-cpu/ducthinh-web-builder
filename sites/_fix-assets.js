const fs = require('fs');

// === PORTAL ===
let tpl = fs.readFileSync('sites/portal/template.html', 'utf-8');

tpl = tpl.replace(
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">',
  '<link rel="stylesheet" href="/static/fonts/fonts.css">'
);

tpl = tpl.replace(
  '<script src="https://unpkg.com/lucide@latest"></script>',
  '<script src="/static/js/lucide.min.js"></script>'
);

fs.writeFileSync('sites/portal/template.html', tpl, 'utf-8');
console.log('Portal: OK, ' + fs.statSync('sites/portal/template.html').size + ' bytes');

// === DOCCHECK ===
tpl = fs.readFileSync('sites/doccheck/template.html', 'utf-8');

tpl = tpl.replace(
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">',
  '<link rel="stylesheet" href="/static/fonts/fonts.css">'
);

tpl = tpl.replace(
  '<script src="https://unpkg.com/lucide@latest"></script>',
  '<script src="/static/js/lucide.min.js"></script>'
);

fs.writeFileSync('sites/doccheck/template.html', tpl, 'utf-8');
console.log('DocCheck: OK, ' + fs.statSync('sites/doccheck/template.html').size + ' bytes');

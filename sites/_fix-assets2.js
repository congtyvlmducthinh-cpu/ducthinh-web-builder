const fs = require('fs');

function fixGoogleFonts(filepath) {
  let tpl = fs.readFileSync(filepath, 'utf-8');
  
  // Remove preconnect lines
  tpl = tpl.replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '');
  tpl = tpl.replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n', '');
  
  // Replace Google Fonts link with local fonts.css
  tpl = tpl.replace(
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="/static/fonts/fonts.css">'
  );
  
  // Replace Lucide CDN with local (if not already done)
  tpl = tpl.replace(
    '<script src="https://unpkg.com/lucide@latest"></script>',
    '<script src="/static/js/lucide.min.js"></script>'
  );
  
  fs.writeFileSync(filepath, tpl, 'utf-8');
  console.log('Fixed: ' + filepath + ' (' + fs.statSync(filepath).size + ' bytes)');
  console.log('  fonts.css present: ' + tpl.includes('/static/fonts/fonts.css'));
  console.log('  No googleapis: ' + !tpl.includes('fonts.googleapis'));
  console.log('  lucide local: ' + tpl.includes('/static/js/lucide.min.js'));
}

fixGoogleFonts('sites/portal/template.html');
fixGoogleFonts('sites/doccheck/template.html');

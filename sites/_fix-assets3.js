const fs = require('fs');

['sites/portal/template.html', 'sites/doccheck/template.html'].forEach(filepath => {
  let tpl = fs.readFileSync(filepath, 'utf-8');
  
  // Remove ALL preconnect links
  tpl = tpl.replace(/<link rel="preconnect"[^>]*>\n?/g, '');
  
  // Remove Google Fonts CSS link (with any url variation)
  tpl = tpl.replace(/<link[^>]*fonts\.googleapis[^>]*>\n?/g, '');
  
  // Add local fonts.css right before </head> (if not already present)
  if (!tpl.includes('/static/fonts/fonts.css')) {
    tpl = tpl.replace('</head>', '  <link rel="stylesheet" href="/static/fonts/fonts.css">\n</head>');
  }
  
  // Replace Lucide CDN with local
  tpl = tpl.replace(/<script[^>]*unpkg\.com\/lucide[^>]*><\/script>\n?/g, '<script src="/static/js/lucide.min.js"></script>\n');
  
  // Remove duplicate fonts.css lines (keep first)
  const lines = tpl.split('\n');
  let seenFontsCss = false;
  const filtered = lines.filter(l => {
    if (l.includes('/static/fonts/fonts.css')) {
      if (seenFontsCss) return false;
      seenFontsCss = true;
    }
    return true;
  });
  tpl = filtered.join('\n');
  
  fs.writeFileSync(filepath, tpl, 'utf-8');
  
  // Verify
  const c = fs.readFileSync(filepath, 'utf-8');
  console.log('=== ' + filepath + ' ===');
  c.match(/<link[^>]*>/g).forEach(l => console.log('  LINK: ' + l));
  c.match(/<script[^>]*>/g).forEach(s => console.log('  SCRIPT: ' + s));
  console.log('  fonts.css: ' + c.includes('/static/fonts/fonts.css'));
  console.log('  googleapis: ' + c.includes('googleapis'));
  console.log('  unpkg: ' + c.includes('unpkg.com/lucide'));
  console.log();
});

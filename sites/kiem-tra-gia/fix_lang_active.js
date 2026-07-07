const fs = require('fs');

['vi.html','en.html','zh.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  // Replace the lang-switcher links to have correct active state
  let lang = f === 'vi.html' ? 'vi' : f === 'en.html' ? 'en' : 'zh';
  let html = f;
  
  // Build correct link markup
  let links = '';
  ['vi','en','zh'].forEach(l => {
    const href = l + '.html';
    const isActive = l === lang;
    links += '<a href="' + href + '" class="' + (isActive ? ' active' : '') + '">' + l.toUpperCase() + '</a>';
  });
  
  const newSwitcher = '<div class="lang-switcher">' + links + '</div>';
  const oldRe = /<div class="lang-switcher">.*?<\/div>/;
  
  const updated = c.replace(oldRe, newSwitcher);
  if (updated === c) {
    console.log(f + ': WARNING - no replacement made!');
  } else {
    fs.writeFileSync(f, updated, 'utf8');
    console.log(f + ': fixed - active is now ' + lang.toUpperCase());
  }
  
  // Verify
  const final = fs.readFileSync(f, 'utf8');
  const m = final.match(/<div class="lang-switcher">.*?<\/div>/);
  console.log('  Result:', m ? m[0] : 'NOT FOUND');
});

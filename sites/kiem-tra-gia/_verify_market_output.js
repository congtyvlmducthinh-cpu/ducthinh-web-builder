const fs = require('fs');
['vi.html','en.html','zh.html'].forEach(f => {
  const html = fs.readFileSync(f, 'utf-8');
  console.log('=== ' + f + ' ===');
  // Check for {{MARKET remaining
  const mktLbl = html.indexOf('{{MARKET_LABEL}}');
  console.log('{{MARKET_LABEL}} remains:', mktLbl >= 0);
  
  // Check for market-group in JS area (around mlToggleBtn)
  const mktIdx = html.indexOf('market-group');
  // Find the one with actual buttons (not CSS)
  let count = 0;
  let pos = 0;
  while ((pos = html.indexOf('market-group', pos)) !== -1) { count++; pos++; }
  console.log('market-group occurrences:', count);
  
  // Show the last one (should be in JS)
  const lastIdx = html.lastIndexOf('market-group');
  console.log('JS market-group:', html.substring(lastIdx-20, lastIdx+180));
  console.log('');
});

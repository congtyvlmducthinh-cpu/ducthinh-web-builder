const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Find "max load" related text
const mlIdx = tpl.indexOf('Hiện max tải');
if (mlIdx < 0) {
  // Try other patterns
  const ml2 = tpl.indexOf('max tải');
  console.log('max tải at', ml2, '->', tpl.substring(Math.max(0,ml2-200), ml2+100));
  
  const ml3 = tpl.indexOf('mlToggle');
  console.log('mlToggle at', ml3, '->', tpl.substring(Math.max(0,ml3-100), ml3+100));
} else {
  console.log('Hiện max tải at', mlIdx, '->', tpl.substring(Math.max(0,mlIdx-200), mlIdx+100));
}

// Find the price-mode-bar closing to see where market-group sits
const pmbEnd = tpl.indexOf('</div>\n\n<div id="mainContainer"');
console.log('\n=== price-mode-bar end area ===');
console.log(tpl.substring(pmbEnd-100, pmbEnd+50));

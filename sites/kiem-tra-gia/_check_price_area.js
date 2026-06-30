const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Search for tab-pricelist or renderPriceTab or similar
const idx = tpl.indexOf('priceModeBar');
console.log('priceModeBar at', idx);
if (idx >= 0) console.log(tpl.substring(idx-50, idx+300));

// Also search for where pricelist content is rendered
const idx2 = tpl.indexOf('mainContainer');
console.log('\nmainContainer at', idx2);
if (idx2 >= 0) console.log(tpl.substring(idx2-10, idx2+200));

// Also check summary-bar
const idx3 = tpl.indexOf('summary-bar');
console.log('\nsummary-bar at', idx3);
if (idx3 >= 0) console.log(tpl.substring(idx3-10, idx3+300));

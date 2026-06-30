const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Find max load toggle area in pricelist tab
const idx = tpl.indexOf('ml-toggle');
console.log('=== ml-toggle CSS ===');
console.log(tpl.substring(idx-10, idx+80));

const idx2 = tpl.indexOf('Hiện max tải');
console.log('\n=== Hiện max tải ===');
if (idx2 >= 0) console.log(tpl.substring(Math.max(0,idx2-100), idx2+60));

// Find the pricelist tab content area to see what's above table
const idx3 = tpl.indexOf('<div class="pricelist"');
console.log('\n=== pricelist div ===');
if (idx3 >= 0) console.log(tpl.substring(idx3, idx3+400));

// Find market-group HTML
const idx4 = tpl.indexOf('market-group');
console.log('\n=== market-group HTML ===');
if (idx4 >= 0) console.log(tpl.substring(idx4-20, idx4+200));

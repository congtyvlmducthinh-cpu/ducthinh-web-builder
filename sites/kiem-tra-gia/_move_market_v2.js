const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Find the market-group with its ext-label
const mktIdx = tpl.indexOf('market-group');
const openDiv = tpl.lastIndexOf('<div', mktIdx - 10);
const closeDiv = tpl.indexOf('</div>', mktIdx);
const mktHTML = tpl.substring(openDiv, closeDiv + 6);

console.log('Market HTML to relocate:');
console.log(mktHTML);
console.log('\nTotal template length:', tpl.length);

// Remove market-group from price-mode-bar
const before = tpl.substring(0, openDiv);
const after = tpl.substring(closeDiv + 6);
const newTpl = before + after;

// Now we need to put it in the pricelist tab, near the mlToggleBtn
// mlToggleBtn is rendered by JS in renderPriceTab(), not in template
// So we need to add it to the module file instead

// Let's think about this differently:
// - User wants Market buttons next to "Hiện max tải" (max load toggle)
// - "Hiện max tải" is rendered by JS in 02-pricelist.js
// - Market group is currently in template in price-mode-bar
// - Best approach: move it to the price tab by injecting it into 02-pricelist.js render

fs.writeFileSync('src/template.html', newTpl, 'utf-8');
console.log('\n✅ Removed market-group from template. Template length:', newTpl.length);

// Verify
const verify = fs.readFileSync('src/template.html', 'utf-8');
console.log('Has DOCTYPE:', verify.indexOf('<!DOCTYPE') >= 0);
console.log('Starts with:', verify.substring(0, 30));

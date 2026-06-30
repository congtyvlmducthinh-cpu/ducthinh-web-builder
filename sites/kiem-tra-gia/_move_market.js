const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Find market-group in template
const mktIdx = tpl.indexOf('market-group');
const mktEnd = tpl.indexOf('</div>', mktIdx);
const mktEnd2 = tpl.indexOf('</div>', mktEnd + 1);
console.log('Market group HTML:');
console.log(tpl.substring(mktIdx - 5, mktEnd2 + 10));

// Remove market-group from price-mode-bar
const before = tpl.substring(0, mktIdx - 5);
const after = tpl.substring(mktEnd2 + 6);
const newTpl = before + after;

fs.writeFileSync('src/template.html', newTpl, 'utf-8');
console.log('\n✅ Removed market-group from template');

const fs = require('fs');
const mod = fs.readFileSync('modules/02-pricelist.js', 'utf-8');
const idx = mod.indexOf('mlToggleBtn');
console.log(mod.substring(idx-100, idx+200));

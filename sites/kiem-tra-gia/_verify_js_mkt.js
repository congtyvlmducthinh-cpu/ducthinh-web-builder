const fs = require('fs');
const vi = fs.readFileSync('vi.html', 'utf-8');
const idx = vi.indexOf('market-group', 70000);
console.log('JS market-group at', idx);
console.log(vi.substring(idx-20, idx+200));

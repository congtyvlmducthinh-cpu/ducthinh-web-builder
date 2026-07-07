const fs = require('fs');
const c = fs.readFileSync('vi.html', 'utf8');
const idx = c.lastIndexOf('lang-switcher');
const start = c.lastIndexOf('<div', idx);
const end = c.indexOf('</div>', idx + 50) + 6;
console.log('vi.html lang-switcher block:');
console.log(JSON.stringify(c.substring(start, end)));

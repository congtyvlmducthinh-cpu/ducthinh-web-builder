const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');

// Check oninput attributes
const matches = html.match(/oninput="[^"]*"/g);
console.log('All oninput attributes:');
matches?.forEach(m => console.log('  ' + m));

// Check the exact context around searchInput
const idx = html.indexOf('searchInput');
console.log('\nContext around searchInput:');
console.log(html.substring(Math.max(0,idx-80), idx+150));

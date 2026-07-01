const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Check populateFilters function
const pfIdx = js.indexOf('function populateFilters');
console.log('=== populateFilters ===');
console.log(js.substring(pfIdx, pfIdx + 3000));

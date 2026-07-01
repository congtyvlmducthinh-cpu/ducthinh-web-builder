const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');

// Extract script content
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('NO SCRIPT FOUND'); process.exit(1); }
const js = m[1];

// Check for key function definitions
const checks = [
  'function globalSearch',
  'function render',
  'function renderPriceTab',
  'function populateFilters',
  'function switchTab',
  'function applyMarket',
  'function setMarket',
  'function importProducts'
];
for (const fn of checks) {
  console.log(fn + ':', js.includes(fn) ? 'FOUND' : 'MISSING');
}

// Check the searchInput element exists
console.log('searchInput in HTML:', html.includes('searchInput') ? 'FOUND' : 'MISSING');
console.log('globalSearch() in HTML:', html.includes('globalSearch()') ? 'FOUND' : 'MISSING');
console.log('oninput=', html.match(/oninput="[^"]*"/g)?.filter(s => s.includes('search')));

// Try to evaluate the JS to catch any syntax error
try {
  new Function(js);
  console.log('JS EVAL: OK - no syntax errors');
} catch(e) {
  console.log('JS EVAL ERROR:', e.message);
}

const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');

// Count searchInput elements
let count = 0, idx = -1;
const search = 'id="searchInput"';
while ((idx = html.indexOf(search, idx + 1)) >= 0) {
  count++;
  let ctx = html.substring(Math.max(0, idx-80), idx+80);
  console.log('searchInput #' + count + ': ...' + ctx + '...\n');
}
console.log('Total searchInput id occurrences:', count);

// Also check for any duplicate
const search2 = 'searchInput';
let total = 0, idx2 = -1;
while ((idx2 = html.indexOf(search2, idx2 + 1)) >= 0) {
  total++;
}
console.log('Total searchInput references:', total);

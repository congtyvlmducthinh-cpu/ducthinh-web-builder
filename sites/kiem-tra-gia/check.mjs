const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf8');

// Check 1: importProducts fallback block - should be NEW
console.log('=== CHECK 1: importProducts fallback ===');
console.log('Has CN la base:', html.includes('CN l\u00e0 base'));
console.log('Has always base value:', html.includes('always base value'));

// Check 2: downloadTemplate(0) headers
console.log('\n=== CHECK 2: downloadTemplate(0) headers ===');
const idx0 = html.indexOf('headers = ', 50000);
console.log('Headers at:', idx0);
if (idx0 > 0) {
  const snippet = html.substring(idx0, idx0 + 400);
  console.log('Snippet:', snippet.substring(0, 200));
}

// Check 3: downloadFullTemplate headers
console.log('\n=== CHECK 3: downloadFullTemplate() headers ===');
const idxFull = html.indexOf('prodHeaders = ', 50000);
console.log('ProdHeaders at:', idxFull);
if (idxFull > 0) {
  const snippet = html.substring(idxFull, idxFull + 400);
  console.log('Snippet:', snippet.substring(0, 200));
}

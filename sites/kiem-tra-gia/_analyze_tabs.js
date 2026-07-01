const fs = require('fs');
let content = fs.readFileSync('vi.html', 'utf8');

// Find all tab-related classes, IDs, attributes
let tabMatches = content.match(/data-tab[^=]*=[^"']*["\'][^"\']*["\']/gi) || [];
console.log('=== data-tab attributes ===');
tabMatches.forEach(m => console.log(m));

let tabClasses = content.match(/class="[^"]*tab[^"]*"/gi) || [];
console.log('\n=== Classes with "tab" ===');
tabClasses.forEach(m => console.log(m));

let tabButtons = content.match(/<button[^>]*tab[^>]*>/gi) || [];
console.log('\n=== Tab buttons ===');
tabButtons.forEach(m => console.log(m));

let onclickHandlers = content.match(/onclick="[^"]*"/gi) || [];
console.log('\n=== onclick handlers ===');
onclickHandlers.forEach(m => console.log(m));

let clickHandlers = content.match(/\.addEventListener\(['"]click['"]/gi) || [];
console.log('\n=== addEventListener click ===');
clickHandlers.forEach(m => console.log(m));

// Find "Giá bán" sections
let giaBan = content.match(/Giá bán|giá bán|giaban|gia-ban/gi) || [];
console.log('\n=== Giá bán mentions ===');
giaBan.forEach(m => console.log(m));

// Find "Tab" references
let tabRefs = content.match(/['"]tab['"]|['"]tabs['"]|Tab|tab/gi) || [];
console.log('\n=== Tab references ===');
console.log([...new Set(tabRefs)].join(', '));

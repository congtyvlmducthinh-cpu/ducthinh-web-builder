var vi = require('fs').readFileSync('vi.html', 'utf-8');

// 1. Find where pricelist market buttons come from
var cnIdx = vi.indexOf('id="marketCn"');
console.log('=== PRICELIST MARKET BUTTONS ===');
console.log('Position:', cnIdx);
console.log('Parent context:', vi.substring(Math.max(0, cnIdx-250), cnIdx+120));
console.log('---');

// 2. Find calc market buttons
var ccIdx = vi.indexOf('id="calcMarketCn"');
console.log('=== CALC MARKET BUTTONS ===');
console.log('Position:', ccIdx);
var lineStart = vi.lastIndexOf('\n', ccIdx);
var lineEnd = vi.indexOf('\n', ccIdx);
console.log('Line:', vi.substring(lineStart, lineEnd));

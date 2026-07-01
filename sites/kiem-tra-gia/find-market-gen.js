var vi = require('fs').readFileSync('vi.html', 'utf-8');

// Find what generates the pricelist market buttons
var idx = vi.indexOf('class="market-group"');
console.log('First HTML market-group at', idx);
var start = vi.lastIndexOf('<', idx-5);
var end = vi.indexOf('</div>', idx) + 6;
var htmlBlock = vi.substring(start, end);
console.log('HTML block:');
console.log(htmlBlock);

// Go backwards from this block to find which function generated it
console.log('\nLooking for surrounding context...');
var searchStart = Math.max(0, idx - 2000);
var contextBefore = vi.substring(searchStart, idx);
// Show the last 200 chars before this block
console.log('200 chars before:');
console.log(contextBefore.substring(contextBefore.length - 300));

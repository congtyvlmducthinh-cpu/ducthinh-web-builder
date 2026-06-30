var fs = require('fs');
var zh = fs.readFileSync('zh.html', 'utf-8');

// Find the exact position of the Vietnamese text
var idx = zh.indexOf('Chọn sản phẩm và tính giá trước khi lên báo giá');
console.log('Found at position:', idx);
console.log('Characters around it:');
for (var i = idx - 15; i < idx + 60; i++) {
  process.stdout.write(zh[i]);
}
console.log('\n');

// Check if this is inside a JS string or in HTML
// Look for quotes, = signs before it
var before = zh.substring(idx - 30, idx);
console.log('Before chars:', JSON.stringify(before));

// Is this inside a JS string literal? Check if preceded by a quote
var quoteIdx = before.indexOf("'");
if (quoteIdx >= 0) console.log('Has single quote at:', quoteIdx);
var dqIdx = before.indexOf('"');
if (dqIdx >= 0) console.log('Has double quote at:', dqIdx);

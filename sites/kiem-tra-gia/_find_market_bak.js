var fs = require('fs');
var bak = fs.readFileSync('vi.html.bak', 'utf-8');
var idx = bak.indexOf("Th\u1ecb tr\u01b0\u1eddng");
if (idx < 0) idx = bak.indexOf("marketCn");
console.log('Found at', idx);
console.log(bak.substring(idx-40, idx+250));

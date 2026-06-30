var fs = require('fs');
var v = fs.readFileSync('vi.html', 'utf-8');
var idx = v.indexOf('marketCn');
console.log(v.substring(Math.max(0, idx - 20), idx + 120));

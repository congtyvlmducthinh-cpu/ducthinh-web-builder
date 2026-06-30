var fs = require('fs');
var bak = fs.readFileSync('vi.html.bak', 'utf-8');
var idx = bak.indexOf("marketCn");
// Show the full market buttons HTML
var end = bak.indexOf("</div>", idx);
console.log(bak.substring(idx-40, end+6));

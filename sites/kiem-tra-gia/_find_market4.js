var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');
var idx = tpl.indexOf('price-mode-bar"');
// Show a larger chunk
console.log(tpl.substring(idx - 10, idx + 800));

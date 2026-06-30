var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');
var idx = tpl.indexOf('price-mode-bar"');
console.log(tpl.substring(Math.max(0, idx - 30), idx + 450));

var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');
// Show from price-mode-bar to the end of LCC/freight area
var idx = tpl.indexOf('price-mode-bar"');
console.log(tpl.substring(idx - 10, idx + 500));

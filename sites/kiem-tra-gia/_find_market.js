var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');
var idx = tpl.indexOf('price-mode-bar');
console.log('CSS at', idx);
// Find the HTML element
var htmlIdx = tpl.indexOf('price-mode-bar"');
console.log('HTML attr at', htmlIdx);
if (htmlIdx >= 0) {
  console.log(tpl.substring(htmlIdx-20, htmlIdx+200));
}

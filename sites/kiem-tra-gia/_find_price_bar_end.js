var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');
var idx = tpl.indexOf('freightGroup');
console.log('freightGroup at', idx);
var closeDiv = idx;
for (var i = 0; i < 3; i++) {
  closeDiv = tpl.indexOf('</div>', closeDiv + 1);
}
console.log(tpl.substring(idx - 10, closeDiv + 6));

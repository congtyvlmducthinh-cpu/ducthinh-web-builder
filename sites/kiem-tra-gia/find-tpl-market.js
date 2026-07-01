var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');
var idx = tpl.indexOf('class="market-group"');
console.log('idx:', idx);
if (idx >= 0) {
  console.log(tpl.substring(idx, idx+300));
} else {
  var pos = 0;
  var matches = [];
  while (pos >= 0) {
    pos = tpl.indexOf('market-group', pos);
    if (pos < 0) break;
    matches.push(pos);
    pos++;
  }
  console.log('Found', matches.length, 'matches - are they CSS?');
  matches.forEach(function(m) {
    console.log(m, tpl.substring(m-10, m+60));
  });
}

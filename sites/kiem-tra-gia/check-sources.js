var p2 = require('fs').readFileSync('modules/02-pricelist.js', 'utf-8');
// Find where market buttons are generated
var idx = p2.indexOf('market-group');
console.log('In 02-pricelist.js:');
console.log(p2.substring(idx, idx+250));
console.log('---');
// Also check the template
var tpl = require('fs').readFileSync('src/template.html', 'utf-8');
var tidx = tpl.indexOf('market-group');
var all = [];
while (tidx >= 0) {
  all.push({pos: tidx, ctx: tpl.substring(Math.max(0, tidx-10), tidx+60)});
  tidx = tpl.indexOf('market-group', tidx+1);
}
console.log('template.html market-group matches:');
all.forEach(function(a,i) {
  console.log(i + ': ' + JSON.stringify(a.ctx));
});

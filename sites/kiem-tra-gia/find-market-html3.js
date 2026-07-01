var vi = require('fs').readFileSync('vi.html', 'utf-8');

// Find all market-group occurrences
var result = [];
var pos = 0;
while (pos >= 0) {
  pos = vi.indexOf('market-group', pos);
  if (pos < 0) break;
  var before = vi.substring(Math.max(0, pos-5), pos);
  var after = vi.substring(pos, pos+70);
  result.push({pos: pos, before: before, after: after});
  pos++;
}
console.log('Found ' + result.length + ' market-group occurrences');
result.forEach(function(r) {
  console.log(r.pos + ': ' + JSON.stringify(r.before) + '|' + JSON.stringify(r.after));
});

// Find the HTML market group buttons (not inside JS h += strings)
// Search for id=marketCn in non-JS context
var idx = vi.indexOf('id="marketCn"');
if (idx >= 0) {
  var before = vi.substring(Math.max(0, idx-120), idx);
  console.log('\nmarketCn button context:');
  console.log(before + '|' + vi.substring(idx, idx+100));
}

var idx2 = vi.indexOf('id="marketOther"');
if (idx2 >= 0) {
  // Check if this is the HTML one (not JS string)
  console.log('\nmarketOther at ' + idx2 + ' context:');
  console.log(vi.substring(Math.max(0, idx2-120), idx2+60));
}

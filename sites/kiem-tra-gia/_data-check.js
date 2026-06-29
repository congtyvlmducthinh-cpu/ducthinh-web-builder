var fs = require('fs');
var html = fs.readFileSync('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'utf-8');

var vars = ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_COST_FOB', 'DATA_MAX_LOADING'];
vars.forEach(function(v) {
  var idx = html.indexOf('var ' + v + ' = [');
  if (idx >= 0) {
    var end = html.indexOf('];', idx);
    console.log(v + ': ' + idx + '..' + (end+2) + ' len=' + (end - idx + 3));
    console.log('  Start: ' + html.substring(idx, idx + 60));
  } else {
    console.log(v + ': NOT FOUND');
  }
});

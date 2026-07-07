var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var checks = [
  'localStorage.getItem',
  'localStorage.setItem',
  'fobPtscFilterProducts', 
  'fobSearchInput',
  'fobSellPrice',
  'sellPrice',
  'commBase',
  'calc-comm-result',
  'calc-total',
  'fobptsc-row',
  'minPrice',
  'Gi\u00e1 t\u1ed1i thi\u1ec3u'
];
checks.forEach(function(c){
  var i = h.indexOf(c);
  console.log(c + ': ' + (i >= 0 ? 'FOUND' : 'MISSING') + ' (' + (h.split(c).length - 1) + 'x)');
});

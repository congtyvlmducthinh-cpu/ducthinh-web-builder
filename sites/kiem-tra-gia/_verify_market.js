var fs = require('fs');

var langs = {vi:'vi.html', en:'en.html', zh:'zh.html'};
Object.keys(langs).forEach(function(k) {
  var html = fs.readFileSync(langs[k], 'utf-8');
  var initIdx = html.indexOf('applyMarket()');
  console.log('--- ' + langs[k] + ' ---');
  console.log('Init:', html.substring(initIdx, initIdx + 90));
  
  var mIdx = html.indexOf('marketCn');
  console.log('Market HTML:', html.substring(mIdx - 10, mIdx + 120));
  console.log('');
});

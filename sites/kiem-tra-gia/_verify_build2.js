var fs = require('fs');
['vi.html', 'en.html', 'zh.html'].forEach(function(f) {
  var html = fs.readFileSync(f, 'utf-8');
  var initIdx = html.indexOf('applyMarket');
  console.log('=== ' + f + ' ===');
  console.log('Init:', html.substring(initIdx, initIdx + 100));
  var mIdx = html.indexOf('market-group');
  console.log('Market HTML:', html.substring(mIdx, Math.min(mIdx + 200, html.length)));
  console.log('');
});

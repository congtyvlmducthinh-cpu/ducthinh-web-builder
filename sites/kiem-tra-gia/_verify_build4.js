var fs = require('fs');
['vi.html', 'en.html', 'zh.html'].forEach(function(f) {
  var html = fs.readFileSync(f, 'utf-8');
  var initIdx = html.indexOf('applyMarket');
  console.log('=== ' + f + ' ===');
  console.log(html.substring(initIdx, initIdx + 200));
  console.log('');
});

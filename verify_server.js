const https = require('https');
https.get('https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html', function(res) {
  var d = '';
  res.on('data', function(c) { d += c; });
  res.on('end', function() {
    var idx = d.indexOf('function quotFilterProds');
    var snippet = d.substring(idx, idx + 500);
    console.log('=== quotFilterProds on server ===');
    console.log(snippet);
  });
});

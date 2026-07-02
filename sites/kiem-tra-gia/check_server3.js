const https = require('https');
https.get('https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html', function(res) {
  var d = '';
  res.on('data', function(c) { d += c; });
  res.on('end', function() {
    var start = d.indexOf('var DATA_BAGS');
    if (start === -1) { console.log('DATA_BAGS not found'); return; }
    var snippet = d.substring(start, start + 5000);
    // Get unique specs
    var specs = [];
    var re = /"spec"\s*:\s*"([^"]+)"/g;
    var m;
    while ((m = re.exec(snippet)) !== null) { specs.push(m[1]); }
    console.log('Found', specs.length, 'spec entries');
    var unique = {};
    specs.forEach(function(s) { unique[s] = 1; });
    console.log('Unique specs:', Object.keys(unique).sort());
  });
});

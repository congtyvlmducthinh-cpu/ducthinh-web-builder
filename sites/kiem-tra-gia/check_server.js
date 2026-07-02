const https = require('https');
https.get('https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html', function(res) {
  var d = '';
  res.on('data', function(c) { d += c; });
  res.on('end', function() {
    var start = d.indexOf('var DATA_BAGS');
    if (start > -1) {
      var snippet = d.substring(start, start + 2000);
      var specs = [];
      var re = /spec:"([^"]+)"/g;
      var m;
      while ((m = re.exec(snippet)) !== null) { specs.push(m[1]); }
      var unique = {};
      specs.forEach(function(s) { unique[s] = 1; });
      console.log('Unique specs in DATA_BAGS:', Object.keys(unique));
      console.log('Total bag entries:', specs.length);
      console.log('DATA_BAGS present: YES');
    } else {
      console.log('DATA_BAGS NOT FOUND');
      var idx = d.indexOf('DATA_BAGS');
      if (idx > -1) console.log('DATA_BAGS word at', idx, ':', d.substring(idx-30, idx+80));
    }
  });
});

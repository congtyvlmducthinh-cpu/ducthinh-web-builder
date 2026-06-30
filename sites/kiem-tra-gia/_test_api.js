var http = require('http');
var fs = require('fs');

var payload = JSON.stringify({
  lang: '__ALL__',
  blocks: {
    DATA_PRODUCTS: 'var DATA_PRODUCTS = [{ "Ma_sp": "TEST-UPLOAD", "Ten_sp": "Test Upload API" }];',
    DATA_BAGS: 'var DATA_BAGS = [];',
    DATA_OTHERS: 'var DATA_OTHERS = [];',
    DATA_MAX_LOADING: 'var DATA_MAX_LOADING = {};',
    DATA_COST_FOB: 'var DATA_COST_FOB = {};'
  }
});

var req = http.request({
  hostname: '127.0.0.1',
  port: 8080,
  path: '/api/ktg-data',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, function(res) {
  var data = '';
  res.on('data', function(c) { data += c; });
  res.on('end', function() {
    console.log('Status: ' + res.statusCode);
    console.log('Response: ' + data);
    
    var dir = 'C:/Users/Admin/.openclaw/canvas/ktg-data/';
    var files = ['ktg-data-vi.json', 'ktg-data-en.json', 'ktg-data-zh.json'];
    files.forEach(function(f) {
      var p = dir + f;
      if (fs.existsSync(p)) {
        var c = fs.readFileSync(p, 'utf-8');
        var hasTest = c.indexOf('TEST-UPLOAD') >= 0;
        console.log(f + ': ' + (hasTest ? 'HAS TEST-UPLOAD' : 'no data'));
      } else {
        console.log(f + ': NOT FOUND');
      }
    });
  });
});

req.write(payload);
req.end();

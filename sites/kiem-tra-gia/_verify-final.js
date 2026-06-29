var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');
var lines = js.split('\n');

// Check critical features
var checks = {
  'const http = require': 'IMPORT',
  'var ktgInjector = require': 'INJECTOR (should be 1)',
  'function serveHTML': 'FUNC serveHTML',
  'html = html.replace': 'REPLACE (should be 3)',
  '} catch(e) {': 'CATCH',
  "req.url.startsWith('/kiem-tra-gia')": 'KTG HANDLER',
  "ktgInjector.inject": 'INJECT CALL',
  "req.url === '/api/ktg-data'": 'API HANDLER (should be 1)',
  'ktgInjector.save': 'SAVE CALL',
  "req.url.startsWith('/static/')": 'STATIC',
  "req.url === '/api/login'": 'LOGIN',
  "req.url === '/api/verify'": 'VERIFY',
  "req.url === '/api/logout'": 'LOGOUT',
  'server.listen': 'LISTEN',
};

for (var k in checks) {
  var count = (js.match(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log(checks[k] + ': ' + count + ' (' + k.substring(0, 40) + '...)');
}

// Show structure
var markers = [
  'const http = require',
  'var ktgInjector = require',
  'function serveHTML',
  'const server = http.createServer',
  '/kiem-tra-gia',
  '/api/ktg-data',
  'Other static sites',
  'res.writeHead(404',
  'server.listen',
];
console.log('\n=== STRUCTURE ===');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  for (var m = 0; m < markers.length; m++) {
    if (l.indexOf(markers[m]) >= 0 && l.trim().substring(0, 3) !== '//') {
      console.log('L' + (i+1) + ': ' + l.trim().substring(0, 90));
      break;
    }
  }
}

console.log('\nTotal: ' + lines.length + ' lines, ' + js.length + ' chars');

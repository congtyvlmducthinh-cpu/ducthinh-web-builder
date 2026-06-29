var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');
var lines = js.split('\n');

var markers = {
  'const http': 'IMPORT http',
  'const fs': 'IMPORT fs',
  'const path': 'IMPORT path',
  'const crypto': 'IMPORT crypto',
  'const url': 'IMPORT url',
  'var ktgInjector': 'KGT INJECTOR',
  'const MIME': 'CONFIG MIME',
  'const HOST_ROUTES': 'CONFIG ROUTES',
  'const USERS': 'CONFIG USERS',
  'function createSession': 'FUNC createSession',
  'function validateToken': 'FUNC validateToken',
  'function getTokenFromReq': 'FUNC getTokenFromReq',
  'function getRoute': 'FUNC getRoute',
  'function serveStatic': 'FUNC serveStatic',
  'function serveHTML': 'FUNC serveHTML',
  'const server = http.createServer': 'CALLBACK START',
  "req.url.startsWith('/kiem-tra-gia')": 'KTG HANDLER',
  "req.url === '/api/ktg-data'": 'KTG API',
  'Other static sites': 'OTHER STATIC',
  "req.url.startsWith('/static/')": 'STATIC ROUTE',
  "req.url === '/api/login'": 'API LOGIN',
  "req.url === '/api/verify'": 'API VERIFY',
  'Serve page by hostname': 'PAGE ROUTING',
  "req.url === '/api/logout'": 'API LOGOUT',
  "req.url === '/api/check'": 'API CHECK',
  'Kilobyte KB ': 'KILOBYTE API',
  'res.writeHead(404': '404 HANDLER',
  'server.listen': 'SERVER LISTEN',
};

console.log('=== FILE STRUCTURE ===');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  for (var k in markers) {
    if (l.indexOf(k) >= 0) {
      console.log('L' + (i+1) + ': ' + markers[k] + ' | ' + l.trim().substring(0, 80));
      break;
    }
  }
}

console.log('\n=== SERVE HTML (lines 146-186) ===');
for (var i = 145; i < Math.min(lines.length, 187); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

console.log('\nTotal lines: ' + lines.length);

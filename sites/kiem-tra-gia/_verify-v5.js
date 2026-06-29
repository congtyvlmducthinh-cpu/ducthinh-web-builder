var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');
var lines = js.split('\n');

var checks = [
  { pat: 'const http = require', label: 'IMPORT http' },
  { pat: 'var ktgInjector = require', label: 'KGT INJECTOR' },
  { pat: 'const HTTP_PORT', label: 'HTTP_PORT' },
  { pat: 'const SITES_ROOT', label: 'SITES_ROOT' },
  { pat: 'function serveHTML', label: 'FUNC serveHTML' },
  { pat: 'html.replace(\'<body>\'', label: 'BODY TEMPLATE' },
  { pat: 'html.replace(\'</body>\'', label: '/BODY TEMPLATE (count)' },
  { pat: '} catch(e) {', label: 'CATCH' },
  { pat: 'const server = http.createServer', label: 'CREATE SERVER' },
  { pat: '/kiem-tra-gia', label: 'KTG HANDLER' },
  { pat: "req.url === '/api/ktg-data'", label: 'KTG API' },
  { pat: 'ktgInjector.inject', label: 'INJECT CALL' },
  { pat: 'ktgInjector.save', label: 'SAVE CALL' },
  { pat: '/sites/', label: 'SITES ROUTE' },
  { pat: '/static/', label: 'STATIC ROUTE' },
  { pat: '/api/login', label: 'LOGIN API' },
  { pat: '/api/verify', label: 'VERIFY API' },
  { pat: 'server.listen', label: 'LISTEN' },
];

console.log('=== FEATURE CHECK ===');
for (var c = 0; c < checks.length; c++) {
  var cnt = (js.match(new RegExp(checks[c].pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log(checks[c].label + ': ' + cnt);
}

console.log('\n=== STRUCTURE ===');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  for (var c = 0; c < checks.length; c++) {
    if (l.indexOf(checks[c].pat) >= 0) {
      console.log('L' + (i+1) + ': ' + l.trim().substring(0, 90));
      break;
    }
  }
}

console.log('\nTotal: ' + lines.length + ' lines, ' + js.length + ' bytes');

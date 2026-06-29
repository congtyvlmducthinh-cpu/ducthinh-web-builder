var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');

// Show the whole file structure
var lines = js.split('\n');
var sections = [
  {label: 'IMPORTS + GLOBALS', re: /^const (http|fs|path|url|crypto|os|querystring) =/},
  {label: 'ktgInjector', re: /^var ktgInjector =/},
  {label: 'parseBody', re: /^function parseBody/},
  {label: 'loginHandler', re: /^const (validCredentials|sessionStore|LOGIN_|SESSION_)/},
  {label: 'createServer', re: /^const server = http\.createServer/},
  {label: 'CORS + route', re: /^  res\.setHeader/},
  {label: 'KTG handler', re: /if \(req\.url\.startsWith\('\/kiem-tra-gia/},
  {label: 'serveHTML function', re: /^function serveHTML/},
  {label: 'KTG API upload', re: /\/api\/ktg-data/},
  {label: 'static routes', re: /Other static/},
  {label: 'doccheck API', re: /\/api\/doccheck/},
  {label: 'template portal', re: /template portal/},
  {label: 'login/verify API', re: /\/api\/login|\/api\/verify/},
  {label: '404 handler', re: /res\.writeHead\(404/},
  {label: 'cleanup', re: /Cleanup expired/},
  {label: 'server.listen', re: /server\.listen/},
];

console.log('FILE STRUCTURE:');
for (var i = 0; i < lines.length; i++) {
  for (var s = 0; s < sections.length; s++) {
    if (sections[s].re.test(lines[i])) {
      console.log('Line ' + (i+1) + ': [' + sections[s].label + '] ' + lines[i].trim().substring(0, 80));
      break;
    }
  }
}

console.log('\n\n=== Total lines: ' + lines.length + ' ===');

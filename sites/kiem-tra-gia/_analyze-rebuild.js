var fs = require('fs');
var cp = require('child_process');

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');

// Check where createServer is
var csIdx = js.indexOf('const server = http.createServer');
console.log('createServer at:', csIdx);

// Also find KTG handler
var ktgIdx = js.indexOf('if (req.url.startsWith(\'/kiem-tra-gia\')');
console.log('KTG handler at:', ktgIdx);

// If no createServer, the callback body starts right after the module-level code
// and before the function definitions (serveHTML etc.)

// Let me trace the structure more carefully
// Find all the major structural elements
var elements = [
  { label: 'const http', pat: 'const http' },
  { label: 'const fs', pat: 'const fs' },
  { label: 'const path', pat: 'const path' },
  { label: 'const crypto', pat: 'const crypto' },
  { label: 'const url', pat: 'const url' },
  { label: 'ktgInjector require', pat: 'var ktgInjector' },
  { label: 'const MIME', pat: 'const MIME' },
  { label: 'const HOST_ROUTES', pat: 'const HOST_ROUTES' },
  { label: 'const USERS', pat: 'const USERS' },
  { label: 'function createSession', pat: 'function createSession' },
  { label: 'function serveHTML', pat: 'function serveHTML' },
  { label: '// KTG handler', pat: 'if (req.url.startsWith(\'/kiem-tra-gia\')' },
  { label: 'Other static sites', pat: 'Other static sites' },
  { label: 'res.writeHead(404', pat: 'res.writeHead(404' },
  { label: 'server.listen', pat: 'server.listen' },
];

console.log('\nSTRUCTURE:');
for (var e = 0; e < elements.length; e++) {
  var idx = js.indexOf(elements[e].pat);
  if (idx >= 0) {
    var lineNum = js.substring(0, idx).split('\n').length;
    console.log(elements[e].label + ': L' + lineNum + ' (char ' + idx + ')');
  }
}

// Find the callback body - search for 'http.createServer'
var createServerAny = js.indexOf('createServer');
console.log('\ncreateServer anywhere:', createServerAny);
if (createServerAny >= 0) {
  var cl = js.substring(0, createServerAny).split('\n').length;
  console.log('Line:', cl, 'Context:', js.substring(createServerAny, createServerAny+80));
}

// If no createServer, the callback body was the first thing written to the file
// (the corrupted patch wrote the callback body directly)
// Let me check line 1
console.log('\nLine 1:', js.substring(0, 200));
console.log('\nLine 2:', js.split('\n')[1]);

// Check the actual structure - the first function definition is at what line?
var firstFnIdx = js.indexOf('function ');
console.log('\nFirst function at char:', firstFnIdx);
console.log('Before it:', js.substring(0, Math.min(firstFnIdx, 1000)));

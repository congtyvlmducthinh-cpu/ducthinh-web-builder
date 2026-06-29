var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Add parseBody function BEFORE createServer callback
// Find the right insertion point: before const server = http.createServer
var insertPoint = js.indexOf('const server = http.createServer');

var parseBodyFunc = `
// ─── Body parser for JSON POST ──────────────────────────────────────
function parseBody(req) {
  return new Promise(function(resolve, reject) {
    var body = '';
    req.on('data', function(chunk) { body += chunk; });
    req.on('end', function() {
      try { resolve(JSON.parse(body)); }
      catch(e) { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

`;

js = js.substring(0, insertPoint) + parseBodyFunc + js.substring(insertPoint);

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');

// Verify
try {
  require('child_process').execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}

console.log('Added parseBody function. File size:', js.length);

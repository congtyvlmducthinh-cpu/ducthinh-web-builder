var fs = require('fs');
var cp = require('child_process');
var broken = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', broken, 'utf-8');

try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}
console.log('Restored from .broken: ' + broken.length + ' bytes');

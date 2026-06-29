var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Fix: add route definition before the host-based routing section
var target = '// ─── Serve pages based on hostname ──';
var pos = js.indexOf(target);
if (pos >= 0) {
  js = js.substring(0, pos) + '  const route = getRoute(req);\n\n  ' + js.substring(pos);
  console.log('Added route definition');
}

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');

// Syntax check
var cp = require('child_process');
try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}

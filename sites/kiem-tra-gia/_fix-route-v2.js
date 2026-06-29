var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Insert route definition BEFORE the hostname routing section
var target = 'if (req.url === \'/\') {';
var pos = js.indexOf(target);

if (pos >= 0) {
  // Insert before this line
  var insert = '  const route = getRoute(req);\n\n  ';
  js = js.substring(0, pos) + insert + js.substring(pos);
  console.log('Inserted route definition at char ' + pos);
}

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');

// Verify
var checkPos = js.indexOf('const route = getRoute(req)');
console.log('Route definition found at: ' + checkPos);

// Syntax check
try {
  require('child_process').execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}

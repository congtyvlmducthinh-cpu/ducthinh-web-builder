var fs = require('fs');

// Build the correct server.js by reading original and constructing proper version
// The patch approach is fragile - let's just replace the problematic sections properly.

var path = require('path');

// Read template files
var orig = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// ===== STEP 1: Clear misplaced require =====
// Remove the misplaced ktgInjector require that ended up inside the KTG handler
// The bad block starts with '/kiem-tra-gia/_ktg-data-injector' and ends with 'const crypto = require'
var badBlockMatch = orig.match(/\/\/ ─── KTG Data injector[\s\S]*?var ktgInjector = require\('C:[^']+?_ktg-data-injector\.js'\)\([\s\S]*?\n\);\n/);
if (badBlockMatch) {
  orig = orig.replace(badBlockMatch[0], '');
  console.log('Removed misplaced ktgInjector require');
}

// ===== STEP 2: Add proper require at top (after path require) =====
var requirePath = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/_ktg-data-injector.js'.replace(/\\/g, '\\\\');
var injectRequire = "// ─── KTG Data injector ────────────────────────────────────────────────────\r\nvar ktgInjector = require('" + requirePath + "')({\r\n  dir: __dirname + '/ktg-data',\r\n  __dirname: __dirname,\r\n  fs: fs,\r\n  path: path\r\n});\r\n";

var pathRequireIdx = orig.indexOf("const path = require('path');");
if (pathRequireIdx >= 0) {
  var afterPathRequire = orig.indexOf('\n', pathRequireIdx);
  orig = orig.substring(0, afterPathRequire + 1) + injectRequire + orig.substring(afterPathRequire + 1);
  console.log('Added proper injector require');
}

// ===== STEP 3: Add inject call inside KTG handler =====
// Find the exact KTG handler readFile block
var ktgIdx = orig.indexOf("if (req.url.startsWith('/kiem-tra-gia'))");
if (ktgIdx >= 0) {
  // Find the res.end(data) inside the HTML-serving branch
  var endDataIdx = orig.indexOf('res.end(data);', ktgIdx);
  if (endDataIdx >= 0) {
    var newLine = "        if (!err && data) {\r\n          var langMatch = req.url.match(/\/(vi|en|zh)\\.html$/);\r\n          var lang = langMatch ? langMatch[1] : 'vi';\r\n          data = ktgInjector.inject(data, lang);\r\n        }\r\n";
    orig = orig.substring(0, endDataIdx) + newLine + orig.substring(endDataIdx);
    console.log('Added inject call to KTG handler');
  }
}

// ===== STEP 4: Add API endpoint before 404 =====
var ktgApi = "\r\n  // ─── KTG Data upload API ──────────────────────────────────────────────\r\n  if (req.url === '/api/ktg-data' && req.method === 'POST') {\r\n    parseBody(req).then(function(data) {\r\n      var lang = data.lang || 'vi';\r\n      var blocks = data.blocks || {};\r\n      ktgInjector.save(lang, blocks);\r\n      console.log('[KTG] Upload data for ' + lang + ': ' + Object.keys(blocks).length + ' blocks');\r\n      res.writeHead(200, { 'Content-Type': 'application/json' });\r\n      res.end(JSON.stringify({ ok: true, saved: Object.keys(blocks).length }));\r\n    }).catch(function(e) {\r\n      res.writeHead(400, { 'Content-Type': 'application/json' });\r\n      res.end(JSON.stringify({ ok: false, error: 'Invalid JSON: ' + e.message }));\r\n    });\r\n    return;\r\n  }\r\n";

var notFoundIdx = orig.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\r\n  res.end('Not found');");
if (notFoundIdx < 0) {
  // Try with \n only
  notFoundIdx = orig.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\n  res.end('Not found');");
}
if (notFoundIdx >= 0) {
  orig = orig.substring(0, notFoundIdx) + ktgApi + orig.substring(notFoundIdx);
  console.log('Added API endpoint');
}

// ===== Write patched server.js =====
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', orig, 'utf-8');
console.log('\nServer.js patched successfully');

// ===== Verify =====
var check = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');
console.log('Has ktgInjector require: ' + check.includes('var ktgInjector = require'));
console.log('Has inject call: ' + check.includes('ktgInjector.inject(data, lang)'));
console.log('Has API endpoint: ' + check.includes('/api/ktg-data'));
console.log('Bad block removed: ' + (!check.includes('var ktgInjector = require(\'') || check.indexOf('var ktgInjector = require(\'') < 100));

// Check syntax
var execSync = require('child_process').execSync;
try {
  var result = execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  if (result) console.log('Syntax output: ' + result);
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}

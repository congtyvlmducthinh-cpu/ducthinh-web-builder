var fs = require('fs');

var serverJs = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// ---- FIX 1: Move ktgInjector require to correct place (before GATEWAY_HOST) ----
// Currently it's somewhere inside the function body. Find and remove the bad insertion first.

// The bad insertion was added BEFORE GATEWAY_HOST line, but it ended up inside a function.
// Let's find the correct require block and replace it

var badStart = serverJs.indexOf("// ─── KTG Data injector ────────────────────────────────────────────────────");
if (badStart >= 0) {
  var badEnd = serverJs.indexOf("const GATEWAY_HOST", badStart);
  if (badEnd >= 0) {
    // Remove the bad insertion
    serverJs = serverJs.substring(0, badStart) + serverJs.substring(badEnd);
    console.log('Removed misplaced injector require');
  }
}

// ---- FIX 2: Add proper require after const path = require('path'); ----
var pathRequireIdx = serverJs.indexOf("const path = require('path');");
var injectRequire = "\n// ─── KTG Data injector ────────────────────────────────────────────────────\nvar ktgInjector = require('" + "'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/_ktg-data-injector.js'" + ")({\n  dir: __dirname + '/ktg-data',\n  __dirname: __dirname,\n  fs: fs,\n  path: path\n});\n";
serverJs = serverJs.substring(0, pathRequireIdx + 31) + injectRequire + serverJs.substring(pathRequireIdx + 31);
console.log('Added proper injector require after path require');

// ---- FIX 3: Add inject call inside KTG handler ----
// Find the KTG handler's readFile callback
var readFileMatch = serverJs.match(/fs\.readFile\(filePath, 'utf-8', function\(err, data\) \{[\s\S]{0,1000}?res\.writeHead\(200, \{ 'Content-Type': 'text\/html; charset=utf-8' \}\)/);
if (readFileMatch) {
  var readFileFull = readFileMatch[0];
  var writeHeadIdx = readFileFull.indexOf("res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }");
  
  var injectCall = "\n        if (!err && data) {" +
    "\n          var langMatch = req.url.match(/\/(vi|en|zh)\.html$/);" +
    "\n          var lang = langMatch ? langMatch[1] : 'vi';" +
    "\n          data = ktgInjector.inject(data, lang);" +
    "\n        }";
  
  var beforeWriteHead = readFileFull.substring(0, writeHeadIdx);
  var afterWriteHead = readFileFull.substring(writeHeadIdx);
  
  var newKtgSection = beforeWriteHead + injectCall + '\n        ' + afterWriteHead;
  
  serverJs = serverJs.replace(readFileFull, newKtgSection);
  console.log('Added inject call inside KTG handler');
}

// ---- FIX 4: Add API endpoint before 404 handler ----
var ktgApiEndpoint = '\n' +
'  // ─── KTG Data upload API ──────────────────────────────────────────────\n' +
'  if (req.url === \'/api/ktg-data\' && req.method === \'POST\') {\n' +
'    parseBody(req).then(function(data) {\n' +
'      var lang = data.lang || \'vi\';\n' +
'      var blocks = data.blocks || {};\n' +
'      ktgInjector.save(lang, blocks);\n' +
'      res.writeHead(200, { \'Content-Type\': \'application/json\' });\n' +
'      res.end(JSON.stringify({ ok: true, saved: Object.keys(blocks).length }));\n' +
'    }).catch(function(e) {\n' +
'      res.writeHead(400, { \'Content-Type\': \'application/json\' });\n' +
'      res.end(JSON.stringify({ ok: false, error: \'Invalid JSON: \' + e.message }));\n' +
'    });\n' +
'    return;\n' +
'  }\n';

// Insert before the 404 handler
var notFoundIdx = serverJs.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\n  res.end('Not found');");
serverJs = serverJs.substring(0, notFoundIdx) + ktgApiEndpoint + serverJs.substring(notFoundIdx);
console.log('Added API endpoint before 404 handler');

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', serverJs, 'utf-8');

// Verify
console.log('\n=== VERIFICATION ===');
var check = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');
console.log('Has ktgInjector require:', check.indexOf('var ktgInjector = require') >= 0);
console.log('Has inject call:', check.indexOf('ktgInjector.inject') >= 0);
console.log('Has API endpoint:', check.indexOf('/api/ktg-data') >= 0);
console.log('Has old bad insertion:', check.indexOf('KTG Data injector ─────') >= 0);

// Syntax check
var execSync = require('child_process').execSync;
try {
  execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('Syntax: OK');
} catch(e) {
  console.log('Syntax: ERROR - ' + e.stdout);
}

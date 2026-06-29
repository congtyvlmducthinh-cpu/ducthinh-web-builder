var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// ===== FIX 1: html.replace -> html = html.replace (3 templates) =====
js = js.replace(
  "    if (requireAuth && !hasSession) {\n      html.replace('<body>'",
  "    if (requireAuth && !hasSession) {\n      html = html.replace('<body>'"
);
js = js.replace(
  "      html.replace('</body>'",
  "      html = html.replace('</body>'"
);
// Fix the else branch too
js = js.replace(
  "    } else {\n      html.replace('</body>'",
  "    } else {\n      html = html.replace('</body>'"
);

// ===== FIX 2: Remove duplicate ktgInjector require =====
// Find the second occurrence
var firstInjector = js.indexOf("var ktgInjector = require");
var secondInjector = js.indexOf("var ktgInjector = require", firstInjector + 5);
if (secondInjector >= 0) {
  // Find the end of the second require block
  var blockEnd = js.indexOf('});', secondInjector) + 3;
  // Include the newline after
  if (js[blockEnd] === '\n') blockEnd++;
  if (js[blockEnd] === '\r') blockEnd++;
  js = js.substring(0, secondInjector) + js.substring(blockEnd);
  console.log('Removed duplicate ktgInjector require');
}

// ===== FIX 3: Add KTG handler to callback body =====
// Find where to insert (after CORS headers, before KTG API handler)
var corsEnd = js.indexOf("res.setHeader('Access-Control-Allow-Headers'");
var corsLineEnd = js.indexOf('\n', corsEnd);

// After CORS headers, before API/static routes, insert KTG handler
var ktgHandler = "\n" +
"  // ─── KTG handler (serve Kiểm Tra Giá with data injection) ──────\n" +
"  if (req.url.startsWith('/kiem-tra-gia')) {\n" +
"    const urlPath = req.url.substring('/kiem-tra-gia'.length) || '/';\n" +
"    // Normalise: /vi /en /zh + .html\n" +
"    let lang = 'vi';\n" +
"    let filePath = path.join(SITES_ROOT, 'kiem-tra-gia', 'vi.html');\n" +
"    const langMatch = urlPath.match(/^\\/(vi|en|zh)(?:\\.html)?(?:\\/.*)?$/);\n" +
"    if (langMatch) {\n" +
"      lang = langMatch[1];\n" +
"      filePath = path.join(SITES_ROOT, 'kiem-tra-gia', lang + '.html');\n" +
"    }\n" +
"\n" +
"    if (!filePath.startsWith(SITES_ROOT)) {\n" +
"      res.writeHead(403);\n" +
"      return res.end('Forbidden');\n" +
"    }\n" +
"\n" +
"    fs.readFile(filePath, function(err, data) {\n" +
"      if (err) {\n" +
"        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\n" +
"        return res.end('KTG page not found for: ' + lang);\n" +
"      }\n" +
"      if (!err && data) {\n" +
"        var lang2 = lang;\n" +
"        data = ktgInjector.inject(data, lang2);\n" +
"      }\n" +
"      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });\n" +
"      res.end(data);\n" +
"    });\n" +
"    return;\n" +
"  }\n\n";

js = js.substring(0, corsLineEnd + 1) + ktgHandler + js.substring(corsLineEnd + 1);
console.log('Added KTG handler');

// ===== FIX 4: Add inject call to KTG API handler =====
// The KTG API handler (second one, around line 422) already has ktgInjector.save call
// Let me verify
var apiSaveCount = (js.match(/ktgInjector\.save/g) || []).length;
console.log('ktgInjector.save calls: ' + apiSaveCount);

// The first API handler (after CORS) has ktgInjector.save - good
// The second API handler (near end) also has it - good

// ===== FIX 5: Remove duplicate KTG API handler =====
// There are TWO KTG API handlers in the callback body (one early, one late)
// Let me check
var apiHandler1 = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");
var apiHandler2 = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')", apiHandler1 + 10);
console.log('API handlers at: ' + apiHandler1 + ', ' + apiHandler2);

// Keep only the first one (near KTG handler)
// The second one in the 422 area is the duplicate
if (apiHandler2 >= 0) {
  // Find the end of the second handler
  var apiEnd2 = js.indexOf("res.writeHead(404", apiHandler2);
  if (apiEnd2 < 0) {
    // Find the 404 handler or next major section
    apiEnd2 = js.indexOf("if (!req.url.startsWith('/api/doccheck')", apiHandler2);
  }
  if (apiEnd2 >= 0) {
    // Also remove blank lines before it
    var before = js.lastIndexOf('\n\n', apiHandler2);
    if (before > js.lastIndexOf('\n', apiHandler2 - 5)) {
      apiHandler2 = before;
    }
    js = js.substring(0, apiHandler2) + js.substring(apiEnd2);
    console.log('Removed duplicate API handler');
  }
}

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');
console.log('\nServer.js written: ' + js.length + ' chars');

// Syntax check
var cp = require('child_process');
try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var msg = e.stdout || e.stderr || e.message || '';
  console.log(msg);
  var lm = msg.match(/line (\d+)/i);
  if (lm) {
    var n = parseInt(lm[1]);
    var ol = js.split('\n');
    for (var li = Math.max(0, n-5); li < Math.min(ol.length, n+3); li++) {
      console.log((li+1) + ': ' + ol[li]);
    }
  }
}

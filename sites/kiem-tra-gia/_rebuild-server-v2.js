var fs = require('fs');

// Reconstruct server.js from the broken file but with correct structure
// Extract the working pieces

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');

// ===== SECTION 1: Module-level code =====
// Extract from line 35 onwards through the function definitions
// These are currently INSIDE the callback body, but should be at module level

var lines = js.split('\n');

// Find module-level demarcation points
// Line 35 = "const http = require('http');"  (first real require)
// Line 173 = "// ─── Read HTML file with auth inject ──" (last helper function comment)
// serveHTML function starts at line 175

var moduleCodeLines = [];
var i;

// Key markers within the modules section
// Lines 35 (index 34) through 173 (index 172)
// But some lines 1-34 should also go in the callback body

// Actually, let's extract the full module code properly
// Find "const http = require('http');"
var httpIdx = js.indexOf('const http = require(\'http\');');
console.log('http at char:', httpIdx);

// Find where helper functions end (before serveHTML)
var serveHTMLFunc = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');
console.log('serveHTML at char:', serveHTMLFunc);

// Module-level code = everything from httpIdx to serveHTMLFunc
var moduleCode = js.substring(httpIdx, serveHTMLFunc);
console.log('Module code: ' + moduleCode.length + ' chars');

// ===== SECTION 2: serveHTML function =====
// Extract the 3 template strings from serveHTML
var serveHTMLContent = js.substring(serveHTMLFunc);

// Find templates
var pBody = serveHTMLContent.indexOf('html.replace(\'<body>\'');
var tBodyStart = serveHTMLContent.indexOf('`', pBody + 24);
var tBodyEnd = serveHTMLContent.indexOf('`);', tBodyStart) + 2;
var bodyTemplate = serveHTMLContent.substring(pBody, tBodyEnd);

var pScript1 = serveHTMLContent.indexOf('html.replace(\'</body>\'', tBodyEnd);
var tScript1Start = serveHTMLContent.indexOf('`', pScript1 + 27);
var tScript1End = serveHTMLContent.indexOf('`);', tScript1Start) + 2;
var script1Template = serveHTMLContent.substring(pScript1, tScript1End);

var pScript2 = serveHTMLContent.indexOf('html.replace(\'</body>\'', tScript1End);
var tScript2Start = serveHTMLContent.indexOf('`', pScript2 + 27);
var tScript2End = serveHTMLContent.indexOf('`);', tScript2Start) + 2;
var script2Template = serveHTMLContent.substring(pScript2, tScript2End);

console.log('Templates extracted: ' + bodyTemplate.length + ', ' + script1Template.length + ', ' + script2Template.length);

// ===== SECTION 3: Callback body after serveHTML =====
// Everything from "Other static sites" through server.listen
var otherStaticIdx = js.indexOf('}  // Other static sites (no CSS injection)');
if (otherStaticIdx < 0) otherStaticIdx = js.indexOf('}  // Other static sites');
console.log('Other static at char:', otherStaticIdx);

// But this includes the serveHTML's broken closing. We need the CLEAN version
// The clean code after serveHTML should be:
// 1. KTG API upload handler (line 435 in original, or from the callback body)
// 2. Other static sites / static file server
// 3. DocCheck API endpoints
// 4. Page serving
// 5. 404 handler
// 6. Cleanup
// 7. server.listen

// Let me extract from otherStaticIdx onwards
var postServeHTML = js.substring(otherStaticIdx);
console.log('Post-serveHTML: ' + postServeHTML.length + ' chars');

// The first line of postServeHTML is: "}  // Other static sites (no CSS injection)"
// This line has the wrong indentation (it's at callback level but was inside serveHTML)
// I need to fix it

// ===== BUILD THE CORRECT FILE =====

var out = '';

// Module-level code
out += moduleCode + '\n';

// serveHTML function definition
out += 'function serveHTML(res, htmlPath, requireAuth, hasSession) {\n';
out += '  try {\n';
out += '    let html = fs.readFileSync(htmlPath, \'utf-8\');\n\n';
out += '    if (requireAuth && !hasSession) {\n';
out += '      ' + bodyTemplate.trim() + '\n';
out += '      ' + script1Template.trim() + '\n';
out += '    } else {\n';
out += '      ' + script2Template.trim() + '\n';
out += '    }\n\n';
out += '    res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n';
out += '    res.end(html);\n';
out += '  } catch(e) {\n';
out += '    res.writeHead(500, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n';
out += '    res.end(\'Error: \' + e.message);\n';
out += '  }\n';
out += '}\n\n';

// Now the createServer callback
out += 'const server = http.createServer((req, res) => {\n';
out += '  // ─── CORS helpers ──────────────────────────────────────────────────\n';
out += '  res.setHeader(\'Access-Control-Allow-Origin\', \'*\');\n';
out += '  res.setHeader(\'Access-Control-Allow-Methods\', \'GET, POST, OPTIONS\');\n';
out += '  res.setHeader(\'Access-Control-Allow-Headers\', \'Content-Type, Authorization, Cookie\');\n';

// KTG handler (from original file, but it might have been lost)
// Let me check if the KTG handler is in the post-serveHTML section
var ktgHandlerInPost = postServeHTML.indexOf("if (req.url.startsWith('/kiem-tra-gia')");
if (ktgHandlerInPost >= 0) {
  // Extract the KTG handler from post-serveHTML
  // It starts at ktgHandlerInPost and ends at the next major section
  var ktgHandler = postServeHTML.substring(ktgHandlerInPost);
  var ktgHandlerEnd = ktgHandler.indexOf('if (req.url.startsWith(\'/sites/\')', ktgHandler.indexOf('return;'));
  if (ktgHandlerEnd < 0) {
    // Try finding other section starts
    var nextSections = ["if (req.url.startsWith('/sites/")];
    for (var ns = 0; ns < nextSections.length; ns++) {
      var si = ktgHandler.indexOf(nextSections[ns], 100);
      if (si >= 0) { ktgHandlerEnd = si; break; }
    }
  }
  if (ktgHandlerEnd > 0) {
    out += ktgHandler.substring(0, ktgHandlerEnd).replace(/^  /gm, '  ') + '\n';
  } else {
    out += ktgHandler + '\n';
  }
}

// The KTG API upload handler
// Find the last one in the file (clean version)
var apiIdx = postServeHTML.lastIndexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");
if (apiIdx >= 0) {
  var apiBlock = postServeHTML.substring(apiIdx);
  var apiEnd = apiBlock.indexOf('res.writeHead(404');
  if (apiEnd < 0) apiEnd = apiBlock.indexOf('if (!req.url.startsWith(\'/api/doccheck\')');
  if (apiEnd > 0) out += apiBlock.substring(0, apiEnd).replace(/^  /gm, '  ') + '\n';
} else {
  // Fallback: extract from the top of the broken file
  apiIdx = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");
  var apiBlock = js.substring(apiIdx);
  var apiEnd = apiBlock.indexOf('\n  }', 50) + 4;
  out += apiBlock.substring(0, apiEnd) + '\n  return;\n  }\n\n';
}

// Other static sites section (clean from post-serveHTML)
out += '  // Other static sites (no CSS injection)\n';

// From postServeHTML, extract everything after the first line
var cleanPost = postServeHTML;
// Remove the "}  // Other static sites" line
var firstNewline = cleanPost.indexOf('\n');
if (firstNewline >= 0) {
  cleanPost = cleanPost.substring(firstNewline + 1);
}

// Add the post-serveHTML content, fixing indentation
out += cleanPost;

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', out, 'utf-8');
console.log('\nServer.js written: ' + out.length + ' chars');

// Syntax check
try {
  var cp = require('child_process');
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var err = e.stdout || e.stderr || e.message;
  console.log(err);
  
  // Show error context
  var lineMatch = err.match(/line (\d+)/i);
  if (lineMatch) {
    var n = parseInt(lineMatch[1]);
    var outLines = out.split('\n');
    for (var l = Math.max(0, n-6); l < Math.min(outLines.length, n+3); l++) {
      console.log((l+1) + ': ' + outLines[l]);
    }
  }
}

var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');

// ===== EXTRACT 3 TEMPLATE STRINGS =====

// 1. Login body: html.replace('<body>', `...`)
var p1 = js.indexOf('html.replace(\'<body>\'', funcStart);
var pEnd1 = js.indexOf('\n', p1);
// This is: html.replace('<body>', `<body>\n...`)
// Find the closing `);
var t1Start = js.indexOf('`', p1 + 24); // after html.replace('<body>', `
var t1End = js.indexOf('`);', t1Start) + 2; // position after );
var loginBody = js.substring(p1, t1End);
console.log('Login body template (' + loginBody.length + ' chars)');

// 2. Login script: html.replace('</body>', `...`)
var p2 = js.indexOf('html.replace(\'</body>\'', p1 + 5);
var t2Start = js.indexOf('`', p2 + 27); // after html.replace('</body>', `
var t2End = js.indexOf('`);', t2Start) + 2;
var loginScript = js.substring(p2, t2End);
console.log('Login script template (' + loginScript.length + ' chars)');

// 3. Else script: html.replace('</body>', `...`)
var p3 = js.indexOf('html.replace(\'</body>\'', p2 + 5);
var t3Start = js.indexOf('`', p3 + 27);
var t3End = js.indexOf('`);', t3Start) + 2;
var elseScript = js.substring(p3, t3End);
console.log('Else script template (' + elseScript.length + ' chars)');

// Also extract the KTG API handler (the code mixed inside serveHTML's try body)
var apiStart = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");
var apiEnd = js.indexOf("if (!req.url.startsWith('/api/doccheck')", apiStart);
if (apiEnd < 0) apiEnd = js.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })", apiStart);
var apiHandler = js.substring(apiStart, apiEnd).trim();
console.log('\nKTG API handler (' + apiHandler.length + ' chars)');

// ===== BUILD CORRECT FILE =====

// Part1: everything before serveHTML
var part1 = js.substring(0, funcStart);

// Part2: correct serveHTML
var svh = 'function serveHTML(res, htmlPath, requireAuth, hasSession) {\n';
svh += '  try {\n';
svh += '    let html = fs.readFileSync(htmlPath, \'utf-8\');\n\n';
svh += '    if (requireAuth && !hasSession) {\n';
svh += '      ' + loginBody.trim() + '\n';
svh += '      ' + loginScript.trim() + '\n';
svh += '    } else {\n';
svh += '      ' + elseScript.trim() + '\n';
svh += '    }\n\n';
svh += '    res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n';
svh += '    res.end(html);\n';
svh += '  } catch(e) {\n';
svh += '    res.writeHead(500, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n';
svh += '    res.end(\'Error: \' + e.message);\n';
svh += '  }\n';
svh += '}\n\n';

// Part3: KTG API handler + everything after serveHTML
// Find where the old KTG API handler was
var oldApiStart = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')", funcStart);
var afterFunc = js.substring(funcStart);
var afterOldApi = js.substring(apiEnd);

// But we need to find the boundary of KTG handler in original structure
// After serveHTML and KTG API handler, the file has:
// "  // Other static sites (no CSS injection)"

// Let me find what comes right after the original serveHTML body in part1
// Actually part1 stops at funcStart. The rest of the file after funcStart is what we're replacing.

// We need to keep everything from "  // Other static sites" onwards
// But also the ktgInjector was added at the top, so we need to check that

// Find: "  }  // Other static sites (no CSS injection)"
var otherSitesIdx = js.indexOf("  }  // Other static sites (no CSS injection)\n");
if (otherSitesIdx < 0) otherSitesIdx = js.indexOf("  }  // Other static sites\n");

console.log('\nOther static sites section at:', otherSitesIdx);

var part3 = otherSitesIdx >= 0 ? js.substring(otherSitesIdx) : '';

var final = part1 + '\n' + svh + '\n' + apiHandler + '\n\n' + part3;

// Fix: add proper closing of the KTG handler section before "Other static sites"
// The KTG handler section in the original code + our API handler should be properly closed
// Let me check if there's a closing `});\n` or `}\n` missing

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', final, 'utf-8');
console.log('\nServer.js written (' + final.length + ' chars)');

// Syntax check
try {
  var cp = require('child_process');
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var err = e.stdout || e.stderr || e.message;
  console.log(err);
  
  var lineMatch = err.match(/line (\d+)/i);
  if (lineMatch) {
    var n = parseInt(lineMatch[1]);
    var lines = final.split('\n');
    for (var i = Math.max(0, n-6); i < Math.min(lines.length, n+3); i++) {
      console.log((i+1) + ': ' + lines[i]);
    }
  }
}

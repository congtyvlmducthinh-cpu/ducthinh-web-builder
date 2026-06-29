var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');

// Find KTG handler position
var ktgHandler = js.indexOf("if (req.url.startsWith('/kiem-tra-gia'))");
var ktgHandlerEnd = js.indexOf("  }  // Other static sites (no CSS injection)", ktgHandler);
if (ktgHandlerEnd < 0) ktgHandlerEnd = js.indexOf("  }  // Other static sites", ktgHandler);

// Find KTG API handler (mixed inside serveHTML)
var ktgAPIStart = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");

// Find the next top-level construct after KTG API handler
var apiHandlerEnd = js.indexOf("if (!req.url.startsWith('/api/doccheck')", ktgAPIStart);
if (apiHandlerEnd < 0) apiHandlerEnd = js.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })", ktgAPIStart);

console.log('funcStart:', funcStart);
console.log('ktgHandler:', ktgHandler, '(position rel to funcStart:', ktgHandler - funcStart, ')');
console.log('ktgHandlerEnd:', ktgHandlerEnd);
console.log('ktgAPIStart:', ktgAPIStart, '(position rel to funcStart:', ktgAPIStart - funcStart, ')');
console.log('apiHandlerEnd:', apiHandlerEnd);

// The ktg API handler code block (inside serveHTML)
var ktgAPICode = js.substring(ktgAPIStart, apiHandlerEnd);
console.log('\nKTG API code (' + ktgAPICode.length + ' chars):');
console.log(ktgAPICode.substring(0, 500));
console.log('...');
console.log(ktgAPICode.substring(ktgAPICode.length - 200));

// Should we keep the inject call inside the KTG handler?
var ktgHandlerCode = js.substring(ktgHandler, ktgHandlerEnd);
console.log('\n\nKTG Handler code has ktgInjector.inject:', ktgHandlerCode.indexOf('ktgInjector.inject') >= 0);

// Now, let me find where the broken section is (inside serveHTML)
// The end of the else template's ); is at:
var pos3 = js.indexOf("html.replace('</body>'", funcStart + 2000);
var pos3End = js.indexOf('`);', pos3) + 2;

// After this, we should have:
//     }
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//     res.end(html);
//   } catch(e) {
//     ...
//   }
// }
// 
// // ─── HTTP API helper ──...
//
// But instead, the broken code has KTG API handler code.

// The broken section starts at pos3End and goes until just before the KTG handler
// Let me find the boundary between broken section and KTG handler or other static sites

console.log('\n\n=== Building correct file ===');

// Strategy: 
// 1. Keep everything BEFORE serveHTML function as-is
// 2. Replace serveHTML function with clean version
// 3. Put KTG API handler after serveHTML
// 4. Keep everything from "Other static sites" onwards

// Step 1: Everything before serveHTML
var part1 = js.substring(0, funcStart);

// Step 2: Clean serveHTML function
var cleanFunc = 'function serveHTML(res, htmlPath, requireAuth, hasSession) {\n';
cleanFunc += '  try {\n';
// Login template (from the broken file, extract it)
var loginBodyTemplateStart = js.indexOf('html.replace(\'<body>\'', funcStart);
var loginBodyTemplateEnd = js.indexOf('html.replace(\'</body>\'', loginBodyTemplateStart);
var loginCloseTemplateEnd = js.indexOf('`);', loginBodyTemplateEnd) + 2;
cleanFunc += js.substring(loginBodyTemplateStart, loginCloseTemplateEnd + 1);
cleanFunc += '\n    } else {\n';
// Else template
var elseTemplate = js.indexOf('html.replace(\'</body>\'', loginCloseTemplateEnd);
var elseEnd = js.indexOf('`);', elseTemplate) + 2;
cleanFunc += js.substring(elseTemplate, elseEnd);
cleanFunc += '\n    }\n';
cleanFunc += '    res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n';
cleanFunc += '    res.end(html);\n';
cleanFunc += '  } catch(e) {\n';
cleanFunc += '    res.writeHead(500, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n';
cleanFunc += '    res.end(\'Error: \' + e.message);\n';
cleanFunc += '  }\n';
cleanFunc += '}\n';

console.log('Clean function:\n' + cleanFunc.substring(0, 200) + '...');

// Step 3: After serveHTML, we need the KTG API handler
// But we also need the ktgInjector require (it's already at the top of part1)
var ktgAPIHandler = '  // ─── KTG Data upload API ──────────────────────────────────────────────\n';
ktgAPIHandler += ktgAPICode;
ktgAPIHandler += '\n';

// Step 4: Everything from "Other static sites" onwards
// BUT: we need to check if there's a ")" before it (closing server created with serveHTML inline)
// Hmm, but serveHTML is a function DEFINITION, not a call. The actual server.createServer callback
// doesn't call serveHTML - it's just defining it there.

var otherSitesStart = js.indexOf("  }  // Other static sites (no CSS injection)\n");
if (otherSitesStart < 0) otherSitesStart = js.indexOf("  }  // Other static sites");
var part3 = js.substring(otherSitesStart);

var final = part1 + '\n\n' + cleanFunc + '\n\n' + ktgAPIHandler + '\n' + part3;

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', final, 'utf-8');
console.log('\nServer.js written (' + final.length + ' chars)');

// Verify syntax
try {
  var r = require('child_process').execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var err = e.stdout || e.stderr || e.message;
  console.log(err);
  
  var lineMatch = err.match(/line (\d+)/i);
  if (lineMatch) {
    var n = parseInt(lineMatch[1]);
    var lines = final.split('\n');
    for (var i = Math.max(0, n-5); i < Math.min(lines.length, n+3); i++) {
      console.log((i+1) + ': ' + lines[i]);
    }
  }
}

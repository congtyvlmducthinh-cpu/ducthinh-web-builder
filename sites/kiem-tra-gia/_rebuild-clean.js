var fs = require('fs');
var cp = require('child_process');

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');

// STEP 1: Identify boundaries
var fnServeHTML = 'function serveHTML(res, htmlPath, requireAuth, hasSession) {';
var serveHTMLIdx = js.indexOf(fnServeHTML);

// Extract module-level code (before serveHTML)
var moduleCode = js.substring(0, serveHTMLIdx);

// Extract serveHTML body (from fn line to just before the KTG handler starts)
// The serveHTML function signature line
var afterSig = js.substring(serveHTMLIdx + fnServeHTML.length);

// Now find the template strings inside serveHTML
// After requireAuth logic, we should have:
//   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//   res.end(html);
// } catch(e) {
//   res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
//   res.end('Error: ' + e.message);
// }
// }

// Find the res.writeHead line inside serveHTML
var writeHeadIdx = afterSig.indexOf("res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });");
console.log('writeHead at offset:', writeHeadIdx);

// Find what comes after it
if (writeHeadIdx >= 0) {
  var afterHead = afterSig.substring(writeHeadIdx);
  console.log('After writeHead:', afterHead.substring(0, 200));
}

// The problematic section starts at line 300: res.writeHead(200, ...
// After that we have:
//   res.end(data);    // BUG: should be res.end(html)
//   });              // BUG: closes nothing
//   } else {         // BUG: this is KTG handler code
//     serveStatic(req.url, res);
//   }
//   return;
//   }  // Other static sites (no CSS injection)

// Then line 308+: if (req.url.startsWith('/sites/')...  etc.

// So the fix: 
// Replace everything from res.writeHead to line 307 with proper try/catch ending serveHTML
// Then the rest (from sites handler onwards) must be left as-is

// Find the "Other static sites" comment
var otherStaticComment = '}  // Other static sites (no CSS injection)';
var otherStaticIdx = js.indexOf(otherStaticComment);
console.log('\nOther static at char:', otherStaticIdx);

// Everything from serveHTML fn to OtherStatic (inclusive) is the corrupted serveHTML
// Everything after otherStatic+line is the rest

// Let's extract the rest
var restStart = js.indexOf('\n', otherStaticIdx) + 1; // skip past line with comment
var restCode = js.substring(restStart);

console.log('Module code length:', moduleCode.length);
console.log('Rest code length:', restCode.length);
console.log('Rest starts with:', restCode.substring(0, 100));

// Now build the clean serveHTML
// Extract the 3 HTML templates from the existing code
var pBody = afterSig.indexOf("html = html.replace('<body>'");
if (pBody < 0) pBody = afterSig.indexOf("html.replace('<body>'");
var tBodyStart = afterSig.indexOf('`', pBody + 30);
var tBodyEnd = afterSig.indexOf('`);', tBodyStart) + 2;
var bodyTemp = afterSig.substring(pBody, tBodyEnd);
console.log('\nbodyTemp:', bodyTemp.substring(0, 40) + '...');

var pS1 = afterSig.indexOf("html = html.replace('</body>'", tBodyEnd);
if (pS1 < 0) pS1 = afterSig.indexOf("html.replace('</body>'", tBodyEnd);
var tS1Start = afterSig.indexOf('`', pS1 + 35);
var tS1End = afterSig.indexOf('`);', tS1Start) + 2;
var s1Temp = afterSig.substring(pS1, tS1End);
console.log('s1Temp:', s1Temp.substring(0, 40) + '...');

var pS2 = afterSig.indexOf("html = html.replace('</body>'", tS1End);
if (pS2 < 0) pS2 = afterSig.indexOf("html.replace('</body>'", tS1End);
var tS2Start = afterSig.indexOf('`', pS2 + 35);
var tS2End = afterSig.indexOf('`);', tS2Start) + 2;
var s2Temp = afterSig.substring(pS2, tS2End);
console.log('s2Temp:', s2Temp.substring(0, 40) + '...');

// Also extract the login script from the templates
// Login script is in s1Temp (the requireAuth branch)

// Build clean serveHTML
var cleanServeHTML = 'function serveHTML(res, htmlPath, requireAuth, hasSession) {\n';
cleanServeHTML += '  try {\n';
cleanServeHTML += '    let html = fs.readFileSync(htmlPath, \'utf-8\');\n\n';
cleanServeHTML += '    if (requireAuth && !hasSession) {\n';
cleanServeHTML += '      ' + bodyTemp.trim() + '\n';
cleanServeHTML += '      ' + s1Temp.trim() + '\n';
cleanServeHTML += '    } else {\n';
cleanServeHTML += '      ' + s2Temp.trim() + '\n';
cleanServeHTML += '    }\n\n';
cleanServeHTML += '    res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n';
cleanServeHTML += '    res.end(html);\n';
cleanServeHTML += '  } catch(e) {\n';
cleanServeHTML += '    res.writeHead(500, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n';
cleanServeHTML += '    res.end(\'Error: \' + e.message);\n';
cleanServeHTML += '  }\n';
cleanServeHTML += '}\n\n';

// FULL OUTPUT
var output = moduleCode + cleanServeHTML + restCode;

// Verify: count braces
var openBraces = (output.match(/\{/g) || []).length;
var closeBraces = (output.match(/\}/g) || []).length;
console.log('\nBraces: ' + openBraces + ' { vs ' + closeBraces + ' } -> ' + (openBraces === closeBraces ? 'OK' : 'MISMATCH'));

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', output, 'utf-8');
console.log('Written: ' + output.length + ' bytes');

try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}

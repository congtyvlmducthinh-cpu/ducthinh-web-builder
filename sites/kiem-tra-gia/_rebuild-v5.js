var fs = require('fs');
var cp = require('child_process');

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');
var lines = js.split('\n');

// Module code: lines 35-173 (indices 34-172)
var moduleCode = lines.slice(34, 172).join('\n') + '\n';

// serveHTML function: lines 174-305 (indices 172-304)
var serveHTMLStr = lines.slice(172, 304).join('\n');

// Extract templates
var afterFn = serveHTMLStr.substring(serveHTMLStr.indexOf('{'));
var bodyLine = afterFn.indexOf("html = html.replace('<body>'");
var bodyTplStart = afterFn.indexOf('`', bodyLine + 30);
var bodyTplEnd = afterFn.indexOf('`);', bodyTplStart) + 2;
var bodyTpl = afterFn.substring(bodyLine, bodyTplEnd);

var s1Line = afterFn.indexOf("html = html.replace('</body>'", bodyTplEnd);
var s1TplStart = afterFn.indexOf('`', s1Line + 35);
var s1TplEnd = afterFn.indexOf('`);', s1TplStart) + 2;
var s1Tpl = afterFn.substring(s1Line, s1TplEnd);

var s2Line = afterFn.indexOf("html = html.replace('</body>'", s1TplEnd);
var s2TplStart = afterFn.indexOf('`', s2Line + 35);
var s2TplEnd = afterFn.indexOf('`);', s2TplStart) + 2;
var s2Tpl = afterFn.substring(s2Line, s2TplEnd);

// Build clean serveHTML
var cleanServeHTML = 
'function serveHTML(res, htmlPath, requireAuth, hasSession) {\n' +
'  try {\n' +
'    let html = fs.readFileSync(htmlPath, \'utf-8\');\n\n' +
'    if (requireAuth && !hasSession) {\n' +
'      ' + bodyTpl.trim() + '\n' +
'      ' + s1Tpl.trim() + '\n' +
'    } else {\n' +
'      ' + s2Tpl.trim() + '\n' +
'    }\n\n' +
'    res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n' +
'    res.end(html);\n' +
'  } catch(e) {\n' +
'    res.writeHead(500, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n' +
'    res.end(\'Error: \' + e.message);\n' +
'  }\n' +
'}\n\n';

// Callback body: skip the corrupted closing braces.
// Lines 305-307 (indices 304-306) contain the corrupt leftover:
//     }
//     return;
//   }  // Other static sites (no CSS injection)
// Real callback starts at line 308 (index 307): '  if (req.url.startsWith(...))'
var callbackBodyStart = -1;
for (var i = 305; i < Math.min(lines.length, 320); i++) {
  if (lines[i].indexOf('if (req.url.startsWith') >= 0) {
    callbackBodyStart = i;
    break;
  }
}
console.log('Callback body starts at line:', callbackBodyStart + 1);

// Also find the KTG handler from the fragment (lines 0-33)
var ktgHandler = '';
var fragment = lines.slice(0, 34).join('\n');
var ktgStart = fragment.indexOf("req.url.startsWith('/kiem-tra-gia')");
if (ktgStart >= 0) {
  // Find the KTG handler block (ends with return; })
  var block = fragment.substring(ktgStart);
  var blockEnd = block.indexOf('  if (req.url.startsWith') + 1;
  if (blockEnd <= 1) {
    // Find where the return; block ends
    blockEnd = block.indexOf('return;');
    if (blockEnd >= 0) {
      blockEnd = block.indexOf('}', blockEnd) + 1;
    }
  }
  if (blockEnd > 1) {
    ktgHandler = block.substring(0, blockEnd);
    console.log('KTG handler found, length:', ktgHandler.length);
  }
}

// Build callback body lines
var cbLines = lines.slice(callbackBodyStart);
// Count braces in this section
var cbOpen = (cbLines.join('\n').match(/\{/g) || []).length;
var cbClose = (cbLines.join('\n').match(/\}/g) || []).length;
console.log('Callback braces:', cbOpen, '{ vs', cbClose, '} ->', cbOpen === cbClose ? 'OK' : 'MISMATCH');

// We need to know where createServer closes: the '});' after res.end('Not found')
// Find it in the combined lines
var cbStr = cbLines.join('\n');

// Find the '});' that closes createServer (the one after res.end('Not found'))
var notFoundIdx = cbStr.indexOf("res.end('Not found')");
var closeCreateServer = cbStr.indexOf('});', notFoundIdx);
console.log('createServer close at char:', closeCreateServer, 'text:', cbStr.substring(closeCreateServer-10, closeCreateServer+10));

var cbBeforeClose = cbStr.substring(0, closeCreateServer + 3); // includes '});'
var cbAfterClose = cbStr.substring(closeCreateServer + 3);

// Build final output
var final = '';
final += moduleCode;
final += cleanServeHTML;
final += 'const server = http.createServer((req, res) => {\n';
final += '  res.setHeader(\'Access-Control-Allow-Origin\', \'*\');\n';
final += '  res.setHeader(\'Access-Control-Allow-Methods\', \'GET, POST, OPTIONS\');\n';
final += '  res.setHeader(\'Access-Control-Allow-Headers\', \'Content-Type, Authorization, Cookie\');\n\n';

// Add KTG handler
if (ktgHandler) {
  final += '  // ─── KTG handler ──────────────────────────────────────────────\n';
  final += '  ' + ktgHandler.replace(/\n/g, '\n  ') + '\n\n';
}

// Add the rest of the callback (skip the '});' close)
final += cbBeforeClose + '\n\n';
// After close: escapeHtml, setInterval, server.listen
final += cbAfterClose.replace(/^\n+/, '');

// Need to also add the missing 'const HTTP_PORT' and SITES_ROOT constants if they're in the original module code
// Check if module code has them
console.log('\nModule has HTTP_PORT:', moduleCode.indexOf('HTTP_PORT') >= 0);
console.log('Module has SITES_ROOT:', moduleCode.indexOf('SITES_ROOT') >= 0);

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', final, 'utf-8');
console.log('\nWritten:', final.length, 'bytes');
console.log('Lines:', final.split('\n').length);

var ob = (final.match(/\{/g) || []).length;
var cbBraces = (final.match(/\}/g) || []).length;
console.log('Braces:', ob, '{ vs', cbBraces, '} ->', ob === cbBraces ? 'OK' : 'MISMATCH');

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
    var fl = final.split('\n');
    for (var li = Math.max(0, n-5); li < Math.min(fl.length, n+3); li++) {
      console.log((li+1) + ': ' + fl[li]);
    }
  }
}

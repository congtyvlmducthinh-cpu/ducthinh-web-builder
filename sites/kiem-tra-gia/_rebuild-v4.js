var fs = require('fs');
var cp = require('child_process');

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');
var lines = js.split('\n');

// === UNDERSTAND FILE STRUCTURE ===
// Lines 1-34 (0-indexed 0-33): Duplicate callback fragment (BAD PATCH)
// Lines 35-173 (34-172): Module code
// Lines 174-305 (173-304): serveHTML (corrupted - try without catch)
// Lines 306+ (305+): Callback body continuation

// === FIX PLAN ===
// 1. Remove lines 0-33 (duplicate fragment)
// 2. Fix serveHTML (lines 173-304) - add missing catch
// 3. Wrap callback body in const server = http.createServer(...)

// Step 1: Remove duplicate fragment (lines 0-33)
// But we need to salvage the callback wrapper if there was one
// Check if lines 0-33 contain 'const server = http.createServer'
var hasCreateServer = false;
for (var i = 0; i < 34; i++) {
  if (lines[i].indexOf('const server = http.createServer') >= 0) hasCreateServer = true;
}
console.log('Has createServer in fragment:', hasCreateServer);

// Module code (lines 35-173)
var moduleCode = lines.slice(34, 172).join('\n') + '\n';

// serveHTML function (lines 174-305)
var serveHTMLLines = lines.slice(172, 304);
console.log('serveHTML lines:', serveHTMLLines.length);

// Extract the 3 HTML templates from serveHTML
var serveHTMLStr = serveHTMLLines.join('\n');
var afterFnLine = serveHTMLStr.substring(serveHTMLStr.indexOf('{'));
var bodyLine = afterFnLine.indexOf("html = html.replace('<body>'");
var bodyStart = afterFnLine.indexOf('`', bodyLine + 30);
var bodyEnd = afterFnLine.indexOf('`);', bodyStart) + 2;
var bodyTemp = afterFnLine.substring(bodyLine, bodyEnd);

var s1Line = afterFnLine.indexOf("html = html.replace('</body>'", bodyEnd);
var s1Start = afterFnLine.indexOf('`', s1Line + 35);
var s1End = afterFnLine.indexOf('`);', s1Start) + 2;
var s1Temp = afterFnLine.substring(s1Line, s1End);

var s2Line = afterFnLine.indexOf("html = html.replace('</body>'", s1End);
var s2Start = afterFnLine.indexOf('`', s2Line + 35);
var s2End = afterFnLine.indexOf('`);', s2Start) + 2;
var s2Temp = afterFnLine.substring(s2Line, s2End);

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

// Callback body continuation (lines 306+)
// This starts with the KTG API handler (if present) or Other static sites
var callbackBody = lines.slice(304).join('\n');

// But callbackBody might still have the 'const server = http.createServer' wrapper missing
// Let me check
console.log('Callback body starts with:', callbackBody.substring(0, 60));
console.log('Callback body ends with:', callbackBody.substring(callbackBody.length - 60));

// Check if the last lines (server.listen etc) need adjustment
var lastLine = lines[lines.length - 1];
console.log('Last line:', lastLine);

// Also need to find and fix: the 404 handler at the end of callback
// There's `res.writeHead(404)` and `});` - these need to be inside the callback

// The callback body needs to be wrapped. Let me check if the callbackBody
// already has the closing wrapper
// Line 448-450 original (but lines 304+ is different index now... let me just search)
var cbLines = callbackBody.split('\n');
var closingIdx = -1;
for (var i = 0; i < cbLines.length; i++) {
  if (cbLines[i].indexOf('res.writeHead(404') >= 0) console.log('res.writeHead404 at line', i, ':', cbLines[i]);
  // Find the line after the 404 handler
  if (cbLines[i].indexOf('});') >= 0 && i > cbLines.length - 20) {
    console.log('}); near end at line', i, ':', cbLines[i]);
    closingIdx = i;
  }
  if (cbLines[i].indexOf('server.listen') >= 0) {
    console.log('server.listen at line', i);
  }
  if (cbLines[i].indexOf('function escapeHtml') >= 0) {
    console.log('escapeHtml at line', i);
  }
  if (cbLines[i].indexOf('setInterval') >= 0) {
    console.log('setInterval at line', i);
  }
}

// The callback body already has the proper structure if we look at it
// It should be:
//   if (req.url.startsWith('/sites/')) { ... }
//   ...
//   res.writeHead(404, ...)  
//   res.end('Not found');
// });
// server.listen(...)
//
// But we need the opening 'const server = http.createServer((req, res) => {'
// Let me look for: is there a row starting with '  const HTTP_PORT =' before createServer?
// Actually looking at module code lines 34-49:
for (var i = 34; i < 55; i++) {
  if (lines[i].replace(/\r/g,'').trim().indexOf('const') >= 0 || lines[i].indexOf('HTTP_PORT') >= 0) {
    console.log('Module L' + (i+1) + ': ' + lines[i].replace(/\r/g,''));
  }
}

// The module code ends at line 173 and the callback starts at line 306+
// But what about lines 174-305? That IS serveHTML
// But line 305 in the ACTUAL structure is: '}  // Other static sites (no CSS injection)'
// This is the END of the callback body's /sites/ handler... wait this doesn't make sense

// Let me re-analyze. The file was written by a BAD SCRIPT that wrote:
// 1. Callback body fragment (lines 1-34)
// 2. Module-level code (lines 35-173)  
// 3. serveHTML function (lines 174-305, corrupted with callback body inside)
// 4. Rest of callback (lines 306+)

// The callback at the end (306+) starts with if(req.url.startsWith('/sites/'))
// This is the SAME callback that the KTG handler should be part of

// So the fix:
// OUTPUT = moduleCode + cleanServeHTML + "const server = http.createServer((req, res) => {\n" + callbackBody

// But we need to handle the server.listen line - it's already in callbackBody

// Let me check: does callbackBody contain the 404 handler ending and server.listen?
var hasListen = callbackBody.indexOf('server.listen') >= 0;
var has404End = callbackBody.indexOf('res.writeHead(404') >= 0;
console.log('\nHas 404:', has404End, 'Has listen:', hasListen);

// Let me look at the last 20 lines
cbLines = callbackBody.split('\n');
for (var i = Math.max(0, cbLines.length - 25); i < cbLines.length; i++) {
  console.log('CB' + i + ': ' + cbLines[i].replace(/\r/g,''));
}

// The callback body currently has:
//   if (req.url.startsWith('/sites/') ...)
//   ...
//   res.writeHead(404, ...)
//   res.end('Not found');
// });              <-- this closes createServer
// 
// function escapeHtml(s) { ... }
// setInterval(...)
// server.listen(...)

// So I need to put the createServer opening before the callback body
// BUT only wrapping the actual callback part (not escapeHtml, setInterval, server.listen)

// The boundary: after }); closes createServer, the next function/statement is escapeHtml
var cbAfterClose = callbackBody.indexOf('});');
var afterCloseCb = callbackBody.substring(cbAfterClose + 3);
console.log('\nAfter close:', afterCloseCb.substring(0, 100));

// So the structure is:
// moduleCode + cleanServeHTML + 
// "const server = http.createServer((req, res) => {\n" + 
// callbackBodyBeforeClose + "});\n\n" +
// afterCloseCb

var cbBeforeClose = callbackBody.substring(0, cbAfterClose + 3); // includes '});'
var afterCallback = afterCloseCb.replace(/^\n+/, ''); // trim leading newlines

var final = '';
final += moduleCode;
final += cleanServeHTML;

// Remove the leading newlines in cbBeforeClose
final += 'const server = http.createServer((req, res) => {\n';

// KTG handler needs to be added since it's missing from callbackBody!
// (the original had KTG handler AFTER serveHTML, but our broken file has it in lines 1-34)
// Extract from lines 1-34
var ktgFromFragment = lines.slice(0, 34).join('\n');
// Find the actual KTG route handler (not the API upload handler)
var ktgRouteStart = ktgFromFragment.indexOf("req.url.startsWith('/kiem-tra-gia')");
if (ktgRouteStart >= 0) {
  var ktgRoute = ktgFromFragment.substring(ktgRouteStart);
  var ktgRouteEnd = ktgRoute.indexOf('if (req.url.startsWith') + 1; // find next if or end
  if (ktgRouteEnd <= 1) ktgRouteEnd = ktgRoute.indexOf('});') + 2;
  if (ktgRouteEnd <= 2) ktgRouteEnd = ktgRoute.length;
  final += ktgRoute.substring(0, ktgRouteEnd) + '\n\n';
  console.log('Added KTG handler from fragment');
}

// Now remove the '});' from cbBeforeClose since we're wrapping
// Actually, cbBeforeClose ends with '});' which closes createServer - this is correct
// But we need to make sure the callback body content is properly indented
final += cbBeforeClose + '\n\n';
final += afterCallback;

// Remove the closing wrapper from inside the callback body
// The callback body already has '});' at the end which would close createServer
// But now we opened createServer above, so keep it

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', final, 'utf-8');
console.log('\nWritten:', final.length, 'bytes');

var ob = (final.match(/\{/g) || []).length;
var cb = (final.match(/\}/g) || []).length;
console.log('Braces:', ob, '{ vs', cb, '} ->', ob === cb ? 'OK' : 'MISMATCH');

try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var msg = e.stdout || e.stderr || e.message || '';
  console.log(msg);
  // Show error line context
  var lm = msg.match(/line (\d+)/i);
  if (lm) {
    var n = parseInt(lm[1]);
    var fl = final.split('\n');
    for (var li = Math.max(0, n-5); li < Math.min(fl.length, n+3); li++) {
      console.log((li+1) + ': ' + fl[li]);
    }
  }
}

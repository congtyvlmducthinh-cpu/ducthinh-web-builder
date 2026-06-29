var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Remove header
var realStart = js.indexOf('const fs = require(\'fs\');');
if (realStart > 0) js = js.substring(realStart);

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');

// The problem: serveHTML function ends (try without catch), but the KTG API handler 
// code inside serveHTML already has its own try/catch (the parseBody().then().catch()),
// and the outer code has its own if/else structures.
// 
// Root cause: THE ENTIRE FILE is inside the createServer callback.
// serveHTML is a nested function definition. After it closes, we're back in
// the callback scope. The closing `}` of serveHTML might close the callback instead.

// Let me look at the broader context - count braces
var lines = js.split('\n');

// Find lines 265-280
for (var i = 264; i < Math.min(lines.length, 285); i++) {
  var clean = lines[i].trim();
  if (clean) {
    // Show brace context
    var opens = (clean.match(/\{/g) || []).length;
    var closes = (clean.match(/\}/g) || []).length;
    var net = opens - closes;
    if (net !== 0 || clean.length < 3 || clean.indexOf('}') >= 0) {
      console.log('L' + (i+1) + ' (' + (net > 0 ? '+' : '') + net + '): ' + clean);
    }
  }
}

// Let me also check the createServer callback
var createServerIdx = js.indexOf('const server = http.createServer');
console.log('\ncreateServer at char:', createServerIdx);

// The callback is: const server = http.createServer((req, res) => {
// So the opening { of the callback is right after the arrow function params
var callbackOpen = js.indexOf('{', createServerIdx);
console.log('Callback opens at char:', callbackOpen);

// The callback ends at the LAST } before server.listen
var listenIdx = js.indexOf('server.listen');
var beforeListen = js.substring(0, listenIdx);
var lastBrace = beforeListen.lastIndexOf('}');
console.log('Last brace before listen at char:', lastBrace);

// Show context around lastBrace
console.log('\nContext around last brace:');
var start = Math.max(0, lastBrace - 30);
console.log(js.substring(start, lastBrace + 50));

// Also check the line between these
console.log('\n\n=== Lines around syntax error (line 272) from actual file ===');
var actualFile = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8').split('\n');
for (var i = 267; i < Math.min(actualFile.length, 280); i++) {
  console.log((i+1) + ': ' + actualFile[i]);
}

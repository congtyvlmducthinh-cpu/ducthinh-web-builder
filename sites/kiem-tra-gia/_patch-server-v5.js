var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Fix 1: remove the inject block that's in wrong place (after writeHead, before res.end)
// The pattern is:
//   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//                 if (!err && data) {
//           var langMatch...}
//   res.end(data);

// Find the exact location
var writeHeadLine = "res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });";
var writeHeadIdx = js.indexOf(writeHeadLine);
if (writeHeadIdx >= 0) {
  // Find res.end(data) after it
  var endDataIdx = js.indexOf('res.end(data);', writeHeadIdx);
  
  // Extract everything between writeHead and res.end
  var middleSection = js.substring(writeHeadIdx + writeHeadLine.length, endDataIdx);
  
  // This middleSection has the bad inject (if (!err && data) { ... })
  if (middleSection.indexOf('if (!err && data)') >= 0) {
    // Remove it, leaving just \n\n between writeHead and res.end
    var newSection = '\n        ';
    js = js.substring(0, writeHeadIdx + writeHeadLine.length) + newSection + js.substring(endDataIdx);
    console.log('Removed bad inject block after writeHead');
  }
}

// Fix 2: Add proper inject block BEFORE writeHead
// Find the KTG handler's readFile callback
var readFileCall = "fs.readFile(filePath, 'utf-8', function(err, data) {";
var readFileIdx = js.indexOf(readFileCall);
if (readFileIdx >= 0) {
  // Find the writeHead in the same block
  var writeHeadInBlock = js.indexOf(writeHeadLine, readFileIdx);
  if (writeHeadInBlock >= 0) {
    var injectCode = "        if (!err && data) {\n          var langMatch = req.url.match(/\/(vi|en|zh)\\.html$/);\n          var lang = langMatch ? langMatch[1] : 'vi';\n          data = ktgInjector.inject(data, lang);\n        }\n        ";
    js = js.substring(0, writeHeadInBlock) + injectCode + js.substring(writeHeadInBlock);
    console.log('Added inject block before writeHead');
  }
}

// Fix 3: Check for duplicate ktgInjector require
var firstReq = js.indexOf('var ktgInjector = require');
var secondReq = js.indexOf('var ktgInjector = require', firstReq + 5);
if (secondReq >= 0) {
  // Find which one is inside the KTG handler
  var handlerIdx = js.indexOf("if (req.url.startsWith('/kiem-tra-gia'))");
  if (handlerIdx > firstReq && handlerIdx > secondReq) {
    // Both are before the handler, keep first one
    var blockEnd = js.indexOf('});', secondReq);
    js = js.substring(0, secondReq) + js.substring(blockEnd + 3);
    console.log('Removed duplicate require');
  }
}

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');

try {
  require('child_process').execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var errMsg = e.stdout || e.stderr || e.message;
  console.log(errMsg);
  
  // Show context around error line
  var lineMatch = errMsg.match(/line (\d+)/i);
  if (lineMatch) {
    var errLine = parseInt(lineMatch[1]);
    var lines = js.split('\n');
    for (var i = Math.max(0, errLine - 5); i < Math.min(lines.length, errLine + 3); i++) {
      console.log((i+1) + ': ' + lines[i]);
    }
  }
}

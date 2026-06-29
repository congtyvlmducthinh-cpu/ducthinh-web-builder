var fs = require('fs');

// Restore broken copy
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Check if there are duplicate imports
var http1 = js.indexOf('const http = require');
var http2 = js.indexOf('const http = require', http1 + 5);
console.log('http requires at:', http1, http2);

var fs1 = js.indexOf('const fs = require');
var fs2 = js.indexOf('const fs = require', fs1 + 5);
console.log('fs requires at:', fs1, fs2);

var path1 = js.indexOf('const path = require');
var path2 = js.indexOf('const path = require', path1 + 5);
console.log('path requires at:', path1, path2);

// If there are duplicates, the file was corrupted by patching
// Let me check if the ktgInjector require caused the issue
var ktgReq = js.indexOf('var ktgInjector = require');
var jsonReq = js.indexOf("var json = require('C:");  // if used
console.log('ktgInjector require at:', ktgReq);
console.log('Context:');
console.log(js.substring(ktgReq - 50, ktgReq + 100));

// Show the full content between the two http requires
if (http2 >= 0) {
  console.log('\n===== DUPLICATE SECTION (' + http1 + ' to ' + http2 + ') =====');
  console.log(js.substring(http1, http2 + 200));
}

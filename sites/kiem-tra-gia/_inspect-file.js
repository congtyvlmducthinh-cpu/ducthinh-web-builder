var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Show FULL structure - first 20 lines and all key lines
var lines = js.split('\n');
console.log("=== HEAD (lines 1-40) ===");
for (var i = 0; i < Math.min(lines.length, 40); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

console.log("\n\n=== BODY (serveHTML and around) ===");
for (var i = 0; i < lines.length; i++) {
  var l = lines[i].trim();
  if (l.indexOf('serveHTML') >= 0 || l.indexOf('createServer') >= 0 || 
      l.indexOf('/static') >= 0 || l.indexOf('404') >= 0 || l.indexOf('listen') >= 0 ||
      l.indexOf('Cleanup') >= 0 || l.indexOf('Other static') >= 0 ||
      l.indexOf('/kiem-tra-gia') >= 0 || l.indexOf('/api/ktg') >= 0) {
    console.log((i+1) + ': ' + l);
  }
}

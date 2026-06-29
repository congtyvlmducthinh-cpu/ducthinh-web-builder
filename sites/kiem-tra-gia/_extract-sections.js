var fs = require('fs');

// Read the broken server
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');

// The problem: serveHTML function body is broken because KTG handler code
// got mixed into it. I'll extract the parts BEFORE serveHTML and AFTER serveHTML's closing.
// Then build correct serveHTML in between.

// Part 1: Everything before 'function serveHTML'
var beforeServe = js.substring(0, js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {'));

// Part 2: Everything from the last closing brace of the KTG handler section onwards
// After serveHTML, the rest of the file should start with "// ─── HTTP API helper"
// But thanks to the bugs, the text "HTTP API helper" might use Unicode chars
// Let me find it differently - after serveHTML there's the KTG upload API endpoint
// then 'Not found' handler, then server.listen

// Actually, looking at the broken code output, after the KTG handler, the file has:
//   res.writeHead(404, ...);
//   res.end('Not found');
// });
// 
// // ──── Cleanup expired sessions
// function escapeHtml...
// 
// setInterval...
// 
// server.listen...

// Let me find the "Cleanup expired sessions" part - that is AFTER the KTG handler
var cleanupIdx = js.indexOf('// ─── Cleanup expired sessions every 5 min ────');
if (cleanupIdx < 0) cleanupIdx = js.indexOf('setInterval(() => {');
// Find the closing of the server.createServer callback before setInterval
var createServerEnd = js.lastIndexOf('});', cleanupIdx);
if (createServerEnd < 0) createServerEnd = cleanupIdx;

// Now find where the KTG handler STARTS (before serveHTML, inside the createServer callback)
// The KTG handler is after the CORS header and route get
var corsIdx = js.indexOf("res.setHeader('Access-Control-Allow-Origin', '*');");
var afterCors = js.substring(corsIdx);

// Now construct part2: from the end of createServer callback onwards
var part2 = js.substring(createServerEnd);

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/_server-part1.txt', beforeServe, 'utf-8');
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/_server-part2.txt', part2, 'utf-8');
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/_server-afterCors.txt', afterCors, 'utf-8');

console.log('beforeServe: ' + beforeServe.length + ' chars -> ends with: "' + beforeServe.substring(beforeServe.length - 30) + '"');
console.log('part2: ' + part2.length + ' chars -> starts with: "' + part2.substring(0, 50) + '"');
console.log('afterCors: ' + afterCors.length + ' chars');

// Now let's extract the ktgInjector require section (it was added correctly)
var reqStart = js.indexOf('var ktgInjector = require');
var reqEnd = js.indexOf('});', reqStart) + 3;
var ktgRequire = js.substring(reqStart, reqEnd);
console.log('\nktgInjector require:\n' + ktgRequire);

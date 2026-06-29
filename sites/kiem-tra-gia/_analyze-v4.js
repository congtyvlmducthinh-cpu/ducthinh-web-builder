var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Find serveHTML function
var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');

// Find ALL html.replace patterns in the function
var pattern1 = "html.replace('<body>'";
var pattern2 = "html.replace('</body>'";

var pos1 = js.indexOf(pattern1, funcStart);
var pos2 = js.indexOf(pattern2, funcStart);
var pos3 = js.indexOf(pattern2, pos2 + 10); // second replace('</body>')
var pos4 = js.indexOf(pattern1, pos3 + 10); // in else branch

console.log('Positions:');
console.log('replace(<body>):', pos1);
console.log('replace(</body>) #1:', pos2);
console.log('replace(</body>) #2:', pos3);
console.log('replace(<body>) #2:', pos4);

// Show what's after each
if (pos1 >= 0) console.log('\nAfter <body> replace:\n' + js.substring(pos1 + 20, pos1 + 100));
if (pos3 >= 0) console.log('\nAfter </body> #2:\n' + js.substring(pos3, pos3 + 300));

// The expected flow:
// if (requireAuth && !hasSession) {
//   html = html.replace('<body>', `...`);  // pos1
//   html = html.replace('</body>', `...`); // pos2
// } else {
//   html = html.replace('</body>', `...`); // pos3
// }
// res.writeHead(...)  // THIS IS MISSING
// res.end(html);
// } catch(e) {
//   ...
// }

// Find what's between pos3+some_reasonable_length and the KTG handler
// The KTG handler starts with: if (req.url.startsWith('/kiem-tra-gia'))
var ktgHandlerStart = js.indexOf("if (req.url.startsWith('/kiem-tra-gia'))");

console.log('\n=== Between pos3 and KTG handler ===');
var between = js.substring(pos3, ktgHandlerStart);
console.log(between.substring(0, 500));
console.log('...');
console.log(between.substring(between.length - 200));

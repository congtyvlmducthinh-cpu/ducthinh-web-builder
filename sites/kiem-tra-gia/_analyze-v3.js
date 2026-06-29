var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');

// Find the end of the LAST replace() call in the else branch
// The template ends with ... </body>`);
// After the closing `);` of the replace call, we should have:
//     }
//     res.writeHead(...)
//     res.end(html);
//   } catch(e) { ... }
// }

// Let me look further ahead
var elseReplace = js.lastIndexOf('html.replace(\'</body>\'', funcStart + 1000);
console.log('Last else replace at:', elseReplace);

// The full pattern is: html.replace('</body>', `...`);
// Find the closing `);` of this call
var closeIdx = js.indexOf('`);', elseReplace);
if (closeIdx < 0) closeIdx = js.indexOf(');', elseReplace + 50);

console.log('\nClose of replace at:', closeIdx);
console.log('\n=== Next 400 chars ===');
console.log(js.substring(closeIdx + 2, closeIdx + 402));

// The template string inside the else branch starts with '`' (backtick)
// So the call ends with '`);'
// Then:     }   (closing the if/else for requireAuth)
// Then serveHTML closing

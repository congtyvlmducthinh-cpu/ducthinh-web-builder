var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');

// Find both template strings
var loginReplace = js.indexOf('html.replace(\'<body>\'', funcStart);
console.log('Login replace at:', loginReplace);

var elseReplace = js.indexOf('html.replace(\'</body>\'', loginReplace + 100);
console.log('Else replace at:', elseReplace);

// Find end of else replace
var elseEnd = js.indexOf(');', elseReplace);
// The else replace might have another ); for the escape sequences
// Let me look for the actual closing of the replace call
// Pattern: html.replace('</body>', `...</body>`);
// The first ); closes replace()
var afterElse = js.substring(elseEnd);
var firstLines = afterElse.split('\n').slice(0, 10).join('\n');
console.log('\n=== After else replace ===');
console.log(firstLines);

// So after else replace, we expect:
//     }   (closes if/else block)
//     res.writeHead(...)
//     res.end(html);
//   } catch(e) {
//     ...
//   }
// }  (closes function)

// In broken file, instead we get KTG handler code

// Let me look more carefully at what's after elseEnd
console.log('\n=== Context (100 chars from elseEnd) ===');
console.log(js.substring(elseEnd, elseEnd + 100));

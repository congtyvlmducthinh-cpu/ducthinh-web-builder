var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');
var pos3 = 10844; // last html.replace('</body>')

// Find the actual end of this replace call. It ends with:
// `);\n    } else {\n      html =
// Wait, let me look at the last lines shown:
// `);\n    } else {\n      html =

// Actually, looking at the output from analyze-v4.js:
// After pos3: "html.replace('</body>', ` ... `);\n    } else {"

// Wait no. pos2 (8823) is the FIRST replace('</body>') in the auth branch.
// pos3 (10844) is the SECOND replace('</body>') in the else branch.
// After the else branch's replace call closes with `);`, there should be:
//     }
//     res.writeHead(...)
//     res.end(html);
//   } catch(e) { ... }
// }

// Let me look at what's AFTER the else replace `);`
// I need to find the end of the template literal `...`
// The template starts at pos3 + 24 (after html.replace('</body>', `)
// And ends with `) followed by ;

var afterPos3 = js.substring(pos3);
console.log('=== From pos3 onwards (first 600 chars) ===');
console.log(afterPos3.substring(0, 600));

// Find the closing backtick + );
var backtickEnd = afterPos3.indexOf('`);');
console.log('\n=== backtick end at: ' + backtickEnd + ' ===');
if (backtickEnd >= 0) {
  console.log('After backtick:');
  console.log(afterPos3.substring(backtickEnd, backtickEnd + 200));
}

// The backtick + ); at position ~350 should close the replace call
// After that we see:
//     } else {              (start of another if/else? No, this IS the else branch)
//       html =              (more html.replace?!)
// 
// This means the template string for the else branch isn't ACTUALLY
// the last replace. There's another call after it.
// Let me re-examine.

// The output shows after ~350 chars we see:
// </body>`);
//     } else {
//       html =

// So the template literal closed at ));  (closing ` and ); of replace call)
// But then } else { html = ? That doesn't make sense for the else branch.

// WAIT. Looking at the flow more carefully:
// The IF branch:
//   html = html.replace('<body>', `...`);    // pos1
//   html = html.replace('</body>', `...`);   // pos2
// The ELSE branch:
//   html = html.replace('</body>', `...`);   // pos3

// After the ELSE branch's replace call, we need:
//     }
//     res.writeHead(...)
//     res.end(html);
//   } catch(e) { ... }
// }

// But the } else { after pos3's replace shows there's MORE replace code.
// That means the `}` closing the if/else block is missing.

// I need to look further ahead to find where the try block ACTUALLY ends
// (or is supposed to end), vs where the KTG handler code begins.

// Let me look at ALL content between funcStart and the 404 handler
var notFoundStart = js.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })");
console.log('\n\n=== 404 handler at ' + notFoundStart + ' ===');
console.log('-------------------');

// What's the function content?
var funcContent = js.substring(funcStart, notFoundStart);
console.log('Function+content length: ' + funcContent.length);

// Let me search for key markers within this content
var catchArr = [];
var idx = funcContent.indexOf('catch');
while (idx >= 0) {
  catchArr.push(idx + funcStart);
  idx = funcContent.indexOf('catch', idx + 1);
}
console.log('Found catches at: ' + JSON.stringify(catchArr));
console.log('---');
for (var i = 0; i < catchArr.length; i++) {
  console.log('catch ' + i + ' at ' + catchArr[i] + ': "' + js.substring(catchArr[i], catchArr[i] + 50) + '"');
}

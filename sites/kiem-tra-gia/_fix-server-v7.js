var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Remove duplicate header
var realStart = js.indexOf('const fs = require(\'fs\');');
if (realStart > 0) {
  js = js.substring(realStart);
  console.log('Removed header: ' + realStart + ' chars');
}

// Find serveHTML function
var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');
console.log('serveHTML at char:', funcStart);

// Find the else template close: `);\n    }\n\n    res.writeHead(200, ...)  
// But this writeHead is actually the KTG handler's, not serveHTML's.

// Let me find the TWO template strings in serveHTML
// Body replace (auth branch): html.replace('<body>', `...`);
var pBody = js.indexOf('html.replace(\'<body>\'', funcStart);
var tBodyEnd = js.indexOf('`);', js.indexOf('`', pBody + 24));
console.log('Body template end:', tBodyEnd);

// Script replace #1 (auth branch): html.replace('</body>', `...`);
var pScript1 = js.indexOf('html.replace(\'</body>\'', pBody + 5);
var tScript1End = js.indexOf('`);', js.indexOf('`', pScript1 + 27));
console.log('Script1 template end:', tScript1End);

// Script replace #2 (else branch): html.replace('</body>', `...`);
var pScript2 = js.indexOf('html.replace(\'</body>\'', pScript1 + 5);
var tScript2Start = js.indexOf('`', pScript2 + 27);
var tScript2End = js.indexOf('`);', tScript2Start);
console.log('Script2 open at:', pScript2);
console.log('Script2 end:', tScript2End);

// The code after tScript2End should be:
//     }  (close if/else)
//     res.writeHead(...)
//     res.end(html);
//   } catch(e) {
//   }
// }

// But instead there's KTG handler code.
// Let me find the NEXT `}` which closes the if/else (NOT the function)
var afterScript2 = js.substring(tScript2End);
console.log('\n=== After script2 (' + tScript2End + ') ===');
console.log(afterScript2.substring(0, 300));

// I see: `);\n    }\n\n    res.writeHead(200, ...) ...        res.end(data);\n      });\n    } else {\n      serveStatic...
// The template string itself has `);\n    }\n\n    res.writeHead...
// Wait, that means the `);` at tScript2End is only the end of the template content string.
// The replace() call needs ANOTHER `);` to close it.

// Let me find: the template literal `...` inside the replace() call
// html.replace('</body>', `template content...`);
// The ` opens the literal, and `) closes the replace() call

// At tScript2Start we have ` (first backtick of template)
// At tScript2End we have `); (backtick + close paren + semicolon)
// Wait no, tScript2End is at `);  but  `); has two characters
// tScript2End = js.indexOf('`);', tScript2Start);
// So tScript2End is the position of the '`' character
// After script2: chars at tScript2End+0 = '`', tScript2End+1 = ')', tScript2End+2 = ';'

var afterClose = tScript2End + 3; // after `);
console.log('\nAfter replace close (');
console.log(js.substring(afterClose, afterClose + 200));

// Hmm the template literal INSIDE the replace() call might have many backtick-quotes.
// Let me check the template content

var templateContent = js.substring(tScript2Start, tScript2End);
console.log('\nTemplate content end (last 200 chars):');
console.log(templateContent.substring(templateContent.length - 200));

// The template ends with: ...</script>\n</body>
// Then the template literal close: `)
// Then: ;
// Then: \n    }

// So afterClose should have: \n    }
// Let's look
console.log('\n=== chars around afterClose ===');
console.log('Positions: ' + (afterClose-5) + ' to ' + (afterClose+100));
console.log('Chars: "' + js.substring(afterClose-5, afterClose+100) + '"');

// From the template content end, I can see:
// </body>`);
//     }
//
//     res.writeHead(200, { ... });

// So afterClose = after `);
// Next: \n    }  <- this closes the if/else for requireAuth
// Then: res.writeHead(200) ... res.end(data) }); } else serveStatic - THIS IS KTG handler code

// So I need to:
// 1. After the } that closes if/else, insert proper serveHTML closing
// 2. Skip the broken KTG handler code
// 3. Continue from "Other static sites"

// The } that closes if/else is RIGHT after afterClose
// Let me find the exact } position
var closeBrace = js.indexOf('}', afterClose);
console.log('\nClose brace at:', closeBrace);
console.log('Context: "' + js.substring(closeBrace-5, closeBrace+100) + '"');

// Good, that's the } closing the if/else.

// Now find what comes after. The broken KTG handler continues from after the } 
// until "Other static sites"
var otherStatic = js.indexOf("}  // Other static sites (no CSS injection)");
if (otherStatic < 0) otherStatic = js.indexOf("}  // Other static sites");
console.log('\nOther static sites at:', otherStatic);

// What's between closeBrace and otherStatic?
var brokenSection = js.substring(closeBrace, otherStatic);
console.log('\nBroken section (' + brokenSection.length + ' chars):');
console.log(brokenSection.substring(0, 200));

// The broken code is the KTG handler's mixed content.
// I need to:
// 1. Close the if/else with a }
// 2. Close the try with: res.writeHead(200...), res.end(html), } catch(e) { ... }, }
// 3. Close the function: }

// Then add: KTG API handler + continue from otherStatic

var serveHTMLclosing = `\n    }\n    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });\n    res.end(html);\n  } catch(e) {\n    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });\n    res.end('Error: ' + e.message);\n  }\n}\n`;

// AfterScript2 already has `);\n    }\n` so I just need to add the rest
// afterClose = position after `);\n
// Then: \n    }  (closes if/else)

// Find the position of the } that closes if/else - it's right after afterClose
// Actually let me look more carefully at what afterClose contains
var excerpt = js.substring(afterClose, afterClose + 5);
console.log('\nExcerpt at afterClose: "' + excerpt + '"');

// If excerpt starts with '\n    }' then the } is at position afterClose+5 or so
var actualClose = afterClose;
while (js[actualClose] === '\n' || js[actualClose] === '\r' || js[actualClose] === ' ') actualClose++;
console.log('First non-whitespace char at ' + actualClose + ': "' + js[actualClose] + '"');

// So we have: `);\n    }\n\n<form KTG handler code>
// The } at actualClose closes the if/else
// I need to rebuild from: ... `);\n    }\n  (close if/else)
// Then add:     res.writeHead(...)
//           } catch(e) { }
//           }

// Then add KTG API handler
// Then keep everything from otherStatic onwards

// Build the final file
var part1 = js.substring(0, afterClose); // includes `); 
// The `); is the end of the replace call.
// Next character is \n
var nextChar = js[afterClose];
console.log('\nChar at afterClose: "' + nextChar + '" (code: ' + nextChar.charCodeAt(0) + ')');

// After the replace `); we have \n    \n    }  -> the } is the if/else close
// Then the broken KTG handler code
// Then otherStatic section

// So I need:
// Keep: everything from start to the } that closes if/else (which is after afterClose)
// Then add: serveHTML catch/func close
// Then add: KTG API handler
// Then add: everything from otherStatic onwards
var part1End = actualClose + 1; // include the }

var part1 = js.substring(0, part1End);
var part2 = js.substring(otherStatic);

var serveHTMLClose = `
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch(e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error: ' + e.message);
  }
}
`;

// Also need to add the KTG API handler:
// But the KTG API handler in pre-serveHTML has TWO versions.
// Let me extract the clean version

// Find clean KTG API handler from the pre-serveHTML section
// The pre-serveHTML section is between createServer callback start and funcStart
var createServerIdx = js.indexOf('const server = http.createServer');
var callbackBodyStart = js.indexOf('{', createServerIdx) + 1;
var preContent = js.substring(callbackBodyStart, funcStart);

// Find the SECOND API handler (the clean one with comments)
var apiHandlerIdx1 = preContent.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST') {");
var apiHandlerIdx2 = preContent.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST') {", apiHandlerIdx1 + 10);

// The second handler starts at apiHandlerIdx2 in preContent
// But we removed the header... the API handlers in preContent are from the duplicate header
// They're already included in the callback body, not in the import section.

// Actually, looking at the broken file again: the createServer callback body
// includes ALL code (imports, handlers, everything). The API handler is already
// in the "pre-serveHTML" section which is in the callback body.

// So the API handler already exists in part1 (before serveHTML function definition).
// We don't need to add it again. We just need to close serveHTML properly.

var final = part1 + serveHTMLClose + '\n' + part2;

console.log('\nFinal file: ' + final.length + ' chars');

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', final, 'utf-8');

// Syntax check
try {
  var cp = require('child_process');
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000, stdio: ['pipe', 'pipe', 'pipe'] });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var err = e.stdout || e.stderr || e.message;
  if (typeof err === 'string') console.log(err);
}

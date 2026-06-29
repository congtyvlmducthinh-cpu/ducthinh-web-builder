var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// ===== APPROACH: Direct string surgery =====
// The broken server.js has serveHTML function with its try/catch broken.
// The } catch(e) { section was removed when KTG handler was patched in.
// Fix: split the file at the right point, insert proper catch, then rejoin.

// Find serveHTML function
var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');
var tryStart = js.indexOf('try {', funcStart);

// After the try block, the template strings end. The last else branch closes with:
// html = html.replace('</body>', '</body>\n<script>\n...\n</script>\n</body>');
//     }
// Then in the ORIGINAL: res.writeHead(...); res.end(html);
// Then: } catch(e) { ... }
// Then: }
// Then: // ─── HTTP API helper

// In the BROKEN file, after the template strings close, we have:
//     res.writeHead(200, { ... }); (KTG handler's writeHead)
//         res.end(data); (KTG handler's end)
//       }); (KTG handler's callback close)
//     } else {
//       serveStatic(req.url, res);
//     }
//     return;
//   }  // Other static sites (no CSS injection)
//   if (req.url.startsWith('/sites/') ...)

// So the KTG handler code is BETWEEN the template strings and the HTTP API helper.
// Strategy: 
// 1. Find the FIRST appearance of the KTG handler's writeHead (after template string ends)
// 2. Also find the NEXT serveHTML's res.writeHead (original, correct one)
// 3. The original writeHead line is: res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
// But this is ALSO the KTG handler's writeHead! 

// Let me find the boundary differently:
// serveHTML's else template ends with: </body>`);
//                                     }
//                                     res.writeHead(200, ...)
//                                     res.end(html);
//                                   } catch(e) 
// etc.

// In broken file, after else template close, there's KTG handler code.

// Let me find the WRONG writeHead (the KTG one) vs the RIGHT one (serveHTML)
// The KTG handler writeHead is INSIDE a readFile callback: function(err, data) {
// The serveHTML writeHead is at the top level of the try block.

// Let me just find the readFile callback pattern
var readFileStart = js.indexOf('fs.readFile(filePath,', funcStart);
console.log('readFile at:', readFileStart);

// Before readFile, there's the else template, then:
//     }
// Then the KTG handler starts
// I need to find where serveHTML's else block ends
var elseTemplateEnd = js.lastIndexOf('</body>\');', readFileStart);
if (elseTemplateEnd < 0) {
  // Try with single quotes around </body>
  // The original uses backtick strings
  elseTemplateEnd = js.lastIndexOf('</body>`);', readFileStart);
}
console.log('else template end at:', elseTemplateEnd);

var afterTemplate = js.substring(elseTemplateEnd);
var templateRest = afterTemplate.substring(0, 200);
console.log('After template end (first 200 chars):');
console.log(templateRest);

// After the template end, I need to find the closing `);` of the replace() call
// The pattern: html = html.replace('</body>', '...</body>`);
// Then:     }
// Then KTG handler code

// Actually, let me look at it differently. Find AFTER the else template:
// After `</body>`); there's `    }` which closes the `if` for requireAuth
// Then serveHTML should have: res.writeHead, res.end, } catch, } (close function)

// I'll just find the LAST `    }` before readFile and replace from there
var lastIfClose = js.lastIndexOf('    }', readFileStart);
console.log('\nLast } before readFile at:', lastIfClose);
console.log('Context:', js.substring(lastIfClose - 5, lastIfClose + 100));

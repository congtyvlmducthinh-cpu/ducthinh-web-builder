var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// ===== SURGERY POINTS =====
var pos3 = 10844; // else branch: html.replace('</body>', ...)

// Find where the replace call template ends: `);\n    }
var backtickEnd = js.indexOf('`);', pos3);
// The ) after the backtick closes the replace() call
// Then \n    } closes the if/else block

// After that, the code has:
//     res.writeHead(200, ...)      (KTG handler, broken)  
//         res.end(data);            (KTG handler, broken)
//       });
//     } else {
//       serveStatic(...)
//     }
//     return;
//   }  // Other static sites (no CSS injection)

// I need to find:
// 1. The exact end of serveHTML's } (after else template replacement)
// 2. The start of the KTG handler code
// 3. The end of the KTG handler section

// Find the exact position right after the `);\n    }\n\n`
var afterElseClose = backtickEnd + 2; // after `);
console.log('Position after backtick+);:', afterElseClose);

// Skip whitespace/newlines
var afterElseContent = js.substring(afterElseClose);
console.log('\n=== AFTER ELSE CLOSE (first 300 chars) ===');
console.log(afterElseContent.substring(0, 300));

// I can see: after `);\n    }\n\n    res.writeHead(200, ...)`
// Then: res.end(data);  <- this is the KTG readFile callback's end line
// That means the mixed code is:
//     res.writeHead(200, { 'Content-Type': ... });
//         res.end(data);
//       });
//     } else {
//       serveStatic(req.url, res);
//     }
//     return;
//   }  // Other static sites

// Let me find "  return;\n  }  // Other static sites"
var endOfKTG = js.indexOf('  return;\n  }  // Other static sites', afterElseClose);
if (endOfKTG < 0) {
  endOfKTG = js.indexOf('  return;\n  }', afterElseClose);
  // Find the next meaningful section after
  console.log('\nFound endOfKTG at:', endOfKTG);
  console.log(js.substring(endOfKTG, endOfKTG + 200));
}
var endOfKTGSection = endOfKTG + '  return;\n  }'.length;

console.log('\n=== END OF KTG SECTION ===');
console.log(js.substring(endOfKTGSection, endOfKTGSection + 200));

// Now I need to:
// 1. Replace everything from afterElseClose to endOfKTGSection 
//    with the proper serveHTML closing
// 2. Then add clean KTG handler code

// Also need to find the KTG handler code between the broken sections
// It starts with:
//   if (req.url.startsWith('/kiem-tra-gia')) {
// And should be moved AFTER the serveHTML function

// Let me find the KTG handler start - it's BEFORE the broken section
// Actually, looking at analyze-v4 output, the KTG handler is NOT in the broken section.
// The server.createServer callback has:
// 1. Some code
// 2. if (req.url.startsWith('/kiem-tra-gia')) { ... }  // KTG handler
// 3. serveHTML function (inside!)
// 4. KTG API upload handler (inside serveHTML!)
// 5. // Other static sites (inside serveHTML!)
// etc.

// Hmm, actually the serveHTML function might have been DEFINED AFTER the KTG handler
// and the KTG API handler got inserted INSIDE serveHTML's try block.

// Let me look at the broader structure
var createServerStart = js.indexOf("const server = http.createServer");
console.log('\n\n=== Wider context ===');

// Find serveHTML definition
console.log('\nserveHTML definition at:', funcStart);

// Find the KTG handler (it should be at the top level of createServer callback)
var ktgHandler = js.indexOf("if (req.url.startsWith('/kiem-tra-gia'))");
console.log('KTG handler at:', ktgHandler);

// Is the KTG handler BEFORE or AFTER serveHTML?
console.log('KTG handler position relative to serveHTML:', 
  ktgHandler < funcStart ? 'BEFORE' : 'AFTER');

// Also find the KTG API handler
var ktgAPI = js.indexOf("/api/ktg-data");
console.log('KTG API at:', ktgAPI);

// The file structure seems to be:
// const server = http.createServer((req, res) => {
//   ... CORS, routing ...
//   if (req.url.startsWith('/kiem-tra-gia')) {  // KTG handler
//     ... 
//   }  // Other static sites
//
//   // serveHTML function is DEFINIED INSIDE the createServer callback!
//   function serveHTML(res, htmlPath, requireAuth, hasSession) {
//     try {
//       ...
//     } // BUG: try without catch
//     // KTG API handler got inserted here
//     ...
//   }
//   
//   // KTG API handler originally should be HERE
//   // 404 handler
// });

// So the fix strategy is:
// 1. Extract the KTG API handler code from inside serveHTML's try block
// 2. Move it to the right position (after serveHTML function definition)
// 3. Close serveHTML's try/catch properly

// Let me find the full KTG handler section first
var ktgHandlerEnd = js.indexOf("  }  // Other static sites (no CSS injection)", ktgHandler);
console.log('\nKTG handler section: ' + ktgHandler + ' to ' + ktgHandlerEnd);
console.log('KTG handler content (first 200):');
console.log(js.substring(ktgHandler, ktgHandler + 200));
console.log('\n...');
console.log('KTG handler content (last 200):');
console.log(js.substring(ktgHandlerEnd - 200, ktgHandlerEnd));

// Also find the KTG API handler that's mixed inside serveHTML
var ktgAPIStart = js.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");
console.log('\nKTG API start at:', ktgAPIStart);
console.log('Is inside serveHTML?', ktgAPIStart > funcStart && ktgAPIStart < endOfKTGSection);

// Find where this API handler ends (the next if/res.writeHead for 404)
var apiHandlerEnd = js.indexOf("if (!req.url.startsWith('/api/doccheck')", ktgAPIStart);
if (apiHandlerEnd < 0) apiHandlerEnd = js.indexOf("res.writeHead(404,", ktgAPIStart);
console.log('API handler ends before:', apiHandlerEnd);
console.log('API content (first 300):');
console.log(js.substring(ktgAPIStart, ktgAPIStart + 300));
console.log('\nAPI content (last 200):');
console.log(js.substring(apiHandlerEnd - 200, apiHandlerEnd));

var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// ===== FIX 1: Remove duplicated header (lines 1-35) =====
// The actual file starts at line 36 with "const fs = require('fs');"
var realStart = js.indexOf('const fs = require(\'fs\');');
if (realStart > 0) {
  js = js.substring(realStart);
  console.log('Removed duplicate header (' + realStart + ' chars)');
}

// ===== FIX 2: Fix serveHTML function =====
// serveHTML's else template closes with `);\n    }
// Then immediately KTG handler code starts instead of res.writeHead + catch

// Find serveHTML
var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');
console.log('serveHTML at char:', funcStart);

// Extract the 3 template strings
// 1. Body replace in auth branch
var pBody = js.indexOf('html.replace(\'<body>\'', funcStart);
var tBodyStart = js.indexOf('`', pBody + 24);
var tBodyEnd = js.indexOf('`);', tBodyStart) + 2;
var bodyTemplate = js.substring(pBody, tBodyEnd);
console.log('Body template: ' + bodyTemplate.length + ' chars');

// 2. Script replace in auth branch (first replace')
var pScript1 = js.indexOf('html.replace(\'</body>\'', pBody + 5);
var tScript1Start = js.indexOf('`', pScript1 + 27);
var tScript1End = js.indexOf('`);', tScript1Start) + 2;
var script1Template = js.substring(pScript1, tScript1End);
console.log('Script1 template: ' + script1Template.length + ' chars');

// 3. Script replace in else branch
var pScript2 = js.indexOf('html.replace(\'</body>\'', pScript1 + 5);
var tScript2Start = js.indexOf('`', pScript2 + 27);
var tScript2End = js.indexOf('`);', tScript2Start) + 2;
var script2Template = js.substring(pScript2, tScript2End);
console.log('Script2 template: ' + script2Template.length + ' chars');

// Find where the serveHTML function end SHOULD be - the end of its try block
// After the else template, the broken code has KTG handler. We need:
// After script2Template = `);\n    }
// Then:     res.writeHead(...)
// Then:   } catch(e) { ... }
// Then: }

// Find position right after script2Template
var afterElse = tScript2End;
console.log('\nAfter else template (first 150 chars):');
console.log(js.substring(afterElse, afterElse + 150));

// Now find the KTG API handler (the SECOND one) that's mixed in
// The first is at the top, the second is inside serveHTML
// Let me find both
var apiStart1 = js.indexOf("if (req.url === '/api/ktg-data'", funcStart);
var apiStart2 = js.indexOf("if (req.url === '/api/ktg-data'", apiStart1 + 10);
console.log('\nAPI handlers in serveHTML context:', apiStart1, apiStart2);

// Find where the KTG handler section starts (the ORIGINAL handler)
var ktgStart = js.indexOf("if (req.url.startsWith('/kiem-tra-gia'))", funcStart);
console.log('KTG handler (original) at:', ktgStart);

// Now I need to rebuild:
// 1. From start to serveHTML's template end (afterElse)
// 2. Insert proper serveHTML closing
// 3. Insert KTG API upload handler
// 4. Keep everything from "Other static sites" onwards

// But wait - ALL the API handler code inside serveHTML is corrupt/mixed.
// The correct code flow should be:
// serveHTML function closes
// Then (at the top level of createServer callback): KTG API upload handler
// Then: Other static sites section

// Find "Other static sites" 
var otherStaticStart = js.indexOf("}  // Other static sites (no CSS injection)");
if (otherStaticStart < 0) otherStaticStart = js.indexOf("}  // Other static sites");
console.log('Other static sites at:', otherStaticStart);

// Part A: everything from realStart to afterElse (end of serveHTML template)
var partA = js.substring(0, afterElse);

// Part B: serveHTML closing
var serveHTMLClose = `
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch(e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error: ' + e.message);
  }
}
`;

// Part C: KTG API upload handler + other static sites section
// Extract the working API handler from the top of the file
// The original API handler at the top is already CORRECT (lines 1-18)
// But we removed it by cutting the duplicate header.
// Let me extract it from the original .broken file instead
var origBroken = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');
var origApiStart = origBroken.indexOf("if (req.url === '/api/ktg-data' && req.method === 'POST')");
var origApiEnd = origBroken.indexOf("if (!req.url.startsWith('/api/doccheck')", origApiStart);
if (origApiEnd < 0) {
  origApiEnd = origBroken.indexOf("if (req.url.startsWith('/sites/'", origApiStart);
}
if (origApiEnd < 0) {
  // Try to find the end by looking at the context
  console.log('\nSearching for API handler end...');
  // The third API handler (in the proper location) would be at line 435
  // Let me find it
}

// The API handler from the original (top of file) is:
console.log('\nOriginal API handler:');
var apiHandlerCode = origBroken.substring(origApiStart, origApiEnd).trim();

// But wait - the "Other static sites" section includes the API handler at line 435
// check if there are THREE API handlers total (lines 3, 20, 435)
// We removed lines 1-35 so there are only lines at 435 left
// We need to ensure there's exactly one handler in the right place

// Let me find where the 404 handler is that belongs to the createServer callback
// And where the cleanup section is
var cleanupIdx = js.indexOf('Cleanup expired');
var listenIdx = js.indexOf('server.listen');

// The cleanest approach: rebuild the file structure manually

// Find the end of the createServer callback
// The callback body starts after 'const server = http.createServer((req, res) => {'
var createServerIdx = js.indexOf('const server = http.createServer');
var callbackStart = js.indexOf('{', createServerIdx);
console.log('\ncreateServer at char:', createServerIdx);
console.log('callback body start:', callbackStart + 1);

// Everything from callbackStart+1 to our end is the callback body
// The callback body should contain:
// - CORS
// - KTG handler
// - serveHTML function def  
// - KTG API handler
// - Other static sites
// - doccheck API endpoints
// - 404 handler

// Let me rebuild from scratch using the original broken file
var broken = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');

// Extract core parts from the broken file:
// 1. Everything before serveHTML (imports, globals, parseBody, session, createServer start)
// 2. Clean serveHTML
// 3. Everything after serveHTML's proper closing

// Strategy: Find what's inside the ORIGINAL createServer callback body
// Remove everything from serveHTML through the end of its broken structure
// Insert clean serveHTML + API handler

// Extract the createServer callback start
var csIdx = broken.indexOf('const server = http.createServer');
var csBodyStart = broken.indexOf('{', csIdx);

// Extract everything before serveHTML inside the callback
var svhDefStart = broken.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');

// Everything from csBodyStart to svhDefStart
var preServeHTML = broken.substring(csBodyStart + 1, svhDefStart);
console.log('\n\n=== Pre-serveHTML content in callback ===');
console.log('(' + preServeHTML.length + ' chars)');
var preLines = preServeHTML.split('\n');
for (var i = 0; i < preLines.length; i++) {
  console.log('  pre:' + preLines[i].substring(0, 100));
}

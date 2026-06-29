var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// The serveHTML function has an orphaned `try {` that never closes.
// The KTG handler code was inserted inside it.
// Fix: close the try with catch/finally at the boundary between serveHTML content and KTG handler.

// Step 1: Find serveHTML function and try block
var funcStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');
var tryStart = js.indexOf('try {', funcStart);
console.log('serveHTML at char:', funcStart);
console.log('try at char:', tryStart);

// Step 2: Find the template strings end
// The last template string in serveHTML's else branch is:
// html = html.replace('</body>', '</body>\n<script>\n...\n</script>\n</body>');
// After that, in the original: res.writeHead(...); res.end(html); } catch(e) { ... } }
// But in the broken file: this is replaced by KTG handler code

// Find the end of the second (else) template string
var templateEnd = js.lastIndexOf('</body>\');', tryStart);
if (templateEnd < 0) templateEnd = js.lastIndexOf("</body>\\');", tryStart);
console.log('Template end at char:', templateEnd);

// After the template end, the original had:
//     }
//     res.writeHead(...)
//     res.end(html);
//   } catch(e) {
//     ...
//   }
// }
// But current file has KTG handler

// Step 3: Let's find where the KTG handler starts after the template
// The first KTG handler code after template
var ktgStart = js.indexOf("if (req.url.startsWith('/kiem-tra-gia'))", templateEnd);
console.log('KTG handler starts at:', ktgStart);

// The code between templateEnd and ktgStart
var between = js.substring(templateEnd, ktgStart);
console.log('Between template and KTG:');
console.log(between.substring(0, 300));

// I need to remove everything between templateEnd and the start of the KTG handler,
// then insert the proper catch/close for serveHTML.

// The boundary text after template close is:
//     }\n\n    res.writeHead(200, { ... });\n        res.end(data);\n      });\n    } else ...
// But this is KTG handler code, not serveHTML closing.

// Strategy: replace the entire broken section with:
// 1. Close the try/catch properly
// 2. Add the KTG handler back (standalone)

// Let me find the full extent of the KTG handler mixed into serveHTML
// It goes until: "}  // Other static sites (no CSS injection)"
var ktgEnd = js.indexOf("}  // Other static sites (no CSS injection)", ktgStart);
if (ktgEnd < 0) ktgEnd = js.indexOf("// Other static sites (no CSS injection)", ktgStart);
console.log('KTG end at:', ktgEnd);

// Extract the KTG handler code that's mixed in
var mixedCode = js.substring(templateEnd, ktgEnd);
console.log('\nMixed code (first 100 chars):');
console.log(mixedCode.substring(0, 100));
console.log('\nMixed code (last 100 chars):');
console.log(mixedCode.substring(mixedCode.length - 100));

// Now fix: 
// (A) Replace mixedCode with proper serveHTML catch closure
// (B) Then add proper KTG handler + API endpoint after serveHTML

var serveHTMLclosing = `
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch(e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error: ' + e.message);
  }
}

`;

// Fix: remove mixedCode and insert serveHTML closing + KTG handler code
var fixed = js.substring(0, templateEnd) + serveHTMLclosing;

// Now add the KTG handler (extracted from broken section)
// The KTG handler in the broken section goes from ktgStart to ktgEnd
var ktgHandlerCode = js.substring(ktgStart, ktgEnd);

// The KTG handler might have a trailing `return;` statement
// Let's clean it up by removing the `}  // Other static sites` comment
var lastReturn = ktgHandlerCode.lastIndexOf('return;');
if (lastReturn < 0) lastReturn = ktgHandlerCode.length;

// Add the KTG handler code with proper indentation
fixed += '\n  // ─── Static sites (serve locally, no proxy) ───────────────────────────\n';
fixed += ktgHandlerCode.substring(0, lastReturn + 7);  // include 'return;'
fixed += '\n  }\n';

// Check if the KTG handler already has inject call
if (fixed.indexOf('ktgInjector.inject') < 0) {
  // Add inject call into KTG handler
  var readFileEnd = fixed.indexOf('res.end(data);');
  if (readFileEnd >= 0) {
    var injectBlock = '\n        if (!err && data) {\n          var langMatch = req.url.match(/\/(vi|en|zh)\.html$/);\n          var lang = langMatch ? langMatch[1] : \'vi\';\n          data = ktgInjector.inject(data, lang);\n        }';
    fixed = fixed.substring(0, readFileEnd) + injectBlock + '\n        ' + fixed.substring(readFileEnd);
    console.log('Added inject call');
  }
}

// Continue with everything after ktgEnd
fixed += js.substring(ktgEnd);

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fixed, 'utf-8');
console.log('\nServer.js fixed. New size:', fixed.length);

// Syntax check
try {
  require('child_process').execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var err = e.stdout || e.stderr || e.message;
  console.log(err);
  
  // Show error context
  var lineMatch = err.match(/line (\d+)/i);
  if (lineMatch) {
    var n = parseInt(lineMatch[1]);
    var lines = fixed.split('\n');
    for (var i = Math.max(0, n-6); i < Math.min(lines.length, n+3); i++) {
      console.log((i+1) + ': ' + lines[i]);
    }
  }
}

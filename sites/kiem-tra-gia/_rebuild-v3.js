var fs = require('fs');

// Restore from broken
fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8'), 'utf-8');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Find module code
var httpIdx = js.indexOf('const http = require(\'http\');');
console.log('http at:', httpIdx);

var serveHTMLFunc = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession)');
console.log('serveHTML at:', serveHTMLFunc);

// Module-level code
var moduleCode = js.substring(httpIdx, serveHTMLFunc);

// serveHTML templates
var content = js.substring(serveHTMLFunc);

var pBody = content.indexOf("html.replace('<body>'");
var tBodyStart = content.indexOf('`', pBody + 24);
var tBodyEnd = content.indexOf('`);', tBodyStart) + 2;
var bodyTemp = content.substring(pBody, tBodyEnd);

var pS1 = content.indexOf("html.replace('</body>'", tBodyEnd);
var tS1Start = content.indexOf('`', pS1 + 27);
var tS1End = content.indexOf('`);', tS1Start) + 2;
var s1Temp = content.substring(pS1, tS1End);

var pS2 = content.indexOf("html.replace('</body>'", tS1End);
var tS2Start = content.indexOf('`', pS2 + 27);
var tS2End = content.indexOf('`);', tS2Start) + 2;
var s2Temp = content.substring(pS2, tS2End);

console.log('Templates: ' + bodyTemp.length + ', ' + s1Temp.length + ', ' + s2Temp.length);

// Remaining code after serveHTML
var otherStaticIdx = js.indexOf('}  // Other static sites (no CSS injection)');
if (otherStaticIdx < 0) otherStaticIdx = js.indexOf('}  // Other static sites');
console.log('Other static at:', otherStaticIdx);

var post = js.substring(otherStaticIdx);
var nl = post.indexOf('\n');
post = post.substring(nl + 1);

// BUILD OUTPUT
var out = '';

// Module level
out += moduleCode + '\n';

// serveHTML function
out += 'function serveHTML(res, htmlPath, requireAuth, hasSession) {\n';
out += '  try {\n';
out += '    let html = fs.readFileSync(htmlPath, \'utf-8\');\n\n';
out += '    if (requireAuth && !hasSession) {\n';
out += '      ' + bodyTemp.trim() + '\n';
out += '      ' + s1Temp.trim() + '\n';
out += '    } else {\n';
out += '      ' + s2Temp.trim() + '\n';
out += '    }\n\n';
out += '    res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n';
out += '    res.end(html);\n';
out += '  } catch(e) {\n';
out += '    res.writeHead(500, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n';
out += '    res.end(\'Error: \' + e.message);\n';
out += '  }\n';
out += '}\n\n';

// createServer callback
out += 'const server = http.createServer((req, res) => {\n';
out += '  res.setHeader(\'Access-Control-Allow-Origin\', \'*\');\n';
out += '  res.setHeader(\'Access-Control-Allow-Methods\', \'GET, POST, OPTIONS\');\n';
out += '  res.setHeader(\'Access-Control-Allow-Headers\', \'Content-Type, Authorization, Cookie\');\n\n';

// KTG handler
var ktgH = post.indexOf('if (req.url.startsWith(\'/kiem-tra-gia\')');
if (ktgH >= 0) {
  var ktgEnd = post.indexOf('}', post.indexOf('return;', ktgH));
  out += post.substring(ktgH, ktgEnd + 1) + '\n\n';
  console.log('KTG handler extracted: ' + (ktgEnd - ktgH) + ' chars');
} else {
  // Try full JS
  var ktgH2 = js.indexOf('if (req.url.startsWith(\'/kiem-tra-gia\')');
  if (ktgH2 >= 0) {
    console.log('KTG handler in full JS at ' + ktgH2);
    var ktgBlock = js.substring(ktgH2);
    var ktgEnd2 = ktgBlock.indexOf('}', ktgBlock.indexOf('return;'));
    // But this might be mixed with serveHTML. Find the NEXT major section
    var nextMajor = ktgBlock.indexOf('  if (req.url.startsWith(\'/sites/\')');
    if (nextMajor < 0) nextMajor = ktgBlock.indexOf("if (req.url.startsWith('/sites/'");
    if (nextMajor < 0) nextMajor = ktgBlock.indexOf('if (req.url.startsWith(\'/static/\')');
    
    if (nextMajor > 0 && nextMajor < ktgEnd2 + 10) {
      ktgEnd2 = ktgBlock.lastIndexOf('}', nextMajor) + 1;
    }
    out += ktgBlock.substring(0, ktgEnd2 + 1).replace(/^/gm, '  ') + '\n\n';
    console.log('KTG handler from full JS');
  }
}

// KTG API handler
var apiHLast = js.lastIndexOf('if (req.url === \'/api/ktg-data\' && req.method === \'POST\')');
if (apiHLast >= 0) {
  var apiBlock = js.substring(apiHLast);
  var apiEnd = apiBlock.indexOf('res.writeHead(404');
  if (apiEnd < 0) apiEnd = apiBlock.indexOf('if (!req.url.startsWith(\'/api/doccheck\')');
  if (apiEnd < 0) apiEnd = apiBlock.indexOf('  // Other static');
  if (apiEnd < 0) apiEnd = apiBlock.indexOf('}  // Other static');
  if (apiEnd > 0) {
    // Find the complete API handler: ends with '  }\n    return;\n  }\n'
    out += apiBlock.substring(0, apiEnd).replace(/^/gm, '  ') + '\n\n';
  }
}

// Add post content
out += post;

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', out, 'utf-8');
console.log('\nWritten: ' + out.length + ' chars');

// Syntax check
var cp = require('child_process');
try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000, stdio: ['pipe', 'pipe', 'pipe'] });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var msg = e.stdout || e.stderr || e.message || '';
  console.log(msg);
  var lm = msg.match(/line (\d+)/i);
  if (lm) {
    var n = parseInt(lm[1]);
    var ol = out.split('\n');
    for (var li = Math.max(0, n-5); li < Math.min(ol.length, n+3); li++) {
      console.log((li+1) + ': ' + ol[li]);
    }
  }
}

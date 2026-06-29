var fs = require('fs');
var cp = require('child_process');

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// FIX 1: Remove duplicate ktgInjector require
var first = js.indexOf('var ktgInjector = require');
var second = js.indexOf('var ktgInjector = require', first + 10);
if (second >= 0) {
  var lineAfterSecond = js.indexOf('\n', second);
  var endBlock = js.indexOf('});', second) + 3;
  if (endBlock > lineAfterSecond) {
    // multi-line require - find the actual end
    while (js[endBlock] && (js[endBlock] === ' ' || js[endBlock] === '\r' || js[endBlock] === '\n')) endBlock++;
    js = js.substring(0, second) + js.substring(endBlock);
    console.log('Removed duplicate ktgInjector require');
  }
}

// FIX 2: Add KTG handler (before /sites/ route)
var sitesRoute = js.indexOf('if (req.url.startsWith(\'/sites/')');
if (sitesRoute < 0) sitesRoute = js.indexOf('if (req.url.startsWith(\"/sites/\"');
console.log('sitesRoute at: ' + sitesRoute);

var ktgHandler = '';
ktgHandler += '  // ─── KTG handler ──────────────────────────────────────────────\n';
ktgHandler += '  if (req.url.startsWith(\'/kiem-tra-gia\')) {\n';
ktgHandler += '    const urlPath = req.url.substring(\'/kiem-tra-gia\'.length) || \'/\';\n';
ktgHandler += '    let lang = \'vi\';\n';
ktgHandler += '    let filePath = path.join(SITES_ROOT, \'kiem-tra-gia\', \'vi.html\');\n';
ktgHandler += '    const langMatch = urlPath.match(/^\\/(vi|en|zh)(?:\\.html)?(?:\\/.*)?$/);\n';
ktgHandler += '    if (langMatch) {\n';
ktgHandler += '      lang = langMatch[1];\n';
ktgHandler += '      filePath = path.join(SITES_ROOT, \'kiem-tra-gia\', lang + \'.html\');\n';
ktgHandler += '    }\n';
ktgHandler += '    if (!filePath.startsWith(SITES_ROOT)) {\n';
ktgHandler += '      res.writeHead(403);\n';
ktgHandler += '      return res.end(\'Forbidden\');\n';
ktgHandler += '    }\n';
ktgHandler += '    fs.readFile(filePath, function(err, data) {\n';
ktgHandler += '      if (err) {\n';
ktgHandler += '        res.writeHead(404, { \'Content-Type\': \'text/plain; charset=utf-8\' });\n';
ktgHandler += '        return res.end(\'KTG page not found for: \' + lang);\n';
ktgHandler += '      }\n';
ktgHandler += '      if (!err && data) {\n';
ktgHandler += '        data = ktgInjector.inject(data, lang);\n';
ktgHandler += '      }\n';
ktgHandler += '      res.writeHead(200, { \'Content-Type\': \'text/html; charset=utf-8\' });\n';
ktgHandler += '      res.end(data);\n';
ktgHandler += '    });\n';
ktgHandler += '    return;\n';
ktgHandler += '  }\n\n';

js = js.substring(0, sitesRoute) + ktgHandler + js.substring(sitesRoute);
console.log('Added KTG handler');

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', js, 'utf-8');
console.log('Size: ' + js.length + ' bytes');

try {
  cp.execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js"', { encoding: 'utf-8', shell: true, timeout: 10000 });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var msg = e.stdout || e.stderr || e.message || '';
  console.log(msg.substring(0, 500));
  var lm = msg.match(/line (\d+)/i);
  if (lm) {
    var n = parseInt(lm[1]);
    var lines = js.split('\n');
    for (var i = Math.max(0, n-5); i < Math.min(lines.length, n+3); i++) {
      console.log((i+1) + ': ' + lines[i]);
    }
  }
}

var fs = require('fs');

// Read sections from extracted files
var beforeServe = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/_server-part1.txt', 'utf-8');
var part2 = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/_server-part2.txt', 'utf-8').trim();

// Also get the afterCors section to extract the KTG handler
var afterCors = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/_server-afterCors.txt', 'utf-8');

// Build: beforeServe + ktgRequire + correct serveHTML + KTG handler + part2
// ktgRequire is placed after `const path = require('path');`

// First, insert ktgInjector require after path require
var pathIdx = beforeServe.indexOf("const path = require('path');");
var pathEnd = beforeServe.indexOf('\n', pathIdx);
var part1 = beforeServe.substring(0, pathEnd + 1);
part1 += "// ─── KTG Data injector ────────────────────────────────────────────────────\n";
part1 += "var ktgInjector = require('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/_ktg-data-injector.js')({\n";
part1 += "  dir: __dirname + '/ktg-data',\n";
part1 += "  __dirname: __dirname,\n";
part1 += "  fs: fs,\n";
part1 += "  path: path\n";
part1 += "});\n";
part1 += beforeServe.substring(pathEnd + 1);

// Now extract the KTG handler + API endpoint + rest of createServer callback
// from afterCors. We need everything between CORS setup and the closing of server.createServer
// The KTG handler starts with: if (req.url.startsWith('/kiem-tra-gia'))
// and ends with:   // Other static sites
// Then the API endpoints, then the 404 handler

// Find the pattern in afterCors
var corsEnd = afterCors.indexOf('if (req.url.startsWith') ? 0 : 0; 
// The actual start is right after CORS setup and route.get

// Find the KTG handler block
var ktgHandlerStart = afterCors.indexOf("if (req.url.startsWith('/kiem-tra-gia'))");
console.log('KTG handler at:', ktgHandlerStart);

// The KTG handler block ends right before "// Other static sites"
var ktgHandlerEnd = afterCors.indexOf("// Other static sites (no CSS injection)", ktgHandlerStart);
if (ktgHandlerEnd < 0) ktgHandlerEnd = afterCors.indexOf("if (req.url.startsWith('/sites/')", ktgHandlerStart);

console.log('KTG handler block: ' + ktgHandlerStart + ' to ' + ktgHandlerEnd);

// Extract the KTG handler
var ktgHandler = afterCors.substring(ktgHandlerStart, ktgHandlerEnd);
console.log('KTG handler (' + ktgHandler.length + ' chars):\n' + ktgHandler.substring(0, 600));

// Check if the KTG handler already has the inject call
var hasInject = ktgHandler.indexOf('ktgInjector.inject');
console.log('\nHas inject call:', hasInject >= 0);

if (!hasInject) {
  // Find the fs.readFile callback in the KTG handler
  var readFileEnd = ktgHandler.indexOf('res.end(data);');
  if (readFileEnd >= 0) {
    var injectCall = '\n        if (!err && data) {\n          var langMatch = req.url.match(/\/(vi|en|zh)\\.html$/);\n          var lang = langMatch ? langMatch[1] : \'vi\';\n          data = ktgInjector.inject(data, lang);\n        }';
    ktgHandler = ktgHandler.substring(0, readFileEnd) + injectCall + '\n        ' + ktgHandler.substring(readFileEnd);
    console.log('Added inject call');
  }
}

// Get the rest after KTG handler (all the other API endpoints + 404 handler)
var afterKtgHandler = afterCors.substring(ktgHandlerEnd);

// The KTG API upload endpoint - check if it exists
var hasApi = afterKtgHandler.indexOf('/api/ktg-data');
if (!hasApi) {
  // Find the 404 handler and add before it
  var notFoundIdx = afterKtgHandler.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });\n  res.end('Not found');");
  if (notFoundIdx < 0) {
    notFoundIdx = afterKtgHandler.indexOf("res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });");
  }
  
  var apiEndpoint = "\n  // ─── KTG Data upload API ──────────────────────────────────────────────\n" +
    "  if (req.url === '/api/ktg-data' && req.method === 'POST') {\n" +
    "    parseBody(req).then(function(data) {\n" +
    "      var lang = data.lang || 'vi';\n" +
    "      var blocks = data.blocks || {};\n" +
    "      ktgInjector.save(lang, blocks);\n" +
    "      console.log('[KTG] Upload data for ' + lang + ': ' + Object.keys(blocks).length + ' blocks');\n" +
    "      res.writeHead(200, { 'Content-Type': 'application/json' });\n" +
    "      res.end(JSON.stringify({ ok: true, saved: Object.keys(blocks).length }));\n" +
    "    }).catch(function(e) {\n" +
    "      res.writeHead(400, { 'Content-Type': 'application/json' });\n" +
    "      res.end(JSON.stringify({ ok: false, error: 'Invalid JSON: ' + e.message }));\n" +
    "    });\n" +
    "    return;\n" +
    "  }\n";
  
  if (notFoundIdx >= 0) {
    afterKtgHandler = afterKtgHandler.substring(0, notFoundIdx) + apiEndpoint + afterKtgHandler.substring(notFoundIdx);
    console.log('Added API endpoint');
  }
}

// Now build: part1 + serveHTML + ktgHandler + afterKtgHandler
// serveHTML is the correct function text

var serveHTML = `function serveHTML(res, htmlPath, requireAuth, hasSession) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    if (requireAuth && !hasSession) {
      html = html.replace('<body>', '<body>\\n<div id="loginOverlay">\\n  <div class="login-box">\\n    <div class="login-icon">\\u{1F9FE}</div>\\n    <h2>\\u0110\\u1EE9c Th\\u1ECBnh \\u2013 Ki\\u1EC3m Tra Ch\\u1EE9ng T\\u1EEB</h2>\\n    <p class="login-sub">Vui l\\u00F2ng \\u0111\\u0103ng nh\\u1EADp \\u0111\\u1EC3 ti\\u1EBFp t\\u1EE5c</p>\\n    <div class="login-field"><input type="text" id="loginUser" placeholder="T\\u00EAn \\u0111\\u0103ng nh\\u1EADp" autocomplete="username"></div>\\n    <div class="login-field"><input type="password" id="loginPass" placeholder="M\\u1EADt kh\\u1EA9u" autocomplete="current-password"></div>\\n    <div id="loginError" class="login-error"></div>\\n    <button class="btn btn-primary login-btn" onclick="doLogin()">\\u0110\\u0103ng nh\\u1EADp</button>\\n    <p class="login-hint">Nh\\u1EA5n Enter \\u0111\\u1EC3 \\u0111\\u0103ng nh\\u1EADp</p>\\n  </div>\\n</div>\\n<style>\\n#loginOverlay { position:fixed;inset:0;z-index:9999;background:linear-gradient(135deg,#e8edf5 0%,#f0f2f5 100%);display:flex;align-items:center;justify-content:center; }\\nbody.logged-in #loginOverlay { display:none !important; }\\n.login-box{background:#fff;border-radius:16px;padding:40px 36px;width:380px;max-width:90vw;box-shadow:0 10px 40px rgba(0,0,0,.12);text-align:center;}\\n.login-icon{font-size:48px;margin-bottom:12px;}\\n.login-box h2{font-size:20px;color:#1a1a1a;margin-bottom:4px;}\\n.login-sub{font-size:13px;color:#888;margin-bottom:24px;}\\n.login-field{margin-bottom:12px;}\\n.login-field input{width:100%;padding:12px 14px;border:1px solid #d0d0d0;border-radius:10px;font-size:15px;outline:none;transition:border .15s;box-sizing:border-box;}\\n.login-field input:focus{border-color:#1a73e8;box-shadow:0 0 0 2px #1a73e822;}\\n.login-btn{width:100%;padding:12px;font-size:15px;margin-top:8px;justify-content:center;}\\n.login-error{color:#d93025;font-size:13px;margin:8px 0;display:none;}\\n.login-hint{font-size:12px;color:#aaa;margin-top:16px;}\\n</style>');
      html = html.replace('</body>', '</body>\\n<script>\\n(function() {\\n  const APP_URL = \\'/api\\';\\n  let sessionToken = localStorage.getItem(\\'doccheck_session\\');\\n  async function checkSession() {\\n    if (!sessionToken) return false;\\n    try {\\n      const r = await fetch(APP_URL + \\'/verify\\', {\\n        method: \\'POST\\',\\n        headers: { \\'Content-Type\\': \\'application/json\\' },\\n        body: JSON.stringify({ token: sessionToken })\\n      });\\n      const d = await r.json();\\n      if (d.ok) { document.body.classList.add(\\'logged-in\\'); return true; }\\n    } catch(e) {}\\n    localStorage.removeItem(\\'doccheck_session\\');\\n    return false;\\n  }\\n  async function doLogin() {\\n    const u = document.getElementById(\\'loginUser\\').value.trim();\\n    const p = document.getElementById(\\'loginPass\\').value.trim();\\n    if (!u || !p) { showLoginError(\\'Vui l\\u00F2ng nh\\u1EADp t\\u00E0i kho\\u1EA3n v\\u00E0 m\\u1EADt kh\\u1EA9u\\'); return; }\\n    try {\\n      const r = await fetch(APP_URL + \\'/login\\', {\\n        method: \\'POST\\',\\n        headers: { \\'Content-Type\\': \\'application/json\\' },\\n        body: JSON.stringify({ username: u, password: p })\\n      });\\n      const d = await r.json();\\n      if (d.ok) {\\n        sessionToken = d.token;\\n        localStorage.setItem(\\'doccheck_session\\', d.token);\\n        document.body.classList.add(\\'logged-in\\');\\n      } else {\\n        showLoginError(d.error || \\'\\u0110\\u0103ng nh\\u1EADp th\\u1EA5t b\\u1EA1i\\');\\n      }\\n    } catch(e) {\\n      showLoginError(\\'L\\u1ED7i k\\u1EBFt n\\u1ED1i: \\' + e.message);\\n    }\\n  }\\n  function showLoginError(msg) {\\n    const el = document.getElementById(\\'loginError\\');\\n    if (el) { el.textContent = msg; el.style.display = \\'block\\'; }\\n  }\\n  window.__getSessionToken = function() { return sessionToken; };\\n  if (document.cookie.includes(\\'doccheck_session=\\')) {\\n    sessionToken = document.cookie.match(/doccheck_session=([^;]+)/)[1];\\n    localStorage.setItem(\\'doccheck_session\\', sessionToken);\\n  }\\n  checkSession();\\n  window.doLogin = doLogin;\\n})();\\n</script>\\n</body>');
    } else {
      html = html.replace('</body>', '</body>\\n<script>\\n(function(){\\n  var s = localStorage.getItem(\\'doccheck_session\\');\\n  if (!s && document.cookie.includes(\\'doccheck_session=\\')) {\\n    s = document.cookie.match(/doccheck_session=([^;]+)/)[1];\\n    localStorage.setItem(\\'doccheck_session\\', s);\\n  }\\n  window.__getSessionToken = function(){ return s; };\\n})();\\n</script>\\n</body>');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch(e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error: ' + e.message);
  }
}

`;

var final = part1 + '\n\n' + serveHTML + '\n\n' + ktgHandler + afterKtgHandler;

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', final, 'utf-8');
console.log('Server.js written:', final.length, 'chars');

// Syntax check
try {
  require('child_process').execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  var err = e.stdout || e.stderr || e.message;
  console.log(err);
  
  // Show context
  var match = err.match(/line (\d+)/);
  if (match) {
    var line = parseInt(match[1]);
    var lines = final.split('\n');
    for (var i = Math.max(0, line-5); i < Math.min(lines.length, line+5); i++) {
      console.log((i+1) + ': ' + lines[i]);
    }
  }
}

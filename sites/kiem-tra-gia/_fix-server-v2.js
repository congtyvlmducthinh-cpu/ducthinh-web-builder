var fs = require('fs');
var orig = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');

// Find serveHTML function boundaries
var serveHtmlStart = orig.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');
console.log('serveHTML at char:', serveHtmlStart);

// After serveHTML's closing }, find the next meaningful section
// The code after serveHTML's try/catch is:
// ─── HTTP API helper  (this comment uses special unicode chars)
var apiHelperPattern = 'HTTP API helper';
var apiHelperIdx = orig.indexOf(apiHelperPattern, serveHtmlStart + 500);
console.log('API helper at char:', apiHelperIdx);

if (apiHelperIdx >= 0) {
  // Find the start of this comment line (go back to previous newline)
  var lineStart = orig.lastIndexOf('\n', apiHelperIdx) + 1;
  
  // clean = everything before serveHTML
  var clean = orig.substring(0, serveHtmlStart);
  
  // + CORRECT serveHTML function
  clean += "function serveHTML(res, htmlPath, requireAuth, hasSession) {\n";
  clean += "  try {\n";
  clean += "    let html = fs.readFileSync(htmlPath, 'utf-8');\n";
  clean += "    if (requireAuth && !hasSession) {\n";
  clean += "      html = html.replace('<body>', '<body>\\n<div id=\"loginOverlay\">\\n  <div class=\"login-box\">\\n    <div class=\"login-icon\">\\u{1F9FE}</div>\\n    <h2>\\u0110\\u1EE9c Th\\u1ECBnh \\u2013 Ki\\u1EC3m Tra Ch\\u1EE9ng T\\u1EEB</h2>\\n    <p class=\"login-sub\">Vui l\\u00F2ng \\u0111\\u0103ng nh\\u1EADp \\u0111\\u1EC3 ti\\u1EBFp t\\u1EE5c</p>\\n    <div class=\"login-field\"><input type=\"text\" id=\"loginUser\" placeholder=\"T\\u00EAn \\u0111\\u0103ng nh\\u1EADp\" autocomplete=\"username\"></div>\\n    <div class=\"login-field\"><input type=\"password\" id=\"loginPass\" placeholder=\"M\\u1EADt kh\\u1EA9u\" autocomplete=\"current-password\"></div>\\n    <div id=\"loginError\" class=\"login-error\"></div>\\n    <button class=\"btn btn-primary login-btn\" onclick=\"doLogin()\">\\u0110\\u0103ng nh\\u1EADp</button>\\n    <p class=\"login-hint\">Nh\\u1EA5n Enter \\u0111\\u1EC3 \\u0111\\u0103ng nh\\u1EADp</p>\\n  </div>\\n</div>\\n<style>\\n#loginOverlay { position:fixed;inset:0;z-index:9999;background:linear-gradient(135deg,#e8edf5 0%,#f0f2f5 100%);display:flex;align-items:center;justify-content:center; }\\nbody.logged-in #loginOverlay { display:none !important; }\\n.login-box{background:#fff;border-radius:16px;padding:40px 36px;width:380px;max-width:90vw;box-shadow:0 10px 40px rgba(0,0,0,.12);text-align:center;}\\n.login-icon{font-size:48px;margin-bottom:12px;}\\n.login-box h2{font-size:20px;color:#1a1a1a;margin-bottom:4px;}\\n.login-sub{font-size:13px;color:#888;margin-bottom:24px;}\\n.login-field{margin-bottom:12px;}\\n.login-field input{width:100%;padding:12px 14px;border:1px solid #d0d0d0;border-radius:10px;font-size:15px;outline:none;transition:border .15s;box-sizing:border-box;}\\n.login-field input:focus{border-color:#1a73e8;box-shadow:0 0 0 2px #1a73e822;}\\n.login-btn{width:100%;padding:12px;font-size:15px;margin-top:8px;justify-content:center;}\\n.login-error{color:#d93025;font-size:13px;margin:8px 0;display:none;}\\n.login-hint{font-size:12px;color:#aaa;margin-top:16px;}\\n</style>');\n";
  clean += "      html = html.replace('</body>', '</body>\\n<script>\\n(function() {\\n  const APP_URL = \\'/api\\';\\n  let sessionToken = localStorage.getItem(\\'doccheck_session\\');\\n  async function checkSession() {\\n    if (!sessionToken) return false;\\n    try {\\n      const r = await fetch(APP_URL + \\'/verify\\', {\\n        method: \\'POST\\',\\n        headers: { \\'Content-Type\\': \\'application/json\\' },\\n        body: JSON.stringify({ token: sessionToken })\\n      });\\n      const d = await r.json();\\n      if (d.ok) { document.body.classList.add(\\'logged-in\\'); return true; }\\n    } catch(e) {}\\n    localStorage.removeItem(\\'doccheck_session\\');\\n    return false;\\n  }\\n  async function doLogin() {\\n    const u = document.getElementById(\\'loginUser\\').value.trim();\\n    const p = document.getElementById(\\'loginPass\\').value.trim();\\n    if (!u || !p) { showLoginError(\\'Vui l\\u00F2ng nh\\u1EADp t\\u00E0i kho\\u1EA3n v\\u00E0 m\\u1EADt kh\\u1EA9u\\'); return; }\\n    try {\\n      const r = await fetch(APP_URL + \\'/login\\', {\\n        method: \\'POST\\',\\n        headers: { \\'Content-Type\\': \\'application/json\\' },\\n        body: JSON.stringify({ username: u, password: p })\\n      });\\n      const d = await r.json();\\n      if (d.ok) {\\n        sessionToken = d.token;\\n        localStorage.setItem(\\'doccheck_session\\', d.token);\\n        document.body.classList.add(\\'logged-in\\');\\n      } else {\\n        showLoginError(d.error || \\'\\u0110\\u0103ng nh\\u1EADp th\\u1EA5t b\\u1EA1i\\');\\n      }\\n    } catch(e) {\\n      showLoginError(\\'L\\u1ED7i k\\u1EBFt n\\u1ED1i: \\' + e.message);\\n    }\\n  }\\n  function showLoginError(msg) {\\n    const el = document.getElementById(\\'loginError\\');\\n    if (el) { el.textContent = msg; el.style.display = \\'block\\'; }\\n  }\\n  window.__getSessionToken = function() { return sessionToken; };\\n  if (document.cookie.includes(\\'doccheck_session=\\')) {\\n    sessionToken = document.cookie.match(/doccheck_session=([^;]+)/)[1];\\n    localStorage.setItem(\\'doccheck_session\\', sessionToken);\\n  }\\n  checkSession();\\n  window.doLogin = doLogin;\\n})();\\n</script>\\n</body>');\n";
  clean += "    } else {\n";
  clean += "      html = html.replace('</body>', '</body>\\n<script>\\n(function(){\\n  let s = localStorage.getItem(\\'doccheck_session\\');\\n  if (!s && document.cookie.includes(\\'doccheck_session=\\')) {\\n    s = document.cookie.match(/doccheck_session=([^;]+)/)[1];\\n    localStorage.setItem(\\'doccheck_session\\', s);\\n  }\\n  window.__getSessionToken = function(){ return s; };\\n})();\\n</script>\\n</body>');\n";
  clean += "    }\n";
  clean += "    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });\n";
  clean += "    res.end(html);\n";
  clean += "  } catch(e) {\n";
  clean += "    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });\n";
  clean += "    res.end('Error: ' + e.message);\n";
  clean += "  }\n";
  clean += "}\n\n";

  // + everything from "HTTP API helper" onwards (the rest of the file)
  clean += orig.substring(lineStart);
  
  fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', clean, 'utf-8');
  console.log('Server.js rebuilt');
  console.log('New size:', clean.length, 'chars');
  
  // Verify syntax
  var execSync = require('child_process').execSync;
  try {
    var result = execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
    if (result) console.log('stderr:', result);
    console.log('SYNTAX: OK');
  } catch(e) {
    console.log('SYNTAX: ERROR');
    console.log(e.stdout || e.stderr);
  }
} else {
  console.log('API helper not found! Searching for alternative pattern...');
  // Try to find what comes after serveHTML
  var after = orig.substring(serveHtmlStart + 1000, serveHtmlStart + 2000);
  console.log(after.substring(0, 500));
}

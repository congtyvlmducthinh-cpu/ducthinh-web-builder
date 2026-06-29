var fs = require('fs');
var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js', 'utf-8');

// Find the serveHTML function boundaries
var serveHtmlStart = js.indexOf('function serveHTML(res, htmlPath, requireAuth, hasSession) {');
var serveHtmlTryStart = js.indexOf('try {', serveHtmlStart);

// After serveHTML's try, find where serveHTML should END
// serveHTML should have: try { ... } catch(e) { ... res.end('Error: ' + e.message); } }
// The last line of serveHTML with the closing brace }
// Then the code continues with: // ─── HTTP API helper

var apiHelperStart = js.indexOf('// ─── HTTP API helper');
console.log('serveHTML start at:', serveHtmlStart);
console.log('API helper at:', apiHelperStart);

// What's in between serveHTML and apiHelper?
var between = js.substring(serveHtmlStart, apiHelperStart);
console.log('Characters between:', between.length);

// Find where serveHTML's } catch(e) { should be
// The serveHTML try block has huge template strings, then catches
var lastClosingBrace = between.lastIndexOf('}');
var secondLastClosing = between.lastIndexOf('}', lastClosingBrace - 1);
console.log('Last two } positions in between:', secondLastClosing, lastClosingBrace);
console.log('Around second-last }:');
console.log(between.substring(secondLastClosing - 50, secondLastClosing + 50));
console.log('\nAround last }:');
console.log(between.substring(lastClosingBrace - 50, lastClosingBrace + 50));

// The serveHTML function content should END with the proper catch(e) and closing
// Let me find: the template strings end, then catch(e), then end serveHTML
// The current broken state has KTG handler code inside serveHTML

// Looking at the output: the serveHTML try block seems to extend all the way 
// into the KTG handler code. The real template strings end at:
// </body>`);
//     }
// 
//     res.writeHead(200, ...
// ... that should be serveHTML's closing, but it's missing the catch

// Let me find the correct template end
var templateEnd = js.indexOf('</body>`);', serveHtmlTryStart);
console.log('\nTemplate string ends at:', templateEnd);
console.log('Context: "' + js.substring(templateEnd, templateEnd + 200) + '"');

// The problem is clear: in the original, after the else block (no-auth), there's:
//     res.writeHead(200, {'Content-Type':...});
//     res.end(html);
//   } catch(e) {
//     res.writeHead(500, ...);
//     res.end('Error: ' + e.message);
//   }
// }

// But the patch removed that and replaced with KTG handler code
// The good news: the ktgInjector require + API endpoint are already added correctly

// Let me just rebuild server.js properly from the broken version
// by fixing the serveHTML function and KTG handler separation

var clean = js.substring(0, serveHtmlStart); // Everything before serveHTML

// Build CORRECT serveHTML function
clean += `function serveHTML(res, htmlPath, requireAuth, hasSession) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    if (requireAuth && !hasSession) {
      html = html.replace('<body>', \`<body>
<div id="loginOverlay">
  <div class="login-box">
    <div class="login-icon">🧾</div>
    <h2>Đức Thịnh – Kiểm Tra Chứng Từ</h2>
    <p class="login-sub">Vui lòng đăng nhập để tiếp tục</p>
    <div class="login-field">
      <input type="text" id="loginUser" placeholder="Tên đăng nhập" autocomplete="username">
    </div>
    <div class="login-field">
      <input type="password" id="loginPass" placeholder="Mật khẩu" autocomplete="current-password">
    </div>
    <div id="loginError" class="login-error"></div>
    <button class="btn btn-primary login-btn" onclick="doLogin()">Đăng nhập</button>
    <p class="login-hint">Nhấn Enter để đăng nhập</p>
  </div>
</div>
<style>
#loginOverlay {
  position: fixed; inset: 0; z-index: 9999;
  background: linear-gradient(135deg, #e8edf5 0%, #f0f2f5 100%);
  display: flex; align-items: center; justify-content: center;
}
body.logged-in #loginOverlay { display: none !important; }
.login-box {
  background: #fff; border-radius: 16px; padding: 40px 36px;
  width: 380px; max-width: 90vw;
  box-shadow: 0 10px 40px rgba(0,0,0,.12);
  text-align: center;
}
.login-icon { font-size: 48px; margin-bottom: 12px; }
.login-box h2 { font-size: 20px; color: #1a1a1a; margin-bottom: 4px; }
.login-sub { font-size: 13px; color: #888; margin-bottom: 24px; }
.login-field { margin-bottom: 12px; }
.login-field input {
  width: 100%; padding: 12px 14px; border: 1px solid #d0d0d0;
  border-radius: 10px; font-size: 15px; outline: none; transition: border .15s; box-sizing: border-box;
}
.login-field input:focus { border-color: #1a73e8; box-shadow: 0 0 0 2px #1a73e822; }
.login-btn { width: 100%; padding: 12px; font-size: 15px; margin-top: 8px; justify-content: center; }
.login-error { color: #d93025; font-size: 13px; margin: 8px 0; display: none; }
.login-hint { font-size: 12px; color: #aaa; margin-top: 16px; }
</style>\`);

      html = html.replace('</body>', \`
<script>
(function() {
  const APP_URL = '/api';
  let sessionToken = localStorage.getItem('doccheck_session');

  async function checkSession() {
    if (!sessionToken) return false;
    try {
      const r = await fetch(APP_URL + '/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: sessionToken })
      });
      const d = await r.json();
      if (d.ok) { document.body.classList.add('logged-in'); return true; }
    } catch(e) {}
    localStorage.removeItem('doccheck_session');
    return false;
  }

  async function doLogin() {
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value.trim();
    if (!u || !p) { showLoginError('Vui lòng nhập tài khoản và mật khẩu'); return; }
    try {
      const r = await fetch(APP_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      });
      const d = await r.json();
      if (d.ok) {
        sessionToken = d.token;
        localStorage.setItem('doccheck_session', d.token);
        document.body.classList.add('logged-in');
      } else {
        showLoginError(d.error || 'Đăng nhập thất bại');
      }
    } catch(e) {
      showLoginError('Lỗi kết nối: ' + e.message);
    }
  }

  function showLoginError(msg) {
    const el = document.getElementById('loginError');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  window.__getSessionToken = function() { return sessionToken; };

  if (document.cookie.includes('doccheck_session=')) {
    sessionToken = document.cookie.match(/doccheck_session=([^;]+)/)[1];
    localStorage.setItem('doccheck_session', sessionToken);
  }

  checkSession();
  window.doLogin = doLogin;
})();
</script>
</body>\`);
    } else {
      html = html.replace('</body>', \`
<script>
(function() {
  let sessionToken = localStorage.getItem('doccheck_session');
  if (!sessionToken && document.cookie.includes('doccheck_session=')) {
    sessionToken = document.cookie.match(/doccheck_session=([^;]+)/)[1];
    localStorage.setItem('doccheck_session', sessionToken);
  }
  window.__getSessionToken = function() { return sessionToken; };
})();
</script>
</body>\`);
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch(e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error: ' + e.message);
  }
}

// ─── HTTP API helper
`;

// Now add everything from API helper onwards (from the original, clean version)
var apiHelperOriginal = js.substring(apiHelperStart);
clean += apiHelperOriginal;

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/server.js', clean, 'utf-8');
console.log('Server.js rebuilt with correct serveHTML function');

// Verify syntax
var execSync = require('child_process').execSync;
try {
  execSync('node --check "C:/Users/Admin/.openclaw/canvas/server.js" 2>&1', { encoding: 'utf-8', shell: true });
  console.log('SYNTAX: OK');
} catch(e) {
  console.log('SYNTAX: ERROR');
  console.log(e.stdout || e.stderr || e.message);
}

const fs = require("fs");

// Read current template
let tpl = fs.readFileSync("template.html", "utf-8");

// Chat JS functions
const chatJS = `
<!-- Chat JS -->
<script>
const API_URL = '/api/chat';
const SESSION_ID = 'web_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();

function $(sel) { return document.querySelector(sel); }
function autoResize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px'; }

function addMsg(text, role) {
  const welcome = document.getElementById('welcomeBlock');
  if (welcome) welcome.remove();
  const c = $('#msgContainer');
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  const lines = text.split('\\n');
  if (lines.length > 1) {
    const pre = document.createElement('div');
    lines.forEach(function(ln, i) {
      if (i > 0) pre.appendChild(document.createElement('br'));
      pre.appendChild(document.createTextNode(ln));
    });
    d.appendChild(pre);
  } else {
    d.textContent = text;
  }
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function showTyping() {
  if (document.getElementById('typingInd')) return;
  const el = document.createElement('div');
  el.className = 'msg bot';
  el.id = 'typingInd';
  el.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  $('#msgContainer').appendChild(el);
  el.scrollIntoView();
}

function hideTyping() {
  const el = document.getElementById('typingInd');
  if (el) el.remove();
}

function exampleClick(text) {
  $('#msgInput').value = text;
  autoResize($('#msgInput'));
  $('#msgInput').focus();
}

function toggleGuide() {
  var body = document.getElementById('guideBody');
  var arrow = document.getElementById('guideArrow');
  body.classList.toggle('open');
  if (body.classList.contains('open')) {
    arrow.style.transform = 'rotate(180deg)';
  } else {
    arrow.style.transform = '';
  }
}

async function sendMsg() {
  const input = $('#msgInput');
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  input.value = '';
  autoResize(input);
  showTyping();
  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        attachments: [],
        sessionId: SESSION_ID,
        token: window.__getSessionToken ? window.__getSessionToken() : ''
      })
    });
    const result = await resp.json();
    hideTyping();
    if (result.ok) {
      addMsg(result.reply || 'Done.', 'bot');
    } else {
      addMsg('Error: ' + (result.error || JSON.stringify(result)), 'bot');
    }
  } catch(e) {
    hideTyping();
    addMsg('Connection failed: ' + e.message, 'bot');
  }
}
$('#msgInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
});
<\/script>
`;

tpl = tpl.replace("</body>", chatJS + "</body>");
fs.writeFileSync("template.html", tpl, "utf-8");
console.log("Template updated: " + fs.statSync("template.html").size + " bytes");

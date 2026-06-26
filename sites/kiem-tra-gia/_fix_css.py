# Add missing btn-sm CSS and fix market toggle - add inline style fallback
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Add btn-sm CSS inside the existing style tag
style_tag_end = d.find('</style>')
btn_sm_css = '''
.btn-sm{display:inline-block;padding:4px 10px;font-size:11px;font-weight:600;border-radius:6px;border:1px solid var(--border);background:var(--card-bg,#fff);color:var(--text,#333);cursor:pointer;transition:all .15s ease}
.btn-sm.active,.btn-sm.active:hover{background:var(--primary,#1a56db);color:#fff;border-color:var(--primary,#1a56db)}
.btn-sm:hover{background:var(--hover-bg,#f0f4ff);border-color:var(--primary,#1a56db);color:var(--primary,#1a56db)}'''

# Insert before </style>
d = d[:style_tag_end] + '\n' + btn_sm_css + '\n' + d[style_tag_end:]

# Also add inline style to the market group buttons as fallback
old_market = '<button class="btn-sm active" id="marketCn" onclick="setMarket(\'cn\')">🇨🇳 TQ</button>\n<button class="btn-sm" id="marketOther" onclick="setMarket(\'other\')">🌏 Khác</button>'
new_market = '<button class="btn-sm active" id="marketCn" onclick="setMarket(\'cn\')" style="padding:4px 10px;font-size:11px;font-weight:600;border-radius:6px;border:1px solid #d0d5dd;background:#1a56db;color:#fff;cursor:pointer;transition:all .15s ease">🇨🇳 TQ</button>\n<button class="btn-sm" id="marketOther" onclick="setMarket(\'other\')" style="padding:4px 10px;font-size:11px;font-weight:600;border-radius:6px;border:1px solid #d0d5dd;background:#fff;color:#333;cursor:pointer;transition:all .15s ease">🌏 Khác</button>'

if old_market in d:
    d = d.replace(old_market, new_market)
    print('✅ Market buttons inline styles added')
else:
    print('⚠️ Market button pattern not found exactly')

# Also set market toggle JS to update inline styles
# Find setMarket function and update it to change inline style too
old_setmarket = '''function setMarket(mkt) {
  currentMarket = mkt;
  // Update UI toggle buttons
  var cnBtn = document.getElementById("marketCn");
  var otherBtn = document.getElementById("marketOther");
  if (cnBtn && otherBtn) {
    cnBtn.classList.toggle("active", mkt === "cn");
    otherBtn.classList.toggle("active", mkt === "other");
  }
  applyMarket();
}'''

new_setmarket = '''function setMarket(mkt) {
  currentMarket = mkt;
  // Update UI toggle buttons
  var cnBtn = document.getElementById("marketCn");
  var otherBtn = document.getElementById("marketOther");
  if (cnBtn && otherBtn) {
    cnBtn.classList.toggle("active", mkt === "cn");
    otherBtn.classList.toggle("active", mkt === "other");
    cnBtn.style.background = mkt === "cn" ? "#1a56db" : "#fff";
    cnBtn.style.color = mkt === "cn" ? "#fff" : "#333";
    cnBtn.style.borderColor = mkt === "cn" ? "#1a56db" : "#d0d5dd";
    otherBtn.style.background = mkt === "other" ? "#1a56db" : "#fff";
    otherBtn.style.color = mkt === "other" ? "#fff" : "#333";
    otherBtn.style.borderColor = mkt === "other" ? "#1a56db" : "#d0d5dd";
  }
  applyMarket();
}'''

if old_setmarket in d:
    d = d.replace(old_setmarket, new_setmarket)
    print('✅ setMarket inline style toggle added')
else:
    print('⚠️ setMarket pattern not found exactly')

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d)

print('\n✅ Done - CSS + inline styles + JS toggle')

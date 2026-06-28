import sys
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    t = f.read()

# Inject lang buttons right before </header>
lang_ui = """\n<div style="display:flex;gap:3px;margin-left:auto;z-index:1;position:relative">
<button class="lang-btn active" data-lang="vi" onclick="switchLang('vi')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001f1fb\U0001f1f3</button>
<button class="lang-btn" data-lang="en" onclick="switchLang('en')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001f1ec\U0001f1e7</button>
<button class="lang-btn" data-lang="zh" onclick="switchLang('zh')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001f1e8\U0001f1f3</button>
</div>
<style>
.lang-btn.active{background:rgba(255,255,255,0.2)!important;border-color:#fff!important;box-shadow:0 0 0 1px rgba(255,255,255,0.4)}
.lang-btn:hover{background:rgba(255,255,255,0.1)}
</style>"""

t = t.replace('</header>', lang_ui + '\n</header>')

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(t)

# Verify
html_part = t[:t.rfind('<script>')]
print(f'lang-btn in HTML: {html_part.count("lang-btn")}')
print(f'data-lang in HTML: {html_part.count("data-lang=")}')

# Also verify the LANG script's switchLang function uses dataset.lang
# (it's already in JS, should be fine)
js_part = t[t.rfind('<script>'):]
print(f'switchLang in JS: {js_part.count("switchLang")}')
print(f'dataset.lang in JS: {js_part.count("dataset.lang")}')
print('Done!')

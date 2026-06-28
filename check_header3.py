import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

html_part = t[:t.rfind('<script>')]
print('lang-btn in HTML:', 'lang-btn' in html_part)
print('lang-btn count in HTML:', html_part.count('lang-btn'))
print('data-lang in HTML:', html_part.count('data-lang'))

# Find what's right before </header>
hdr = t.find('</header>')
print('\n--- 300 chars before </header> ---')
print(repr(t[hdr-300:hdr]))
event = t.find('switchLang(', hdr-500, hdr)
print('\nswitchLang near header:', event)

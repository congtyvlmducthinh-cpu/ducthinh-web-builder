import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    text = f.read()

# Check issues:
# 1. Title tag shouldn't have data-i18n
if 'data-i18n' in text[text.find('<title>'):text.find('</title>')]:
    print('WARNING: data-i18n found inside <title>')
else:
    print('OK: title clean')

# 2. Check placeholder elements
for m in __import__('re').finditer(r'placeholder="([^"]*)"', text[:40104]):
    val = m.group(1)
    if val:
        print(f'  placeholder: "{val[:30]}" -> has data-i18n: {"data-i18n" in text[max(0,m.start()-80):m.start()]}')

# 3. Check if some HTML elements have __() calls (shouldn't, they use data-i18n)
for m in __import__('re').finditer(r'>\s*\+ __\(', text[:40104]):
    ctx = text[max(0,m.start()-30):m.end()+30]
    print(f'WARNING: __() in static HTML: ...{repr(ctx)[1:-1]}...')

# 4. Check render() function has __() calls
render_idx = text.rfind('function render()')
render_end = text.find('function ', render_idx + 15)
if render_end < 0:
    render_end = len(text)
render_snippet = text[render_idx:render_end]
calls = __import__('re').findall(r"__\([^)]+\)", render_snippet)
print(f'\n__() calls in render(): {len(calls)}')
if len(calls) > 0:
    for c in calls[:5]:
        print(f'  {c}')

print('\nDone checking!')

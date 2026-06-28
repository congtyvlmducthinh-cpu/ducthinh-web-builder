import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    text = f.read()

import re

m = re.search('<title>([^<]+)</title>', text)
if m:
    print('Title:', m.group(1))

h1 = text.find('<h1>')
h1e = text.find('</h1>', h1)
print('h1:', text[h1:h1e+5])

print()
print('Total __() calls:', text.count('__('))
print('Total data-i18n:', text.count('data-i18n'))

# First 10 data-i18n
for m in re.finditer(r'data-i18n="([^"]+)"', text[:40104]):
    print('  data-i18n:', m.group(1)[:40])

# Check one render function call
render_idx = text.rfind('function render()')
if render_idx > 0:
    print('\nrender() function starts at char', render_idx)
    snippet = text[render_idx:render_idx+200]
    print('First 200 chars:', repr(snippet)[1:-1])

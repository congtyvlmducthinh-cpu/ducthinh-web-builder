import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()

# Fix the broken regex on line 1302
# Original: var m = path.match(//(vi|en|zh)(?:.html)?(?:/|$)/);
# Should be: var m = path.match(/\/(vi|en|zh)(?:\.html)?(?:\/|$)/);
old = 'var m = path.match(//(vi|en|zh)(?:.html)?(?:/|$)/);'
new = 'var m = path.match(/\/(vi|en|zh)(?:\.html)?(?:\/|$)/);'

count = vi.count(old)
print(f'Found {count} occurrences of broken regex')

if count > 0:
    vi = vi.replace(old, new)
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','w',encoding='utf-8') as f:
        f.write(vi)
    print('Fixed!')
else:
    print('Could not find exact string, checking variations...')
    # Try to find any match with //
    idx = vi.find('detectCurrentLang')
    snippet = vi[idx:idx+500]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_regex_debug.txt','w',encoding='utf-8') as f:
        f.write(snippet)
    print('Written debug snippet')

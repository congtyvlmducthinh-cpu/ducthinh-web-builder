import re, os

for lang in ['en', 'zh']:
    path = f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{lang}.html'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    patterns = ['machineFilter && String(p.machine)', 'machineFilter && p.machine']
    found_any = False
    for pat in patterns:
        idx = content.find(pat)
        if idx >= 0:
            snippet = content[max(0,idx-20):idx+80]
            with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{lang}_filter.txt','w',encoding='utf-8') as f:
                f.write(f'Found: {pat}\n{snippet}\n')
            print(f'{lang}: found "{pat}"')
            found_any = True
    
    if not found_any:
        # search more broadly
        idx = content.find('machineFilter')
        if idx >= 0:
            snippet = content[max(0,idx-10):idx+100]
            with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{lang}_filter.txt','w',encoding='utf-8') as f:
                f.write(f'Context around machineFilter:\n{snippet}\n')
            print(f'{lang}: found machineFilter but no matching pattern')
        else:
            print(f'{lang}: machineFilter NOT found')

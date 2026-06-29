import re

for lang in ['en', 'zh']:
    path = f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{lang}.html'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix 1: machineFilter - wrap p.machine with String() for type-safe comparison
    old = 'machineFilter && p.machine !== machineFilter'
    new = 'machineFilter && String(p.machine) !== machineFilter'
    
    if old in content:
        content = content.replace(old, new)
        print(f'{lang}: Fixed machineFilter comparison')
    else:
        print(f'{lang}: machineFilter pattern not found (might already be fixed or different)')
        # Check what's there
        idx = content.find('machineFilter &&')
        if idx >= 0:
            print(f'  Actually has: {content[idx:idx+60]}')
    
    # Write back
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'{lang}: Done')

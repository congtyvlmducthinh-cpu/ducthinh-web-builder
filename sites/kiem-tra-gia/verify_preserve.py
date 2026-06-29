import subprocess, os

SRC = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia'

for name in ['src/app.js', 'vi.html', 'en.html', 'zh.html']:
    path = os.path.join(SRC, name)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    print(f'=== {name} ===')
    
    # Show new preserve section (FIX 2)
    preserve_start = c.find('Market-specific fields')
    if preserve_start > 0:
        preserve_chunk = c[preserve_start:preserve_start+1200]
        print(preserve_chunk)
    
    print()

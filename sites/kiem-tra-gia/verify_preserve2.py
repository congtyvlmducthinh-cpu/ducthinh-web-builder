import os

SRC = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia'

for name in ['src/app.js', 'vi.html', 'en.html', 'zh.html']:
    path = os.path.join(SRC, name)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    print(f'=== {name} ({len(c)} chars) ===')
    
    # Search for "market-specific" (old) or "Market-specific" (new)
    for term in ['market-specific', 'Market-specific', 'market specific', 'Market specific']:
        idx = c.find(term)
        if idx > 0:
            print(f'  Found "{term}" at pos {idx}')
            print(c[idx:idx+1200])
            break
    else:
        print(f'  No market-specific comment found')
    
    # Also search for "Preserve market" 
    idx2 = c.find('Preserve market')
    if idx2 > 0:
        print(f'  Found "Preserve market" at {idx2}')
    
    # Search for the fallback pattern
    idx3 = c.find('!== undefined ? Number')
    if idx3 > 0:
        print(f'  Found fallback pattern at {idx3}')
        print(c[max(0,idx3-50):idx3+100])
    
    print()

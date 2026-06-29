import re, os

SRC = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia'
with open(SRC + '/vi.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Check for any server GET/fetch request in the first half (init section)
init_portion = c[:len(c)//2]
patterns = ['fetch(', 'XMLHttpRequest', '/api/ktg', 'loadServer', 'loadFromServer', 'loadFromApi', 'loadData']
for p in patterns:
    idx = init_portion.find(p)
    if idx > 0:
        snippet = c[max(0,idx-80):idx+150]
        print(f'=== Found "{p}" at {idx} ===')
        print(snippet)
        print()

# Also check if there's any server-load function at all
for p in patterns:
    idx = c.find(p, len(c)//3)
    if idx > 0:
        snippet = c[max(0,idx-80):idx+150]
        print(f'=== Found "{p}" (later) at {idx} ===')
        print(snippet[:200])
        print()

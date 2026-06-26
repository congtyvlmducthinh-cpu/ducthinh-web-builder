import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find data at position 26429
idx = d.find('var DATA_PRODUCTS = [{')
print(f'First at {idx}')
raw = d[idx:idx+500]
print(f'Context: {repr(raw[:300])}')

# Try parsing this one
end = d.find('];', idx + 30)
raw_prods = d[idx + 21:end]
entries = []
depth = 0
s = 0
for i, ch in enumerate(raw_prods):
    if ch == '{':
        if depth == 0: s = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            try:
                entries.append(json.loads(raw_prods[s:i+1]))
            except:
                pass

print(f'\nProducts in first: {len(entries)}')
if entries:
    p = entries[0]
    print(f'First product keys: {sorted(p.keys())}')
    for k in sorted(p.keys()):
        if 'cn' in k.lower() or 'other' in k.lower():
            print(f'  {k}: {p[k]}')

import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check size distribution
raw = d[d.find('var DATA_PRODUCTS = [') + 20 : d.find('];', d.find('var DATA_PRODUCTS = ['))]
entries, depth, start = [], 0, 0
for i, ch in enumerate(raw):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(raw[start:i+1])
prods = [json.loads(e) for e in entries]

print(f'Total products: {len(prods)}')

# Check size distribution
sizes = {}
for p in prods:
    s = p.get('size', '—')
    sizes[s] = sizes.get(s, 0) + 1
print(f'\nSize distribution:')
for s, c in sorted(sizes.items(), key=lambda x: -x[1]):
    print(f'  "{s}": {c} products')

# Check which products have '—' size
missing = [p for p in prods if p.get('size') == '—']
if missing:
    print(f'\n⚠️ Products with missing size:')
    for p in missing:
        print(f'  {p["code"]:10s} std={p["standard"]:5s}')

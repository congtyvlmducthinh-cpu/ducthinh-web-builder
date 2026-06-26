import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Parse current DATA_PRODUCTS
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

# Find products with missing size
missing_size = [p for p in prods if p['size'] == '—']
print(f'Products with missing size (—): {len(missing_size)}')
for p in missing_size:
    print(f'  {p["code"]:10s} std={p["standard"]:5s} machine={p.get("machine","")}')
    
# Find products with null prices
null_prices = []
for p in prods:
    for k in ['exw_vnd_cn','exw_usd_cn','comm_vnd_cn','comm_usd_cn','pkg25_vnd_cn','pkg25_usd_cn','jumbo_vnd_cn','jumbo_usd_cn']:
        if p[k] is None:
            null_prices.append(f'{p["code"]} {p["standard"]}: {k}')
            break

print(f'\nProducts with null CN prices: {len(set(n.split(":")[0] for n in null_prices))}')
for n in null_prices[:15]:
    print(f'  {n}')

import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Count how many DATA_PRODUCTS declarations
cnt = d.count('var DATA_PRODUCTS')
print(f'Number of DATA_PRODUCTS declarations: {cnt}')

# Get the last one (the one that counts)
last = d.rfind('var DATA_PRODUCTS')
next_semicolon = d.find(';', last)
near = d[last:next_semicolon+1]
print(f'Last DATA_PRODUCTS starts: {near[:200]}...')

# Count products in last declaration
raw_prods = d[last + len('var DATA_PRODUCTS = ['):d.find('];', last)]
entries = []
depth = 0
start = 0
for i, ch in enumerate(raw_prods):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(raw_prods[start:i+1])
prods = [json.loads(e) for e in entries]
print(f'Products in last: {len(prods)}')

# Show first product
print(f'\nFirst product:')
for k,v in prods[0].items():
    print(f'  {k}: {v}')

# Show E80A2
print(f'\nE80A2 products:')
for p in prods:
    if p['code'] == 'E80A2':
        for k,v in p.items():
            print(f'  {k}: {v}')
        break

# Count null prices in _cn fields
nulls = []
for p in prods:
    for k in ['exw_vnd_cn','exw_usd_cn','comm_vnd_cn','comm_usd_cn','pkg25_vnd_cn','pkg25_usd_cn','jumbo_vnd_cn','jumbo_usd_cn']:
        if p.get(k) is None:
            nulls.append(f'{p["code"]} {p["standard"]}: {k}')
print(f'\nNull CN prices: {len(nulls)}')
for n in nulls[:10]:
    print(f'  {n}')

import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Parse DATA_PRODUCTS
idx = d.find('var DATA_PRODUCTS = [\n')
end = d.find('];', idx + 30)
raw = d[idx + 22:end]

entries = []
depth = 0
s = 0
for i, ch in enumerate(raw):
    if ch == '{':
        if depth == 0: s = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(json.loads(raw[s:i+1]))

print(f'Products: {len(entries)}')

p = entries[0]
has_cn = 'exw_vnd_cn' in p
print(f'Has _cn fields: {has_cn}')
if has_cn:
    print(f'H4A1 exw_vnd_cn={p["exw_vnd_cn"]}, exw_vnd_other={p["exw_vnd_other"]}, exw_vnd={p["exw_vnd"]}')
else:
    print(f'H4A1 keys: {sorted(p.keys())}')

cnt = d.count('var DATA_PRODUCTS')
print(f'Total var DATA_PRODUCTS count: {cnt}')

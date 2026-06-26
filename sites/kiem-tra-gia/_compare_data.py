import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Parse first DATA_PRODUCTS (at 26429)
idx1 = d.find('var DATA_PRODUCTS = [\n')
end1 = d.find('];', idx1 + 30)
raw1 = d[idx1 + 22:end1]  # skip 'var DATA_PRODUCTS = [\n'
entries1 = []
depth = 0
s = 0
for i, ch in enumerate(raw1):
    if ch == '{':
        if depth == 0: s = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            try:
                entries1.append(json.loads(raw1[s:i+1]))
            except:
                pass

# Parse second DATA_PRODUCTS (at 60081)
idx2 = d.find('var DATA_PRODUCTS = [{')
end2 = d.find('];', idx2 + 30)
raw2 = d[idx2 + 21:end2]
entries2 = []
depth = 0
s = 0
for i, ch in enumerate(raw2):
    if ch == '{':
        if depth == 0: s = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            try:
                entries2.append(json.loads(raw2[s:i+1]))
            except:
                pass

print(f'First decl: {len(entries1)} products')
print(f'Second decl: {len(entries2)} products')

# Check if first has _cn/_other fields
for p in entries1:
    if 'exw_vnd_cn' in p:
        print(f'First has _cn fields! Example H4A1.exw_vnd_cn = {p["exw_vnd_cn"]}')
        break
else:
    print('First has NO _cn fields')

for p in entries2:
    if 'exw_vnd_cn' in p:
        print(f'Second has _cn fields!')
        break
else:
    print('Second has NO _cn fields')

# Compare H4A1 values
p1 = entries1[0]
p2 = entries2[0]
print(f'\nH4A1 comparison:')
for k in sorted(set(list(p1.keys()) + list(p2.keys()))):
    v1 = p1.get(k)
    v2 = p2.get(k)
    if v1 != v2:
        print(f'  DIFFERENT {k}: first={v1} second={v2}')
    else:
        print(f'  SAME {k}: {v1}')

# Check if values changed between first and second
print(f'\nH4A1 exw_vnd: first={p1.get("exw_vnd")}, second={p2.get("exw_vnd")}')
print(f'H5A1 exw_vnd: first={entries1[1].get("exw_vnd")}, second={entries2[1].get("exw_vnd")}')

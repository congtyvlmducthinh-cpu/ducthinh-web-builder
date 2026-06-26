import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find first DATA_PRODUCTS
start1 = d.find('var DATA_PRODUCTS = [{')
end1 = d.find('];', start1 + 30)
print(f'First DATA_PRODUCTS: {start1} to {end1} ({end1-start1} chars)')

# Find second DATA_PRODUCTS  
start2 = d.find('var DATA_PRODUCTS = [{"code"', 50000)
end2 = d.find('];', start2 + 30)
print(f'Second DATA_PRODUCTS: {start2} to {end2} ({end2-start2} chars)')

# Parse first one
raw1 = d[start1 + 21:end1]
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
prods1 = entries1
print(f'\nProducts in first: {len(prods1)}')

# Parse second one
raw2 = d[start2 + 21:end2]
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
prods2 = entries2
print(f'\nProducts in second: {len(prods2)}')

# Check fields of first product in each
print(f'\nFirst product (first decl):')
p1 = prods1[0]
for k in sorted(p1.keys()):
    print(f'  {k}: {p1[k]}')

print(f'\nFirst product (second decl):')
p2 = prods2[0]
for k in sorted(p2.keys()):
    print(f'  {k}: {p2[k]}')

# Check if first has _cn, _other fields
has_cn = any('exw_vnd_cn' in p for p in prods1)
has_other = any('exw_vnd_other' in p for p in prods1)
print(f'\nFirst decl has _cn fields: {has_cn}')
print(f'First decl has _other fields: {has_other}')

has_cn2 = any('exw_vnd_cn' in p for p in prods2)
has_other2 = any('exw_vnd_other' in p for p in prods2)
print(f'Second decl has _cn fields: {has_cn2}')
print(f'Second decl has _other fields: {has_other2}')

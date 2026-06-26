import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check data types — are size and machine numbers?
import json
raw = d[d.find('var DATA_PRODUCTS = [\n') + 22 : d.find('];', d.find('var DATA_PRODUCTS = [\n') + 30)]
entries = []
depth, s = 0, 0
for i, ch in enumerate(raw):
    if ch == '{':
        if depth == 0: s = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(json.loads(raw[s:i+1]))

print(f'Total products: {len(entries)}')
print(f'First product:')
for k,v in entries[0].items():
    print(f'  {k}: {repr(v)} (type: {type(v).__name__})')

print(f'\n=== Checking size types ===')
sizes = {}
for p in entries:
    t = type(p.get('size')).__name__
    sizes[t] = sizes.get(t, 0) + 1
for t, c in sizes.items():
    print(f'  size type "{t}": {c}')

print(f'\n=== Checking machine types ===')
mach_t = {}
for p in entries:
    t = type(p.get('machine')).__name__
    mach_t[t] = mach_t.get(t, 0) + 1
for t, c in mach_t.items():
    print(f'  machine type "{t}": {c}')

# Show products with number size/machine
print(f'\n=== Float/Int size examples ===')
for p in entries:
    if isinstance(p.get('size'), (int, float)):
        print(f'  {p["code"]}: size={p["size"]} (type={type(p["size"]).__name__})')
        break
print(f'\n=== Float/Int machine examples ===')
for p in entries:
    if isinstance(p.get('machine'), (int, float)):
        print(f'  {p["code"]}: machine={p["machine"]} (type={type(p["machine"]).__name__})')
        break

import sys
sys.stdout.reconfigure(encoding='utf-8')

fp = r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\vi.html'

with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()

# Strategy: Keep ONLY the SECOND saveToServer (UI version with button feedback)
# But replace its blocks with the correct 5-field version

# Step 1: Find first saveToServer, remove it
v1 = c.find('function saveToServer()')
v2 = c.find('function saveToServer()', v1 + 1)

if v2 < 0:
    print("Only 1 saveToServer found, nothing to deduplicate")
    sys.exit(0)

# Find end of first function
brace = c.find('{', v1)
depth = 1
pos = brace + 1
while depth > 0 and pos < len(c):
    if c[pos] == '{': depth += 1
    elif c[pos] == '}': depth -= 1
    pos += 1

# Remove first function
c = c[:v1] + c[pos:]

# Step 2: Find the remaining saveToServer and replace its blocks
idx = c.find('function saveToServer()')
bs = c.find('blocks: {', idx)
bo = c.find('{', bs)
depth = 1
pos = bo + 1
while depth > 0 and pos < len(c):
    if c[pos] == '{': depth += 1
    elif c[pos] == '}': depth -= 1
    pos += 1

# Construct exact blocks content as would appear in JS
lines = [
    '{',
    '      DATA_PRODUCTS: "var DATA_PRODUCTS = " + JSON.stringify(DATA_PRODUCTS, null, 2) + ";",',
    '      DATA_BAGS: "var DATA_BAGS = " + JSON.stringify(DATA_BAGS, null, 2) + ";",',
    '      DATA_OTHERS: "var DATA_OTHERS = " + JSON.stringify(DATA_OTHERS, null, 2) + ";",',
    '      DATA_MAX_LOADING: "var DATA_MAX_LOADING = " + JSON.stringify(DATA_MAX_LOADING, null, 2) + ";",',
    '      DATA_COST_FOB: "var DATA_COST_FOB = " + JSON.stringify(DATA_COST_FOB, null, 2) + ";"',
    '    }'
]
new_blocks = '\n'.join(lines)

c = c[:bo] + new_blocks + c[pos:]

with open(fp, 'w', encoding='utf-8') as f:
    f.write(c)

# Verify
with open(fp, 'r', encoding='utf-8') as f:
    v = f.read()
funcs = v.count('function saveToServer()')
idx2 = v.find('function saveToServer()')
bs2 = v.find('blocks:', idx2)
bo2 = v.find('{', bs2)
depth = 1
pos2 = bo2 + 1
while depth > 0 and pos2 < len(v):
    if v[pos2] == '{': depth += 1
    elif v[pos2] == '}': depth -= 1
    pos2 += 1
bc = v[bo2:pos2]
has_all = all(kw in bc for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
trailing_comma_bad = bc.rstrip().endswith(',')
print('VI: funcs=' + str(funcs) + ' all5=' + str(has_all) + ' trailing_ok=' + str(not trailing_comma_bad))
print('Blocks:')
print(bc)

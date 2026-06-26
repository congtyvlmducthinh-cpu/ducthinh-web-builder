import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check all variable declarations for duplication
for var_name in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB']:
    idx = d.find('var ' + var_name)
    count = 0
    while idx >= 0:
        count += 1
        ctx = d[idx:idx+80]
        print(f'{var_name} #{count} at {idx}: {repr(ctx)}')
        idx = d.find('var ' + var_name, idx + 1)
    print(f'  Total: {count}')
    print()

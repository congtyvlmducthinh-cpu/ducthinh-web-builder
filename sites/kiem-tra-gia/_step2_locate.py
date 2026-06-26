# Step 2: Find exact locations and structures needed for modification
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find key locations
for i, line in enumerate(lines):
    s = line.strip()
    if 'var DATA_PRODUCTS = [' in s:
        print(f'DATA_PRODUCTS starts at line {i+1}')
    if 'render();' in s and 'render()' not in s:
        print(f'render(); at line {i+1}')
    if 'function renderPriceTab()' in s:
        print(f'renderPriceTab at line {i+1}')
    if 'function renderCalcTab()' in s:
        print(f'renderCalcTab at line {i+1}')
    if 'function calcPrice()' in s:
        print(f'calcPrice at line {i+1}')
    if 'function calcCommission()' in s:
        print(f'calcCommission at line {i+1}')
    if 'function getCalcPriceData()' in s:
        print(f'getCalcPriceData at line {i+1}')
    if 'freightInput' in s:
        print(f'freightInput at line {i+1}: {s[:100]}')
    if 'setCurrency' in s:
        print(f'setCurrency at line {i+1}: {s[:100]}')
    if 'btn-group' in s:
        print(f'btn-group at line {i+1}: {s[:100]}')

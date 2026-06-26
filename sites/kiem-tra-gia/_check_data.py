# Verify data correctness for duplicate-coded products
import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

prod_str = d[d.find('var DATA_PRODUCTS = ['):d.find('];', d.find('var DATA_PRODUCTS = [')) + 2]

# Parse products
entries = []
depth = 0
start = 0
s = prod_str[prod_str.find('[')+1:prod_str.rfind(']')]
for i, ch in enumerate(s):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(s[start:i+1])

print(f'Total products: {len(entries)}')
for entry in entries:
    try:
        obj = json.loads(entry)
        print(f'  {obj["code"]:10s} std={obj["standard"]:5s} size={obj["size"]:15s} cn={obj["exw_vnd_cn"]} other={obj["exw_vnd_other"]}')
    except Exception as e:
        print(f'  ERROR: {e}')

# Now check old data sizes for the duplicate-code products
# Find the old DATA_PRODUCTS (we replaced it but check what sizes we should use)
# F15A2 with A2- should be 15±1 µm, F15A2 with A2 should be 15±1 µm (same size, different price)
# F17A2 with A2- should be 17±1 µm, F17A2 with A2 should be 17±1 µm
# etc.

# Check the issues in detail
import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# 1. Check applyMarket function for recursion bug
idx = d.find('function applyMarket')
if idx >= 0:
    end = d.find('function setMarket', idx)
    func = d[idx:end]
    print(f'applyMarket function:')
    print(func[:600])
    
# 2. Calculate product counts
prod_start = d.find('var DATA_PRODUCTS = [')
prod_end = d.find('];', prod_start) + 2
prods = d[prod_start:prod_end]
count = prods.count('"code"')
print(f'\nProduct count: {count}')

# 3. Check for F17A2 with A2 standard (which exists in old data)
if 'F17A2' in prods:
    idx2 = prods.find('"F17A2"')
    print(f'\nF17A2 entry: {prods[idx2:idx2+200]}')

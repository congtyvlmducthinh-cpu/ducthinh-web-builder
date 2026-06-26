import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check the full renderPriceTab for price logic issues
# The table header has colspans, check if they match data cols
idx = d.find('function renderPriceTab')
tab = d[idx:d.find('function renderCalcTab') if 'function renderCalcTab' in d[idx:] else idx+10000]
print(tab)

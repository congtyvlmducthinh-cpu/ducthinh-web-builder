# Now check what the old data had that the current DOES NOT have
import sys, json, openpyxl
sys.stdout.reconfigure(encoding='utf-8')

# Read current HTML - check old data sizes vs new data sizes
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

raw = d[d.find('var DATA_PRODUCTS = [') + 20 : d.find('];', d.find('var DATA_PRODUCTS = ['))]
entries, depth, start = [], 0, 0
for i, ch in enumerate(raw):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(raw[start:i+1])
prods = [json.loads(e) for e in entries]

# Check applyMarket is COMPLETE - writes ALL 8 fields
idx = d.find('function applyMarket')
if idx >= 0:
    end = d.find('function setMarket', idx)
    print("applyMarket function:")
    print(d[idx:end])

# Check the CIF/FOB calc to see if it uses exw_vnd correctly
idx2 = d.find('function getCalcPriceData')
end2 = d.find('function showQuotationPopup', idx2)
print("\n\ngetCalcPriceData function:")
print(d[idx2:end2])

# Check renderPriceTab
idx3 = d.find('function renderPriceTab')
end3 = d.find('function renderBagsTab', idx3)
print("\n\nrenderPriceTab (first 2000 chars):")
print(d[idx3:min(idx3+2000, end3)])

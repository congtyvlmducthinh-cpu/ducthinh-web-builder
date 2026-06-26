import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check init sequence at the end of JS
# Find right before </script>
idx = d.find('applyMarket')
end = d.find('</script>', idx)
print('Init sequence:')
print(d[idx:end])

# Check activeTab default
idx2 = d.find('var activeTab')
print(f'\nactiveTab: {d[idx2:idx2+60]}')

# Check priceMode default  
idx3 = d.find('var priceMode')
print(f'priceMode: {d[idx3:idx3+60]}')

# Check lccType default
idx4 = d.find('var lccType')
print(f'lccType: {d[idx4:idx4+60]}')

# Check all DATA_PRODUCTS exw_vnd values (first 5)
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
import json
prods = [json.loads(e) for e in entries]
print(f'\nFirst 3 product exw_vnd:')
for p in prods[:3]:
    print(f'  {p["code"]}: exw_vnd={p["exw_vnd"]}, exw_vnd_cn={p["exw_vnd_cn"]}, exw_vnd_other={p["exw_vnd_other"]}')
print(f'\nCheck all exw_vnd for null/NaN:')
for p in prods:
    if p['exw_vnd'] is None:
        print(f'  {p["code"]}: exw_vnd is NULL')

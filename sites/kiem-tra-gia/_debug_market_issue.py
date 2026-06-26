# Debug: Check what went wrong
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check price mode bar exists
for item in ['price-mode-bar', 'priceModeBar', 'mode-group', 'mode-btn', 'setPriceMode', 'lccGroup', 'freightGroup']:
    idx = d.find(item)
    ok = idx >= 0
    print(f'{item}: {"✅" if ok else "❌"}')

# Check the control bar / toolbar area
idx = d.find('controlBar')
if idx >= 0:
    end = d.find('</div>', idx)
    end = d.find('</div>', end + 6) + 6  # closing of parent
    area = d[max(0,idx-50):end]
    print(f'\ncontrolBar area:\n{area[:500]}')

# Check if priceModeBar content is complete
idx2 = d.find('priceModeBar')
if idx2 >= 0:
    end2 = d.find('</div>', d.find('freightGroup'))
    end2 = d.find('</div>', end2 + 6) + 6
    area2 = d[idx2:end2]
    print(f'\npriceModeBar area:\n{area2[:500]}')

# Check if setMarket or market toggle broke something
idx3 = d.find('marketGroup')
if idx3 >= 0:
    ctx = d[max(0,idx3-50):idx3+150]
    print(f'\nmarketGroup context:\n{ctx}')

# Check setPriceMode function
idx4 = d.find('function setPriceMode')
if idx4 >= 0:
    print(f'\nsetPriceMode at offset {idx4} ✅')
else:
    print(f'\nsetPriceMode function NOT FOUND ❌')

# Check setLccType function
idx5 = d.find('function setLccType')
if idx5 >= 0:
    print(f'setLccType at offset {idx5} ✅')
else:
    print(f'setLccType function NOT FOUND ❌')

# Check onFreightChange
idx6 = d.find('function onFreightChange')
if idx6 >= 0:
    print(f'onFreightChange at offset {idx6} ✅')
else:
    print(f'onFreightChange function NOT FOUND ❌')

# Check the data - first product sample
prod_start = d.find('"exw_vnd":')
prod_end = d.find(',', prod_start + 20)
print(f'\nFirst product exw_vnd: {d[prod_start:prod_end+20]}')

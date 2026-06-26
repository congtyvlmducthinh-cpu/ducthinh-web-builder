# Fix market toggle placement - move to controlBar
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# First, remove the market toggle from where it was wrongly inserted
# Find the wrong market toggle HTML (inside price-mode-bar)
bad_start = d.find('<div id="marketGroup"')
bad_end = d.find('</div>', bad_start) + 6
if bad_start >= 0 and bad_end > bad_start:
    d = d[:bad_start] + d[bad_end:]
    print(f'Removed wrong marketGroup at offset {bad_start}')
else:
    print('marketGroup not found to remove!')
    # Check if it exists
    idx = d.find('marketGroup')
    print(f'marketGroup offset: {idx}')
    if idx >= 0:
        ctx = d[max(0,idx-50):idx+200]
        print(f'Context: {repr(ctx)}')

# Now add the market toggle into controlBar, after currency-toggle
toggle_end = d.find('</div>', d.find('class="currency-toggle"'))
toggle_end = d.find('</div>', toggle_end + 6) + 6

market_html = '''
<div class="btn-group" id="marketGroup" style="display:inline-flex;margin-left:6px;gap:3px">
<span class="ext-label">🌏 Thị trường:</span>
<button class="btn-sm active" id="marketCn" onclick="setMarket('cn')">🇨🇳 TQ</button>
<button class="btn-sm" id="marketOther" onclick="setMarket('other')">🌏 Khác</button>
</div>'''

d = d[:toggle_end] + market_html + d[toggle_end:]

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d)

print(f'✅ Added market toggle after currency-toggle (offset {toggle_end})')

# Also fix the JS - setMarket should also call render() directly
# Currently it calls applyMarket() which calls render()
# The setMarket should toggle active class
js_idx = d.find('function setMarket')
if js_idx >= 0:
    print('setMarket function found in JS ✅')

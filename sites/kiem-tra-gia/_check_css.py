# Check if btn-sm CSS class exists
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check btn-sm CSS
idx = d.find('btn-sm')
print(f'btn-sm in HTML: {"✅" if idx>=0 else "❌"} offset {idx}')
if idx >= 0:
    # Show context
    start = d.rfind('.', 0, min(idx+1, d.find('{', idx)))
    print(f'  CSS context: {d[start:d.find("}", start)+1][:200]}')

# Check active class on market buttons
idx2 = d.find('marketCn')
print(f'\nmarketCn button:')
print(d[idx2:idx2+100])

# Check if market toggle works - test from JS context
idx3 = d.find('function toggleCurrency')
if idx3 >= 0:
    end3 = d.find('\n}', d.find('}', idx3 + 30)) + 2
    print(f'\ntoggleCurrency: {d[idx3:end3]}')

# The main issue might be that market toggle buttons don't have proper CSS
# Let's check the CSS style tag
style_start = d.find('<style>')
style_end = d.find('</style>')
css = d[style_start:style_end]
# Check if .btn-sm defined
if '.btn-sm' in css:
    print('\n.btn-sm CSS ✅')
else:
    print('\n.btn-sm CSS ❌ - NEED TO ADD')

# Check if .ext-label defined
if '.ext-label' in css:
    print('.ext-label CSS ✅')
else:
    print('.ext-label CSS ❌')

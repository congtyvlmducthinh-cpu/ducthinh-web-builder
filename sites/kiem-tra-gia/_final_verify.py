# Final verification
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

for item in ['marketGroup', 'marketCn', 'marketOther', 'function setMarket', 'function applyMarket']:
    idx = d.find(item)
    ok = idx >= 0
    print(f'{item}: {"✅" if ok else "❌"} (offset {idx})')

# Show the market toggle HTML
idx = d.find('marketGroup')
if idx >= 0:
    start = d.rfind('<', 0, idx)
    end = d.find('</div>', idx) + 6
    print(f'\nMarket toggle HTML:')
    print(d[start:end])

# Check JS validation: new Function()
idx = d.find('var DATA_PRODUCTS = [')
after_products = d.find('];', idx) + 2
all_js = d[after_products:]
# Find script end
script_end = d.find('</script>', idx)
all_js = d[idx:script_end]
try:
    compile(all_js, '<test>', 'exec')
    print('\nJavaScript syntax: ✅ Valid!')
except SyntaxError as e:
    print(f'\n⚠️ JS Syntax error: {e}')

# Verify the changes
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    d = f.read()

checks = ['marketCn', 'marketOther', 'currentMarket', 'function applyMarket', 'function setMarket',
          'exw_vnd_cn', 'exw_vnd_other', 'setMarket', 'Trung Quốc']
for item in checks:
    idx = d.find(item)
    ok = idx >= 0
    print(f'  {item}: {"✅" if ok else "❌"} (offset {idx})')

# Check DATA_PRODUCTS first entry
start = d.find('var DATA_PRODUCTS = [')
end = d.find('];', start) + 2
first_entry_end = d.find('}', start)
print(f'\nFirst product (truncated):')
print(d[start:first_entry_end+1][:500])

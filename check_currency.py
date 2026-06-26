import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()
idx = d.find('function renderCalcTab()')
end = d.find('function renderBagsTab()', idx)
sub = d[idx:end]

# Find the exact currency toggle section
cidx = sub.find('Tiền tệ')
midx = sub.find('Sản phẩm', cidx)

print('=== From Tiền tệ to Sản phẩm ===')
print(repr(sub[cidx-20:midx+20]))
print()

# Check the actial div structure more carefully
lines = sub.split('\n')
for i, l in enumerate(lines):
    if any(x in l for x in ['Tiền tệ', 'calc-currency', 'calc-section', 'calc-row', 'calc-left', 'calc-right', 'calc-container']):
        print(f'{i}: {repr(l.strip()[:120])}')

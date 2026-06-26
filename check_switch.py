import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find both toggleCurrency and switchTab
idx1 = d.find('function toggleCurrency')
idx2 = d.find('function switchTab')
idx2b = d.find('function switchTab', idx2+1)

print('First switchTab context:')
print(repr(d[idx2-60:idx2+80]))
print()
print('=== Second switchTab ===')
print(d[idx2b:idx2b+800])

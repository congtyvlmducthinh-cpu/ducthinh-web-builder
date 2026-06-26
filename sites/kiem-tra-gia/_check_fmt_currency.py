import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find formatCurrency
idx = d.find('function formatCurrency')
if idx >= 0:
    brace = 0
    started = False
    for i in range(idx, len(d)):
        if d[i] == '{': brace += 1; started = True
        elif d[i] == '}':
            brace -= 1
            if started and brace == 0:
                print('formatCurrency:')
                print(d[idx:i+1])
                break

# Find the price row generation
idx2 = d.find('exw_vnd')
ctx = d[max(0,idx2-10):idx2+20]
print('\nFirst exw_vnd reference:', repr(ctx))

# Check populateFilters
idx3 = d.find('function populateFilters')
if idx3 >= 0:
    brace = 0
    started = False
    for i in range(idx3, len(d)):
        if d[i] == '{': brace += 1; started = True
        elif d[i] == '}':
            brace -= 1
            if started and brace == 0:
                print('\npopulateFilters (first 500):')
                print(d[idx3:min(idx3+500, i+1)])
                break

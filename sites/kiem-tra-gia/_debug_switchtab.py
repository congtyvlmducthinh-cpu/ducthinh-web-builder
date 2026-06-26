import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check switchTab function completely
idx = d.find('function switchTab')
brace = 0
started = False
for i in range(idx, len(d)):
    if d[i] == '{': brace += 1; started = True
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            print(d[idx:i+1])
            break

# Check what HTML tabs exist - content divs
print('\n\n--- Tab content divs ---')
for tab in ['pricelist', 'calc', 'bags', 'others', 'manage']:
    find = f'id="tab-{tab}"'
    idx2 = d.find(find)
    if idx2 >= 0:
        prev = d.rfind('<div', 0, idx2)
        print(f'tab-{tab}: offset={prev}, {d[prev:prev+80]}')
    else:
        print(f'tab-{tab}: NOT FOUND')
        # Try content-{tab}
        find2 = f'id="content-{tab}"'
        idx3 = d.find(find2)
        if idx3 >= 0:
            prev = d.rfind('<div', 0, idx3)
            print(f'  Found as content-{tab}: {d[prev:prev+80]}')

# Check the initial HTML state - what's visible?
print('\n\n--- Initial active tab variable ---')
var_idx = d.find('var activeTab')
if var_idx >= 0:
    print(f'var activeTab: {d[var_idx:var_idx+60]}')

var_idx2 = d.find('var currentTab')
if var_idx2 >= 0:
    print(f'var currentTab: {d[var_idx2:var_idx2+60]}')

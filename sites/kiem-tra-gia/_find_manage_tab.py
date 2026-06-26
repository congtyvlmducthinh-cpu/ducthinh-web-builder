import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find all tab container ids
for kw in ['manageTab', 'manage', 'Upload', 'quản lý']:
    idx = d.find(kw)
    if idx >= 0:
        print(f'{kw}: at {idx}')
        print(d[max(0,idx-50):idx+200])
        print('---')

# Find tab-content blocks
idx = d.find('class="tab-content"')
while idx >= 0:
    print(f'tab-content at {idx}')
    print(d[idx:idx+300])
    print('---')
    idx = d.find('class="tab-content"', idx+1)

# Find all tabs
idx = d.find('data-tab')
while idx >= 0:
    ctx = d[idx:idx+60]
    print(f'data-tab: {repr(ctx)}')
    idx = d.find('data-tab', idx+1)

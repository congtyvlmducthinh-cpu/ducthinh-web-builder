import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check any localStorage/sessionStorage/save/export persistence
for term in ['localStorage', 'sessionStorage', 'save', 'persist', 'export']:
    idx = d.find(term)
    while idx >= 0:
        ctx = d[max(0,idx-30):idx+100]
        print(f'{term} at {idx}: {repr(ctx)}')
        idx = d.find(term, idx+1)

# Also check init sequence - how does the page load data on startup?
idx2 = d.find('applyMarket')
print(f'\nInit sequence at {idx2}:')
print(d[idx2-50:idx2+200])

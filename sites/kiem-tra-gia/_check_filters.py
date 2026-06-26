import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check filter initialization — searchInput events, populateFilters
for term in ['searchInput', 'specFilter', 'machineFilter', 'populateFilters']:
    idx = d.find(term)
    while idx >= 0:
        ctx = d[max(0,idx-30):idx+150]
        if 'addEventListener' in ctx or 'oninput' in ctx or 'onchange' in ctx:
            print(f'{term} at {idx}: {repr(ctx)}')
        idx = d.find(term, idx+1)

# Check if search/specFilter/machineFilter are created in HTML
print('\n=== Search in HTML ===')
idx = d.find('searchInput"')
if idx >= 0:
    print(repr(d[max(0,idx-50):idx+100]))
else:
    idx = d.find('search"', 0, 30000)
    while idx >= 0:
        ctx = d[max(0,idx-50):idx+100]
        if 'search' in ctx.lower() and 'input' in ctx.lower():
            print(repr(ctx))
        idx = d.find('search"', idx+1)

# Check filter event listeners
print('\n=== oninput/onchange in HTML ===')
idx = d.find('oninput')
while idx >= 0:
    ctx = d[max(0,idx-30):idx+120]
    print(repr(ctx))
    idx = d.find('oninput', idx+1)

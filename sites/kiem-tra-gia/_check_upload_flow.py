import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the upload handler that handles DATA_PRODUCTS = s
idx = d.find('if (s.length > 0) {')
# Show from this forEach to the end of populateFilters
end = d.find('populateFilters()', idx)
print('=== Upload handler block: ===')
print(d[idx-100:end+200])
print()

# Check applyMarket
idx2 = d.find('function applyMarket()')
end2 = d.find('}', d.find('});', idx2) - 5)
print('=== applyMarket (full): ===')
# Find exact function end
brace = 0
started = False
for i in range(idx2, len(d)):
    if d[i] == '{': brace += 1; started = True
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            print(d[idx2:i+1])
            break

# Check switchTab and priceModeBar display logic
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find switchTab function
idx = d.find('function switchTab')
if idx >= 0:
    # Find closing brace
    brace = 0
    start = idx
    for i in range(idx, len(d)):
        if d[i] == '{': brace += 1
        elif d[i] == '}':
            brace -= 1
            if brace == 0:
                print(d[start:i+1])
                break

# Find setMarket function
idx2 = d.find('function setMarket')
if idx2 >= 0:
    brace = 0
    for i in range(idx2, len(d)):
        if d[i] == '{': brace += 1
        elif d[i] == '}':
            brace -= 1
            if brace == 0:
                print(f'\nsetMarket:\n{d[idx2:i+1]}')
                break

# Check if there's a conflict with 'applyMarket' being called before render
# Find the render() call at the end
idx3 = d.find('applyMarket();')
idx4 = d.find('render();', idx3)
print(f'\napplyMarket(); at offset {idx3}')
print(f'render(); at offset {idx4}')
ctx = d[max(0,idx3-50):idx4+50]
print(f'Context: {ctx[:200]}')

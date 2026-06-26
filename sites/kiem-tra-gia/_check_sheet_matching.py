import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find hasSheet function and upload logic
idx = d.find('function hasSheet')
brace = 0
started = False
for i in range(idx, len(d)):
    if d[i] == '{': brace += 1; started = True
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            print('=== hasSheet ===')
            print(d[idx:i+1])
            print()
            break

# Find the sheet mapping for products
idx2 = d.find('prodSheet = hasSheet')
for i in range(3):
    ctx = d[idx2:idx2+200]
    print(ctx)
    print()
    idx3 = d.find('}', idx2)
    idx2 = idx3 + 1

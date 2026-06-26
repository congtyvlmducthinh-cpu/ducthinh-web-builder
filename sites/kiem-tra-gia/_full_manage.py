import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find manage tab container
idx = d.find('id=\"manageTab\"')
end = d.find('<div class=\"tab-content\"', idx + 50)
print('=== Manage container ===')
print(d[idx:idx+5000])
print()
print('=== Manage JS (case manage) ===')
idx2 = d.find('case \"manage\"')
brace = 0
started = False
for i in range(idx2, len(d)):
    if d[i] == '{': brace += 1; started = True
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            print(d[idx2:i+1])
            break

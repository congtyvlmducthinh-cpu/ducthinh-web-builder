import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find handleManageFile
idx = d.find('function handleManageFile')
brace = 0
started = False
for i in range(idx, len(d)):
    if d[i] == '{': brace += 1
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            print(d[idx:i+1])
            break
    if not started and brace > 0:
        started = True

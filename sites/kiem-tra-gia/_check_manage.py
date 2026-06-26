import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find Manage tab area in HTML (static)
idx = d.find('data-tab=\"manage\"')
end = d.find('</div>', idx)
found = False
for i in range(idx, len(d)):
    if d[i:i+5] == '</div>' and d[i:i+9] == '</div>\n\n<':
        end = i + 6
        break
print('=== Manage tab HTML ===')
print(d[idx:idx+2000])
print()
print('=== Manage tab JS ===')
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

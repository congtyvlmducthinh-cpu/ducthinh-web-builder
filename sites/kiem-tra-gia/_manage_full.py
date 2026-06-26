import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find manage dashboard area (after password)
idx = d.find('manageDashboard')
print('manageDashboard at', idx)
# Find end of manage tab content - look for next main tab-content div
end = d.find('<div class="tab-content"', idx + 100)
print(d[idx:end])

print('\n\n=== From manageLogin to end of manage section ===')
idx2 = d.find('function manageLogin')
brace = 0
started = False
for i in range(idx2, len(d)):
    if d[i] == '{': brace += 1; started = True
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            print(d[idx2:i+1])
            break

import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find globalSearch
idx = d.find('function globalSearch')
if idx >= 0:
    brace = 0
    started = False
    for i in range(idx, len(d)):
        if d[i] == '{': brace += 1; started = True
        elif d[i] == '}':
            brace -= 1
            if started and brace == 0:
                print('=== globalSearch ===')
                print(d[idx:i+1])
                break
else:
    print('globalSearch NOT FOUND')

# Check populateFilters
idx2 = d.find('function populateFilters')
if idx2 >= 0:
    print('\n=== populateFilters ===')
    brace = 0
    started = False
    for i in range(idx2, len(d)):
        if d[i] == '{': brace += 1; started = True
        elif d[i] == '}':
            brace -= 1
            if started and brace == 0:
                print(d[idx2:i+1])
                break
else:
    print('populateFilters NOT FOUND')

# Check if populateFilters is called on init
for term in ['populateFilters', 'populateFilter']:
    if d.count(term) < 2:
        print(f'{term} count: {d.count(term)} — only in definition?')

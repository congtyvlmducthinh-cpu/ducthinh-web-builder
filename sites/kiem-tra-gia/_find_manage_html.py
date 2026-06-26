import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find manageTab in HTML — look for the div that gets shown when manage is active
idx = d.find('manageTab')
if idx >= 0:
    print(f'manageTab at {idx}')
    print(d[idx-50:idx+2000])
else:
    print('manageTab not found')

# Find password div
idx2 = d.find('password')
if idx2 >= 0:
    print(f'\npassword at {idx2}')
    print(d[idx2-100:idx2+1000])

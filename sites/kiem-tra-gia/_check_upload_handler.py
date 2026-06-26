import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find upload Excel handling
for fn in ['handleManageFile', 'uploadExcel', 'processManageFile']:
    idx = d.find('function ' + fn)
    if idx < 0:
        idx = d.find(fn + ' = function')
    if idx < 0:
        idx = d.find(fn + ' (e')
    if idx >= 0:
        # Find the full function body
        brace = 0
        started = False
        for i in range(idx, len(d)):
            if d[i] == '{': brace += 1; started = True
            elif d[i] == '}':
                brace -= 1
                if started and brace == 0:
                    print(f'=== {fn} ===')
                    print(d[idx:i+1])
                    print()
                    break
    else:
        print(f'{fn}: NOT FOUND')

# Also check for any XLSX handling
idx2 = d.find('XLSX')
while idx2 >= 0:
    ctx = d[max(0,idx2-100):idx2+200]
    if 'sheet' in ctx.lower() or 'read' in ctx.lower() or 'parse' in ctx.lower():
        print(f'XLSX context at {idx2}:')
        print(repr(ctx))
        print()
    idx2 = d.find('XLSX', idx2+1)

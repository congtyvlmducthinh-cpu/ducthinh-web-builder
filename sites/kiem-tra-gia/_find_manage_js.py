import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find manage-related JS functions
for fn in ['manageLogin', 'manageUpload', 'downloadFile', 'downloadAsExcel', 'downloadAsJSON', 'uploadExcel']:
    idx = d.find('function ' + fn)
    if idx >= 0:
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

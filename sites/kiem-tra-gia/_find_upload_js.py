import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find event listeners for manage file input and drop zone
for ev in ['addEventListener', 'manageFileInput', 'manageDropZone', 'manageUploadStatus', 'upload']:
    idx = d.find(ev)
    while idx >= 0:
        ctx = d[max(0,idx-30):idx+120]
        if 'manage' in ctx.lower() or 'upload' in ctx.lower():
            print(f'{ev} at {idx}: {repr(ctx)}')
            print()
        idx = d.find(ev, idx+1)

# Check if there's any file reader logic
idx = d.find('FileReader')
if idx >= 0:
    ctx = d[max(0,idx-50):idx+300]
    print(f'FileReader at {idx}: {repr(ctx)}')

# Check sheetjs usage
for term in ['XLSX.read', 'XLSX.utils.sheet_to_json', 'sheet_to_json']:
    idx = d.find(term)
    if idx >= 0:
        ctx = d[max(0,idx-50):idx+200]
        print(f'{term} at {idx}: {repr(ctx)}')

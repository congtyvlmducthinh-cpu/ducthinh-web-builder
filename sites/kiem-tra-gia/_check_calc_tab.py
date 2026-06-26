import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find renderCalcTab and see what it shows
idx = d.find('function renderCalcTab')
end = d.find('function renderOthersTab', idx) if d.find('function renderOthersTab', idx) > 0 else d.find('function renderManageTab', idx)
rct = d[idx:end]

# Show first 2500 chars
print(rct[:2500])
print('\n\n==================== MIDDLE ====================\n')
print(rct[2500:5000])
print('\n\n==================== LATER ====================\n')
print(rct[5000:8000])

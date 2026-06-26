import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

items = ['qQty', 'qDelivery', 'qCustomer', 'qContact', 'qAssigned', 'qCustEmail', 'qValid', 'qPayment', 'qPort', 'qNote', 'qPreviewContent', 'qPreview', 'qPreviewBody', 'quotationPopup', 'calcProduct']
for item in items:
    idx = d.find('id="' + item + '"')
    print(f'{item}: at offset {idx} ({"FOUND" if idx >= 0 else "MISSING"})')

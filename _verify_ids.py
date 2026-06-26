# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

items = ['qQty', 'qDelivery', 'qContact', 'qAssigned', 'qCustEmail', 'qCustomer', 'qValid', 'qPayment', 'qPort', 'qNote', 'qPreviewContent', 'quotationPopup', 'calcProduct']
for item in items:
    idx = d.find('id="' + item + '"')
    print('id="' + item + '": offset ' + str(idx) + (' ✅' if idx >= 0 else ' ❌'))

# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html'

with open(path, 'r', encoding='utf-8') as f:
    d = f.read()

# Find insertion point after qCustomer, before qValid
target = '<div><label>\U0001f464 Khách hàng</label><input type="text" id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotationPreview()"></div>'
if target not in d:
    print("ERROR: target 1 not found")
    sys.exit(1)

idx = d.find(target) + len(target)

new_fields = '''
      <div><label>\U0001f4de Liên hệ</label><input type="text" id="qContact" placeholder="Người liên hệ..." oninput="updateQuotationPreview()"></div>
      <div><label>\U0001f464 Người phụ trách</label><input type="text" id="qAssigned" placeholder="Nhân viên phụ trách..." oninput="updateQuotationPreview()"></div>
      <div><label>\u2709\ufe0f Email KH</label><input type="email" id="qCustEmail" placeholder="Email khách hàng..." oninput="updateQuotationPreview()"></div>
      <div><label>\U0001f4e6 Số lượng (tấn)</label><input type="number" id="qQty" value="1" min="1" step="0.5" oninput="updateQuotationPreview()"></div>'''

d = d[:idx] + new_fields + d[idx:]

# Find qPort and add qDelivery before qNote
target2 = '<div><label>\U0001f30a Cảng đi</label><input type="text" id="qPort"'
if target2 not in d:
    print("ERROR: target 2 not found")
    sys.exit(1)

# Find the closing </div> after qPort
port_start = d.find('id="qPort"')
port_div_close = d.find('</div>', port_start) + len('</div>')

qdelivery = '''
      <div><label>\U0001f69a Giao hàng</label><input type="text" id="qDelivery" placeholder="Điều kiện giao hàng..." oninput="updateQuotationPreview()"></div>'''

d = d[:port_div_close] + qdelivery + d[port_div_close:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(d)

print("✅ Done - added missing form fields to quotation popup!")

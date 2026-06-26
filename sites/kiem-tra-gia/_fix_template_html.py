import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Fix broken HTML: duplicate manage-actions and missing >  
old = '''<h3>⬇ Tải dữ liệu</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin-bottom:10px">
<button class="btn-confirm" onclick="downloadFile(0)">📋 Giá bán</button>
<button class="btn-confirm" onclick="downloadFile(1)">📦 Bao bì</button>
<button class="btn-confirm" onclick="downloadFile(2)">📐 Quy cách khác</button>
</div>
<div class="btn-row">
<button class="btn-confirm" onclick="downloadAsExcel()">📊 Excel</button>
<button class="btn-cancel" onclick="downloadAsJSON()">📋 JS</button>
</div>
</div>
<div class="manage-actions"<div class="manage-actions">
<h3>📄 Tải file mẫu</h3>
<p style="font-size:.85rem;color:var(--muted);margin-bottom:8px">Tải file Excel mẫu có sẵn tiêu đề để nhập dữ liệu</p>
<div class="btn-row">
<button class="btn-confirm" onclick="downloadTemplate(0)">📋 Mẫu giá bán</button>
<button class="btn-confirm" onclick="downloadTemplate(1)">📦 Mẫu bao bì</button>
<button class="btn-confirm" onclick="downloadTemplate(2)">📐 Mẫu quy cách khác</button>
<button class="btn-cancel" onclick="downloadFullTemplate()">📊 Mẫu đầy đủ</button>
</div>
</div>
<div class="manage-actions">
<h3>📤 Upload dữ liệu mới</h3>📤 Upload dữ liệu mới</h3>'''

new = '''<h3>⬇ Tải dữ liệu</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin-bottom:10px">
<button class="btn-confirm" onclick="downloadFile(0)">📋 Giá bán</button>
<button class="btn-confirm" onclick="downloadFile(1)">📦 Bao bì</button>
<button class="btn-confirm" onclick="downloadFile(2)">📐 Quy cách khác</button>
<button class="btn-cancel" onclick="downloadTemplate(0)">📄 Mẫu giá bán</button>
<button class="btn-cancel" onclick="downloadTemplate(1)">📄 Mẫu bao bì</button>
<button class="btn-cancel" onclick="downloadTemplate(2)">📄 Mẫu quy cách khác</button>
</div>
<div class="btn-row">
<button class="btn-confirm" onclick="downloadAsExcel()">📊 Excel</button>
<button class="btn-cancel" onclick="downloadAsJSON()">📋 JS</button>
<button class="btn-confirm" onclick="downloadFullTemplate()">📊 Mẫu đầy đủ</button>
</div>
</div>
<div class="manage-actions">
<h3>📤 Upload dữ liệu mới</h3>'''

d2 = d.replace(old, new)

# Also remove the empty downloadTemplate and downloadFullTemplate JS functions since we moved buttons
# Actually keep them, they're referenced by buttons

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print('Fixed!')
print(f'Size: {len(d)} -> {len(d2)}')

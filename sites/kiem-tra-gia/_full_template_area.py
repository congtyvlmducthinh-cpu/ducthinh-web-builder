import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the problematic area — from "Tải dữ liệu" section to end of manage-actions
idx = d.find('Tải dữ liệu')
end = d.find('<h3>📄 Tải file mẫu</h3>')
print('=== From "Tải dữ liệu" to template section ===')
print(d[idx:idx+1500])
print()
print('=== Boundary at template section ===')
print(d[end-50:end+600])

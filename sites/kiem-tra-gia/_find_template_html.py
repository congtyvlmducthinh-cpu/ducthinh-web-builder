import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the template HTML section
idx = d.find('📄 Tải file mẫu')
end = d.find('📤 Upload dữ liệu mới</h3>', idx)
print(d[idx-100:end+100])

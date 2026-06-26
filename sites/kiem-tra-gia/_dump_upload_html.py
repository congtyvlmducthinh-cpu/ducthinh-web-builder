import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find manage dashboard upload section fully
idx = d.find('📤 Upload dữ liệu mới')
end = d.find('</div>\n</div>', idx) + 50
print('=== Upload section ===')
print(d[idx-100:end+100])

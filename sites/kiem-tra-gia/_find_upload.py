import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find upload section title
idx = d.find('📤 Upload dữ liệu mới')
end = d.find('</div>\n</div>\n</div>\n\n</div>', idx) + 50
print(d[idx-200:end])

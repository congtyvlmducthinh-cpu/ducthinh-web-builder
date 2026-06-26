import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Show the entire manage-actions section (download area + upload area)
idx = d.find('Tải dữ liệu')
end = d.find('manageDashboard', 27000)
if end < 0: end = idx + 4000
print(d[idx-20:end+50])
print()
print('=== After manageDashboard ===')
idx2 = d.find('</div>\n</div>\n</div>', end)
if idx2 > 0:
    print(f'end at {idx2}')
    print(d[end:idx2+50])

import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find upload section more precisely - show exact insert point
idx = d.find('📤 Upload dữ liệu mới')
# Show from here to end of the manage-actions div
end = d.find('</div>\n</div>', idx)  # finds the closing of this manage-actions
print(f'Upload section: from {idx} to about {end}')
print(d[idx:end+50])
print()
print(f'Character at {end}: {repr(d[end:end+20])}')

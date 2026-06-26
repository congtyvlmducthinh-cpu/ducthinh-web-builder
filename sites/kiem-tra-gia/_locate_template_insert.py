import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find exact positions
up_idx = d.find('📤 Upload dữ liệu mới')
end_idx = d.find('</div>\n</div>\n</div>\n\n</div>', up_idx) + 30

# Show exact boundary
print(f'Upload section: {up_idx} to {end_idx}')
print(d[up_idx-5:end_idx+5])

# Find template button position — right before the upload button text
print('\n\n=== looking for exact insert point ===')
# We want to add a "Tải file mẫu" button before the upload section title
# Or as a note next to the upload title
sub = d[up_idx:up_idx+50]
print(f'Upload title context: {repr(sub)}')

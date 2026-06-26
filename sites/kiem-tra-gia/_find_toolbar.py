# Find toolbar in index.html
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Search for toolbar
idx = content.find('toolbar')
while idx >= 0:
    line_start = content.rfind('\n', 0, idx)
    line_end = content.find('\n', idx)
    print(f'  offset {idx}: {content[line_start+1:line_end][:200]}')
    idx = content.find('toolbar', idx + 1)

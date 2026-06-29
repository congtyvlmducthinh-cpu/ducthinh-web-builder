import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Look for the full manage section HTML in vi - specifically after the upload section
last_manage = vi.rfind('manage-actions')
print("VI last manage-actions starts at", last_manage)

# Find the div that contains it - find the immediately preceding html
snippet_start = vi.find('manage-panel', last_manage-3000)
if snippet_start < 0:
    snippet_start = last_manage - 2000
snippet_end = vi.find('</script>', last_manage)
if snippet_end < 0:
    snippet_end = vi.find('<script', last_manage)

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_manage_tail.txt','w',encoding='utf-8') as f:
    f.write(vi[last_manage:snippet_end])
print(f"Written: vi_manage_tail.txt ({snippet_end - last_manage} chars)")

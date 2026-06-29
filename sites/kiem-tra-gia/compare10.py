import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Let's check the HTML structure right around the save section
# Find the save section HTML
vi_save_html = vi.find('Lưu lên server')
if vi_save_html < 0:
    vi_save_html = vi.find('saveServerBtn')
print(f"VI save section at char {vi_save_html}")

# Show what comes before the save section (about 500 chars)
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_b4save.txt','w',encoding='utf-8') as f:
    f.write(vi[vi_save_html-500:vi_save_html+300])

# Find the closing of manage panel in both
vi_close_manage = vi.find('</div>', vi.rfind('manage-panel'))
en_close_manage = en.find('</div>', en.rfind('manage-panel'))
print(f"VI close manage-panel at {vi_close_manage}")
print(f"EN close manage-panel at {en_close_manage}")

# Check the HTML around the entire manage section
vi_manage_start = vi.find('class="manage-panel"')
en_manage_start = en.find('class="manage-panel"')
print(f"\nVI manage-panel starts at {vi_manage_start}")
print(f"EN manage-panel starts at {en_manage_start}")

# Let me find the exact end of the manage panel HTML sections
vi_manage_end = vi.find('<script>', vi_manage_start)
en_manage_end = en.find('<script>', en_manage_start)
print(f"VI manage HTML to script: {vi_manage_end - vi_manage_start} chars")
print(f"EN manage HTML to script: {en_manage_end - en_manage_start} chars")

# The extra save section adds about 112 chars
# Now check for HTML malformation
print("\n--- VI last 300 chars before script ---")
last_vi = vi[vi_manage_end-300:vi_manage_end]
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_b4script2.txt','w',encoding='utf-8') as f:
    f.write(last_vi)

# Check which divs are open
open_divs = last_vi.count('<div')
close_divs = last_vi.count('</div>')
print(f"Open divs: {open_divs}, Close divs: {close_divs}")
print(f"Net: {open_divs - close_divs}")

print("\n--- EN last 300 chars before script ---")
last_en = en[en_manage_end-300:en_manage_end]
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_b4script2.txt','w',encoding='utf-8') as f:
    f.write(last_en)
open_divs_e = last_en.count('<div')
close_divs_e = last_en.count('</div>')
print(f"Open divs: {open_divs_e}, Close divs: {close_divs_e}")
print(f"Net: {open_divs_e - close_divs_e}")

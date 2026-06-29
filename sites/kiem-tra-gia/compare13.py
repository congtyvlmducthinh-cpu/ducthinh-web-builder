import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Get the renderPriceTab function responses and write to file for side-by-side
vi_render_start = vi.find('function renderPriceTab() {')
en_render_start = en.find('function renderPriceTab() {')

vi_render_end = vi.find('\nfunction renderBagsTab()', vi_render_start)
en_render_end = en.find('\nfunction renderBagsTab()', en_render_start)

vi_func = vi[vi_render_start:vi_render_end]
en_func = en[en_render_start:en_render_end]

# Write to file
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_rt2.txt','w',encoding='utf-8') as f:
    f.write(vi_func)
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_rt2.txt','w',encoding='utf-8') as f:
    f.write(en_func)

# Now check the javascript syntax: specifically look at the "Giá bán" line which differs
# Check line 54 (0-indexed line 53)
vi_lines = vi_func.split('\n')
en_lines = en_func.split('\n')

# Find the thead construction lines
for i in range(max(len(vi_lines), len(en_lines))):
    vi_line = vi_lines[i] if i < len(vi_lines) else "---"
    en_line = en_lines[i] if i < len(en_lines) else "---"
    if vi_line != en_line:
        idx_diff = next((j for j, (a,b) in enumerate(zip(vi_line, en_line)) if a != b), -1)
        with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_diff.txt','a',encoding='utf-8') as f:
            f.write(f"Line {i}:\n")
            f.write(f"  VI: {vi_line}\n")
            f.write(f"  EN: {en_line}\n\n")
print("Written to vi_diff.txt")

# Now let me investigate the actual visual issue
# Open the web page with a browser to see the error

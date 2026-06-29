import re, difflib

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Extract renderPriceTab from both
vi_render_start = vi.find('function renderPriceTab() {')
en_render_start = en.find('function renderPriceTab() {')

vi_render_end = vi.find('\nfunction renderBagsTab()', vi_render_start)
en_render_end = en.find('\nfunction renderBagsTab()', en_render_start)

vi_func = vi[vi_render_start:vi_render_end]
en_func = en[en_render_start:en_render_end]

# Focus on lines that differ
vi_lines = vi_func.split('\n')
en_lines = en_func.split('\n')

for i, (vl, el) in enumerate(zip(vi_lines, en_lines)):
    if vl != el:
        print(f"Line {i}:")
        print(f"  VI: {vl[:150]}")
        print(f"  EN: {el[:150]}")
        print()

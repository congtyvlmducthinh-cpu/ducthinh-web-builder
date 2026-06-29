import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Check the actual script block content vs HTML content
vi_scripts = re.findall(r'<script[^>]*>(.*?)</script>', vi, re.DOTALL)
en_scripts = re.findall(r'<script[^>]*>(.*?)</script>', en, re.DOTALL)

print(f"VI has {len(vi_scripts)} script blocks")
for i, s in enumerate(vi_scripts):
    print(f"  Block {i}: src attr check: {'src' in vi.split('<script')[i+1].split('>')[0]}")

# Find where the actual script content begins
# In vi.html, where does // Data appear (which is the start of real script content)?
vi_data_pos = vi.find('// Data\nvar DATA_PRODUCTS')
en_data_pos = en.find('// Data\nvar DATA_PRODUCTS')
print(f"\nVI data at: {vi_data_pos}")
print(f"EN data at: {en_data_pos}")

# Find previous </div> that should close the HTML section
vi_prev_close = vi.rfind('</div>', 0, vi_data_pos)
en_prev_close = en.rfind('</div>', 0, en_data_pos)
print(f"VI prev </div> at: {vi_prev_close} (gap: {vi_data_pos - vi_prev_close})")
print(f"EN prev </div> at: {en_prev_close} (gap: {en_data_pos - en_prev_close})")

# Show what's between the preceding </div> and the data start (100 chars)
vi_between = vi[vi_prev_close:vi_data_pos]
en_between = en[en_prev_close:en_data_pos]
print(f"\nVI between </div> and data ({len(vi_between)} chars):")
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_between.txt','w',encoding='utf-8') as f:
    f.write(vi_between)
print(f"EN between </div> and data ({len(en_between)} chars):")
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_between.txt','w',encoding='utf-8') as f:
    f.write(en_between)

# Also check what comes before the script tag
vi_script_tag = vi.find('<script>', vi_prev_close)
en_script_tag = en.find('<script>', en_prev_close)
print(f"\nVI <script> at: {vi_script_tag} (offset from data: {vi_data_pos - vi_script_tag})")
print(f"EN <script> at: {en_script_tag} (offset from data: {en_data_pos - en_script_tag}")

vi_before_script = vi[vi_script_tag-200:vi_script_tag]
en_before_script = en[en_script_tag-200:en_script_tag]
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_b4script.txt','w',encoding='utf-8') as f:
    f.write(vi_before_script)
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_b4script.txt','w',encoding='utf-8') as f:
    f.write(en_before_script)
print("done")

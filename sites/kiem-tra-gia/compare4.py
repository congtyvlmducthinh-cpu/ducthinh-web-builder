import sys, re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'r', encoding='utf-8') as f:
    vi = f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html', 'r', encoding='utf-8') as f:
    en = f.read()

# Count script tags
vi_scripts = re.findall(r'<script[^>]*>(.*?)</script>', vi, re.DOTALL)
en_scripts = re.findall(r'<script[^>]*>(.*?)</script>', en, re.DOTALL)
print(f"VI has {len(vi_scripts)} script blocks")
print(f"EN has {len(en_scripts)} script blocks")
for i, s in enumerate(vi_scripts):
    print(f"  VI block {i}: {len(s)} chars, starts with: {s[:50]}")
for i, s in enumerate(en_scripts):
    print(f"  EN block {i}: {len(s)} chars, starts with: {s[:50]}")

# Now compare the app scripts (last block)
vi_app = vi_scripts[-1] if len(vi_scripts) > 1 else ""
en_app = en_scripts[-1] if len(en_scripts) > 1 else ""

# Check saveToServer
print(f"\nVI has saveToServer: {'saveToServer' in vi_app}")
print(f"EN has saveToServer: {'saveToServer' in en_app}")

# Check for the "Save to server" HTML section 
stxt = chr(0x1f4be)
save_marker = stxt + ' L' if 'Lưu lên server' in vi else None
print(f"\nVI 'Lưu lên server' found: {'L' + chr(0x00b0)+'u l' + chr(0x00ea)+'n server' in vi}")

# Find the actual HTML difference - check for missing div closure
# Look at the save button HTML
vi_last = vi.rfind('Lưu lên server')
en_last = en.rfind('Save to server') if 'Save to server' in en else -1
# Actually en might use different text
for line in ['Lưu lên server', 'Save to server', '<button class="btn-confirm" id="saveServerBtn"']:
    vi_idx = vi.find(line)
    en_idx = en.find(line)
    print(f"\n'{line}': VI at {vi_idx}, EN at {en_idx}")

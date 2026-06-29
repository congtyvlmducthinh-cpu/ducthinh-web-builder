import sys, re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'r', encoding='utf-8') as f:
    vi = f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html', 'r', encoding='utf-8') as f:
    en = f.read()

# Extract the script
vi_script_start = vi.index('<script>') + len('<script>')
vi_script_end = vi.index('</script>')
vi_script = vi[vi_script_start:vi_script_end]

en_script_start = en.index('<script>') + len('<script>')
en_script_end = en.index('</script>')
en_script = en[en_script_start:en_script_end]

print(f"VI script: {len(vi_script)} chars")
print(f"EN script: {len(en_script)} chars")

# Check for saveToServer function
if 'saveToServer' in vi_script:
    print("\nVI has saveToServer function")
else:
    print("\nVI MISSING saveToServer function!")
    
# Check for the 'Save to server' button in HTML
if 'L%C6%B0u%20l%C3%AAn%20server' in vi or 'Lưu lên server' in vi:
    print("VI has Save to server text")
else:
    print("VI MISSING Save to server text")
    
# Check the manage section HTML around the save button
m_idx = vi.find('manage-actions')
last_m = vi.rfind('manage-actions')
print(f"\nVI manage-actions found at: {m_idx}, last: {last_m}")
print(f"EN manage-actions found at: {en.find('manage-actions')}, last: {en.rfind('manage-actions')}")

# The VI file might have a different manage section
from urllib.parse import unquote
vi_last_actions = vi[last_m:]
print(f"\nVI last manage-actions ({len(vi_last_actions)} chars):")
print(repr(vi_last_actions[:1000]))

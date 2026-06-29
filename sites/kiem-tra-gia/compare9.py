import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Find the saveToServer function in the VI script
# First find it within the script block
vi_script_start = vi.find('// Data\nvar DATA_PRODUCTS')
vi_script = vi[vi_script_start:]

# Find saveToServer
save_idx = vi_script.find('function saveToServer')
if save_idx >= 0:
    # Extract the function (until next function)
    save_end = vi_script.find('\nfunction ', save_idx+1)
    if save_end < 0:
        save_end = vi_script.find('\n// ======' , save_idx)
    if save_end < 0:
        save_end = save_idx + 5000  # limit
    save_func = vi_script[save_idx:save_end]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_save_func.txt','w',encoding='utf-8') as f:
        f.write(save_func)
    print(f"saveToServer function: {len(save_func)} chars")
    print("First 200 chars:")
    print(save_func[:200])
else:
    print("saveToServer not found in script!")

# Also check for syntax errors - look for unbalanced braces
# Check the whole script
lines = vi_script.split('\n')
open_braces = 0
for i, line in enumerate(lines):
    line_clean = line.split('//')[0]  # Remove comments
    line_clean = re.sub(r'/\*.*?\*/', '', line_clean, flags=re.DOTALL)
    open_braces += line_clean.count('{') - line_clean.count('}')
    if open_braces < 0:
        print(f"\nWARNING: Unbalanced closing brace at line {i}: {line[:80]}")
        open_braces = 0
        
print(f"\nTotal brace balance: {open_braces} (0 = balanced)")

# Check string syntax - look for unterminated strings
# Check the save function specifically for any syntax issues
if save_idx >= 0:
    save_text = vi_script[save_idx:save_end]
    # Look for unbalanced single quotes or double quotes in the function body
    # (this is approximate; template literals and escaped quotes complicate things)
    # Instead, just check if there's a line that breaks the pattern
    print("\n--- saveToServer function ---")
    # Print every line that starts with 'function' or '}' to check structure
    for l in save_text.split('\n')[:5]:
        print(l[:200])

import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Extract the full script content after data definitions
vi_script_start = vi.find('// ======') 
en_script_start = en.find('// ======')

vi_script = vi[vi_script_start:]
en_script = en[en_script_start:]

print(f"VI script: {len(vi_script)} chars")
print(f"EN script: {len(en_script)} chars")

# Check for syntax issues: look for strings that might not match
# Specifically, check if 'chưa bao bì' or similar strings have single quotes inside single-quoted JS strings
# In JS, single-quoted strings can't contain unescaped single quotes

# Let me check for problematic characters in string context
# Look for single quotes that appear within single-quoted strings
vi_lines = vi_script.split('\n')

# Check each line for potential issues with Vietnamese text containing apostrophes
for i, line in enumerate(vi_lines):
    # Strip comments
    no_comment = line.split('//')[0].split('/*')[0]
    # Check single-quoted string balance
    in_single_quote = False
    quote_positions = []
    for j, ch in enumerate(line):
        if ch == "'" and (j == 0 or line[j-1] != '\\'):
            if in_single_quote:
                in_single_quote = False
            else:
                in_single_quote = True
                quote_positions.append(j)
    
    # Check for lines with Vietnamese words that have apostrophes (like 'n, 'm)
    vi_apostrophe_words = ["'n", "'m", "ch'", "d'", "l'", "t'"]
    for word in vi_apostrophe_words:
        if word in no_comment:
            # Find the word
            idx = no_comment.find(word)
            context = no_comment[max(0,idx-10):idx+10]
            print(f"Line {i}: Found potential issue '{word}' in context: {context}")

print("\n--- Check done ---")

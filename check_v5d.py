import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# Fix the broken __() for "-- Tu dong (theo quy cach bao) --"
# Currently: + __('-- Tu dong (theo quy cach bao) --') + 
# The issue is that the ) in the key closes the __() function call
# We need to change the key to use a different string OR handle the
# escaping differently

# Actually look at the actual pattern:
idx = t.find("-- Tu dong (theo quy cach bao) --")
if idx > 0:
    ctx = t[idx-20:idx+60]
    print(repr(ctx))

# The issue is that __("key with ) ") will break because ) closes the function
# We need to remove this key from replacements and use a different approach
# Or change the LANG key to avoid parens

# Remove this key from __() and revert to original
# Find all occurrences of the pattern
import re
# This key has ) inside - it will break JS
# We already stored it in LANG, need to fix the reference
# Actually in JS, the __() call will close at first ) 
# So + __('-- Tu dong (theo quy cach bao) --') + 
# The JS parser sees: __("-- Tu dong (")  and then "theo quy cach bao) --") 
# This IS a problem.

# Let's check what the actual output looks like
pattern = r"\+ __\('-- Tự động \(theo quy cách bao\) --'\) \+"
matches = list(re.finditer(pattern, t))
print(f'\nFound {len(matches)} occurrences')
for m in matches:
    ctx = t[max(0,m.start()-30):m.end()+30]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print(f'  {safe[:100]}')

# The fix: escape the inner parens or use a different key
# Actually in JS string, the parens don't need escaping
# Let me check what's happening

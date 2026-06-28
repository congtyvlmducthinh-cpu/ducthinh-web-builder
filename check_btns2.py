import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# Check: were lang buttons already injected?
hdr = t.find('</header>')
prev100 = t[hdr-150:hdr]
print(repr(prev100))

# The div with lang buttons should contain "data-lang"
# Let's check if it exists
if 'data-lang="vi"' in t[:hdr]:
    print("LANG BUTTONS ALREADY PRESENT")
else:
    print("LANG BUTTONS MISSING - need to inject!")

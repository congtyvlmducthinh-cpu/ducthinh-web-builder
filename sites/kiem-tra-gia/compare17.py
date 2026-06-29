import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# OK, I need to find what's breaking the JS when it renders.
# The issue is that vi.html loads but shows admin panel instead of pricelist.
# This means a JS error is occurring during render/initialize.
# Let me check the init sequence more carefully.

# Find where switchTab is called
vi_switch = vi.find('switchTab(')
en_switch = en.find('switchTab(')
print("VI last switchTab call:")
print(vi[vi_switch:vi_switch+80])
print("\nEN last switchTab call:")
print(en[en_switch:en_switch+80])

# Check what's between the last switchTab and the closing of script
vi_switch_end = vi.find('switchTab("pricelist")')
en_switch_end = en.find('switchTab("pricelist")')

# Get the actual script tail  
vi_tail = vi[vi_switch_end:vi.find('</script>', vi_switch_end)]
en_tail = en[en_switch_end:en.find('</script>', en_switch_end)]

print("\nVI tail (after switchTab):")
print(vi_tail[:300])
print("\nEN tail (after switchTab):")
print(en_tail[:300])

# ALSO: The page shows "📊 0 SP" which means data not loaded - this is the header badge
# That is initialized with no products loaded. But in en/zh it works.
# Let's check if localStorage data loading might be broken in VI

# Check for localStorage loading
vi_local = vi.find('localStorage.getItem')
en_local = en.find('localStorage.getItem')
print("\nVI localStorage loading:")
print(vi[vi_local:vi_local+200] if vi_local > 0 else "NOT FOUND")
print("\nEN localStorage loading:")
print(en[en_local:en_local+200] if en_local > 0 else "NOT FOUND")

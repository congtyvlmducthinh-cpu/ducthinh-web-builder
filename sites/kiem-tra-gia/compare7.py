import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Find saveToServer in vi
st_idx = vi.find('saveToServer')
en_has = en.find('saveToServer')
print(f"VI saveToServer starts at char {st_idx}")
print(f"EN has saveToServer: {en_has >= 0}")

# Get the saveToServer section
vi_save_section = vi[st_idx:]
# Find where this block ends (next function or end)
end_match = re.search(r'\nfunction\s+\w+', vi_save_section[1:])
if end_match:
    print(f"End of saveToServer at char {end_match.start()}")
    
# Extract the saveToServer function
save_func_end = vi.find('applyMarket', st_idx)
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_save_func.txt','w',encoding='utf-8') as f:
    f.write(vi[st_idx:save_func_end+200])
print(f"Written save function ({save_func_end+200 - st_idx} chars)")

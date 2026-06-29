import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Extract the very end of both scripts - the init section
s = 'localStorage.getItem("dq_quote_num"'
vi_end = vi[vi.rfind(s)-100:]
en_end = en[en.rfind(s)-100:]

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_end2.txt','w',encoding='utf-8') as f:
    f.write(vi_end)
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_end2.txt','w',encoding='utf-8') as f:
    f.write(en_end)
print('done')

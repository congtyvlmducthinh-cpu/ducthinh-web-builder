import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Compare HTML structure rather than script - look at the <body> section
# Count <div> and </div> in raw HTML (excluding script content)
vi_html_only = vi[:vi.find('// Data')]
en_html_only = en[:en.find('// Data')]

vi_open = vi_html_only.count('<div')
vi_close = vi_html_only.count('</div>')
en_open = en_html_only.count('<div')
en_close = en_html_only.count('</div>')

print(f"VI HTML only: div open={vi_open}, div close={vi_close}, net={vi_open-vi_close}")
print(f"EN HTML only: div open={en_open}, div close={en_close}, net={en_open-en_close}")

# Check the manage section more carefully
vi_manage = vi[:vi.find('manage-panel')]
en_manage = en[:en.find('manage-panel')]
vi_m_open = vi_manage.count('<div')
vi_m_close = vi_manage.count('</div>')
en_m_open = en_manage.count('<div')
en_m_close = en_manage.count('</div>')
print(f"\nBefore manage-panel - VI: open={vi_m_open}, close={vi_m_close}, net={vi_m_open-vi_m_close}")
print(f"Before manage-panel - EN: open={en_m_open}, close={en_m_close}, net={en_m_open-en_m_close}")

# Now check what the page web_fetch says - the issue might be JS execution failing
# Check if the JS file is different between live vi.html and our local copy
# Actually, the issue is likely the SAVE function HTML section
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_b4save.txt','r',encoding='utf-8') as f:
    save_sec = f.read()
print(f"\nSave section HTML ({len(save_sec)} chars):")
for line in save_sec.split('\n'):
    print(line)

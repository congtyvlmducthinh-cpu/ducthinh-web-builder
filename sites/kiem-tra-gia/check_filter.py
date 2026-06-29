import re
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html','r',encoding='utf-8') as f: zh=f.read()

# Check the machineFilter line in en.html & zh.html
for lang, content in [('en', en), ('zh', zh)]:
    idx = content.find('machineFilter &&')
    if idx > 0:
        snippet = content[idx-5:idx+60]
        with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{lang}_filter.txt','w',encoding='utf-8') as f:
            f.write(snippet)
        print(f'{lang}: machineFilter line found')
    else:
        print(f'{lang}: NOT FOUND')

import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_check.js','r',encoding='utf-8') as f: c=f.read()
lines = c.split('\n')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_error_ctx.txt','w',encoding='utf-8') as f:
    for i in range(1295, min(len(lines), 1320)):
        f.write(f'{i+1}: {lines[i]}\n')
print('done')

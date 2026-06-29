vi = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html'

with open(vi,'r',encoding='utf-8') as f:
    c = f.read()

# Find the manage-actions HTML section (the actual button, not CSS)
# Look for "saveToServer" button in HTML (not JS)
idx = c.find('saveToServer')
if idx > 0:
    # Get surrounding context
    snippet = c[max(0,idx-200):idx+200]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_saveBtn.txt','w',encoding='utf-8') as f:
        f.write(snippet)
    print(f'saveToServer at {idx}')
    
# Also find manage-actions DIV in HTML (not CSS)
idx2 = c.find('class="manage-actions"')
if idx2 > 0:
    # This is in HTML, find the parent element
    snippet2 = c[idx2-50:idx2+400]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_manage_actions_html.txt','w',encoding='utf-8') as f:
        f.write(snippet2)
    print(f'manage-actions HTML div at {idx2}')

# Find saveToServer function fully
idx3 = c.find('function saveToServer')
if idx3 > 0:
    fn_end = c.find('\nfunction ', idx3+1)
    if fn_end < 0: fn_end = c.find('// ======', idx3+1)
    if fn_end < 0: fn_end = idx3 + 1200
    fn = c[idx3:fn_end]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_saveToServer_fn.txt','w',encoding='utf-8') as f:
        f.write(fn)
    print(f'saveToServer function at {idx3}, {len(fn)} chars')

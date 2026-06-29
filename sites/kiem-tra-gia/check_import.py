import re

path = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html'
with open(path, 'r', encoding='utf-8') as f:
    vi = f.read()

# Find importProducts function
idx = vi.find('function importProducts')
if idx > 0:
    fn_end = vi.find('\nfunction ', idx+1)
    fn = vi[idx:fn_end]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_import.txt','w',encoding='utf-8') as f:
        f.write(fn)
    print(f'importProducts found at {idx}, {len(fn)} chars')
else:
    print('importProducts NOT FOUND')

# Also check importMaxLoading
idx2 = vi.find('function importMaxLoading')
if idx2 > 0:
    fn_end2 = vi.find('\nfunction ', idx2+1)
    fn2 = vi[idx2:fn_end2]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_importML.txt','w',encoding='utf-8') as f:
        f.write(fn2)
    print(f'importMaxLoading found at {idx2}, {len(fn2)} chars')

# Check the init localStorage loading section
ls_idx = vi.find('localStorage.getItem("dq_products"')
if ls_idx > 0:
    # Get from around that area to the end of the loading section
    before = vi[max(0,ls_idx-200):ls_idx+800]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_init_ls.txt','w',encoding='utf-8') as f:
        f.write(before)
    print(f'localStorage init section at {ls_idx}')

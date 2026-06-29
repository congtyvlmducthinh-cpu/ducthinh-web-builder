import re

files = {
    'app.js': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/src/app.js',
    'vi.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html',
    'en.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html',
    'zh.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html',
}

for name, path in files.items():
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check localStorage save in handleManageFile
    idx = content.find('function handleManageFile')
    if idx > 0:
        fn_end = content.find('\nfunction ', idx+1)
        fn = content[idx:fn_end]
        ls_save = 'localStorage.setItem' in fn
        tab_switch = 'switchTab' in fn
        print(f'{name}: handleManageFile → localStorage_save={ls_save}, switchTab={tab_switch}')
    else:
        print(f'{name}: handleManageFile NOT FOUND')
    
    # Check localStorage loading section
    ls_idx = content.find('localStorage.getItem("dq_products"')
    if ls_idx > 0:
        # Check if inside comment
        before = content[max(0,ls_idx-10):ls_idx]
        commented = '/*' in before
        print(f'  localStorage loading: commented={commented}')
        # Show context
        end_ls = content.find('*/', ls_idx)
        if end_ls > 0 and commented:
            print(f'  Comment region: {ls_idx} to {end_ls}')
    else:
        print(f'  localStorage loading NOT FOUND')

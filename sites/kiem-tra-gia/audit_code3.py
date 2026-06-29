import re

files = {
    'app.js': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/src/app.js',
    'vi.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html',
    'en.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html',
    'zh.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html',
}

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/audit_result2.txt','w',encoding='utf-8') as out:
    for name, path in files.items():
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        out.write(f'=== {name} ===\n')
        
        # Find handleManageFile and show its full content
        idx = content.find('function handleManageFile')
        if idx > 0:
            fn_end = content.find('\nfunction ', idx+1)
            fn = content[idx:fn_end]
            out.write(f'handleManageFile ({len(fn)} chars):\n{fn}\n\n')
            ls_save = 'localStorage.setItem' in fn
            tab_switch = 'switchTab' in fn
            out.write(f'  localStorage_save={ls_save}, switchTab={tab_switch}\n')
        else:
            out.write(f'handleManageFile: NOT FOUND\n')
        
        # Find localStorage loading at end of script (the init section)
        ls_idx = content.find('localStorage.getItem("dq_products"')
        if ls_idx > 0:
            before = content[max(0,ls_idx-30):ls_idx]
            commented = '/*' in before
            out.write(f'  localStorage loading (pos {ls_idx}): commented={commented}\n')
            out.write(f'  context: {repr(before[-30:])}\n')
        else:
            out.write(f'  localStorage loading: NOT FOUND\n')
        
        # Find saveToServer function
        sts_idx = content.find('function saveToServer')
        if sts_idx > 0:
            fn_end = content.find('\nfunction ', sts_idx+1)
            if fn_end < 0: fn_end = content.find('\n// ======', sts_idx+1)
            if fn_end < 0: fn_end = sts_idx + 3000
            sts_fn = content[sts_idx:fn_end]
            out.write(f'saveToServer ({len(sts_fn)} chars): FOUND\n')
        else:
            out.write(f'saveToServer: NOT FOUND\n')
        
        # Find manage actions (HTML for save button)
        manage_actions_idx = content.find('manage-actions')
        if manage_actions_idx > 0:
            out.write(f'manage-actions HTML: FOUND at {manage_actions_idx}\n')
        else:
            out.write(f'manage-actions HTML: NOT FOUND\n')

print('done')

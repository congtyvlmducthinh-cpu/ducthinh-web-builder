import re

files = {
    'app.js': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/src/app.js',
    'vi.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html',
    'en.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html',
    'zh.html': 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html',
}

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/audit_result.txt','w',encoding='utf-8') as out:
    for name, path in files.items():
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        out.write(f'=== {name} ===\n')
        
        # Check localStorage save in handleManageFile
        idx = content.find('function handleManageFile')
        if idx > 0:
            fn_end = content.find('\nfunction ', idx+1)
            fn = content[idx:fn_end]
            ls_save = 'localStorage.setItem' in fn
            tab_switch = 'switchTab' in fn
            out.write(f'  handleManageFile: localStorage_save={ls_save}, switchTab={tab_switch}\n')
        else:
            out.write(f'  handleManageFile: NOT FOUND\n')
        
        # Check localStorage loading section
        ls_idx = content.find('localStorage.getItem("dq_products"')
        if ls_idx > 0:
            before = content[max(0,ls_idx-10):ls_idx]
            commented = '/*' in before
            out.write(f'  localStorage loading: commented={commented}\n')
        else:
            out.write(f'  localStorage loading: NOT FOUND\n')
        
        # Check if saveToServer exists
        if 'saveToServer' in content:
            out.write(f'  saveToServer: FOUND\n')
        else:
            out.write(f'  saveToServer: NOT FOUND\n')

print('Done - see audit_result.txt')

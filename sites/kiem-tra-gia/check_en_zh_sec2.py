en = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html'
zh = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html'

for name, path in [('en',en),('zh',zh)]:
    with open(path,'r',encoding='utf-8') as f:
        c = f.read()
    
    script_end = c.find('</script>')
    snippet = c[script_end-500:script_end]
    with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{name}_pre_script_end.txt','w',encoding='utf-8') as f:
        f.write(snippet)
    print(f'{name}.html: pre-</script> ({script_end-500} to {script_end}):')
    print(snippet[:100], '...', snippet[-100:])
    
    # Also find the manage section HTML div with class="manage-actions"
    idx = c.find('<div class="manage-actions"')
    if idx > 0:
        inner_start = c.find('>', idx) + 1
        inner_end = c.find('</div>', idx)
        # Count nested divs - find the right closing
        inner = c[idx:inner_end+6]
        with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{name}_manage_actions_div.txt','w',encoding='utf-8') as f:
            f.write(inner)
        print(f'{name}.html: manage-actions div at {idx}')

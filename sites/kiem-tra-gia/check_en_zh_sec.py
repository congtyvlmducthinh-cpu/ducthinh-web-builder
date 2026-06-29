en = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html'
zh = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html'

for name, path in [('en',en),('zh',zh)]:
    with open(path,'r',encoding='utf-8') as f:
        c = f.read()
    
    # Find manage section HTML 
    idx = c.find('id="manage"')
    if idx > 0:
        # Find the next main section
        end_idx = c.find('id="pwModal"', idx)
        if end_idx < 0:
            end_idx = c.find('id="freightPopup"', idx)
        if end_idx < 0:
            end_idx = idx + 3000
        manage_section = c[idx:end_idx]
        with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{name}_manage_sec.txt','w',encoding='utf-8') as f:
            f.write(manage_section)
        print(f'{name}.html: manage section {idx}-{end_idx} ({len(manage_section)} chars)')
    
    # Find bottom of script - where saveToServer should go
    script_end = c.find('</script>')
    if script_end > 0:
        # Look for the last function before </script>
        prev_fn = c.rfind('function ', 0, script_end)
        after_fn = c[prev_fn:script_end]
        with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{name}_end_script.txt','w',encoding='utf-8') as f:
            f.write(after_fn)
        print(f'{name}.html: last function at {prev_fn}, {script_end-prev_fn} chars before </script>')

vi = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html'
en = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html'
zh = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html'
js = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/src/app.js'

# Check en & zh saveToServer
for name, path in [('en',en),('zh',zh)]:
    with open(path,'r',encoding='utf-8') as f:
        c = f.read()
    print(f'=== {name}.html ===')
    print(f' has saveToServer: {"saveToServer" in c}')
    print(f' has manage-actions: {"manage-actions" in c}')
    
    # Find manage-actions area
    idx = c.find('manage-actions')
    if idx > 0:
        snippet = c[idx-100:idx+500]
        print(f' manage-actions context:\n{snippet[:400]}\n')
    
    # Find end of script (just before </script>)
    script_end = c.find('</script>')
    if script_end > 0:
        pre_script = c[script_end-50:script_end]
        print(f' pre-</script>: ...{repr(pre_script[-50:])}')

# Also check app.js for the same thing
with open(js,'r',encoding='utf-8') as f:
    c = f.read()
print(f'\n=== app.js ===')
print(f' has saveToServer: {"saveToServer" in c}')
print(f' manage-actions in template: {"manage-actions" in c}')

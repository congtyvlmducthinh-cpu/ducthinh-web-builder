vi = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html'
en = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html'
zh = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html'
js = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/src/app.js'

# For each file, extract the vndFields loop section and the preserve section
for name, path in [('vi',vi),('en',en),('zh',zh),('app',js)]:
    with open(path,'r',encoding='utf-8') as f:
        c = f.read()
    
    # Find Object.keys(vndFields).forEach 
    idx = c.find('Object.keys(vndFields)')
    if idx > 0:
        # Get full forEach content
        paren_open = c.find('function(', idx)
        if paren_open < 0: paren_open = c.find('function (', idx)
        if paren_open < 0: paren_open = c.find('function(', idx+50)
        
        # Find the closing }) of the forEach
        # Count brackets from paren_open
        depth = 0
        start = paren_open - 1  # start at "function(" 
        # Actually just get a big chunk
        loop_start = idx
        # Find end of forEach - look for ");" that closes forEach
        # vndFields.forEach(function(k) { ... });
        fe_end = c.find(');', idx+100)
        # But there might be nested brackets. Let's be more careful.
        # The forEach ends with "});" 
        chunk = c[idx:idx+5000]
        # Find the "});" that closes forEach - count brackets
        brace_depth = 0
        paren_depth = 0
        fe_end = 0
        for i, ch in enumerate(chunk):
            if ch == '{': brace_depth += 1
            if ch == '}': brace_depth -= 1
            if ch == '(': paren_depth += 1
            if ch == ')': paren_depth -= 1
            if brace_depth == 0 and paren_depth == 0 and i > 10 and chunk[i-1:i+1] == ');':
                fe_end = i
                break
        
        # Extract the full forEach
        full_loop = chunk[:fe_end+2]
        with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{name}_vndLoop.txt','w',encoding='utf-8') as f:
            f.write(full_loop)
        print(f'{name}: vndFields loop at {idx}, {len(full_loop)} chars')
    
    # Find preserve section
    preserve_start = c.find('Preserve market-specific fields')
    if preserve_start < 0: preserve_start = c.find('preserve market-specific fields')
    if preserve_start < 0: preserve_start = c.find('// Copy extra fields')
    if preserve_start > 0:
        # Get block until next blank-line-or-comment section
        end = c.find('\n//', preserve_start+10)
        if end < 0: end = preserve_start + 2000
        preserve = c[preserve_start:end]
        with open(f'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/{name}_preserve.txt','w',encoding='utf-8') as f:
            f.write(preserve)
        print(f'{name}: preserve at {preserve_start}, {len(preserve)} chars')

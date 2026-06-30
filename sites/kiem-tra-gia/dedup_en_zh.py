import sys
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['en.html', 'zh.html']:
    fp = r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\\' + fname
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()

    v1 = c.find('function saveToServer()')
    v2 = c.find('function saveToServer()', v1 + 1)
    if v2 < 0:
        print(fname + ': only 1 func, skip')
        continue

    # Remove first function
    brace = c.find('{', v1)
    depth = 1
    pos = brace + 1
    while depth > 0 and pos < len(c):
        if c[pos] == '{': depth += 1
        elif c[pos] == '}': depth -= 1
        pos += 1

    c = c[:v1] + c[pos:]

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(c)

    # Verify
    with open(fp, 'r', encoding='utf-8') as f:
        v = f.read()
    funcs = v.count('function saveToServer()')
    idx = v.find('function saveToServer()')
    block = v[idx:idx+600]
    has_all = all(kw in block for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
    print(fname + ': funcs=' + str(funcs) + ' all5=' + str(has_all))

print('Done!')

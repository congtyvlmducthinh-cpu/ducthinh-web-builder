import sys
sys.stdout.reconfigure(encoding='utf-8')

for fn in ['en.html', 'zh.html']:
    with open(fn, 'r', encoding='utf-8') as f:
        c = f.read()
    v1 = c.find('function saveToServer()')
    v2 = c.find('function saveToServer()', v1+1)
    print(fn + ':')
    first_body = c[v1:v1+100]
    second_body = c[v2:v2+100]
    print('  first:  ' + repr(first_body))
    print('  second: ' + repr(second_body))
    
    # Check if second has UI (payload / saveServerBtn)
    has_ui = 'saveServerBtn' in c[v2:v2+500] or 'var payload' in c[v2:v2+500]
    print('  second has UI feedback: ' + str(has_ui))
    
    if has_ui:
        block = c[v2:v2+800]
        has_all = all(kw in block for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
        print('  UI version all 5 fields: ' + str(has_all))
    else:
        block = c[v1:v1+800]
        has_all = all(kw in block for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
        print('  first version all 5 fields: ' + str(has_all))

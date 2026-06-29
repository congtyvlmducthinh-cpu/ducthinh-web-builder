with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()
ls_idx = en.find('localStorage.getItem("dq_products"')
if ls_idx > 0:
    before = en[max(0,ls_idx-200):ls_idx+600]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_init_ls.txt','w',encoding='utf-8') as f:
        f.write(before)
    print(f'en.html init LS at {ls_idx}')
else:
    print('NOT FOUND in en.html')
    # Search for the applyMarket call
    am_idx = en.find('applyMarket()')
    if am_idx > 0:
        snippet = en[max(0,am_idx-400):am_idx+100]
        with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_applyMarket.txt','w',encoding='utf-8') as f:
            f.write(snippet)
        print(f'applyMarket at {am_idx}')

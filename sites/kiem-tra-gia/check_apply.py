with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
idx = vi.find('function applyMarket')
if idx > 0:
    fn_end = vi.find('\nfunction ', idx+1)
    fn = vi[idx:fn_end]
    with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_applyMarket.txt','w',encoding='utf-8') as f:
        f.write(fn)
    print(f'applyMarket: {len(fn)} chars')

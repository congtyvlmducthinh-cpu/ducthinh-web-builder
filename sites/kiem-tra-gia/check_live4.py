import urllib.request

url = 'https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as resp:
    raw = resp.read().decode('utf-8')

checks = ['ktgInjector', 'ktg_data', 'DATA_PRODUCTS', 'data-injector', 'server saved']
for c in checks:
    if c in raw:
        idx = raw.find(c)
        print(f'Found "{c}" at {idx}: ...{raw[max(0,idx-50):idx+80]}...')
    else:
        print(f'"{c}" NOT found')

print(f'\nRaw size: {len(raw)} chars')
dpos = raw.find('var DATA_PRODUCTS = ')
if dpos > 0:
    chunk = raw[dpos:dpos+300]
    print(f'DATA_PRODUCTS at {dpos}:')
    print(chunk)
else:
    print('No DATA_PRODUCTS declaration found!')

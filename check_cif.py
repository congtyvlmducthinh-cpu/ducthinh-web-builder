import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check context around getCIF25PriceUSD
idx = d.find('function getCIF25PriceUSD')
if idx >= 0:
    print('Found getCIF25PriceUSD, context:')
    print(repr(d[idx-30:idx+200]))
    
# Check the full line
lines = d.split('\n')
for i, l in enumerate(lines):
    if 'getCIF25PriceUSD' in l or 'getCIFJumboPriceUSD' in l or '26000' in l:
        if '//' in l and '26000' not in l.split('//')[0]:
            continue
        if 130 <= i <= 145:
            print(f'Line {i}: {repr(l)}')

import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find renderPriceTab and see how it displays prices
idx = d.find('function renderPriceTab')
end = d.find('function renderBagsTab', idx)
rpt = d[idx:end]

# Find the part that generates product rows
# Look for .exw_vnd or exw_vnd usage
for keyword in ['.exw_vnd', "[exw_vnd", 'pkg25_vnd', 'jumbo_vnd']:
    pos = 0
    count = 0
    while True:
        pos = rpt.find(keyword, pos)
        if pos < 0: break
        count += 1
        print(f'  {keyword} at offset {pos} in rpt: ...{rpt[max(0,pos-30):pos+40]}...')
        pos += 1
    if count > 0:
        print(f'  Total: {count} occurrences\n')

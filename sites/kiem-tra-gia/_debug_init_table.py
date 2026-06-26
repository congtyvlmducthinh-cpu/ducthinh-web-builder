import sys, json
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# 1. Find init sequence
idx = d.rfind('localStorage.getItem("dq_products"')
# Show from localStorage check to end of init
end = d.find('</script>', idx)
print('=== Init sequence: ===')
print(d[idx-200:end])
print()

# 2. Check renderPriceTab for the "Max tải" header position
rpt = d[d.find('function renderPriceTab'):d.find('function renderCalcTab')]
print('=== renderPriceTab header: ===')
# Extract only the header building section
hidx = rpt.find('<th colspan')
# Show all header building code
for i in range(10):
    thidx = rpt.find('>', hidx)
    if thidx < 0: break
    thidx2 = rpt.find('</th>', thidx)
    if thidx2 < 0: break
    col_header = rpt[thidx+1:thidx2]
    print(f'  col: {repr(col_header)}')
    hidx = rpt.find('<th', thidx2)
    if hidx < 0: break

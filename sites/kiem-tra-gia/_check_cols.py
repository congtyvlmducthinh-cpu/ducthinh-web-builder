import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find exact header text in renderPriceTab
idx = d.find('function renderPriceTab')
rpt = d[idx:d.find('function renderCalcTab')]
hd = rpt.find('<th>Mã</th>')
print('=== 2nd header row (raw char): ===')
for i in range(20):
    th = rpt.find('<th>', hd) if i > 0 else hd
    th_close = rpt.find('</th>', th)
    if th_close < 0 or (i > 0 and th < 0): break
    print(f'  col {i+1}: {repr(rpt[th:th_close+5])}')
    hd = th + 1

# Now check data rows
print('\n=== Data row cols (raw): ===')
tbody = rpt.find('<tbody>')
data = rpt[tbody:tbody+500]
# Find the first td
td_idx = data.find('<td>')
for i in range(20):
    td = data.find('<td', td_idx) if i > 0 else td_idx
    td_close = data.find('</td>', td)
    if td_close < 0 or (i > 0 and td < 0): break
    print(f'  td #{i+1}: {repr(data[td:td_close+5][:50])}')
    td_idx = td + 1

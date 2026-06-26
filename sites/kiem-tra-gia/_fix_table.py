import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Fix 1: Add "Max tải" column header in renderPriceTab
# The 2nd header row is:
# <th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th><th>25KG...<th>Jumbo...
# Need to add <th>Max tải</th> after <th>Máy</th>

old_header = '''<th>Tiêu chuẩn</th><th>Máy</th><th>25KG <span class="info-row">(VND)</span></th><th>Jumbo <span class="info-row">(VND)</span></th>'''
new_header = '''<th>Tiêu chuẩn</th><th>Máy</th><th>Max tải</th><th>25KG <span class="info-row">(VND)</span></th><th>Jumbo <span class="info-row">(VND)</span></th>'''

d2 = d.replace(old_header, new_header)

# Also update the summary notes in table-wrap where showFobCif is true - same issue
# Actually it's the same string twice? Let me check

# Fix colspan in non-FOB: 
# First header row: colspan 5 (info) + colspan 2 (price with bag), but info now has 5 items instead of 4
# Actually info cols: code, size, standard, machine, maxLoad = 5. So colspan=5 is correct.
# Let's verify: <th colspan="5">Thông tin</th>
# That covers Mã, Kích thước, Tiêu chuẩn, Máy, Max tải = 5 ✓ Good.

# Now EXW section for FOB/CIF mode: table shows only 25KG and Jumbo prices
# For non-FOB: table shows 25KG, Jumbo, EXW, Hoa hồng 
# Count: 7 cells (FOB) or 9 cells (non-FOB)
# FOB 2nd row: Mã(1), KT(2), TC(3), Máy(4), Max tải(5), 25KG(6), Jumbo(7) = 7 ✓
# Non-FOB 2nd row: Mã(1), KT(2), TC(3), Máy(4), Max tải(5), 25KG(6), Jumbo(7), EXW(8), HH(9) = 9 ✓

# Fix 2: populationFilter on init after localStorage load
# The init currently has localStorage parsing then applyMarket(); switchTab("pricelist");
# add populateFilters() after data is ready

old_init = '''localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));'''
# The populateFilters should be called in switchTab before render, or on init
# Actually let me check where the current 4 calls come from

cnt = d2.count('populateFilters(')
print(f'populateFilters() calls: {cnt}')

# Find each call
idx = 0
for i in range(cnt):
    idx = d2.find('populateFilters(', idx + (1 if i > 0 else 0))
    ctx = d2[max(0,idx-100):idx+30]
    print(f'  call #{i+1}: {repr(ctx)}')

# Save
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print(f'\nSaved! Size: {len(d2)}')

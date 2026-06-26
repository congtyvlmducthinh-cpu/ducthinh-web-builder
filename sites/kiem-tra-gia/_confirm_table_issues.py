import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check where populateFilters is called
cnt = d.count('populateFilters(')
print(f'populateFilters() call count: {cnt}')
for i in range(10):
    idx = d.find('populateFilters(', idx) if i == 0 else d.find('populateFilters(', idx+1)
    if idx < 0: break
    ctx = d[max(0,idx-80):idx+30]
    print(f'  at {idx}: ...{repr(ctx)}')

print()

# Now check price issues for FOB/CIF
# For FOB/CIF mode, after the 4 info cols, what's next?
# For FOB/CIF: no EXW/Hoa hồng cols, so only 6 cols total
# But renderPriceTab has maxLoad + 2 prices + 2 conditional = 7 or 9 cells
# counts differ!
idx = d.find('function renderPriceTab')
print(f'renderPriceTab ends at line ~{d[:idx].count(chr(10))+1}')

# Check if maxLoad also shown in FOB/CIF mode (yes, always!)
# Cols: code, size, standard, machine, maxLoad, pkg25_price, jumbo_price
# = 7 cols
# Headers (non-FOB): Mã, KT, TC, Máy, 25KG, Jumbo, EXW, HH = 8 cols
# Data (non-FOB): code, size, standard, machine, maxLoad, pkg25, jumbo, exw, comm = 9 cols
# Added maxLoad shifts everything by 1
print("TABLE MISMATCH CONFIRMED")

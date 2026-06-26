import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find 2nd header row differently - search for raw HTML
idx = d.find('function renderPriceTab')
rpt = d[idx:d.find('function renderCalcTab')]

# Find the <tr> after the first </tr></thead>
pos = rpt.find('</tr></thead><tbody>')
prev_tr = rpt.rfind('<tr>', 0, pos)
print('Full 2nd header row:')
print(repr(rpt[prev_tr:pos]))
print()

# Data row - find first td in tbody
body_pos = rpt.find('<tbody>')
data_start = rpt.find('<td>', body_pos)
data_end = rpt.find('</tr>', body_pos)

full_data_row = rpt[body_pos-15:data_end+6]
# Replace interpolated vars with placeholders for readability
print('First data row:')
# Show the raw interpolation
for line in full_data_row.split("'"):
    if 'p.' in line or 'getFOB' in line or 'getCIF' in line or 'isFob' in line or 'isCif' in line or 'maxLoad' in line or 'DATA_MAX' in line or 'formatCurrency' in line:
        print(f'  CODE: {repr(line)}')

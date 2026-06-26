import sys, openpyxl
sys.stdout.reconfigure(encoding='utf-8')
wb = openpyxl.load_workbook(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\samples\Gia ban toi thieu.xlsx', data_only=True)
ws = wb['Sheet1']
for r in range(39, 48):
    row = []
    for c in range(1, 20):
        v = ws.cell(r, c).value
        if v is not None:
            row.append(f'C{c}={v}')
    print('Row {}: {}'.format(r, ', '.join(row) if row else '(empty)'))

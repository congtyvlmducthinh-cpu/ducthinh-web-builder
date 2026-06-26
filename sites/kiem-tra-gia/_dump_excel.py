import sys, openpyxl
sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\samples\Gia ban toi thieu.xlsx', data_only=True)
print(f'Sheet names: {wb.sheetnames}')

for sn in wb.sheetnames:
    ws = wb[sn]
    print(f'\n=== Sheet: {sn} ===')
    print(f'Dimensions: {ws.dimensions}')
    print(f'Max row: {ws.max_row}, Max col: {ws.max_column}')
    
    # Print ALL rows (up to 60)
    for r in range(1, min(ws.max_row + 1, 60)):
        row_data = []
        for c in range(1, min(ws.max_column + 1, 25)):
            cell = ws.cell(r, c)
            val = cell.value
            if val is not None:
                row_data.append(f'[{c}]{val}')
        if row_data:
            print(f'  Row {r}: {", ".join(row_data)}')
        else:
            print(f'  Row {r}: (empty)')

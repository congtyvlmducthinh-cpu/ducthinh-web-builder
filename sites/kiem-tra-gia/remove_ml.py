#!/usr/bin/env python3
"""Remove max loading column from pricelist table"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, 'utf-8')

with open('index.html', encoding='utf-8') as f:
    content = f.read()

# 1. Remove max loading column header
old_hdr = '<tr><th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th><th>Max tải</th>'
new_hdr = '<tr><th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th>'
if old_hdr in content:
    content = content.replace(old_hdr, new_hdr)
    print('✓ Header updated')
else:
    print('✗ Header not found')

# 2. Fix colspan: Thông tin was 5 cols, now 4
content = content.replace('<th colspan="5">Thông tin</th>', '<th colspan="4">Thông tin</th>')
print('✓ Colspan updated')

# 3. Remove the max loading cell rendering block
old_cell = (
    "    // Max loading\n"
    '    var ml = DATA_MAX_LOADING[p.code];\n'
    '    var maxLoad = "";\n'
    '    if (ml && ml.max25 !== null && ml.max25 !== undefined) maxLoad = ml.max25 + " tấn";\n'
    '    else if (ml && ml.maxJumbo !== null && ml.maxJumbo !== undefined) maxLoad = ml.maxJumbo + " tấn";\n'
    "    h += '<td class=\"text-center\" style=\"font-weight:600;color:#64748b;text-align:center\">' + maxLoad + '</td>';\n"
)
if old_cell in content:
    content = content.replace(old_cell, '')
    print('✓ Cell block removed')
else:
    # Try to find the block around "// Max loading"
    idx = content.find('// Max loading\n')
    if idx >= 0:
        end_idx = content.find("h += '<td class=\"text-center\"", idx)
        if end_idx >= 0:
            end_line = content.find('\n', end_idx)
            block = content[idx:end_line+1]
            print(f'Found block:')
            for i, line in enumerate(block.split('\n')):
                print(f'  {i}: {repr(line)}')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ Done')

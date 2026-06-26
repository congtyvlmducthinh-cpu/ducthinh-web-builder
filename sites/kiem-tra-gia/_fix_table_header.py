import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the exact 2nd header row string
rpt_start = d.find('function renderPriceTab')
rpt_end = d.find('function renderCalcTab')
rpt = d[rpt_start:rpt_end]

# Find the raw string in the file (before JS unicode escape processing)
# Search for the exact byte pattern
patterns = [
    b'<th>M\xc3\xa3</th><th>K\xc3\xadch th\xc6\xb0\xe1\xbb\x9bc</th><th>Ti\xc3\xaau chu\xe1\xba\xa9n</th><th>M\xc3\xa1y</th>',
    '<th>Mã</th><th>Kích thước</th><th>Tiêu chuẩn</th><th>Máy</th>',
    '<th>M\\u00e3</th><th>K\\u00edch th\\u01b0\\u1edbc</th><th>Ti\\u00eau chu\\u1ea9n</th><th>M\\u00e1y</th>'
]

for p in patterns:
    if isinstance(p, bytes):
        idx = d.encode('utf-8').find(p)
    else:
        idx = d.find(p)
    if idx >= 0:
        ctx_len = 300
        print(f'Found pattern: {p[:50]}... at {idx}')
        print(d[max(0,idx-20):idx+ctx_len])
        print()
        break
else:
    print('Pattern not found!')
    # Show the actual content
    pos = rpt.find('<th>Mã')
    if pos < 0:
        pos = rpt.find('Mã')
    print('Searching around Mã:')
    print(rpt[pos-50:pos+300])

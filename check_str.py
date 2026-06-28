import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

print('JS size:', len(js))

# Find ALL string literal ranges
i = 0
ranges = []
while i < len(js):
    if js[i] in "\"'":
        q = js[i]
        s = i
        i += 1
        while i < len(js):
            if js[i] == '\\':
                i += 2; continue
            if js[i] == q:
                ranges.append((s, i+1, q))
                break
            i += 1
    i += 1

print('Found', len(ranges), 'string literals')

# Check a few to see if they contain Vietnamese
# Use sorted_keys from the translation dict
sorted_keys = ['Giá bán', 'Sản phẩm', 'Máy', 'Tiêu chuẩn', 'Mã', 'Kích thước', 'Hoa hồng', 'Thông tin', 'Bao bì', 'Quy cách', 'Số lượng', 'Giá vốn', 'Lợi nhuận']

# For each string containing a Vietnamese key, print its hash/length
matches = 0
for s, e, q in ranges:
    content = js[s+1:e-1]
    for key in sorted_keys:
        if key in content:
            matches += 1
            print(f'  String at {s}-{e} ({q}): contains "{key}" -> len={len(content)}')
            break

print(f'\nTotal strings with Vietnamese keys: {matches}')

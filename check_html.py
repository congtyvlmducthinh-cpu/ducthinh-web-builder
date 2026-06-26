import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check all tags balance
for tag in ['html','head','body','script','style','header','div','table','select','option']:
    op = len(list(re.finditer(r'<'+tag+r'(?:\s+[^>]*)?>', d)))
    cl = d.count('</'+tag+'>')
    if op != cl:
        print(f'IMBALANCE: <{tag}>: {op}, </{tag}>: {cl}')

# Check for leftover placeholders
for pat in ['...,...', 'h += \'\';', 'h += \"\";']:
    idx = d.find(pat)
    if idx >= 0:
        print(f'FOUND "{pat}" at {idx}')

# Check total length
print(f'\nFile size: {len(d)} chars')
print('File starts with:')
print(d[:200])
print('\nFile ends with:')
print(d[-200:])

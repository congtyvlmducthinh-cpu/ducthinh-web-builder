import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

idx1 = d.find('<script>') + len('<script>')
idx2 = d.rfind('</script>')
js = d[idx1:idx2]
lines = js.split('\n')

# Remove corrupted line 138 (0-indexed = 137)
# It's: "t) / 26000); }"
print(f'Line to remove: {repr(lines[137])}')
if lines[137].strip() == 't) / 26000); }':
    print('Confirmed!')
    lines.pop(137)
else:
    # Try finding it
    for i, l in enumerate(lines):
        if l.strip() == 't) / 26000); }':
            print(f'Found at {i}')
            lines.pop(i)
            break

# Rebuild JS
new_js = '\n'.join(lines)
new_d = d[:idx1] + new_js + d[idx2:]

# Verify
new_idx1 = new_d.find('<script>') + len('<script>')
new_idx2 = new_d.rfind('</script>')
new_js2 = new_d[new_idx1:new_idx2]
new_lines = new_js2.split('\n')
print(f'\nAfter fix, lines around: 135-139')
for i in range(133, min(140, len(new_lines))):
    print(f'  {i}: {repr(new_lines[i][:140])}')

# Check brace balance again
opens = new_js2.count('{')
closes = new_js2.count('}')
print(f'\nBraces: {opens} = {closes}, diff: {opens-closes}')

with open('sites/kiem-tra-gia/index.html','w',encoding='utf-8') as f:
    f.write(new_d)
print('\nSaved!')

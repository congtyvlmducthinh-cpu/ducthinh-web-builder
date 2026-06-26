# Fix JS syntax: replace unicode chars that can't be in JS strings
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the problematic line
lines = d.split('\n')
for i, line in enumerate(lines):
    if '\u2014' in line:
        print(f'Line {i+1}: U+2014 found: {line[:100]}')

# This is likely in DATA_PRODUCTS size field where we have "—" as fallback
# But in JS string, this is fine since it's string content
# Let me check more carefully - the '—' is in a data value, which is valid in JS strings

# Actually the issue might be that the DATA_PRODUCTS has '—' (em dash) inside strings
# That's fine - let me double check by looking at exactly what node/section fails
idx = d.find('var DATA_PRODUCTS = [')
after = d.find('];', idx) + 2
all_js = d[idx:after]
try:
    compile(all_js, '<test>', 'exec')
    print('DATA_PRODUCTS section: ✅ Valid!')
except SyntaxError as e:
    print(f'DATA_PRODUCTS error: {e}')

# So the error is elsewhere. Let me find the actual full JS
script_tag = d.find('<script>', idx)
script_close = d.find('</script>', script_tag)
full_js = d[script_tag+len('<script>'):script_close]

# Find the line with error
try:
    compile(full_js, '<test>', 'exec')
    print('Full JS section: ✅ Valid!')
except SyntaxError as e:
    # e.lineno is relative to the start of the string
    print(f'Full JS line ~{e.lineno}: {e.msg}')
    lines = full_js.split('\n')
    if e.lineno and e.lineno <= len(lines):
        start = max(0, e.lineno - 3)
        for j in range(start, min(len(lines), e.lineno + 3)):
            print(f'  {j+1}: {lines[j][:150]}')

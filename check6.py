import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# The __() calls should only be in the JS render section (after main_js_start)
render_idx = text.rfind('function render()')

# Show render snippet with __()
idx = render_idx
count = 0
while count < 10:
    call_pos = text.find("+ __(", idx)
    if call_pos < 0 or call_pos > render_idx + 40000:
        break
    call_end = text.find(") +", call_pos) + 3
    ctx = text[max(0,call_pos-15):call_end+15]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print('  ' + safe)
    idx = call_end
    count += 1

# Check other JS functions have __()
for fn in ['switchTab', 'openFreightModal', 'openQuotation', 'downloadTemplate']:
    fn_idx = text.find('function ' + fn)
    if fn_idx > 0:
        fn_end = text.find('function', fn_idx + 5)
        if fn_end < 0:
            fn_end = fn_idx + 5000
        fn_text = text[fn_idx:fn_end]
        calls = fn_text.count('__(')
        if calls > 0:
            print(f'{fn}: {calls} __() calls')

# Also check the LANG object for completeness
start = text.find('var LANG = {')
end = text.find(';', start)
# find JSON end
depth = 0
pos = start + len('var LANG = ')
while pos < len(text):
    if text[pos] == '{':
        depth += 1
    elif text[pos] == '}':
        depth -= 1
        if depth == 0:
            end = pos + 1
            break
    pos += 1

lang_src = text[start:start+end-start]
key_count = lang_src.count('"en"')
print(f'\nLANG object has {key_count} keys (expected ~{147})')

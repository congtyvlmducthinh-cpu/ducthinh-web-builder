import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    t = f.read()

print('=== STRUCTURAL CHECKS ===')
print('Has LANG:', 'var LANG' in t)
print('Has __():', 'function __(s)' in t)
print('Has switchLang:', 'function switchLang(l)' in t)
print('lang buttons:', t.count('data-lang='))
print('data-i18n attrs:', t.count('data-i18n='))
print('File size:', len(t))

# Validate LANG JSON
start = t.find('var LANG = ')
end = t.find(';', start)
chunk = t[start+10:end]
try:
    obj = json.loads(chunk)
    print('\nLANG JSON valid:', len(obj), 'keys')
    for k in ['Sản phẩm', 'Giá bán', 'Kiểm Tra Giá', 'Máy', 'Tiêu chuẩn']:
        if k in obj:
            print(f'  "{k}": {obj[k]}')
        else:
            print(f'  "{k}": MISSING!')
except json.JSONDecodeError as e:
    print('LANG JSON ERROR:', e)

# Check renderPriceTab specifically
main_start = t.rfind('<script>')
js = t[main_start:]

# Check for Vietnamese in JS that's NOT wrapped
# Focus on renderPriceTab since it had the \uXXXX issue
rpt_start = js.find('function renderPriceTab')
rpt_end = js.find('function renderCalcTab', rpt_start)
rpt_js = js[rpt_start:rpt_end]

# Decode any \uXXXX to find remaining raw Vietnamese
def decode_all(text):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)

decoded = decode_all(rpt_js)

# Known Vietnamese words that should be __() wrapped
vn_check = ['Sản phẩm', 'Tiêu chuẩn', 'Máy', 'Thông tin', 'Giá bán', 'Kích thước', 'Hoa hồng', 'Mã']
print('\n=== renderPriceTab Vietnamese check ===')
total_vn_count = 0
wrapped_count = 0
for word in vn_check:
    raw_total = decoded.count(word)
    in_calls = len(re.findall(r"__\('" + re.escape(word), decoded))
    total_vn_count += raw_total
    wrapped_count += in_calls
    if raw_total > in_calls:
        print(f'  "{word}": {raw_total} raw, {in_calls} wrapped => {raw_total - in_calls} UNWRAPPED')
    else:
        print(f'  "{word}": OK ({raw_total})')

if total_vn_count <= wrapped_count:
    print('\n✅ All Vietnamese in renderPriceTab is wrapped!')
else:
    print(f'\n❌ {total_vn_count - wrapped_count} unwrapped Vietnamese strings found in renderPriceTab')

# Check main render functions
print('\n=== __() counts per function ===')
for fn in ['renderPriceTab', 'renderBagsTab', 'renderOthersTab', 'renderCalcTab', 'render']:
    idx = js.find('function ' + fn)
    if idx < 0:
        print(f'{fn}: NOT FOUND')
        continue
    # Find next function boundary
    next_fn = js.find('\nfunction render', idx + 20)
    if next_fn < 0:
        next_fn = len(js)
    body = js[idx:next_fn]
    print(f'{fn}: {body.count("__(")} __() calls in {len(body)} bytes')

# Check for any remaining \uXXXX in JS (outside LANG object)
print('\n=== Remaining \\uXXXX sequences (outside LANG) ===')
lang_start = js.find('var LANG')
outside_lang = js[:lang_start] + js[js.find('};', lang_start)+2:]
xu_sequences = re.findall(r'\\u[0-9a-fA-F]{4}', outside_lang)
# Filter to Vietnamese-range Unicode (common: 00E0-00FF, 1EA0-1EFF)
vn_escapes = [x for x in xu_sequences if int(x[2:], 16) > 0x00C0]
if vn_escapes:
    print(f'Found {len(vn_escapes)} Vietnamese \\uXXXX escapes outside LANG:')
    for x in sorted(set(vn_escapes))[:5]:
        ch = chr(int(x[2:], 16))
        print(f'  {x} -> {ch}')
else:
    print('✅ No remaining Vietnamese \\uXXXX escapes outside LANG')

# Check JS console errors potential
print('\n=== Potential JS issues ===')
# Check for </script> inside JS strings (would break HTML parser)
if '</script>' in js:
    print('❌ </script> found inside JS!')
else:
    print('✅ No </script> inside JS')
# Check for broken __() patterns
for m in re.finditer(r"__\([^)]*\)", js):
    call_text = js[m.start():m.end()]
    # Check if it looks like valid JS __('key')
    if not call_text.startswith("__('"):
        print(f'  Suspicious __() format: {repr(call_text[:40])}')

print('\n=== DONE ===')

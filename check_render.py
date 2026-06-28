import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all render functions and check __() presence
for fn in ['renderPriceList', 'renderBags', 'renderOthers', 'renderCalc', 'renderFreight']:
    idx = text.find('function ' + fn)
    if idx > 0:
        end = text.find('function ', idx + 5)
        if end < 0:
            end = idx + 30000
        body = text[idx:end]
        calls = body.count('__(')
        print(f'{fn}: {calls} __() calls at char {idx}')

# Check for broken tags with data-i18n
broken = []
for m in re.finditer(r'<([a-zA-Z]+)[^>]*data-i18n="[^"]*"[^>]*>', text[:40104]):
    tag = text[m.start():m.end()]
    # Check if tag looks complete (no duplicate attributes issue)
    if '""' in tag or tag.count('>') != 1:
        broken.append(tag)

print(f'\nBroken tags: {len(broken)}')
for b in broken[:5]:
    print(f'  {repr(b[:120])}')

# Check: any __() in static HTML (before main script)?
main_js_start = text.rfind('<script>')
static = text[:main_js_start]
calls_in_static = static.count('__(')
print(f'\n__() calls in static HTML: {calls_in_static}')

if calls_in_static > 0:
    for m in re.finditer(r'__\([^)]*\)', static):
        ctx = static[max(0,m.start()-40):m.end()+10]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        print(f'  ...{safe}...')

# Check render() for + __(' ... ') + patterns 
render_start = text.rfind('function render()')
render_end = text.find('function ', render_start + 5)
if render_end < 0:
    render_end = render_start + 50000
render_code = text[render_start:render_end]

all_calls = list(re.finditer(r'__\([^)]*\)', render_code))
print(f'\nTotal __() in render: {len(all_calls)}')
if all_calls:
    for m in all_calls[:10]:
        ctx = render_code[max(0,m.start()-30):m.end()+20]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        print(f'  {safe.strip()[:100]}')

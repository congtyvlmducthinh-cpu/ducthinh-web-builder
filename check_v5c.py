import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# Find main JS  
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

print('Main JS:', len(js), 'bytes')

# Check each render function
for fname in ['renderPriceTab', 'renderBagsTab', 'renderOthersTab', 'renderCalcTab', 'render']:
    idx = js.find('function ' + fname)
    if idx < 0:
        print(f'{fname}: NOT FOUND')
        continue
    # Find end: next function or file end
    # Look for function keyword after this one
    candidates = []
    for m in re.finditer(r'\nfunction \w+\(', js[idx+5:]):
        candidates.append(idx + m.start())
        break
    if not candidates:
        for m in re.finditer(r'\n// =====', js[idx+5:]):
            candidates.append(idx + m.start())
            break
    if not candidates:
        candidates.append(len(js))
    end = min(candidates)
    body = js[idx:end]
    calls = body.count('__(')
    print(f'{fname}: {calls} __() calls, {len(body)} bytes')
    
    # Show __() examples
    if calls > 0:
        for m in re.finditer(r"__\([^)]*\)", body):
            ctx = body[max(0,m.start()-10):m.end()+10]
            safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
            print(f'  {safe[:100]}')

# Check for unmatched patterns that could break JS
issues = []
# Find __( followed by ) that's NOT " +"
idx = -1
while True:
    idx = js.find('__(\'', idx+1)
    if idx < 0: break
    close = js.find(')', idx)
    after = js[close:close+6]
    if not after.startswith(") +") and not after.startswith(")')"):
        issues.append((idx, after[:10]))
        
print(f'\nSuspicious __() endings: {len(issues)}')
for pos, after in issues[:5]:
    ctx = js[max(0,pos-20):pos+20]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print(f'  {safe} => ...{after}...')

# Check for broken patterns " ++ " or " +  + "
for m in re.finditer(r'\+\s*\+(?!\s*__)', js):
    ctx = js[max(0,m.start()-10):m.end()+20]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    if '__' not in safe and '>' not in safe:
        print(f'DOUBLE PLUS: {safe[:80]}')

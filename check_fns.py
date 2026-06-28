import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Check LANG infra hasn't broken the functions
# Find the main script section
main_script = text[text.rfind('<script>'):text.rfind('</script>')+9]

# Check renderPriceTab
for fn_name in ['renderPriceTab', 'renderBagsTab', 'renderOthersTab', 'renderCalcTab', 'render']:
    idx = text.find('function ' + fn_name)
    if idx < 0:
        print(f'{fn_name}: NOT FOUND')
        continue
    # Find next function or end of script
    end_candidates = []
    for fn in ['function renderPriceTab', 'function renderCalcTab', 'function renderBagsTab', 'function renderOthersTab', 'function render', 'function updateDataInfo', 'function setLang', 'function showFreightPopup']:
        found = text.find(fn, idx + 1)
        if found > 0:
            end_candidates.append(found)
    end = min(end_candidates) if end_candidates else idx + 5000
    
    body = text[idx:end]
    calls = body.count('__(')
    print(f'{fn_name} ({idx}): {calls} __() calls, {len(body)} bytes')
    
    # Show a few __() examples
    if calls > 0:
        for m in re.finditer(r"['\"]__\([^)]*\)['\"]", body):
            ctx = body[max(0,m.start()-20):m.end()+10]
            safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
            print(f'  {safe[:100]}')

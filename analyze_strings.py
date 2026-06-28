import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all render functions and show their content with strings
for fn_name in ['renderPriceTab', 'renderBagsTab', 'renderOthersTab', 'renderCalcTab', 'render']:
    idx = text.find('function ' + fn_name)
    if idx < 0:
        print(f'{fn_name}: NOT FOUND')
        continue
    # Find end of function (next 'function ' or '// ===' or end of file)
    candidates = []
    for m in re.finditer(r'\nfunction \w+\(', text[idx+10:]):
        candidates.append(idx + 10 + m.start())
        break
    for m in re.finditer(r'\n// ===', text[idx+10:]):
        candidates.append(idx + 10 + m.start())
        break
    candidates.append(text.rfind('</script>'))
    end = min(candidates) if candidates else idx + 20000
    body = text[idx:end]
    
    # Extract all quoted strings (both ' and `)
    strings = []
    # Single-quoted strings
    for m in re.finditer(r"'([^']{4,})'", body):
        s = m.group(1)
        if any(ord(c) > 127 for c in s) and '\\u' not in s:
            strings.append(("'", s))
    # Backtick template literals  
    for m in re.finditer(r'`([^`]{4,})`', body):
        s = m.group(1)
        if any(ord(c) > 127 for c in s) and '\\u' not in s:
            strings.append(("`", s))
    
    print(f'\n=== {fn_name} ({len(body)} bytes, {len(strings)} translatable strings) ===')
    for q, s in strings[:30]:
        safe = s[:80].encode('utf-8', errors='replace').decode('utf-8')
        print(f'  [{q}] {safe}')
    if len(strings) > 30:
        print(f'  ... and {len(strings)-30} more')

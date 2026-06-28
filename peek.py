import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Check renderPriceTab for embedded Vietnamese in template literals or strings
idx = text.find('function renderPriceTab')
end = text.find('function renderCalcTab', idx)
body = text[idx:end]

# Print the body content line by line to see how strings are formed
lines = body.split('\n')
print(f'renderPriceTab: {len(lines)} lines')
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped.startswith('h += ') or stripped.startswith("h+="):
        # It's building HTML
        pass
    elif stripped.startswith("'"):
        # It's a string continuation
        pass
    if any(ord(c) > 127 for c in line):
        safe = line[:200].encode('utf-8', errors='replace').decode('utf-8')
        print(f'  L{i}: {safe}')

print('\n--- renderPriceTab body (first 2000 chars) ---')
print(body[:2000])

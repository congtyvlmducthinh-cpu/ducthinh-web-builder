import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# The main script starts after the LANG object injection
# Find where the "real" JS begins (look for // Data)
data_idx = text.find('// Data')
if data_idx < 0:
    data_idx = text.rfind('<script>') + 8

print(f'Main JS starts at: {data_idx}')

# Check first 200 characters
print('First 200 chars:', repr(text[data_idx:data_idx+200]))

# Check `renderPriceTab` function (the main pricelist render)
idx = text.find('function renderPriceTab')
if idx < 0:
    idx = text.find('function renderPriceTab')
    
# Find all functions in the main script
script_end = text.rfind('</script>')
script = text[data_idx:script_end]

# Find unnamed function that could be the pricelist renderer
# Look for "Giá bán" in the script  
positions = []
for m in re.finditer(r"'[^']*Gi[^']*b[^']*'", script):
    ctx = script[max(0,m.start()-40):m.end()+40]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    positions.append((m.start(), safe))

print(f'\nFound {len(positions)} matches for "Giá bán" in script')
if positions:
    for pos, ctx in positions[:5]:
        print(f'  at {pos}: ...{ctx[:120]}...')

# Also search for the string "Giá bán" unescaped (inside template literal)
for i, line in enumerate(script.split('\n')):
    if 'Giá bán' in line and '__' not in line:
        line_safe = line.encode('utf-8', errors='replace').decode('utf-8')
        print(f'  UNWRAPPED "Giá bán" at line: {line_safe[:150]}')

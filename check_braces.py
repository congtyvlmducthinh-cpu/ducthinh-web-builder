import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

idx1 = d.find('<script>') + len('<script>')
idx2 = d.rfind('</script>')
js = d[idx1:idx2]

# Track brace depth with line numbers
depth = 0
lines = js.split('\n')
min_depth = 0
min_line = 0
issues = []

for i, line in enumerate(lines):
    stripped = line.strip()
    # Skip comments
    if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
        continue
    
    opens = stripped.count('{') - stripped.count('}')  # oversimplified but close
    depth += opens
    if depth < min_depth:
        min_depth = depth
        min_line = i
    
    # Specifically look for obvious issues
    if 'function renderCalcTab()' in stripped:
        issues.append(f'Line {i}: renderCalcTab starts at depth {depth}')
    if stripped == '}' and i > 0 and 'function' in lines[i-1]:
        issues.append(f'Line {i}: Possible premature close?')

print(f'Final brace depth: {depth}')
print(f'Min depth reached: {min_depth} at line {min_line}')
print(f'Total lines: {len(lines)}')
print()

# Find the function with braces mismatch by checking each function block
func_starts = []
for i, line in enumerate(lines):
    if re.match(r'^function\s+\w+', line.strip()):
        func_starts.append((i, line.strip()))

print(f'Found {len(func_starts)} functions')
for fi, (fl, fname) in enumerate(func_starts):
    # Quick brace count for each function up to next function
    end_line = func_starts[fi+1][0] if fi+1 < len(func_starts) else len(lines)
    func_lines = lines[fl:end_line]
    opens = sum(l.count('{') for l in func_lines)
    closes = sum(l.count('}') for l in func_lines)
    if opens != closes:
        print(f'  MISMATCH: {fname} (line {fl}): {{={opens}, }}={closes}')

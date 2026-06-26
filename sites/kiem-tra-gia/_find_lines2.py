import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find exact line numbers
lines = d.split('\n')

# Find the exact line content around duplicate boundaries
for i, line in enumerate(lines):
    if '// Data' in line:
        print(f'Line {i+1}: {repr(line[:80])}')
    if '// App' in line:
        print(f'Line {i+1}: {repr(line[:80])}')

# Show lines 584-600 (around first DATA_PRODUCTS end)
print('\n=== Lines 584-600 ===')
for i in range(583, min(600, len(lines))):
    print(f'{i+1}: {repr(lines[i][:120])}')

# Show lines around ~681-700 (where second DATA_PRODUCTS starts)
print('\n=== Lines 681-700 ===')
for i in range(680, min(710, len(lines))):
    print(f'{i+1}: {repr(lines[i][:120])}')

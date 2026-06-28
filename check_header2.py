import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# Count ALL occurrences of </header>
count = 0
pos = 0
while True:
    pos = t.find('</header>', pos)
    if pos < 0: break
    count += 1
    print(f'</header> #{count} at {pos}')
    # Show context
    ctx = t[max(0,pos-30):pos+30]
    print(f'  Context: {repr(ctx)}')
    pos += 9

print(f'\nTotal: {count}')

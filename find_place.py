import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

for pat in ['... (2 duplicate lines)', '... (1 duplicate lines)', '...,...']:
    idx = d.find(pat)
    if idx >= 0:
        lines = d[:idx].split('\n')
        print(f'Found "{pat}" at line {len(lines)-1}:')
        start = max(0, idx-80)
        end = min(len(d), idx+60)
        print(repr(d[start:end]))
        print()
    else:
        print(f'"{pat}" not found')

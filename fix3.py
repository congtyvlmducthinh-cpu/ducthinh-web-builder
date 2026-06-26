import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Search for "..." placeholder more carefully
import re
for m in re.finditer(r'\.\.\.', d):
    ctx = d[m.start()-5:m.start()+40]
    if '...' in ctx:
        print(f'Found "..." at {m.start()}: {repr(ctx)}')

print('\n--- Checking calcCcy lines ---')
idx = d.find('calcCcyVnd')
print(repr(d[idx-10:idx+80]))
idx2 = d.find('calcCcyUsd')
print(repr(d[idx2-10:idx2+80]))

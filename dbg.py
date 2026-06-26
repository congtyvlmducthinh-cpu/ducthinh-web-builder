import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

idx = d.find('calc-currency-bar')
lines_after = d[idx:idx+500].split('\n')
for i, line in enumerate(lines_after):
    if i < 15:
        print(f'{i}: {repr(line)}')

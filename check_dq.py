import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()
idx1 = d.find('<script>') + len('<script>')
idx2 = d.rfind('</script>')
js = d[idx1:idx2]
lines = js.split('\n')

for i, line in enumerate(lines):
    dq = line.count('"')
    if dq % 2 != 0:
        # Skip lines with \' that might confuse counting
        print(f'{i}: dq={dq} | {repr(line[:150])}')

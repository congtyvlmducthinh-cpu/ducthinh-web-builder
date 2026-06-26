import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

idx1 = d.find('<script>') + len('<script>')
idx2 = d.rfind('</script>')
js = d[idx1:idx2]

# Find all double-quote positions and check for patterns
lines = js.split('\n')
for i, line in enumerate(lines):
    dq = line.count('"')
    sq = line.count("'")
    if dq % 2 != 0:
        print(f'UNEVEN double quotes line {i}: {dq} dq, line: {repr(line[:120])}')
    if sq % 2 != 0:
        print(f'UNEVEN single quotes line {i}: {sq} sq, line: {repr(line[:120])}')

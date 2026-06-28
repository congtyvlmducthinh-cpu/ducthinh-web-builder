import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
j = t[t.rfind('<script>'):t.rfind('</script>')+9]

# Trace state machine from start, logging first 100 events
events = []
i = 0
in_str = False
sq = None
while i < len(j):
    if not in_str:
        if j[i] in ["'", '"']:
            in_str = True
            sq = j[i]
            events.append(('OPEN', i, sq, repr(j[max(0,i-20):i+1])))
        i += 1
    else:
        if j[i] == '\\' and i+1 < len(j) and j[i+1] == sq:
            i += 2
        elif j[i] == sq:
            in_str = False
            events.append(('CLOSE', i, sq, repr(j[max(0,i-10):i+10])))
            i += 1
        else:
            i += 1

print('First 50 string open/close events:')
for ev in events[:50]:
    tp, pos, q, ctx = ev
    print(f'  {tp:5s} @ {pos:6d} ({q}): ...{ctx}...')
    if tp == 'CLOSE':
        pass
    
# Find the specific event at/around 79182
print()
print(f'Searching for events near position 79182...')
for ev in events:
    tp, pos, q, ctx = ev
    if abs(pos - 79182) < 100:
        print(f'  {tp:5s} @ {pos:6d} ({q}): ...{ctx}...')

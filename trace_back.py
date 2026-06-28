import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
j = t[t.rfind('<script>'):t.rfind('</script>')+9]

# Now I see the issue CLEARLY:
# Position 79152: CLOSE "  → closes a "-delimited string that started earlier
# Position 79182: OPEN '  → starts a new '-delimited string
# Position 79193: CLOSE ' → closes it at "h +="
# Position 79200: OPEN '  → starts another string that's actually '</div>'

# The bug: position 79152 is a " closing, but the state machine correctly closes the " string.
# Then position 79182 is an ' opener. That's wrong! It should be a CLOSER!
# Because there was an ' that opened way earlier and should still be open.

# Let me trace further back. The ' that SHOULD be open at 79182 must have opened somewhere.
# The content structure is:
# h += '<button onclick="someFunction(3)">📄 Lên báo giá</button></div>';
# The string that contains the <button> HTML is delimited by single quotes.
# The double quote before 79152 is the closing " of onclick="someFunction(3)"
# That's INSIDE the ' delimited string!

# But the state machine processes " at position 79152 as if it's a "-string closer.
# That means it thinks we're inside a "-delimited string, not a '-delimited string!

# The state machine went wrong at a PREVIOUS position where it confused " and '.

# Let me find ALL CLOSE events before 79152:
events = []
i = 0
in_str = False
sq = None
while i < 79200:
    if not in_str:
        if j[i] in ["'", '"']:
            in_str = True
            sq = j[i]
            events.append(('OPEN', i, sq))
        i += 1
    else:
        if j[i] == '\\' and i+1 < len(j) and j[i+1] == sq:
            i += 2
        elif j[i] == sq:
            in_str = False
            events.append(('CLOSE', i, sq))
            i += 1
        else:
            i += 1

# Find the last ~20 events before 79152
print("Last 25 events before position 79152:")
for ev in events[-25:]:
    tp, pos, q = ev
    ctx = j[max(0,pos-15):pos+15]
    print(f'  {tp:5s} @ {pos:6d} ({q}): {repr(ctx)}')

# Also check: was there a nearby ' that should have been caught?
# Let's look for unescaped single quotes between the last string and 79182

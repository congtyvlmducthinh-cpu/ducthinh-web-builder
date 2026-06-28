import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# PROPER string parser that respects quote nesting
i = 0
ranges = []
state = None  # None, "'", '"'
while i < len(js):
    if state is None:
        if js[i] in "\"'":
            state = js[i]
            s = i
            i += 1
        else:
            i += 1
    elif state == "'":
        if js[i] == '\\':
            i += 2
        elif js[i] == "'":
            ranges.append((s, i+1))
            state = None
            i += 1
        else:
            i += 1  # " and other chars are content
    elif state == '"':
        if js[i] == '\\':
            i += 2
        elif js[i] == '"':
            ranges.append((s, i+1))
            state = None
            i += 1
        else:
            i += 1  # ' and other chars are content

print(f"Total string ranges: {len(ranges)}")

# Show the first few
for s, e in ranges[:10]:
    print(f"  {s}-{e} ({e-s} chars): {repr(js[s:e][:60])}")

# Now find how many overlap with the old broken approach
old_ranges = []
i = 0
while i < len(js):
    if js[i] in "\"'":
        q = js[i]
        s = i
        i += 1
        while i < len(js):
            if js[i] == '\\':
                i += 2; continue
            if js[i] == q:
                old_ranges.append((s, i+1))
                break
            i += 1
    i += 1
print(f"\nOld approach ranges: {len(old_ranges)}")

# Show a big range if any > 500
big_old = [(s,e) for s,e in old_ranges if e-s > 500]
print(f"Old big ranges (>500): {len(big_old)}")
big_new = [(s,e) for s,e in ranges if e-s > 500]
print(f"New big ranges (>500): {len(big_new)}")

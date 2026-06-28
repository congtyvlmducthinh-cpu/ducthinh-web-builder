import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# The string at 79200 is just '</div>' which is correct
# The problem was the parser running past its boundaries
# Let me find the ACTUAL huge strings properly

# Find strings > 100 chars that contain Vietnamese
i = 0
big_strings = []
while i < len(js):
    if js[i] in "\"'":
        q = js[i]
        s = i
        i += 1
        while i < len(js):
            if js[i] == '\\':
                i += 2; continue
            if js[i] == q:
                e = i + 1
                length = e - s - 2
                if length > 100:
                    content = js[s+1:e-1]
                    # Check for Vietnamese chars
                    for c in content:
                        if ord(c) > 0x00C0:
                            big_strings.append((s, e, q, length, content[:80]))
                            break
                break
            i += 1
    i += 1

print(f'Big strings with Vietnamese: {len(big_strings)}')
for s, e, q, l, preview in big_strings:
    print(f'  {s}-{e} ({l} chars, {q}): {preview}...')

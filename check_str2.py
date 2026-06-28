import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Find all string literal ranges
i = 0
ranges = []
while i < len(js):
    if js[i] in "\"'":
        q = js[i]
        s = i
        i += 1
        while i < len(js):
            if js[i] == '\\':
                i += 2; continue
            if js[i] == q:
                ranges.append((s, i+1, q))
                break
            i += 1
    i += 1

# Show the 2 huge strings context
for s, e, q in ranges:
    clen = e - s - 2
    if clen > 5000:
        # Show first 200 chars
        snippet = js[s+1:min(s+201, e-1)]
        print(f'=== HUGE STRING {s}-{e} ({clen} chars, {q}) ===')
        print(snippet[:200])
        print('...')
        # Find Vietnamese patterns
        vnm = re.findall(r'[\u00C0-\u1EF9]{2,}', snippet)
        if vnm:
            print('Vietnamese found:', vnm[:10])
        print()

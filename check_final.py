import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# State-machine parser: tracks current quote context
i = 0
ranges = []
in_str = False
str_start = 0
str_quote = None

while i < len(js):
    if not in_str:
        if js[i] in ["'", '"']:
            in_str = True
            str_start = i
            str_quote = js[i]
        i += 1
    else:
        if js[i] == '\\' and i+1 < len(js) and js[i+1] == str_quote:
            i += 2  # skip escaped quote inside string
        elif js[i] == str_quote:
            # String ends
            ranges.append((str_start, i+1))
            in_str = False
            str_quote = None
            i += 1
        else:
            i += 1

print(f'Total strings (state machine): {len(ranges)}')

# Show strings with Vietnamese content > 50 chars
big = 0
for s, e in ranges:
    length = e - s - 2
    if length > 100:
        content = js[s+1:e-1]
        has_vn = any(0x00C0 <= ord(c) <= 0x1EF9 for c in content)
        if has_vn:
            big += 1
            if big <= 15:
                print(f'  BIG #{big}: pos {s}..{e} ({length} chars)')
                print(f'    First 80: {repr(content[:80])}')

print(f'\nTotal big strings (>100 chars, with Vietnamese): {big}')

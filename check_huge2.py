import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Correct string parsing - one pass, properly handle escaped quotes
i = 0
ranges = []
while i < len(js):
    if js[i] in "\"'":
        q = js[i]
        s = i
        i += 1
        while i < len(js):
            if js[i] == '\\' and i+1 < len(js) and js[i+1] == q:
                i += 2
                continue
            if js[i] == q:
                e = i + 1
                length = e - s - 2
                content = js[s+1:e-1]
                has_vn = False
                for c in content:
                    if 0x00C0 <= ord(c) <= 0x1EF9:
                        has_vn = True
                        break
                if length > 50 and has_vn:
                    ranges.append((s, e, length, content[:80]))
                break
            i += 1
    i += 1

print('Total medium+ strings (>50 chars) with Vietnamese:', len(ranges))
# Show the 14.6k one if it exists
for s, e, length, preview in ranges:
    if length > 5000:
        print('HUGE STRING:', s, e, length, repr(preview[:100]))
    else:
        print('  pos', s, '..', e, '(', length, 'chars):', repr(preview))

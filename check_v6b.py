import sys, re
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Find all string literal boundaries
def find_string_literals(code):
    ranges = []
    i = 0
    while i < len(code):
        ch = code[i]
        if ch in "'\"":
            quote = ch
            start = i
            i += 1
            while i < len(code):
                if code[i] == '\\':
                    i += 2
                    continue
                if code[i] == quote:
                    ranges.append((start, i+1))
                    break
                i += 1
        i += 1
    return ranges

strings = find_string_literals(js)

# Check each __() call - is it inside a string literal?
bad = 0
good = 0
for m in re.finditer(r"__\(['\"][^'\"]*['\"]\)", js):
    in_str = False
    for s_start, s_end in strings:
        if s_start < m.start() < s_end:
            in_str = True
            break
    
    if in_str:
        bad += 1
        ctx = js[max(0,m.start()-15):m.end()+15]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        # Only show first 5 bad
        if bad <= 5:
            print(f'BAD #: {safe}')
    else:
        good += 1

print(f'\n=== RESULT ===')
print(f'__() calls OUTSIDE string (evaluated): {good}')
print(f'__() calls INSIDE string (DEAD TEXT): {bad}')
print(f'Total: {good + bad}')

# Also check renderPriceTab specifically
idx = js.find('function renderPriceTab')
end = js.find('function renderCalcTab', idx)
body = js[idx:end]
strings_in_rpt = find_string_literals(body)
rpt_bad = 0
rpt_good = 0
for m in re.finditer(r"__\(['\"][^'\"]*['\"]\)", body):
    in_str = False
    for s_start, s_end in strings_in_rpt:
        if s_start < m.start() < s_end:
            in_str = True
            break
    if in_str:
        rpt_bad += 1
    else:
        rpt_good += 1

print(f'\nrenderPriceTab: {rpt_good} good, {rpt_bad} bad __() calls')

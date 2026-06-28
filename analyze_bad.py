import sys, re
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

# Find main JS
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Enumerate ALL __() calls and check their context
count = 0
bad_count = 0
for m in re.finditer(r"__\('[^']*'\)", js):
    start = m.start()
    call = m.group()
    count += 1
    
    # Look backwards to find the enclosing string
    # If there's a ' before this that isn't closed, we're inside a string
    before = js[max(0,start-30):start]
    after = js[m.end():min(m.end()+10, len(js))]
    
    # Check if the pattern is: '... + __('key') + ...' (bad)
    # or: '...' + __('key') + '...' (good)
    is_bad = False
    if before.endswith("' +"):
        before_lastchar = "' +"
    elif before.endswith('" +'):
        before_lastchar = '" +'
    else:
        is_bad = True
    
    if is_bad or ' + __' not in before[-20:]:
        is_bad = True
    
    # Check if there's a closing ' after the ) +
    if after.startswith("+ '"):
        pass  # good
    elif after.startswith('+ "'):
        pass  # good
    else:
        is_bad = True
    
    if is_bad:
        bad_count += 1
        full_ctx = js[max(0,start-40):m.end()+40]
        safe = full_ctx.encode('utf-8', errors='replace').decode('utf-8')
        print(f'BAD #{bad_count}: ...{safe}...')

print(f'\nTotal __() calls: {count}')
print(f'BAD (inside string, not evaluated): {bad_count}')

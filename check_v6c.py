import sys, re
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Show the FIRST 5 __() calls with full context
count = 0
for m in re.finditer(r"__\(['\"][^'\"]*['\"]\)", js):
    count += 1
    if count > 10:
        break
    # Show 50 chars before and 50 after
    ctx = js[max(0,m.start()-50):m.end()+50]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print(f'__() #{count}:')
    print(f'  ...{safe}...')
    print()

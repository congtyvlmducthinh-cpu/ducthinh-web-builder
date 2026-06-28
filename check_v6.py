import sys, re
sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Check __() calls and if they're properly concatenated (not inside strings)
bad_count = 0
good_count = 0
for m in re.finditer(r"__\(['\"][^'\"]*['\"]\)", js):
    start = m.start()
    call = m.group()
    
    # Check context: before should end with ' + or " + 
    before = js[max(0,start-3):start]
    after = js[m.end():m.end()+3]
    
    # Good: ...' + __(...) + '...
    # Bad:  ...text __(...) text... inside string
    
    is_good = (before == "' +" or before == '" +') and (after == " +'" or after == ' +"')
    
    if is_good:
        good_count += 1
        ctx = js[max(0,start-20):m.end()+20]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        print(f'GOOD: {safe}')
    else:
        bad_count += 1
        ctx = js[max(0,start-30):m.end()+20]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        print(f'BAD #{bad_count}: {safe}')
        if bad_count >= 10:
            print('... (more bad calls)')
            break

print(f'\nGood __() calls: {good_count}')
print(f'Bad __() calls: {bad_count}')

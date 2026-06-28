import sys, re
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Show js around position 79200 relative to main_start
print('Position 79200 in js:', js[79190:79220].encode('utf-8', errors='replace').decode('utf-8', errors='replace'))
print('---')
# Show the actual region around 79200
print('Context:', repr(js[79180:79250]))

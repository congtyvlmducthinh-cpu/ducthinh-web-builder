import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Show character by character around position 79200
print('js[79190:79220] char-by-char:')
for i in range(79190, 79220):
    c = js[i]
    r = repr(c)
    print(f'  {i}: {r}')

import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Show 200 chars centered around 79182
print('Context around position 79182 (relative to js):')
print(repr(js[79140:79220]))
print()
print('Context around position 79182 (absolute file):')
abs_pos = main_start + 79182
print(repr(t[abs_pos-30:abs_pos+30]))

import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Hex dump around the suspect area (relative position 79175-79205)
print('Hex dump js[79150:79210]:')
for i in range(79150, 79210):
    c = js[i]
    print(f'  {i}: U+{ord(c):04X} {repr(c)}')

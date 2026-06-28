import sys, re
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Debug: trace the string parser around position 79200
# First scan up to the quote at 79200 and verify quote handling

# Let me trace ALL quotes in a small window
window = js[79150:79250]
print('Window around 79200:')
i = 0
while i < len(window):
    if window[i] in "\"'`":
        print(f'  pos={79150+i} char={repr(window[i])} context={repr(window[max(0,i-3):i+10])}')
    i += 1

# Now let me find quote at 79200 in the full js
print()
print(f'js[79193] = {repr(js[79193])}')
print(f'js[79194:79210] = {repr(js[79194:79210])}')

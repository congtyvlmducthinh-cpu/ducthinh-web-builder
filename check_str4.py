import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Find the quote at position 79200
for i in range(79190, 79230):
    if js[i] in "\"'":
        q = js[i]
        print(f'Quote {q} at position {i} (relative to JS start)')
        # Scan forward
        j = i+1
        while j < len(js):
            if js[j] == '\\':
                j += 2; continue
            if js[j] == q:
                print(f'  Closing {q} at position {j}, len={j-i}')
                break
            if js[j] == '\n':
                print(f'  NEWLINE at {j}, char={repr(js[j-10:j+10])}')
            j += 1
            if j - i > 200:
                print(f'  Ran 200 chars without finding close, area={repr(js[i+1:i+101])}')
                break
        break

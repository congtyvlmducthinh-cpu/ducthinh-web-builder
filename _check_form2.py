import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the full q-modal-form content more carefully
idx = d.find('<div class="q-modal-form">')
if idx >= 0:
    # Find the matching closing </div> by tracking nesting
    depth = 1
    pos = idx + len('<div class="q-modal-form">')
    while depth > 0 and pos < len(d):
        if d[pos:pos+4] == '<div':
            depth += 1
            pos += 4
        elif d[pos:pos+6] == '</div>':
            depth -= 1
            if depth == 0:
                break
            pos += 6
        else:
            pos += 1
    print('Full q-modal-form (offset {} to {}):'.format(idx, pos+6))
    print(repr(d[idx:pos+6]))

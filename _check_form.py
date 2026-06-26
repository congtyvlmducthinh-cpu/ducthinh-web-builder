import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the q-modal-form section
idx = d.find('<div class="q-modal-form">')
if idx >= 0:
    end = d.find('</div>', idx)
    end2 = d.find('</div>', end+5)
    print('q-modal-form content:')
    print(repr(d[idx:end2+6]))

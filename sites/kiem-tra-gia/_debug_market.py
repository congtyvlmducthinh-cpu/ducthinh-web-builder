# Fix market toggle UI
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find marketGroup
idx = d.find('id="marketGroup"')
if idx >= 0:
    start = d.rfind('<', idx, idx-200)
    end = d.find('</div>', idx) + 6
    print('Found marketGroup HTML:')
    print(repr(d[start:end]))
    print()

# Check the actual HTML string - are the unicode chars there?
idx2 = d.find('marketCn')
if idx2 >= 0:
    ctx = d[idx2:idx2+200]
    print('Context around marketCn button:')
    print(repr(ctx))

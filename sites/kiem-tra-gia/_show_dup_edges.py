import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()
lines = d.split('\n')

# Show lines 405-450
print('=== Lines 405-450 ===')
for i in range(404, min(450, len(lines))):
    print(f'{i+1}: {repr(lines[i][:150])}')

# Locate market toggle in HTML
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find "marketGroup" in the HTML
idx = d.find('marketGroup')
if idx >= 0:
    print(f'marketGroup at offset {idx}')
    # Show area around it
    print(repr(d[max(0,idx-50):idx+200]))
else:
    print('marketGroup NOT FOUND in HTML!')
    # Check JS for it
    js_idx = d.find('setMarket')
    print(f'setMarket in JS at {js_idx}')
    if js_idx >= 0:
        print(repr(d[js_idx-100:js_idx+200]))

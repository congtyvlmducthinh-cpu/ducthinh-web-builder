import sys; sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', encoding='utf-8') as f:
    c = f.read()

# Check what's actually written for the emoji
idx = c.find('mlToggleBtn')
print('Button HTML:', repr(c[idx:idx+250]))
print()
# Check the toggle function
idx2 = c.find('function toggleMaxLoad')
print('Toggle fn:', repr(c[idx2:idx2+350]))

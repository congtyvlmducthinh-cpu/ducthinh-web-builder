import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

hdr = t.find('</header>')
print(f'</header> at {hdr}')
# Show 100 chars before
print(repr(t[hdr-100:hdr]))

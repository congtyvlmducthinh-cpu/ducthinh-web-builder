# Properly validate JS
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the SECOND script tag (the one with JS code, not the XLSX include)
script_tags = []
idx = 0
while True:
    idx = d.find('<script>', idx)
    if idx < 0: break
    close = d.find('</script>', idx)
    if close < 0: break
    script_tags.append((idx, close))
    idx = close + 9

print(f'Found {len(script_tags)} script tags')
for i, (s, e) in enumerate(script_tags):
    content = d[s+len('<script>'):e]
    print(f'\nScript #{i}: offset {s}, length {len(content)}')
    print(f'  First 50 chars: {content[:50]}')
    
    # Try to compile just the JS part
    # But only if it doesn't contain HTML/CSS
    if '<' not in content[:100]:
        try:
            compile(content, '<test>', 'exec')
            print(f'  ✅ JS syntax valid!')
        except SyntaxError as e:
            print(f'  ⚠️ Error line ~{e.lineno}: {e.msg}')
    else:
        print(f'  ⚠️ Contains HTML/CSS, skip compile')

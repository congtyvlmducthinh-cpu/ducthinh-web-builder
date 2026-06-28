import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the 2nd script tag (main JS)
# First check structure
for i, m in enumerate(re.finditer(r'<script[^>]*>', text)):
    end = text.find('</script>', m.start())
    size = end - m.start()
    print(f'Script {i}: chars {m.start()}-{end} ({size} bytes)')
    if i < 3:
        print(f'  starts with: {text[m.start():m.start()+60]}')

# Find render() - which script is it in?
for i, m in enumerate(re.finditer(r'<script[^>]*>', text)):
    end = text.find('</script>', m.start())
    snippet = text[m.start():end]
    if 'function render()' in snippet:
        print(f'\nrender() is in Script {i} (chars {m.start()}-{end})')
        # Show key strings that should be __() wrapped
        for key in ['Giá bán', 'Bao bì', 'Quy cách khác', 'Tính giá', 'Quản lý', 'Sản phẩm', 'Bảng giá']:
            pos = snippet.find(key)
            if pos >= 0:
                ctx = snippet[max(0,pos-20):pos+len(key)+20]
                safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
                print(f'  Found "{key}" at local {pos}: ...{safe}...')
    # Also check data-i18n in scripts
    if 'data-i18n' in snippet and 'LANG' not in snippet and 'function __' not in snippet:
        print(f'\nScript {i} has data-i18n but NOT LANG/__')

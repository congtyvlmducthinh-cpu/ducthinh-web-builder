import re, shlex

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Get the script content only (without the // Data comment and the var DATA_... lines that are the same)
vi_script_start = vi.find('// ======')
en_script_start = en.find('// ======')

# Just check for obvious syntax errors - look for JS reserved words that might be broken
vi_lines = vi[vi.find('// ======'):].split('\n')
en_lines = en[en.find('// ======'):].split('\n')

print(f"VI script from // ======: {len(vi_lines)} lines")
print(f"EN script from // ======: {len(en_lines)} lines")

# Check for the applyMarket function (called at page load)
vi_apply = vi.find('function applyMarket')
en_apply = en.find('function applyMarket')
print(f"\nVI applyMarket at char {vi_apply}")
print(f"EN applyMarket at char {en_apply}")

# Check the HTML structure MORE carefully  
# Let's find the price-mode-bar closing
vi_pm = vi.find('price-mode-bar')
vi_pm_close = vi.find('</div>', vi_pm)
# Check how many divs need to close before mainContainer
snippet = vi[vi_pm_close:vi.find('mainContainer')]
vi_open = snippet.count('<div')
vi_close = snippet.count('</div>')
print(f"\nVI between price-mode-bar close and mainContainer: open={vi_open}, close={vi_close}, net={vi_open-vi_close}")

en_pm = en.find('price-mode-bar')
en_pm_close = en.find('</div>', en_pm)
snippet_en = en[en_pm_close:en.find('mainContainer')]
en_open = snippet_en.count('<div')
en_close = snippet_en.count('</div>')
print(f"EN between price-mode-bar close and mainContainer: open={en_open}, close={en_close}, net={en_open-en_close}")

# Check the entire HTML head/body structure for VI
print("\n--- VI HTML body structure check ---")
vi_body = vi[vi.find('<body'):vi.find('<script>', vi.find('// Data'))]
vi_body_open = vi_body.count('<div')
vi_body_close = vi_body.count('</div>')
print(f"VI body HTML (before script): div open={vi_body_open}, close={vi_body_close}, net={vi_body_open-vi_body_close}")

en_body = en[en.find('<body'):en.find('<script>', en.find('// Data'))]
en_body_open = en_body.count('<div')
en_body_close = en_body.count('</div>')
print(f"EN body HTML (before script): div open={en_body_open}, close={en_body_close}, net={en_body_open-en_body_close}")

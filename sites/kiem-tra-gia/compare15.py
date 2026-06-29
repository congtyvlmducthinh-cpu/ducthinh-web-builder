import re, io

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html','r',encoding='utf-8') as f: vi=f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html','r',encoding='utf-8') as f: en=f.read()

# Let me check the HTML between price-mode-bar and mainContainer
vi_pm_end = vi.find('</div>', vi.find('price-mode-bar'))
en_pm_end = en.find('</div>', en.find('price-mode-bar'))

# Find all div closes from price-mode-bar end to mainContainer
snippet = vi[vi_pm_end:vi.find('mainContainer')]
# Check for any extra divs or broken HTML
print("VI snippet after price-mode-bar:")
# Parse it by lines
for line in snippet.split('\n'):
    stripped = line.strip()
    if stripped:
        print(stripped[:200])

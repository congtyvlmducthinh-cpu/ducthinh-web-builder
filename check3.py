import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    text = f.read()

# Find body content between LANG script and main script
# Structure:
# [0-196] DOCTYPE + head
# [197-274] CDN script
# [275-11495] LANG script (injected)
# [11496-39801] body, header, all static HTML
# [39802-156927] Main JS (DATA + render)

# Show the HTML between LANG script end and main script beginning
# that contains __() calls
html_section = text[11495:39801]

# Find __() calls in it
import re
count = 0
for m in re.finditer(r"\+ __\([^)]+\) \+", html_section):
    ctx = html_section[max(0, m.start()-30):m.end()+30]
    ctx = repr(ctx)[1:-1]
    print(f'{m.start()}: ...{ctx}...')
    count += 1
    if count >= 15:
        print(f'...and {len(re.findall(r"\+ __\([^)]+\) \+", html_section)) - count} more')
        break

print(f'\nTotal __() in static HTML: {len(re.findall(r"\+ __\([^)]+\) \+", html_section))}')
print(f'Total __() in file: {text.count("__(")}')

# Since the header is STATIC HTML, __() won't work there
# We need to:
# 1. Keep the Vietnamese text as-is in static HTML (so it shows correctly)
# 2. Add data-lang attributes
# 3. Have switchLang update static HTML elements too

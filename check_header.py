import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# Find close to </header>
hdr_pos = t.find('</header>')
print(f'</header> at {hdr_pos}')
# Show 200 chars before </header>
before = t[max(0,hdr_pos-200):hdr_pos]
safe_before = before.encode('utf-8', errors='replace').decode('utf-8')
print(f'Before:\n{safe_before}')
print('\n---')
# Show 500 chars after </header>
after = t[hdr_pos:hdr_pos+500]
safe_after = after.encode('utf-8', errors='replace').decode('utf-8')
print(f'After:\n{safe_after}')
print('\n---')

# Search for any 'lang' attributes in the HTML (non-JS)
html_part = t[:t.rfind('<script>')]
# Find anything resembling lang buttons
i = html_part.find('data-lang=')
count = 0
while i > 0:
    count += 1
    ctx = html_part[max(0,i-30):i+50]
    print(f'  data-lang #{count}: {repr(ctx[:80])}')
    i = html_part.find('data-lang=', i+1)

print(f'\nTotal data-lang= in HTML: {count}')
print(f'dataset.lang references: {html_part.count("dataset.lang")}')

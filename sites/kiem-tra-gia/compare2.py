import sys, re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'r', encoding='utf-8') as f:
    vi = f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html', 'r', encoding='utf-8') as f:
    en = f.read()

# Check HTML structure around marketGroup and priceModeBar
m_vi = vi.find('id="marketGroup"')
m_en = en.find('id="marketGroup"')
print("=== VI around marketGroup ===")
print(vi[m_vi-100:m_vi+500].encode('utf-8', errors='replace'))
print()
print("=== EN around marketGroup ===")
print(en[m_en-100:m_en+500].encode('utf-8', errors='replace'))

# Check if controls div is properly closed
c_vi = vi.find('<div class="controls"')
c_en = en.find('<div class="controls"')
assert c_vi >= 0 and c_en >= 0
print("\n=== VI controls block length info ===")
c_vi_end = vi.find('</div>', c_vi)
while c_vi_end > 0:
    snippet = vi[c_vi:c_vi_end+6]
    # count open and close div tags
    opens = snippet.count('<div')
    closes = snippet.count('</div>')
    if opens == closes:
        print(f"Controls div properly closed at char {c_vi_end}")
        print(snippet[200:400].encode('utf-8', errors='replace'))
        break
    c_vi_end = vi.find('</div>', c_vi_end+6)
    if c_vi_end < 0 or c_vi_end - c_vi > 5000:
        print("Could not find proper close")
        break

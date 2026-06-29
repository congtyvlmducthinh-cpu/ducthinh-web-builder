import re

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'r', encoding='utf-8') as f:
    vi = f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html', 'r', encoding='utf-8') as f:
    en = f.read()

# Check HTML structure around marketGroup and priceModeBar
m_vi = vi.find('id="marketGroup"')
m_en = en.find('id="marketGroup"')
print("=== VI around marketGroup ===")
print(repr(vi[m_vi-100:m_vi+500]))
print()
print("=== EN around marketGroup ===")
print(repr(en[m_en-100:m_en+500]))

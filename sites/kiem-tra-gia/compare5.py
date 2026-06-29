import re, sys

with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'r', encoding='utf-8') as f:
    vi = f.read()
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html', 'r', encoding='utf-8') as f:
    en = f.read()

vi_scripts = re.findall(r'<script[^>]*>(.*?)</script>', vi, re.DOTALL)
en_scripts = re.findall(r'<script[^>]*>(.*?)</script>', en, re.DOTALL)

vi_app = vi_scripts[-1]
en_app = en_scripts[-1]

# Find differences in the end sections (where saveToServer was added)
vi_end = vi_app[-5000:]
en_end = en_app[-5000:]

# Print as plain text to file to avoid encoding issues
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_end.txt', 'w', encoding='utf-8') as f:
    f.write(vi_end)
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_end.txt', 'w', encoding='utf-8') as f:
    f.write(en_end)

print("Written vi_end.txt and en_end.txt")

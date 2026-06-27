#!/usr/bin/env python3
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, 'utf-8')

with open('index.html', encoding='utf-8') as f:
    content = f.read()

# Fix colspan from 5 to 4 for Thông tin header
old = '<th colspan="5">Th\\u00f4ng tin</th>'
new = '<th colspan="4">Th\\u00f4ng tin</th>'
content = content.replace(old, new)
print('Fixed colspan')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

# -*- coding: utf-8 -*-
"""Show the toolbar HTML"""
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    d = f.read()

idx = d.find('<div class="toolbar"')
if idx >= 0:
    depth = 1
    pos = idx + len('<div class="toolbar">')
    while depth > 0 and pos < len(d):
        if d[pos:pos+4] == '<div': depth += 1; pos += 4
        elif d[pos:pos+6] == '</div>':
            depth -= 1
            if depth == 0:
                print(d[idx:pos+6])
                break
            pos += 6
        else: pos += 1

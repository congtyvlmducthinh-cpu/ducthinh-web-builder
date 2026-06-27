#!/usr/bin/env python3
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, 'utf-8')

with open('index.html', encoding='utf-8') as f:
    content = f.read()

# Remove the max loading TD and logic (replaced by empty td earlier)
# Now remove it entirely
old = (
    "    // Max loading\n"
    '    var ml = DATA_MAX_LOADING[p.code];\n'
    '    var maxLoad = "";\n'
    '    if (ml && ml.max25 !== null && ml.max25 !== undefined) maxLoad = ml.max25 + " tấn";\n'
    '    else if (ml && ml.maxJumbo !== null && ml.maxJumbo !== undefined) maxLoad = ml.maxJumbo + " tấn";\n'
    "    h += '<td></td>';\n"
)
if old in content:
    content = content.replace(old, '')
    print('Removed max loading cell block')
else:
    # Try to find and remove by position
    idx = content.find('// Max loading\n')
    if idx >= 0:
        end_marker = "h += '<td></td>';\n"
        end_idx = content.find(end_marker, idx)
        if end_idx >= 0:
            block = content[idx:end_idx + len(end_marker)]
            print(f'Found block: {repr(block)}')
            content = content.replace(block, '')
            print('Removed by position')
        else:
            print('End marker not found')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

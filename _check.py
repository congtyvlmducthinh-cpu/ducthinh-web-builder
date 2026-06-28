import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    text = f.read()

# Check LANG object keys match
import json
# Extract LANG object
start = text.find('var LANG = ') + len('var LANG = ')
brace_count = 0
pos = start
while pos < len(text):
    if text[pos] == '{':
        brace_count += 1
    elif text[pos] == '}':
        brace_count -= 1
        if brace_count == 0:
            end = pos + 1
            break
    pos += 1

lang_json = text[start:end]
try:
    LANG = json.loads(lang_json)
    print('LANG object valid JSON')
    print('Total keys:', len(LANG))
    for k, v in list(LANG.items())[:3]:
        print(f'  "{k}": en={v["en"]!r}, zh={v["zh"]!r}')
except Exception as e:
    print(f'LANG JSON error: {e}')

# Count __() calls
count = text.count('__(')
print(f'Total __() calls: {count}')

# Check for broken data
for name in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING']:
    if name in text:
        idx = text.find('var ' + name)
        end_idx = text.find(']', idx)
        snippet = text[idx:end_idx+1]
        data_calls = snippet.count('__(')
        if data_calls > 0:
            print(f'WARNING: {data_calls} __() calls found in {name}!')
        else:
            print(f'{name}: clean')

# Check title
title_start = text.find('<title>')
title_end = text.find('</title>')
if title_start > 0:
    title = text[title_start+7:title_end]
    print(f'Title: {title}')

# Find first __() call that has '?' (encoding issue)
q_count = text.count('?')
print(f'Total "?" chars: {q_count}')

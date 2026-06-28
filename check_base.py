import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    text = f.read()
print(f'File size: {len(text)} chars')
has_lang = 'var LANG =' in text
has_fn = 'function __' in text
calls = text.count("__(")
lang_btn = text.count("lang-btn")
data_i18n = text.count("data-i18n")
print(f'LANG object: {has_lang}')
print(f'__() function: {has_fn}')
print(f'__() calls: {calls}')
print(f'lang-btn: {lang_btn}')
print(f'data-i18n: {data_i18n}')
# Check first 50 chars
print(f'Start: {repr(text[:100])}')

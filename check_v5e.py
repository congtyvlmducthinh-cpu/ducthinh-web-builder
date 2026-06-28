import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# Find main JS
main_idx = t.rfind('<script>')
main_js = t[main_idx:]

# Check ALL __( calls end properly
open_positions = []
for m in re.finditer(r"__\('", main_js):
    open_positions.append(m.start())

print(f"Total __(' calls in main JS: {len(open_positions)}")

# For each, find the matching ')
bad_calls = []
for pos in open_positions:
    start = pos + 4
    end = main_js.find("')", start)
    if end < 0:
        bad_calls.append((pos, "no closing quote"))
    else:
        snippet = main_js[start:end]
        if ')' in snippet:
            bad_calls.append((pos, "paren inside key", snippet[:60]))

print(f"Bad __() calls: {len(bad_calls)}")
for bc in bad_calls[:5]:
    print(f"  pos {bc[0]}: {bc[1]} - {repr(bc[2])[:60]}")

# Check for malformed patterns: ++, + + etc
for m in re.finditer(r'\+\+\s+__', main_js):
    ctx = main_js[max(0,m.start()-20):m.end()+10]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print(f"DOUBLE PLUS in main JS: {safe[:80]}")

# The key "Tự động (theo quy cách bao)" has paren
# Since it's in single-quoted string, it should be fine
# Let's verify by checking if the LANG object has it
lang_idx = t.find('var LANG')
lang_end = t.find(';', lang_idx)
# LANG is a JSON object, find its end
depth = 0
pos = lang_idx
while pos < len(t):
    if t[pos] == '{': depth += 1
    elif t[pos] == '}':
        depth -= 1
        if depth == 0:
            lang_end = pos + 1
            break
    pos += 1

lang_snippet = t[lang_idx:lang_end]
key_with_paren = lang_snippet.count("Tự động (theo quy cách bao)")
print(f"\nKey with paren in LANG: {key_with_paren} times")
# Check if key is properly escaped
if key_with_paren > 0:
    idx2 = lang_snippet.find("Tự động (theo quy cách bao)")
    print(f"  At: {repr(lang_snippet[idx2-5:idx2+40])}")

print("\nDone checking!")

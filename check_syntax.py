import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Extract JS between <script> and </script>
idx1 = d.find('<script>') + len('<script>')
idx2 = d.rfind('</script>')
js = d[idx1:idx2]

# Check for common issues
# 1. Newlines inside string literals (broken multi-line strings)
# 2. Uneven curly braces
# 3. Uneven parentheses
# 4. 'do' without 'while' (corruption marker)

# Check for 'do' keyword usage (legitimate vs corruption)
do_matches = [(m.start(), d[m.start():m.start()+100]) for m in re.finditer(r'\bdo\b', js)]
print(f"'do' keyword appearances: {len(do_matches)}")
for pos, ctx in do_matches:
    print(f"  At pos {pos}: {repr(ctx[:60])}")

# Check brace balance
open_brace = js.count('{')
close_brace = js.count('}')
print(f'\nBraces: {{ = {open_brace}, }} = {close_brace}')
if open_brace != close_brace:
    print(f'  MISMATCH by {open_brace - close_brace}')

open_paren = js.count('(')
close_paren = js.count(')')
print(f'Parens: ( = {open_paren}, ) = {close_paren}')
if open_paren != close_paren:
    print(f'  MISMATCH by {open_paren - close_paren}')

open_bracket = js.count('[')
close_bracket = js.count(']')
print(f'Brackets: [ = {open_bracket}, ] = {close_bracket}')

# Check for template literals with ${...}
backtick_count = js.count('`')
print(f'\nBackticks: {backtick_count} (should be even)')

# Count single vs double quotes within strings (simplified)
single_q = js.count("'")
double_q = js.count('"')
print(f"Single quotes ('): {single_q} (should be even)")
print(f'Double quotes ("): {double_q} (should be even)')

import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Fix 1: Remove "... (2 duplicate lines)" placeholder
d = d.replace('  ... (2 duplicate lines)', '')

# Fix 2: Fix quoting in onclick attributes
# Current: onclick="setCalcCurrency('VND')"  -- inside single-quote JS string => breaks
old_vnd = "onclick=\"setCalcCurrency('VND')\""
new_vnd = "onclick=\"setCalcCurrency(\\'VND\\')\""
old_usd = "onclick=\"setCalcCurrency('USD')\""
new_usd = "onclick=\"setCalcCurrency(\\'USD\\')\""

# Count occurrences before
print(f'Found old_vnd: {d.count(old_vnd)}')
print(f'Found old_usd: {d.count(old_usd)}')

d = d.replace(old_vnd, new_vnd)
d = d.replace(old_usd, new_usd)

# Fix 3: Verify no remaining placeholders
for pat in ['...(2 duplicate', '...,...']:
    if pat in d:
        print(f'WARN: still has {pat}')

# Fix 4: Check script tag balance
opens = d.count('<script')
closes = d.count('</script>')
print(f'<script: {opens}, </script>: {closes}')

with open('sites/kiem-tra-gia/index.html','w',encoding='utf-8') as f:
    f.write(d)

print('Fixed!')

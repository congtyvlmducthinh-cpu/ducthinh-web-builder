& "C:\Users\Admin\AppData\Local\Programs\Python\Python313\python.exe" -c "
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Fix 1: Fix quoting in onclick attributes
# Current: onclick=\"setCalcCurrency('VND')\" inside h += '...' JS string
# Problem: single quotes conflict
# Fix: change to onclick=\"setCalcCurrency(%27VND%27)\" or use escaped unicode
# Better approach: since h += uses single quotes for JS string, use double quotes for HTML attrs and
# use HTML entity &#39; for single quotes inside onclick

old_vnd = \"h += '<button class=\\\"mode-btn active\\\" id=\\\"calcCcyVnd\\\" onclick=\\\"setCalcCurrency('VND')\\\">VND</button>';\"
new_vnd = \"h += '<button class=\\\"mode-btn active\\\" id=\\\"calcCcyVnd\\\" onclick=\\\"setCalcCurrency(\\\\'VND\\\\')\\\">VND</button>';\"

old_usd = \"h += '<button class=\\\"mode-btn\\\" id=\\\"calcCcyUsd\\\" onclick=\\\"setCalcCurrency('USD')\\\">USD</button>';\"
new_usd = \"h += '<button class=\\\"mode-btn\\\" id=\\\"calcCcyUsd\\\" onclick=\\\"setCalcCurrency(\\\\'USD\\\\')\\\">USD</button>';\"

print('old_vnd found:', old_vnd in d)
print('old_usd found:', old_usd in d)

if old_vnd in d:
    d = d.replace(old_vnd, new_vnd)
if old_usd in d:
    d = d.replace(old_usd, new_usd)

# Fix 2: Remove leftover placeholder
old_placeholder = '  ... (2 duplicate lines)'
if old_placeholder in d:
    d = d.replace(old_placeholder, '')
    print('Removed placeholder')

with open('sites/kiem-tra-gia/index.html','w',encoding='utf-8') as f:
    f.write(d)
print('Done')
" 2>&1
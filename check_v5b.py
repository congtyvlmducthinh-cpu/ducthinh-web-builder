import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

# The MAIN JS is the LAST script tag
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Check __() found ONLY in JS, not in LANG script
opens_in_js = js.count('__(')
print('__() in main JS:', opens_in_js)

# Check renderPriceTab
idx = js.find('function renderPriceTab')
end = js.find('function renderCalcTab', idx)
body = js[idx:end]
calls = body.count('__(')
print('renderPriceTab:', calls, '__() calls')

# List each __() in renderPriceTab  
for m in re.finditer(r"__\([^)]*\)", body):
    ctx = body[max(0,m.start()-10):m.end()+5]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print('  ', safe[:100])

# Check renderBagsTab
idx2 = js.find('function renderBagsTab')
end2 = js.find('function renderOthersTab', idx2)
body2 = js[idx2:end2]
print('\nrenderBagsTab:', body2.count('__('), '__() calls')

# Check renderOthersTab
idx3 = js.find('function renderOthersTab')
end3 = js.find('function render', idx3+50)
body3 = js[idx3:end3]
print('renderOthersTab:', body3.count('__('), '__() calls')

# Check renderCalcTab 
idx4 = js.find('function renderCalcTab')
end4 = js.find('function render', idx4+50)
body4 = js[idx4:end4]
print('renderCalcTab:', body4.count('__('), '__() calls')
for m in re.finditer(r"__\([^)]*\)", body4):
    ctx = body4[max(0,m.start()-15):m.end()+10]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print('  ', safe[:100])

# Check render()
idx5 = js.rfind('function render()')
end5 = js.find('function updateDataInfo', idx5)
body5 = js[idx5:end5]
print('\nrender():', body5.count('__('), '__() calls')

# Count unmatched parens
opens = js.count('__(')
closes = js.count(') +')
print(f'\n__() opens: {opens}, ) + closes: {closes}')

# Check for broken patterns like ++ or empty +
for m in re.finditer(r'\+ \+\s*\n|\(\s*\)\s*\+', js):
    ctx = js[max(0,m.start()-20):m.end()+20]
    safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
    print('POTENTIAL BROKEN:', safe[:80])

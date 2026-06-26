import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Fix 1: In render() function, also show/hide controlBar + priceModeBar
old = 'function render() {\n  var container = document.getElementById("mainContainer");\n  if (!container) return;\n  \n  if (activeTab === "pricelist") populateFilters();'

new = 'function render() {\n  var container = document.getElementById("mainContainer");\n  if (!container) return;\n  \n  // Control bar visibility (safe redundant call)\n  var cbar = document.getElementById("controlBar");\n  if (cbar) cbar.style.display = (activeTab === "pricelist") ? "flex" : "none";\n  var pBar = document.getElementById("priceModeBar");\n  if (pBar) pBar.style.display = (activeTab === "pricelist") ? "flex" : "none";\n  \n  if (activeTab === "pricelist") populateFilters();'

if old in d:
    d = d.replace(old, new, 1)
    print('✅ Fix 1: render() now also shows/hides controlBar + priceModeBar')
else:
    print('❌ Fix 1 failed')
    idx = d.find('function render()')
    print(repr(d[idx:idx+200]))

# Fix 2: Call applyMarket() + switchTab() on init instead of just render()
old2 = 'render();\n</script>'
new2 = 'applyMarket();\nswitchTab("pricelist");\n</script>'

# Also try without newline
if old2 not in d:
    old2 = 'render();</script>'
    new2 = 'applyMarket();\nswitchTab("pricelist");</script>'

if old2 in d:
    d = d.replace(old2, new2, 1)
    print('✅ Fix 2: init now calls applyMarket() + switchTab()')
else:
    print('❌ Fix 2 failed')
    idx2 = d.rfind('render()')
    print(f'Last render() at {idx2}: {repr(d[idx2:idx2+30])}')

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d)
print('✅ Written')

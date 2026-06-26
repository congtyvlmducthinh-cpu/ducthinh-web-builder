import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# 1. After upload succeeds, save DATA_PRODUCTS to localStorage
# Find the complete upload handler
idx = d.find('if (s.length > 0) {')
# The forEach block and DATA_PRODUCTS = s
# After that block, add save

old_marker = '      document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;'
# Add localStorage save right before this
new_marker = '      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));\n      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));\n      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));\n      ' + old_marker

d2 = d.replace(old_marker, new_marker)

# 2. In init, check localStorage first
# Find the init section where DATA_PRODUCTS is used
# Look for: applyMarket(); switchTab("pricelist");
old_init = 'applyMarket();\nswitchTab("pricelist");'
new_init = '''var saved = localStorage.getItem("dq_products");
if (saved) {
  try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}
}
var savedBags = localStorage.getItem("dq_bags");
if (savedBags) {
  try { DATA_BAGS = JSON.parse(savedBags); } catch(e) {}
}
var savedOthers = localStorage.getItem("dq_others");
if (savedOthers) {
  try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
}
applyMarket();
switchTab("pricelist");'''

d3 = d2.replace(old_init, new_init)

# Also add a "restore defaults" button in manage tab
# Find the upload section end, add a restore button

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d3)

print(f'Size: {len(d)} -> {len(d3)}')

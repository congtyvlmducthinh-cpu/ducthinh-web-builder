import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Fix 1: Add "Max tải" column to 2nd header row (using unicode escapes to match JS)
# Find: <th>M\u00e1y</th><th>25KG
# Replace with: <th>M\u00e1y</th><th>Max t\u1ea3i</th><th>25KG

old = '<th>M\\u00e1y</th><th>25KG <span class="info-row">(VND)</span></th>'
new = '<th>M\\u00e1y</th><th>Max t\\u1ea3i</th><th>25KG <span class="info-row">(VND)</span></th>'

d2 = d.replace(old, new)

# Fix 2: Add "Max tải" header colspan 1 in first header row
# Currently: <th colspan="5">Thông tin</th>
# The info section has: Mã(1), Kích thước(2), Tiêu chuẩn(3), Máy(4), Max tải(5) = 5 ✅ correct

# Fix 3: But first header row "Giá bán (EXW)" has colspan=2 - Mã(1)+KT(2)+TC(3)+Máy(4)+Max tải(5) = 5 for info
# Then Giá bao gồm bao bì = 2 cols (25KG, Jumbo) ✅
# Then Giá bán (EXW) = 2 cols (EXW, Hoa hồng) ✅
# colspan="5" + colspan="2" + colspan="2" = 9 ✅

# Fix 4: Filters not working - populateFilters() is called but ...
# Actually populateFilters is called in switchTab, and after upload. 
# The issue might be that when renderPriceTab reads specFilter.value, it reads 
# but the filter elements haven't been populated yet on first render.

# Actually the real filter issue: renderPriceTab creates filtered list using 
# specFilter.value. On init, populateFilters() fills the <select> options.
# But the <select> elements exist in HTML, so reading .value should work.

# Let me check: the init sequence is:
# localStorage load → applyMarket() → switchTab("pricelist")
# switchTab sets activeTab, shows controlBar, calls populateFilters(), then render()
# populateFilters populates the <select> elements, preserving current value
# render() calls renderPriceTab() which reads specFilter.value

# Hmm, but on first run, specFilter has no option values (only "Tất cả tiêu chuẩn"),
# so specFilter.value is "", which means no filter - all products show.
# After populateFilters, options get filled. So the next render() call would work.

# Actually wait - renderPriceTab does:
# if (specFilter && p.standard !== specFilter) return false;
# If specFilter is "" (empty string), and p.standard is "A1", then "" !== "A1" is true!
# So the filter function would be: specFilter="" means p.standard !== "" → true → filter OUT the product!
# That's the bug! Empty filter should mean DON'T filter, but the logic filters OUT when !==

# Wait no - "" === "" is true, "" !== "" is false. So:
# specFilter = "" (meaning "all specs")
# p.standard = "A1"
# if ("" && p.standard !== "") → false (short-circuits on "") → doesn't filter
# That's correct! The bug is when specFilter is valid: "A1"
# if ("A1" && p.standard !== "A1") → true → filter OUT

# Actually that IS correct. So filters should work.

# But the real question: is populateFilters called BEFORE exportToExcel/render?
# In renderPriceTab it reads: searchInput.value, specFilter.value
# On first init: switchTab calls populateFilters() then render()
# populateFilters fills options, preserves value
# render() calls renderPriceTab which reads specFilter.value
# This should work...

# Let me check if maybe the issue is that renderPriceTab tries to access .toLowerCase() on null
if 'p.size.toLowerCase()' in d:
    print('OK - size.toLowerCase() used')
else:
    print('WARNING: size.toLowerCase() NOT found')

# Check if size could be null (undefined) - filters check p.size.toLowerCase()
# What if some products have null size?
import json
raw = d[d.find('var DATA_PRODUCTS = [\n') + 22 : d.find('];', d.find('var DATA_PRODUCTS = [\n') + 30)]
entries = []
depth, s = 0, 0
for i, ch in enumerate(raw):
    if ch == '{':
        if depth == 0: s = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            entries.append(json.loads(raw[s:i+1]))

null_sizes = [p for p in entries if p.get('size') is None]
print(f'\nNull sizes: {len(null_sizes)}')
for p in null_sizes:
    print(f'  {p["code"]}')

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print(f'\nHeader fixed: {len(d)} -> {len(d2)}')
print('Added Max tải column to header row')

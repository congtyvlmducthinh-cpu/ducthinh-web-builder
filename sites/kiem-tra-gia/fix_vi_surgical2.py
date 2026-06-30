import sys, re

def fix_vi_blocks_surgically(filepath, label):
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()

    # Only vi.html has the problem: two saveToServer functions.
    # Keep the OLD one (correct blocks), remove the NEW one.

    v1 = c.find('function saveToServer()')  # old one, has all 5 fields
    v2 = c.find('function saveToServer()', v1 + 1)  # new UI one, missing 2 fields

    if v2 < 0:
        # Only 1 function - just check it has all 5 fields
        idx = c.find('function saveToServer()')
        block = c[idx:idx+800]
        has_all = all(kw in block for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
        print(f"[{label}] 1 function, all 5: {has_all}")
        if not has_all:
            print(f"[{label}] Missing fields, needs manual fix")
        return

    # The OLD (first) saveToServer already has all 5 fields (var blocks style)
    # The NEW (second) saveToServer has UI feedback but missing MAX_LOADING + COST_FOB
    # Strategy: remove the NEW one, keep the OLD one

    # Find end of SECOND saveToServer
    brace = c.find('{', v2)
    depth = 1
    pos = brace + 1
    while depth > 0 and pos < len(c):
        if c[pos] == '{': depth += 1
        elif c[pos] == '}': depth -= 1
        pos += 1

    # Remove the SECOND function (the UI version with missing fields)
    # But wait - we need to check if the upload handler calls saveToServer()
    # If it calls the old one (that's fine, it has all data)
    
    # Actually, we want the UI version (second one) because it shows "Đang lưu..." feedback
    # But it's missing DATA_MAX_LOADING and DATA_COST_FOB
    # Better approach: REMOVE the first, ADD missing fields to second manually
    
    # Actually simplest approach: remove the first (old style), 
    # and ADD DATA_MAX_LOADING + DATA_COST_FOB to the remaining one
    
    old_first = c[v1:v2-3]  # includes the function
    c = c.replace(old_first, '')  # remove first
    # adjust for removed chars
    v2 = c.find('function saveToServer()')
    
    # Now find the blocks: { ... } in the remaining saveToServer
    bs = c.find('blocks: {', v2)
    bo = c.find('{', bs)
    depth = 1
    pos = bo + 1
    while depth > 0:
        if c[pos] == '{': depth += 1
        elif c[pos] == '}': depth -= 1
        pos += 1

    blocks_content = c[bo:pos]
    print(f"[{label}] Current blocks:")
    print(blocks_content)

    # Replace with version that has all 5 fields
    new_blocks = """{
      DATA_PRODUCTS: "var DATA_PRODUCTS = " + JSON.stringify(DATA_PRODUCTS, null, 2) + ";",
      DATA_BAGS: "var DATA_BAGS = " + JSON.stringify(DATA_BAGS, null, 2) + ";",
      DATA_OTHERS: "var DATA_OTHERS = " + JSON.stringify(DATA_OTHERS, null, 2) + ";",
      DATA_MAX_LOADING: "var DATA_MAX_LOADING = " + JSON.stringify(DATA_MAX_LOADING, null, 2) + ";",
      DATA_COST_FOB: "var DATA_COST_FOB = " + JSON.stringify(DATA_COST_FOB, null, 2) + ";"
    }"""

    c = c[:bo] + new_blocks + c[pos:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)

    # Verify
    with open(filepath, 'r', encoding='utf-8') as f:
        v = f.read()
    funcs = v.count('function saveToServer()')
    idx2 = v.find('function saveToServer()')
    bs2 = v.find('blocks:', idx2)
    bo2 = v.find('{', bs2)
    depth = 1
    pos2 = bo2 + 1
    while depth > 0:
        if v[pos2] == '{': depth += 1
        elif v[pos2] == '}': depth -= 1
        pos2 += 1
    bc = v[bo2:pos2]
    has_all = all(kw in bc for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
    clean_trailing = ',\n    }' not in bc
    
    print(f"[{label}] Result: {funcs} func, all 5={has_all}, clean={clean_trailing}")
    print(f"Blocks: {bc}")

    if 'blocks: blocks:' in v[idx2:idx2+100]:
        print(f"[{label}] ERROR: 'blocks: blocks:' found!")
    if has_all and clean_trailing and funcs == 1:
        print(f"[{label}] ✅ ALL GOOD")
    else:
        print(f"[{label}] ❌ NEEDS REVIEW")

base = r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia'
fix_vi_blocks_surgically(f'{base}\\vi.html', 'VI')

# en.html and zh.html are fine - just verify
for fn, lbl in [('en.html', 'EN'), ('zh.html', 'ZH')]:
    with open(f'{base}\\{fn}', 'r', encoding='utf-8') as f:
        c = f.read()
    funcs = c.count('function saveToServer()')
    idx = c.find('function saveToServer()')
    block = c[idx:idx+600]
    has_all = all(kw in block for kw in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB'])
    print(f'[{lbl}] {funcs} func, all 5={has_all}')

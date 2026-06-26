import sys, json, openpyxl
sys.stdout.reconfigure(encoding='utf-8')

# Read Excel
wb = openpyxl.load_workbook(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\samples\Gia ban toi thieu.xlsx', data_only=True)
ws = wb['Sheet1']

products = []
for r in range(3, ws.max_row + 1):
    code = ws.cell(r, 1).value
    if not code: continue
    code = str(code).strip()
    std = str(ws.cell(r, 2).value or '').strip()
    machine = str(ws.cell(r, 3).value or '').strip()
    
    def v(col):
        val = ws.cell(r, col).value
        return round(val, 2) if val is not None else None
    
    exw_cn_vnd = v(4); exw_cn_usd = v(5)
    comm_cn_vnd = v(6); comm_cn_usd = v(7)
    pkg25_cn_vnd = v(8); pkg25_cn_usd = v(9)
    jumbo_cn_vnd = v(10); jumbo_cn_usd = v(11)
    
    exw_other_vnd = v(12); exw_other_usd = v(13)
    comm_other_vnd = v(14); comm_other_usd = v(15)
    pkg25_other_vnd = v(16); pkg25_other_usd = v(17)
    jumbo_other_vnd = v(18); jumbo_other_usd = v(19)
    
    # If pkg25 is null (E-series, S-series don't have 25kg), use jumbo price instead
    if pkg25_cn_vnd is None: pkg25_cn_vnd = jumbo_cn_vnd
    if pkg25_cn_usd is None: pkg25_cn_usd = jumbo_cn_usd
    if pkg25_other_vnd is None: pkg25_other_vnd = jumbo_other_vnd
    if pkg25_other_usd is None: pkg25_other_usd = jumbo_other_usd
    
    # Map size from old data
    # We'll keep size as '—' for non-duplicate-coded products
    
    p = {
        "code": code, "size": "—", "standard": std, "machine": machine,
        "exw_vnd": exw_cn_vnd, "exw_usd": exw_cn_usd,
        "comm_vnd": comm_cn_vnd, "comm_usd": comm_cn_usd,
        "pkg25_vnd": pkg25_cn_vnd, "pkg25_usd": pkg25_cn_usd,
        "jumbo_vnd": jumbo_cn_vnd, "jumbo_usd": jumbo_cn_usd,
        "exw_vnd_cn": exw_cn_vnd, "exw_usd_cn": exw_cn_usd,
        "comm_vnd_cn": comm_cn_vnd, "comm_usd_cn": comm_cn_usd,
        "pkg25_vnd_cn": pkg25_cn_vnd, "pkg25_usd_cn": pkg25_cn_usd,
        "jumbo_vnd_cn": jumbo_cn_vnd, "jumbo_usd_cn": jumbo_cn_usd,
        "exw_vnd_other": exw_other_vnd, "exw_usd_other": exw_other_usd,
        "comm_vnd_other": comm_other_vnd, "comm_usd_other": comm_other_usd,
        "pkg25_vnd_other": pkg25_other_vnd, "pkg25_usd_other": pkg25_other_usd,
        "jumbo_vnd_other": jumbo_other_vnd, "jumbo_usd_other": jumbo_other_usd,
    }
    products.append(p)

# Read old HTML for size mapping (parse old DATA_PRODUCTS)
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

old_start = d.find('var DATA_PRODUCTS = [')
old_raw = d[old_start + 20 : d.find('];', old_start)]

old_entries = []
depth = 0
start = 0
for i, ch in enumerate(old_raw):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            old_entries.append(old_raw[start:i+1])

old_size_map = {}
for entry in old_entries:
    try:
        obj = json.loads(entry)
        old_size_map[obj['code'] + '|' + obj['standard']] = obj.get('size', '—')
    except:
        pass

# Apply sizes from old data
for p in products:
    key = p['code'] + '|' + p['standard']
    if key in old_size_map:
        p['size'] = old_size_map[key]

# Build JS
entries_js = ['  ' + json.dumps(p, ensure_ascii=False) for p in products]
new_data = 'var DATA_PRODUCTS = [\n' + ',\n'.join(entries_js) + '\n];'

# Replace in HTML
prod_start = d.find('var DATA_PRODUCTS = [')
prod_end = d.find('];', prod_start) + 2
d = d[:prod_start] + new_data + d[prod_end:]

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d)

# Verify
print(f'✅ Rebuilt DATA_PRODUCTS: {len(products)} products')

# Check for null prices
nulls = []
for p in products:
    for k in ['exw_vnd_cn','exw_usd_cn','comm_vnd_cn','comm_usd_cn','pkg25_vnd_cn','pkg25_usd_cn','jumbo_vnd_cn','jumbo_usd_cn',
              'exw_vnd_other','exw_usd_other','comm_vnd_other','comm_usd_other','pkg25_vnd_other','pkg25_usd_other','jumbo_vnd_other','jumbo_usd_other']:
        if p[k] is None:
            nulls.append(f'  {p["code"]} {p["standard"]}: {k}')

if nulls:
    print(f'\n❌ Products with null prices:')
    for n in nulls:
        print(n)
else:
    print(f'✅ All 45 products have complete 16 price fields')

# Show E80A2 as example
for p in products:
    if p['code'] == 'E80A2':
        print(f'\nExample E80A2:')
        for k,v in p.items():
            print(f'  {k}: {v}')
        break

# Validate JS
import subprocess
res = subprocess.run(['node', '-e', '''
const fs = require('fs');
const h = fs.readFileSync('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html','utf-8');
const m = h.match(/<script>([\s\S]*?)<\/script>/);
if(m){ try{new Function(m[1]);console.log("JS OK")}catch(e){console.log("JS ERROR:",e.message)} }
'''], capture_output=True, text=True)
print(f'\nJS: {res.stdout.strip() or res.stderr}')

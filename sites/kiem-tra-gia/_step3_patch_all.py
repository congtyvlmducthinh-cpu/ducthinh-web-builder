# -*- coding: utf-8 -*-
"""Build complete new DATA_PRODUCTS with _cn/_other + market switching logic"""
import sys, json, openpyxl
sys.stdout.reconfigure(encoding='utf-8')

# Read existing HTML
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Read Excel
wb = openpyxl.load_workbook(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\samples\Gia ban toi thieu.xlsx', data_only=True)
ws = wb['Sheet1']

# Map old data to get sizes
old_start = html.find('var DATA_PRODUCTS = [')
old_end = html.find('];', old_start) + 2
old_products_str = html[old_start + len('var DATA_PRODUCTS = ['):html.find('];', old_start)]

# Parse old products to extract size per code+standard
import ast
old_size_map = {}  # key = code|standard -> size
# Simple parsing
old_entries = []
depth = 0
start = 0
s = old_products_str
for i, ch in enumerate(s):
    if ch == '{':
        if depth == 0: start = i
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            old_entries.append(s[start:i+1])

for entry in old_entries:
    try:
        obj = json.loads(entry)
        key = obj.get('code','') + '|' + obj.get('standard','')
        if key not in old_size_map:
            old_size_map[key] = obj.get('size', '—')
    except:
        pass

# Build new products from Excel
products = []
for r in range(3, ws.max_row + 1):
    code = ws.cell(r, 1).value
    if not code: continue
    code = str(code).strip()
    std = str(ws.cell(r, 2).value or '').strip()
    machine = str(ws.cell(r, 3).value or '').strip()
    
    def val(col):
        v = ws.cell(r, col).value
        return round(v, 2) if v is not None else None
    
    size = old_size_map.get(code + '|' + std, '—')
    
    exw_cn_vnd = val(4)
    exw_cn_usd = val(5)
    comm_cn_vnd = val(6)
    comm_cn_usd = val(7)
    pkg25_cn_vnd = val(8)
    pkg25_cn_usd = val(9)
    jumbo_cn_vnd = val(10)
    jumbo_cn_usd = val(11)
    
    exw_other_vnd = val(12)
    exw_other_usd = val(13)
    comm_other_vnd = val(14)
    comm_other_usd = val(15)
    pkg25_other_vnd = val(16)
    pkg25_other_usd = val(17)
    jumbo_other_vnd = val(18)
    jumbo_other_usd = val(19)
    
    # Base fields = CN values (default market)
    products.append({
        "code": code,
        "size": size,
        "standard": std,
        "machine": machine,
        # Base (active) fields — will be overwritten by applyMarket()
        "exw_vnd": exw_cn_vnd,
        "exw_usd": exw_cn_usd,
        "comm_vnd": comm_cn_vnd,
        "comm_usd": comm_cn_usd,
        "pkg25_vnd": pkg25_cn_vnd,
        "pkg25_usd": pkg25_cn_usd,
        "jumbo_vnd": jumbo_cn_vnd,
        "jumbo_usd": jumbo_cn_usd,
        # Market-specific fields
        "exw_vnd_cn": exw_cn_vnd,
        "exw_usd_cn": exw_cn_usd,
        "comm_vnd_cn": comm_cn_vnd,
        "comm_usd_cn": comm_cn_usd,
        "pkg25_vnd_cn": pkg25_cn_vnd,
        "pkg25_usd_cn": pkg25_cn_usd,
        "jumbo_vnd_cn": jumbo_cn_vnd,
        "jumbo_usd_cn": jumbo_cn_usd,
        "exw_vnd_other": exw_other_vnd,
        "exw_usd_other": exw_other_usd,
        "comm_vnd_other": comm_other_vnd,
        "comm_usd_other": comm_other_usd,
        "pkg25_vnd_other": pkg25_other_vnd,
        "pkg25_usd_other": pkg25_other_usd,
        "jumbo_vnd_other": jumbo_other_vnd,
        "jumbo_usd_other": jumbo_other_usd,
    })

def fmt(v):
    if v is None: return "null"
    if isinstance(v, bool): return "true" if v else "false"
    if isinstance(v, str): return json.dumps(v)
    return str(v)

entries = []
for p in products:
    fields = ','.join([f'"{k}":{fmt(v)}' for k, v in p.items()])
    entries.append('{' + fields + '}')

new_data = 'var DATA_PRODUCTS = [\n' + ',\n'.join(entries) + '\n];'

# Now build the market switching logic
market_logic = '''
// Market switching
var currentMarket = "cn";

function applyMarket() {
  var suffix = "_" + currentMarket;
  DATA_PRODUCTS.forEach(function(p) {
    p.exw_vnd = p["exw_vnd" + suffix];
    p.exw_usd = p["exw_usd" + suffix];
    p.comm_vnd = p["comm_vnd" + suffix];
    p.comm_usd = p["comm_usd" + suffix];
    p.pkg25_vnd = p["pkg25_vnd" + suffix];
    p.pkg25_usd = p["pkg25_usd" + suffix];
    p.jumbo_vnd = p["jumbo_vnd" + suffix];
    p.jumbo_usd = p["jumbo_usd" + suffix];
  });
  // Re-render
  render();
}

function setMarket(mkt) {
  currentMarket = mkt;
  // Update UI toggle buttons
  var cnBtn = document.getElementById("marketCn");
  var otherBtn = document.getElementById("marketOther");
  if (cnBtn && otherBtn) {
    cnBtn.classList.toggle("active", mkt === "cn");
    otherBtn.classList.toggle("active", mkt === "other");
  }
  applyMarket();
}
'''

# Replace DATA_PRODUCTS
old_data_start = html.find('var DATA_PRODUCTS = [')
old_data_end = html.find('];', old_data_start) + 2

html = html[:old_data_start] + new_data + html[old_data_end:]

# Find where to insert market switching logic (after DATA_PRODUCTS, before DATA_BAGS)
bags_start = html.find('var DATA_BAGS')
insert_point = html.find('\n', html.find('];', html.find('var DATA_PRODUCTS')) + 3) + 1

html = html[:insert_point] + '\n' + market_logic + '\n' + html[insert_point:]

# Add market toggle to toolbar - find the currency toggle area
# Look for the currency USD/VND toggle buttons
import re

# Find the toolbar buttons group area
toolbar_btn_groups = html.find('<span class=\"ext-label\">💰 Tiền tệ:</span>')
if toolbar_btn_groups >= 0:
    # Find the enclosing div of this button group
    # Add market toggle right after the currency toggle group
    # Find the closing </div> after freightGroup
    freight_end = html.find('</div>', html.find('id="freightGroup"'))
    freight_end = html.find('</div>', freight_end + 6) + 6
    
    market_toggle = '''
<div id="marketGroup" class="btn-group" style="margin-left:8px">
<span class="ext-label">🌏 Thị trường:</span>
<button class="btn-sm active" id="marketCn" onclick="setMarket('cn')">🇨🇳 Trung Quốc</button>
<button class="btn-sm" id="marketOther" onclick="setMarket('other')">🌏 Khác</button>
</div>
'''
    html = html[:freight_end] + market_toggle + html[freight_end:]

# Now also update render(); call — call applyMarket() before first render
# Find render(); call — call applyMarket() first
render_call = html.find('render();')
# Make it: applyMarket(); render();
html = html[:render_call] + 'applyMarket();\n  ' + html[render_call:]

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✅ Done! {len(products)} products with market fields")
print("Added: applyMarket(), setMarket(), market toggle UI")

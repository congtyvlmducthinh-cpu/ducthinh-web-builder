import json, os

html_path = 'vi.html'
json_path = 'data/products.json'
bak_path = 'vi.html.bak'

# Ensure we have clean vi.html
if os.path.exists(bak_path):
    with open(bak_path, 'r', encoding='utf-8') as f:
        html = f.read()
    print('Loaded from backup')
else:
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    print('Loaded from current')

# Fix CSS link if broken
old_link = '<link rel=" stylesheet\\ href=\\shared.css\\>'
new_link = '<link rel="stylesheet" href="shared.css">'
if old_link in html:
    html = html.replace(old_link, new_link)
    print('[1] Fixed CSS link')

# Extract DATA_PRODUCTS inline and replace with loader
start_marker = 'var DATA_PRODUCTS = ['
if start_marker not in html:
    print('[2] DATA_PRODUCTS already external')
else:
    start = html.index(start_marker)
    pos = start + len(start_marker)
    
    # Track braces to find end of array
    depth = 1
    in_str = False
    esc = False
    end = pos
    while end < len(html) and depth > 0:
        ch = html[end]
        if esc:
            esc = False
        elif ch == '\\' and in_str:
            esc = True
        elif ch == '"':
            in_str = not in_str
        elif not in_str:
            if ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
        end += 1
    
    # Find '];' to get exact end
    semi_end = html.index('];', start) + 2
    
    # Verify the JSON is valid
    json_str = html[pos:end].strip().rstrip(';').strip()
    try:
        json.loads(json_str)
        print(f'[2] Verified {json_str.count(chr(34)+chr(58))}: inline JSON valid')
    except:
        print('[2] WARNING: inline JSON may have issues, but proceeding')
    
    # Replace with loader code
    loader_code = """var DATA_PRODUCTS = [];
var DATA_LOADED = false;

function loadProductsData() {
  return fetch('data/products.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      DATA_PRODUCTS = data;
      DATA_LOADED = true;
      return data;
    })
    .catch(function(err) {
      console.error('Failed to load products.json:', err);
      DATA_LOADED = false;
      return [];
    });
}
"""
    html = html[:start] + loader_code + html[semi_end:]
    print('[2] Replaced inline DATA_PRODUCTS with fetch loader')

# Update init section to async
old_init = """var saved = localStorage.getItem("dq_products");
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
var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
var savedCF = localStorage.getItem("dq_costFOB");
if (savedCF) {
  try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
}
applyMarket();

switchTab("pricelist");"""

new_init = """loadProductsData().then(function() {
  var saved = localStorage.getItem("dq_products");
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
  var savedML = localStorage.getItem("dq_maxLoading");
  if (savedML) {
    try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
  }
  var savedCF = localStorage.getItem("dq_costFOB");
  if (savedCF) {
    try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
  }
  applyMarket();
  switchTab("pricelist");
}).catch(function(err) {
  console.error('Error loading data, using localStorage fallback', err);
  var saved = localStorage.getItem("dq_products");
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
  var savedML = localStorage.getItem("dq_maxLoading");
  if (savedML) {
    try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
  }
  var savedCF = localStorage.getItem("dq_costFOB");
  if (savedCF) {
    try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
  }
  applyMarket();
  switchTab("pricelist");
});"""

if old_init in html:
    html = html.replace(old_init, new_init)
    print('[3] Updated init section to async loading')
else:
    # Try to find the init section
    idx = html.find('var saved = localStorage.getItem("dq_products");')
    if idx >= 0:
        print(f'[3] Found init at pos {idx}, but pattern mismatch')
        # Show surrounding context for debugging
        print('    Context:', repr(html[idx:idx+350]))
    else:
        print('[3] WARNING: Init section not found!')

# Verify key components
checks = ['function switchTab', 'function render', 'function globalSearch',
          'loadProductsData', 'function importProducts', 'function calcPrice',
          'function fmtNum', 'function exportTo', 'switchTab']
for c in checks:
    if c not in html:
        print(f'[WARN] Missing: {c}')

# Write modified HTML
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Done! Size:', len(html), 'bytes')
print(f'products.json: {os.path.getsize(json_path):,} bytes')

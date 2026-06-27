#!/usr/bin/env python3
"""Add Max Loading support: UI buttons, download, import fix, localStorage"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, 'utf-8')

with open('index.html', encoding='utf-8') as f:
    content = f.read()

# --- 1. Fix importMaxLoading to handle Vietnamese column names ---
old_fn = '''function importMaxLoading(arr) {
  DATA_MAX_LOADING = {};
  arr.forEach(function(r) {
    var code = r.code || r.Code || r.CodeSP || r.CodeSP_Standard || "";
    if (!code) return;
    var obj = {};
    if (r.max25 !== undefined && r.max25 !== null && r.max25 !== "") obj.max25 = Number(r.max25);
    if (r.maxJumbo !== undefined && r.maxJumbo !== null && r.maxJumbo !== "") obj.maxJumbo = Number(r.maxJumbo);
    if (Object.keys(obj).length > 0) DATA_MAX_LOADING[code] = obj;
  });
}'''

new_fn = '''function importMaxLoading(arr) {
  DATA_MAX_LOADING = {};
  arr.forEach(function(r) {
    // Support Vietnamese column names from Max_loadding.xlsx
    var code = r.code || r.Code || r.CodeSP || r.CodeSP_Standard || r["SẢN PHẨM"] || r["SAN PHAM"] || "";
    if (!code) return;
    var obj = {};
    var v25 = r.max25 || r["Max Loading 25KG"] || r["Max Loading 25kg"] || r["max25"] || r["Max25"];
    var vJb = r.maxJumbo || r["Max Loading Jumbo"] || r["Max Loading jumbo"] || r["maxJumbo"] || r["MaxJumbo"] || r["Max Jumbo"];
    if (v25 !== undefined && v25 !== null && v25 !== "") obj.max25 = Number(v25);
    if (vJb !== undefined && vJb !== null && vJb !== "") obj.maxJumbo = Number(vJb);
    if (Object.keys(obj).length > 0) DATA_MAX_LOADING[code] = obj;
  });
}'''

if old_fn in content:
    content = content.replace(old_fn, new_fn)
    print('✓ Fixed importMaxLoading()')
else:
    print('✗ importMaxLoading() not found for replacement')

# --- 2. Add ML buttons in manage tab UI ---
old_btns = '''<button class="btn-cancel" onclick="downloadTemplate(2)">📄 Mẫu quy cách khác</button>
</div>'''
new_btns = '''<button class="btn-cancel" onclick="downloadTemplate(2)">📄 Mẫu quy cách khác</button>
<button class="btn-confirm" onclick="downloadFile(3)">⚖️ Max tải</button>
<button class="btn-cancel" onclick="downloadTemplate(3)">📄 Mẫu max tải</button>
</div>'''

if old_btns in content:
    content = content.replace(old_btns, new_btns)
    print('✓ Added ML buttons')
else:
    print('✗ ML buttons pattern not found')

# --- 3. Add downloadTemplate(3) for MaxLoading ---
old_dt = '''  } else if (type === 2) {
    fn = "Mau_quy_cach_khac.xlsx";
    headers = ["code","name","cost","qty","price","profit"];
  }'''
new_dt = '''  } else if (type === 2) {
    fn = "Mau_quy_cach_khac.xlsx";
    headers = ["code","name","cost","qty","price","profit"];
  } else if (type === 3) {
    fn = "Mau_max_tai.xlsx";
    headers = ["SẢN PHẨM","Max Loading 25KG","Max Loading Jumbo"];
  }'''

if old_dt in content:
    content = content.replace(old_dt, new_dt)
    print('✓ Added downloadTemplate(3)')
else:
    print('✗ downloadTemplate pattern not found')

# --- 4. Add downloadFile(3) for MaxLoading ---
old_df = '''  else if (type === 2) { fn = "Quy_cach_khac.xlsx"; data = DATA_OTHERS; sheetName = "Others"; }'''
new_df = '''  else if (type === 2) { fn = "Quy_cach_khac.xlsx"; data = DATA_OTHERS; sheetName = "Others"; }
  else if (type === 3) {
    fn = "Max_loadding.xlsx";
    var mlArr = [];
    if (DATA_MAX_LOADING && Object.keys(DATA_MAX_LOADING).length > 0) {
      Object.keys(DATA_MAX_LOADING).forEach(function(k) {
        var o = {"SẢN PHẨM": k};
        if (DATA_MAX_LOADING[k].max25 !== undefined) o["Max Loading 25KG"] = DATA_MAX_LOADING[k].max25;
        if (DATA_MAX_LOADING[k].maxJumbo !== undefined) o["Max Loading Jumbo"] = DATA_MAX_LOADING[k].maxJumbo;
        mlArr.push(o);
      });
    }
    data = mlArr;
    sheetName = "MaxLoading";
  }'''

if old_df in content:
    content = content.replace(old_df, new_df)
    print('✓ Added downloadFile(3)')
else:
    print('✗ downloadFile pattern not found')

# --- 5. Save DATA_MAX_LOADING to localStorage after upload ---
old_save = '''      applyMarket();
      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));
      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));
      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));'''
new_save = '''      applyMarket();
      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));
      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));
      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));
      localStorage.setItem("dq_maxLoading", JSON.stringify(DATA_MAX_LOADING));'''

if old_save in content:
    content = content.replace(old_save, new_save)
    print('✓ Added localStorage save for DATA_MAX_LOADING')
else:
    print('✗ localStorage save pattern not found')

# --- 6. Restore DATA_MAX_LOADING from localStorage on page load ---
old_restore = '''var savedOthers = localStorage.getItem("dq_others");
if (savedOthers) {
  try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
}
applyMarket();'''
new_restore = '''var savedOthers = localStorage.getItem("dq_others");
if (savedOthers) {
  try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
}
var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
applyMarket();'''

if old_restore in content:
    content = content.replace(old_restore, new_restore)
    print('✓ Added localStorage restore for DATA_MAX_LOADING')
else:
    print('✗ localStorage restore pattern not found')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ Done')

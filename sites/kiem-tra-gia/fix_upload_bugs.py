#!/usr/bin/env python3
"""Fix 3 bugs: localStorage.clear(), applyMarket() fallback, CostFOB save/restore"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, 'utf-8')

with open('index.html', encoding='utf-8') as f:
    content = f.read()

changes = 0

# --- 1. Remove localStorage.clear() ---
old = 'localStorage.clear(); // Xóa dữ liệu cũ bị hỏng\n'
if old in content:
    content = content.replace(old, '')
    print('✓ Removed localStorage.clear()')
    changes += 1
else:
    print('✗ localStorage.clear() not found')

# --- 2. Fix applyMarket() to fall back to base fields ---
old_fn = '''function applyMarket() {
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
}'''

new_fn = '''function applyMarket() {
  var suffix = "_" + currentMarket;
  DATA_PRODUCTS.forEach(function(p) {
    // Use suffix field if available, fall back to base field
    p.exw_vnd = p["exw_vnd" + suffix] !== undefined ? p["exw_vnd" + suffix] : p.exw_vnd;
    p.exw_usd = p["exw_usd" + suffix] !== undefined ? p["exw_usd" + suffix] : p.exw_usd;
    p.comm_vnd = p["comm_vnd" + suffix] !== undefined ? p["comm_vnd" + suffix] : p.comm_vnd;
    p.comm_usd = p["comm_usd" + suffix] !== undefined ? p["comm_usd" + suffix] : p.comm_usd;
    p.pkg25_vnd = p["pkg25_vnd" + suffix] !== undefined ? p["pkg25_vnd" + suffix] : p.pkg25_vnd;
    p.pkg25_usd = p["pkg25_usd" + suffix] !== undefined ? p["pkg25_usd" + suffix] : p.pkg25_usd;
    p.jumbo_vnd = p["jumbo_vnd" + suffix] !== undefined ? p["jumbo_vnd" + suffix] : p.jumbo_vnd;
    p.jumbo_usd = p["jumbo_usd" + suffix] !== undefined ? p["jumbo_usd" + suffix] : p.jumbo_usd;
  });
  // Re-render
  render();
}'''

if old_fn in content:
    content = content.replace(old_fn, new_fn)
    print('✓ Fixed applyMarket() with fallback')
    changes += 1
else:
    print('✗ applyMarket() not found')

# --- 3. Save DATA_COST_FOB to localStorage after upload ---
old_save = '''      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));
      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));
      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));
      localStorage.setItem("dq_maxLoading", JSON.stringify(DATA_MAX_LOADING));'''
new_save = '''      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));
      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));
      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));
      localStorage.setItem("dq_maxLoading", JSON.stringify(DATA_MAX_LOADING));
      localStorage.setItem("dq_costFOB", JSON.stringify(DATA_COST_FOB));'''

if old_save in content:
    content = content.replace(old_save, new_save)
    print('✓ Added CostFOB localStorage save')
    changes += 1
else:
    print('✗ Save pattern not found')

# --- 4. Restore DATA_COST_FOB from localStorage on page load ---
old_restore = '''var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
applyMarket();'''
new_restore = '''var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
var savedCF = localStorage.getItem("dq_costFOB");
if (savedCF) {
  try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
}
applyMarket();'''

if old_restore in content:
    content = content.replace(old_restore, new_restore)
    print('✓ Added CostFOB localStorage restore')
    changes += 1
else:
    print('✗ Restore pattern not found')

# --- 5. Add null safety for p.code and p.size in renderPriceTab ---
old_render = '''  var filtered = DATA_PRODUCTS.filter(function(p) {
    if (search && p.code.toLowerCase().indexOf(search) < 0 && p.size.toLowerCase().indexOf(search) < 0) return false;'''
new_render = '''  var filtered = DATA_PRODUCTS.filter(function(p) {
    if (search && (!p.code || p.code.toLowerCase().indexOf(search) < 0) && (!p.size || p.size.toLowerCase().indexOf(search) < 0)) return false;'''

if old_render in content:
    content = content.replace(old_render, new_render)
    print('✓ Added null safety for p.code/p.size')
    changes += 1
else:
    print('✗ renderPriceTab filter not found')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print(f'\n✓ {changes}/5 changes applied')

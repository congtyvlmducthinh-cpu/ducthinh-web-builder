#!/usr/bin/env python3
"""Fix CostFOB import: Vietnamese column names + sheet detection"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, 'utf-8')

with open('index.html', encoding='utf-8') as f:
    content = f.read()

changes = 0

# --- 1. Fix importCostFOB to handle Vietnamese column names ---
old = '''function importCostFOB(arr) {
  DATA_COST_FOB = {};
  arr.forEach(function(r) {
    var load = Number(r.maxLoading || r.MaxLoading || r.load || r.Load || r.tan || r.Tan || r["Tấn"]);
    if (!load) return;
    var obj = {};
    if (r.no !== undefined && r.no !== null && r.no !== "") obj.no = Number(r.no);
    if (r.sub !== undefined && r.sub !== null && r.sub !== "") obj.sub = Number(r.sub);
    if (Object.keys(obj).length > 0) DATA_COST_FOB[load] = obj;
  });
}'''

new = '''function importCostFOB(arr) {
  DATA_COST_FOB = {};
  arr.forEach(function(r) {
    var load = Number(r.maxLoading || r.MaxLoading || r.load || r.Load || r.tan || r.Tan || r["Tấn"] || r["Max loadding"] || r["Max Loadding"]);
    if (!load) return;
    var obj = {};
    var vNo = r.no !== undefined ? r.no : r["No LCC"] || r["No lcc"];
    var vSub = r.sub !== undefined ? r.sub : r["Sub LCC"] || r["Sub lcc"];
    if (vNo !== undefined && vNo !== null && vNo !== "") obj.no = Number(vNo);
    if (vSub !== undefined && vSub !== null && vSub !== "") obj.sub = Number(vSub);
    if (Object.keys(obj).length > 0) DATA_COST_FOB[load] = obj;
  });
}'''

if old in content:
    content = content.replace(old, new)
    print('✓ Fixed importCostFOB() Vietnamese columns')
    changes += 1
else:
    print('✗ importCostFOB() not found')

# --- 2. Fix CostFOB sheet detection in handleManageFile ---
# Add "Cost Fob" and "cost_fob" more variants, also check "Quy cách khác" conflicts
old_fn = '''      var fobSheet = hasSheet(["CostFOB", "Cost FOB", "costfob", "cost fob", "FOB", "fob"]);'''
new_fn = '''      var fobSheet = hasSheet(["CostFOB", "Cost FOB", "costfob", "cost fob", "FOB", "fob", "Cost_FOB", "cost_fob", "Cost Fob"]);'''

if old_fn in content:
    content = content.replace(old_fn, new_fn)
    print('✓ Better sheet name detection for CostFOB')
    changes += 1
else:
    print('✗ Sheet detection not found')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print(f'\n✓ {changes}/2 changes applied')

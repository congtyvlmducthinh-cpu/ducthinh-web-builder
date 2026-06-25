with open('sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Xoa sizeFilter HTML
c = c.replace(
    '<select id="sizeFilter" onchange="render()"><option value="">T&#7845;t c&#7843; k&#237;ch th&#432;&#7899;c</option></select>\n<select id="machineFilter"',
    '<select id="machineFilter"'
)

# 2. Xoa sizeFilter JS variables
c = c.replace(
    '  var sizeFilter = document.getElementById("sizeFilter") && document.getElementById("sizeFilter").value || "";\n  var machineFilter',
    '  var machineFilter'
)

c = c.replace(
    '    if (sizeFilter && p.size !== sizeFilter) return false;\n    if (machineFilter',
    '    if (machineFilter'
)

# 3. Fix colspan: 4 -> 5
c = c.replace(
    '<th colspan="4">Th&#244;ng tin</th><th colspan="2">Gi&#225; bao g&#7891;m bao b&#236;</th>',
    '<th colspan="5">Th&#244;ng tin</th><th colspan="2">Gi&#225; bao g&#7891;m bao b&#236;</th>'
)

# 4. Xoa sizeFilter logic trong populateFilters
old_pop = 'function populateFilters() {\n\t\t\tvar sizes = {}, machine = {};\n\t\t\tDATA_PRODUCTS.forEach(function(p) { sizes[p.size] = true; machine[p.machine] = true; });\n\t\t\tvar sizeSelect = document.getElementById("sizeFilter");\n\t\t\tif (sizeSelect) {\n\t\t\t\tvar sel = sizeSelect.value;\n\t\t\t\tsizeSelect.innerHTML = \'<option value="">T&#7845;t c&#7843; k&#237;ch th&#432;&#7899;c</option>\';\n\t\t\t\tvar sizesArr = Object.keys(sizes).sort();\n\t\t\t\tfor (var i = 0; i < sizesArr.length; i++) {\n\t\t\t\t\tsizeSelect.innerHTML += \'<option value="\' + sizesArr[i] + \'">\' + sizesArr[i] + \'</option>\';\n\t\t\t\t}\n\t\t\t\tsizeSelect.value = sel;\n\t\t\t}\n\t\t\tpopulateMachine()\n\t\t}'
new_pop = 'function populateFilters() {\n\t\t\tpopulateMachine()\n\t\t}'
c = c.replace(old_pop, new_pop)

# 5. Replace old summary + stats. Need exact content.
# Old summary: lines between '// Summary' and '// Table'
old_summary = '  // Summary\n  var uniqueCodes = {};\n  filtered.forEach(function(p) { uniqueCodes[p.code] = true; });\n  h += \'<div class="summary-bar">\';\n  h += \'<div class="summary-card"><div class="lbl">S\\u1ea3n ph\\u1ea9m</div><div class="val">\' + Object.keys(uniqueCodes).length + \'</div></div>\';\n  h += \'<div class="summary-card"><div class="lbl">Ng\\u00e0y</div><div class="val" style="font-size:16px">25/06/2026</div></div>\';\n  h += \'</div>\';'

new_combined = '  // Summary + th\\u1ed1ng k\\u00ea\n'
new_combined += '  var uniqueCodes = {}, uniqueSpecs = {}, uniqueMachines = {};\n'
new_combined += '  filtered.forEach(function(p) { uniqueCodes[p.code] = true; uniqueSpecs[p.standard] = true; uniqueMachines[p.machine] = true; });\n'
new_combined += '  var sum25=0, cnt25=0, max25=0;\n'
new_combined += '  var sumJ=0, cntJ=0, maxJ=0;\n'
new_combined += '  var sumExw=0, cntExw=0, maxExw=0;\n'
new_combined += '  filtered.forEach(function(p) {\n'
new_combined += '    var v25 = isFob ? getFOB25PriceVND(p, lccType) : (isCif ? getCIF25PriceVND(p, lccType, freightUSD) : p.pkg25_vnd);\n'
new_combined += '    if (v25 && v25 > 0) { sum25 += v25; cnt25++; if (v25 > max25) max25 = v25; }\n'
new_combined += '    var vJ = isFob ? getFOBJumboPriceVND(p, lccType) : (isCif ? getCIFJumboPriceVND(p, lccType, freightUSD) : p.jumbo_vnd);\n'
new_combined += '    if (vJ && vJ > 0) { sumJ += vJ; cntJ++; if (vJ > maxJ) maxJ = vJ; }\n'
new_combined += '    if (p.exw_vnd && p.exw_vnd > 0) { sumExw += p.exw_vnd; cntExw++; if (p.exw_vnd > maxExw) maxExw = p.exw_vnd; }\n'
new_combined += '  });\n'
new_combined += '  var fmt = function(v) { return (v || 0).toLocaleString(\'vi-VN\'); };\n'
new_combined += '  h += \'<div class="summary-bar">\';\n'
new_combined += '  h += \'<div class="summary-card"><div class="lbl">S\\u1ea3n ph\\u1ea9m</div><div class="val">\' + Object.keys(uniqueCodes).length + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card"><div class="lbl">Ti\\u00eau chu\\u1ea9n</div><div class="val">\' + Object.keys(uniqueSpecs).length + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card"><div class="lbl">M\\u00e1y</div><div class="val">\' + Object.keys(uniqueMachines).length + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card"><div class="lbl">Ng\\u00e0y</div><div class="val" style="font-size:16px">25/06/2026</div></div>\';\n'
new_combined += '  h += \'</div>\';\n'
new_combined += '  h += \'<div class="summary-bar" style="margin-top:4px;gap:6px">\';\n'
new_combined += '  h += \'<div class="summary-card" style="padding:8px 12px;background:#f0f9ff;border-color:#bae6fd"><div class="lbl" style="font-size:10px">TB 25KG</div><div class="val" style="font-size:15px">\' + fmt(cnt25?Math.round(sum25/cnt25):0) + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card" style="padding:8px 12px;background:#fef2f2;border-color:#fecaca"><div class="lbl" style="font-size:10px">C.nh\\u1ea5t 25KG</div><div class="val" style="font-size:15px">\' + fmt(max25) + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card" style="padding:8px 12px;background:#f0fdf4;border-color:#bbf7d0"><div class="lbl" style="font-size:10px">TB Jumbo</div><div class="val" style="font-size:15px">\' + fmt(cntJ?Math.round(sumJ/cntJ):0) + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card" style="padding:8px 12px;background:#fefce8;border-color:#fde68a"><div class="lbl" style="font-size:10px">C.nh\\u1ea5t Jumbo</div><div class="val" style="font-size:15px">\' + fmt(maxJ) + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card" style="padding:8px 12px;background:#f5f3ff;border-color:#ddd6fe"><div class="lbl" style="font-size:10px">TB EXW</div><div class="val" style="font-size:15px">\' + fmt(cntExw?Math.round(sumExw/cntExw):0) + \'</div></div>\';\n'
new_combined += '  h += \'<div class="summary-card" style="padding:8px 12px;background:#fff1f2;border-color:#fecdd3"><div class="lbl" style="font-size:10px">C.nh\\u1ea5t EXW</div><div class="val" style="font-size:15px">\' + fmt(maxExw) + \'</div></div>\';\n'
new_combined += '  h += \'</div>\';'

if old_summary in c:
    c = c.replace(old_summary, new_combined)
else:
    print('ERROR: old_summary not found!')
    # try to find it
    idx = c.find('// Summary')
    print(repr(c[idx-5:idx+300]))
    raise SystemExit(1)

# 6. Remove old bottom stats
old_bottom_stats = """
  // Stats: gi\u00e1 trung b\u00ecnh + cao nh\u1ea5t
  if (filtered.length > 0) {
    var sum25=0, cnt25=0, max25=0;
    var sumJ=0, cntJ=0, maxJ=0;
    var sumExw=0, cntExw=0, maxExw=0;
    filtered.forEach(function(p) {
      var v25 = isFob ? getFOB25PriceVND(p, lccType) : (isCif ? getCIF25PriceVND(p, lccType, freightUSD) : p.pkg25_vnd);
      if (v25 && v25 > 0) { sum25 += v25; cnt25++; if (v25 > max25) max25 = v25; }
      var vJ = isFob ? getFOBJumboPriceVND(p, lccType) : (isCif ? getCIFJumboPriceVND(p, lccType, freightUSD) : p.jumbo_vnd);
      if (vJ && vJ > 0) { sumJ += vJ; cntJ++; if (vJ > maxJ) maxJ = vJ; }
      if (p.exw_vnd && p.exw_vnd > 0) { sumExw += p.exw_vnd; cntExw++; if (p.exw_vnd > maxExw) maxExw = p.exw_vnd; }
    });
    var fmt = function(v) { return (v || 0).toLocaleString('vi-VN'); };
    h += '<div class="summary-bar" style="margin-top:12px;gap:8px">';
    h += '<div class="summary-card" style="padding:10px 14px"><div class="lbl" style="font-size:11px">TB 25KG</div><div class="val" style="font-size:16px">' + fmt(cnt25?Math.round(sum25/cnt25):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px"><div class="lbl" style="font-size:11px">C.nh\u1ea5t 25KG</div><div class="val" style="font-size:16px">' + fmt(max25) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bfdbfe"><div class="lbl" style="font-size:11px">TB Jumbo</div><div class="val" style="font-size:16px">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bfdbfe"><div class="lbl" style="font-size:11px">C.nh\u1ea5t Jumbo</div><div class="val" style="font-size:16px">' + fmt(maxJ) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bbf7d0"><div class="lbl" style="font-size:11px">TB EXW</div><div class="val" style="font-size:16px">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bbf7d0"><div class="lbl" style="font-size:11px">C.nh\u1ea5t EXW</div><div class="val" style="font-size:16px">' + fmt(maxExw) + '</div></div>';
    h += '</div>';
  }"""

if old_bottom_stats in c:
    c = c.replace(old_bottom_stats, '')
else:
    print('ERROR: old_bottom_stats not found!')
    raise SystemExit(1)

with open('sites/kiem-tra-gia/index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('DONE - all fixes applied')
checks = {
    'sizeFilter HTML removed': '<select id="sizeFilter"' not in c,
    'sizeFilter JS removed': 'sizeFilter' not in c,
    'colspan=5': '<th colspan="5">' in c,
    'Stats above table': '// Summary + th\u1ed1ng k\u00ea' in c,
    'Stats below table removed': '// Stats: gi\u00e1 trung b\u00ecnh' not in c,
}
for name, ok in checks.items():
    print(f'  {name}: {"✓" if ok else "✗"}')

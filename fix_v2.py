import re

with open('sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Xoa sizeFilter HTML
c = c.replace('<select id="sizeFilter" onchange="render()"><option value="">Tất cả kích thước</option></select>\n<select id="machineFilter"', '<select id="machineFilter"')

# 2. Xoa sizeFilter JS
c = c.replace('  var sizeFilter = document.getElementById("sizeFilter") && document.getElementById("sizeFilter").value || "";\n  var machineFilter', '  var machineFilter')
c = c.replace('    if (sizeFilter && p.size !== sizeFilter) return false;\n    if (machineFilter', '    if (machineFilter')

# 3. Fix colspan
old_colspan = '<th colspan="4">Th\u00f4ng tin</th><th colspan="2">Gi\u00e1 bao g\u1ed3m bao b\u00ec</th>'
new_colspan = '<th colspan="5">Th\u00f4ng tin</th><th colspan="2">Gi\u00e1 bao g\u1ed3m bao b\u00ec</th>'
c = c.replace(old_colspan, new_colspan)

# 4. populateFilters - xoa sizeFilter
old_pop = 'function populateFilters() {\n\t\t\tvar sizes = {}, machine = {};\n\t\t\tDATA_PRODUCTS.forEach(function(p) { sizes[p.size] = true; machine[p.machine] = true; });\n\t\t\tvar sizeSelect = document.getElementById("sizeFilter");\n\t\t\tif (sizeSelect) {\n\t\t\t\tvar sel = sizeSelect.value;\n\t\t\t\tsizeSelect.innerHTML = \'<option value="">Tất cả kích thước</option>\';\n\t\t\t\tvar sizesArr = Object.keys(sizes).sort();\n\t\t\t\tfor (var i = 0; i < sizesArr.length; i++) {\n\t\t\t\t\tsizeSelect.innerHTML += \'<option value="\' + sizesArr[i] + \'">\' + sizesArr[i] + \'</option>\';\n\t\t\t\t}\n\t\t\t\tsizeSelect.value = sel;\n\t\t\t}\n\t\t\tpopulateMachine()\n\t\t}'
new_pop = 'function populateFilters() {\n\t\t\tpopulateMachine()\n\t\t}'
c = c.replace(old_pop, new_pop)

# 5. Stats sau bang
old_end = "  h += '</tbody></table></div>';\n  return h;\n}\n\n// ====== RENDER CALC TAB ======"
new_stats = """  h += '</tbody></table></div>';

  // Stats: giá trung bình + cao nhất
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
    h += '<div class="summary-card" style="padding:10px 14px"><div class="lbl" style="font-size:11px">C.nhất 25KG</div><div class="val" style="font-size:16px">' + fmt(max25) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bfdbfe"><div class="lbl" style="font-size:11px">TB Jumbo</div><div class="val" style="font-size:16px">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bfdbfe"><div class="lbl" style="font-size:11px">C.nhất Jumbo</div><div class="val" style="font-size:16px">' + fmt(maxJ) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bbf7d0"><div class="lbl" style="font-size:11px">TB EXW</div><div class="val" style="font-size:16px">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bbf7d0"><div class="lbl" style="font-size:11px">C.nhất EXW</div><div class="val" style="font-size:16px">' + fmt(maxExw) + '</div></div>';
    h += '</div>';
  }

  return h;
}

// ====== RENDER CALC TAB ======"""

if old_end in c:
    c = c.replace(old_end, new_stats)
    print('OK: old_end replaced')
else:
    print('ERROR: old_end not found!')
    idx = c.find('RENDER CALC TAB')
    if idx > 0:
        print('Found RENDER CALC TAB at', idx)
        print(repr(c[idx-500:idx]))

with open('sites/kiem-tra-gia/index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('DONE')
checks = [
    ('sizeFilter HTML', '<select id="sizeFilter"' in c),
    ('sizeFilter JS', 'sizeFilter' in c),
    ('colspan5', '<th colspan="5">' in c),
    ('Stats JS', 'sumExw' in c),
]
for name, ok in checks:
    print(f'  {name}: {"OK" if not ok else "FAIL"}')


import re

with open('sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Lines 451-457: Summary block (7 lines)
old_summary = ''.join(lines[450:458])

new_block = '\n'
new_block += '  // Summary + th\u1ed1ng k\u00ea\n'
new_block += '  var uniqueCodes = {}, uniqueSpecs = {}, uniqueMachines = {};\n'
new_block += '  filtered.forEach(function(p) { uniqueCodes[p.code] = true; uniqueSpecs[p.standard] = true; uniqueMachines[p.machine] = true; });\n'
new_block += '  var sum25=0, cnt25=0, max25=0;\n'
new_block += '  var sumJ=0, cntJ=0, maxJ=0;\n'
new_block += '  var sumExw=0, cntExw=0, maxExw=0;\n'
new_block += '  filtered.forEach(function(p) {\n'
new_block += '    var v25 = isFob ? getFOB25PriceVND(p, lccType) : (isCif ? getCIF25PriceVND(p, lccType, freightUSD) : p.pkg25_vnd);\n'
new_block += '    if (v25 && v25 > 0) { sum25 += v25; cnt25++; if (v25 > max25) max25 = v25; }\n'
new_block += '    var vJ = isFob ? getFOBJumboPriceVND(p, lccType) : (isCif ? getCIFJumboPriceVND(p, lccType, freightUSD) : p.jumbo_vnd);\n'
new_block += '    if (vJ && vJ > 0) { sumJ += vJ; cntJ++; if (vJ > maxJ) maxJ = vJ; }\n'
new_block += '    if (p.exw_vnd && p.exw_vnd > 0) { sumExw += p.exw_vnd; cntExw++; if (p.exw_vnd > maxExw) maxExw = p.exw_vnd; }\n'
new_block += '  });\n'
new_block += '  var fmt = function(v) { return (v || 0).toLocaleString(\'vi-VN\'); };\n'
new_block += "  h += '<div class=\"summary-bar\">';\n"
new_block += "  h += '<div class=\"summary-card\"><div class=\"lbl\">S\u1ea3n ph\u1ea9m</div><div class=\"val\">' + Object.keys(uniqueCodes).length + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\"><div class=\"lbl\">Ti\u00eau chu\u1ea9n</div><div class=\"val\">' + Object.keys(uniqueSpecs).length + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\"><div class=\"lbl\">M\u00e1y</div><div class=\"val\">' + Object.keys(uniqueMachines).length + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\"><div class=\"lbl\">Ng\u00e0y</div><div class=\"val\" style=\"font-size:16px\">25/06/2026</div></div>';\n"
new_block += "  h += '</div>';\n"
new_block += "  h += '<div class=\"summary-bar\" style=\"margin-top:4px;gap:6px\">';\n"
new_block += "  h += '<div class=\"summary-card\" style=\"padding:8px 12px;background:#f0f9ff;border-color:#bae6fd\"><div class=\"lbl\" style=\"font-size:10px\">TB 25KG</div><div class=\"val\" style=\"font-size:15px\">' + fmt(cnt25?Math.round(sum25/cnt25):0) + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\" style=\"padding:8px 12px;background:#fef2f2;border-color:#fecaca\"><div class=\"lbl\" style=\"font-size:10px\">C.nh\u1ea5t 25KG</div><div class=\"val\" style=\"font-size:15px\">' + fmt(max25) + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\" style=\"padding:8px 12px;background:#f0fdf4;border-color:#bbf7d0\"><div class=\"lbl\" style=\"font-size:10px\">TB Jumbo</div><div class=\"val\" style=\"font-size:15px\">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\" style=\"padding:8px 12px;background:#fefce8;border-color:#fde68a\"><div class=\"lbl\" style=\"font-size:10px\">C.nh\u1ea5t Jumbo</div><div class=\"val\" style=\"font-size:15px\">' + fmt(maxJ) + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\" style=\"padding:8px 12px;background:#f5f3ff;border-color:#ddd6fe\"><div class=\"lbl\" style=\"font-size:10px\">TB EXW</div><div class=\"val\" style=\"font-size:15px\">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';\n"
new_block += "  h += '<div class=\"summary-card\" style=\"padding:8px 12px;background:#fff1f2;border-color:#fecdd3\"><div class=\"lbl\" style=\"font-size:10px\">C.nh\u1ea5t EXW</div><div class=\"val\" style=\"font-size:15px\">' + fmt(maxExw) + '</div></div>';\n"
new_block += "  h += '</div>';\n"

# Lines 499-523: old stats block (25 lines)
# We need to remove lines 500 to 524 (stats section)
old_stats_start = 500
old_stats_end = 524  # exclusive

# Build new content
new_lines = lines[:450]
new_lines.append(new_block)
new_lines.extend(lines[458:500])
new_lines.extend(lines[524:])

c = ''.join(new_lines)

with open('sites/kiem-tra-gia/index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('DONE - Summary+stats moved above table')
stat = {'sizeFilter HTML': '<select id="sizeFilter"' in c,
        'colspan5': '<th colspan="5">' in c,
        'Stats above table': '// Summary + th\u1ed1ng k\u00ea' in c,
        'Stats below table removed': '// Stats: giá trung bình' not in c}
for k, v in stat.items():
    status = 'OK' if (k == 'Stats below table removed' and not v) or (k != 'Stats below table removed' and v) else 'FAIL'
    print(f'  {k}: {status}')

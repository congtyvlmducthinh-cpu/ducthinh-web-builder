import re

with open('sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Read the exact content around line 451 and 510-520
lines = c.split('\n')

# Find Summary block and stats block boundaries
start_summary = None
end_summary = None
start_table = None
end_table = None
start_stats = None
end_stats = None
return_h_line = None

for i, l in enumerate(lines):
    if '// Summary' in l:
        start_summary = i
    if start_summary is not None and end_summary is None and "'</div>';" in l and 'Ngày' in l:
        end_summary = i + 1  # include the h += '</div>'; line
    if '// Table' in l:
        start_table = i
    if '// Stats:' in l and 'trung bình' in l:
        start_stats = i
    if start_stats is not None and 'return h;' in l:
        end_stats = i
        return_h_line = i

print(f'Summary: lines {start_summary}-{end_summary}')
print(f'Table: line {start_table}')
print(f'Stats: lines {start_stats}-{end_stats}')
print(f'return h: line {return_h_line}')

# Extract the stats block
stats_lines = lines[start_stats:end_stats]
stats_code = '\n'.join(stats_lines)
print(f'\nStats code ({len(stats_lines)} lines):')
print(stats_code[:300])

# Now replace summary block with combined summary+stats
# First replace summary block
new_stats_up = """  // Summary + th\u1ed1ng k\u00ea
  var uniqueCodes = {}, uniqueSpecs = {}, uniqueMachines = {};
  filtered.forEach(function(p) { uniqueCodes[p.code] = true; uniqueSpecs[p.standard] = true; uniqueMachines[p.machine] = true; });
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
  h += '<div class="summary-bar">';
  h += '<div class="summary-card"><div class="lbl">S\u1ea3n ph\u1ea9m</div><div class="val">' + Object.keys(uniqueCodes).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Ti\u00eau chu\u1ea9n</div><div class="val">' + Object.keys(uniqueSpecs).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">M\u00e1y</div><div class="val">' + Object.keys(uniqueMachines).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Ng\u00e0y</div><div class="val" style="font-size:16px">25/06/2026</div></div>';
  h += '</div>';
  h += '<div class="summary-bar" style="margin-top:4px;gap:6px">';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f0f9ff;border-color:#bae6fd"><div class="lbl" style="font-size:10px">TB 25KG</div><div class="val" style="font-size:15px">' + fmt(cnt25?Math.round(sum25/cnt25):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fef2f2;border-color:#fecaca"><div class="lbl" style="font-size:10px">C.nh\u1ea5t 25KG</div><div class="val" style="font-size:15px">' + fmt(max25) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f0fdf4;border-color:#bbf7d0"><div class="lbl" style="font-size:10px">TB Jumbo</div><div class="val" style="font-size:15px">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fefce8;border-color:#fde68a"><div class="lbl" style="font-size:10px">C.nh\u1ea5t Jumbo</div><div class="val" style="font-size:15px">' + fmt(maxJ) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f5f3ff;border-color:#ddd6fe"><div class="lbl" style="font-size:10px">TB EXW</div><div class="val" style="font-size:15px">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fff1f2;border-color:#fecdd3"><div class="lbl" style="font-size:10px">C.nh\u1ea5t EXW</div><div class="val" style="font-size:15px">' + fmt(maxExw) + '</div></div>';
  h += '</div>';"""

# Replace lines
new_lines = []
i = 0
while i < len(lines):
    if i == start_summary:
        new_lines.append(new_stats_up)
        i = end_summary  # skip old summary
    elif i == start_stats:
        i = end_stats  # skip old stats
    else:
        new_lines.append(lines[i])
        i += 1

c = '\n'.join(new_lines)

with open('sites/kiem-tra-gia/index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print(f'\nDONE: Summary+Stats moved above table, bottom stats removed')

import re

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ====== 1. Xoá sizeFilter khỏi HTML ======
old_html = '<select id="sizeFilter" onchange="render()"><option value="">Tất cả kích thước</option></select>\n<select id="machineFilter"'
new_html = '<select id="machineFilter"'
content = content.replace(old_html, new_html)

# ====== 2. Xoá sizeFilter khỏi filter JS trong renderPriceTab ======
old_filter = '''  var sizeFilter = document.getElementById("sizeFilter") && document.getElementById("sizeFilter").value || "";
  var machineFilter'''
new_filter = '''  var machineFilter'''
content = content.replace(old_filter, new_filter)

old_filter2 = '''    if (sizeFilter && p.size !== sizeFilter) return false;
    if (machineFilter'''
new_filter2 = '''    if (machineFilter'''
content = content.replace(old_filter2, new_filter2)

# ====== 3. Fix colspan: "Thông tin" cần colspan=5 (Mã, Kích thước, Tiêu chuẩn, Máy, Tấn/cont) ======
content = content.replace(
    'h += \'<tr><th colspan="4">Th\u00f4ng tin</th><th colspan="2">Gi\u00e1 bao g\u1ed3m bao b\u00ec</th>\';',
    'h += \'<tr><th colspan="5">Th\u00f4ng tin</th><th colspan="2">Gi\u00e1 bao g\u1ed3m bao b\u00ec</th>\';'
)

# ====== 4. Xoá sizeFilter khỏi populateFilters ======
# Find populateFilters and remove the size option
old_pop = '''\t\t\t\t\t<option value="' + sizes[i] + '">' + sizes[i] + '<\/option>';
\t\t\t\t}
\t\t\t\tsizeSelect.innerHTML += '<\/select>'; // close the select tag by inserting closing tag
\t\t\t}
\t\t\tpopulateMachine()
\t\t}'''

new_pop = '''\t\t\tpopulateMachine()
\t\t}'''
content = content.replace(old_pop, new_pop)

# Also need to handle the sizeFilter creation in populateFilters
# Let me find and fix the full function
old_func = '''function populateFilters() {
\t\t\tvar sizes = {}, machine = {};
\t\t\tDATA_PRODUCTS.forEach(function(p) { sizes[p.size] = true; machine[p.machine] = true; });
\t\t\tvar sizeSelect = document.getElementById("sizeFilter");
\t\t\tif (sizeSelect) {
\t\t\t\tvar sel = sizeSelect.value;
\t\t\t\tsizeSelect.innerHTML = '<option value="">T\u1ea5t c\u1ea3 k\u00edch th\u01b0\u1edbc<\\/option>';
\t\t\t\tvar sizesArr = Object.keys(sizes).sort();
\t\t\t\tfor (var i = 0; i < sizesArr.length; i++) {
\t\t\t\t\tsizeSelect.innerHTML += '<option value="' + sizesArr[i] + '">' + sizesArr[i] + '<\\/option>';
\t\t\t\t}
\t\t\t\tsizeSelect.value = sel;
\t\t\t}
\t\t\tpopulateMachine()
\t\t}'''

new_func = '''function populateFilters() {
\t\t\tvar machines = {};
\t\t\tDATA_PRODUCTS.forEach(function(p) { machines[p.machine] = true; });
\t\t\tpopulateMachine()
\t\t}'''

content = content.replace(old_func, new_func)

# ====== 5. Thêm dòng giá TB + Cao nhất sau bảng ======
# Find where table ends and return h
old_table_end = '''  h += '<\/tbody><\/table><\/div>';
  return h;
}'''

# Calculate stats before return
new_table_end = '''  h += '<\/tbody><\/table><\/div>';

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
    var fmt = function(v) { return (v || 0).toLocaleString("vi-VN"); };
    h += '<div class="summary-bar" style="margin-top:12px;gap:8px">';
    h += '<div class="summary-card" style="padding:10px 14px"><div class="lbl" style="font-size:11px">TB 25KG</div><div class="val" style="font-size:16px">' + fmt(cnt25?Math.round(sum25/cnt25):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px"><div class="lbl" style="font-size:11px">C.nhất 25KG</div><div class="val" style="font-size:16px">' + fmt(max25) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bfdbfe"><div class="lbl" style="font-size:11px">TB Jumbo</div><div class="val" style="font-size:16px">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bfdbfe"><div class="lbl" style="font-size:11px">C.nhất Jumbo</div><div class="val" style="font-size:16px">' + fmt(maxJ) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bbf7d0"><div class="lbl" style="font-size:11px">TB EXW</div><div class="val" style="font-size:16px">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';
    h += '<div class="summary-card" style="padding:10px 14px;border-color:#bbf7d0"><div class="lbl" style="font-size:11px">C.nhất EXW</div><div class="val" style="font-size:16px">' + fmt(maxExw) + '</div></div>';
    h += '<\/div>';
  }

  return h;
}'''

content = content.replace(old_table_end, new_table_end)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done - 3 fixes applied')

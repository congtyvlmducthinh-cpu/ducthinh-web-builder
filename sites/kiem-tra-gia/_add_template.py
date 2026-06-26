import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Insert 1: Template button HTML — before the upload section
up_h3 = d.find('📤 Upload dữ liệu mới</h3>')
# Insert right before the <h3>
new_section = '''<div class="manage-actions">
<h3>📄 Tải file mẫu</h3>
<p style="font-size:.85rem;color:var(--muted);margin-bottom:8px">Tải file Excel mẫu có sẵn tiêu đề để nhập dữ liệu</p>
<div class="btn-row">
<button class="btn-confirm" onclick="downloadTemplate(0)">📋 Mẫu giá bán</button>
<button class="btn-confirm" onclick="downloadTemplate(1)">📦 Mẫu bao bì</button>
<button class="btn-confirm" onclick="downloadTemplate(2)">📐 Mẫu quy cách khác</button>
<button class="btn-cancel" onclick="downloadFullTemplate()">📊 Mẫu đầy đủ</button>
</div>
</div>
<div class="manage-actions">
<h3>📤 Upload dữ liệu mới</h3>'''

old = d[up_h3-6:up_h3]  # should be <h3>📤...
# Replace <h3>📤... with the new section
d2 = d[:up_h3-6] + new_section + d[up_h3:]

# Insert 2: JS function — before downloadFile
df = d2.find('function downloadFile(')
# Add template functions before downloadFile
new_js = '''
function downloadTemplate(type) {
  var headers, fn, row;
  if (type === 0) {
    fn = "Mau_gia_ban.xlsx";
    headers = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];
  } else if (type === 1) {
    fn = "Mau_bao_bi.xlsx";
    headers = ["code","cost","spec","qty","price","profit"];
  } else if (type === 2) {
    fn = "Mau_quy_cach_khac.xlsx";
    headers = ["code","name","cost","qty","price","profit"];
  }
  var ws = XLSX.utils.json_to_sheet([headers], {skipHeader: true});
  // convert array to sheet
  ws = XLSX.utils.aoa_to_sheet([headers]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, fn);
}

function downloadFullTemplate() {
  var ws_data = [];
  var dt = new Date();
  var fn = "DT-Mau_Day_Du-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";
  var wb = XLSX.utils.book_new();
  
  // Sheet 1: Products
  var prodHeaders = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([prodHeaders]), "Products");
  
  // Sheet 2: Bags
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","cost","spec","qty","price","profit"]]), "Bags");
  
  // Sheet 3: Others
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","name","cost","qty","price","profit"]]), "Others");
  
  // Sheet 4: MaxLoading
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","max25","maxJumbo"]]), "MaxLoading");
  
  // Sheet 5: CostFOB
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["maxLoading","no","sub"]]), "CostFOB");
  
  XLSX.writeFile(wb, fn);
}

'''

d3 = d2[:df] + new_js + d2[df:]

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d3)

print(f'Old size: {len(d)}')
print(f'New size: {len(d3)}')
print('Done!')

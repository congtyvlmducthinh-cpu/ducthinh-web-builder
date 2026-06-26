import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find and replace the downloadTemplate function
old = '''function downloadTemplate(type) {
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
}'''

new = '''function downloadTemplate(type) {
  var headers, fn, row;
  if (type === 0) {
    fn = "Mau_gia_ban.xlsx";
    headers = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd"];
  } else if (type === 1) {
    fn = "Mau_bao_bi.xlsx";
    headers = ["code","cost","spec","qty","price","profit"];
  } else if (type === 2) {
    fn = "Mau_quy_cach_khac.xlsx";
    headers = ["code","name","cost","qty","price","profit"];
  }
  var ws = XLSX.utils.aoa_to_sheet([headers]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, fn);
}'''

d2 = d.replace(old, new)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print('Updated!')
print(f'Old size: {len(d)}, New size: {len(d2)}')

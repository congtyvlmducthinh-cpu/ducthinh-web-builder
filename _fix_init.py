import sys, re
sys.stdout.reconfigure(encoding="utf-8")
with open("sites/kiem-tra-gia/index.html","r",encoding="utf-8") as f:
    d = f.read()

# Fix 1: Replace showQuotationPopup to properly show message when no data
old_show = '''function showQuotationPopup() {
  document.getElementById("quotationPopup").classList.add("open");
  var data = getCalcPriceData();
  if (data) {
    updateQuotationPreview();
    var now = new Date();
    var dd = String(now.getDate()).padStart(2,"0");
    var mm = String(now.getMonth()+1).padStart(2,"0");
    var yy = now.getFullYear();
    var hh = String(now.getHours()).padStart(2,"0");
    var min = String(now.getMinutes()).padStart(2,"0");
    var rand = String(Math.floor(1000+Math.random()*9000));
    var code = dd+mm+yy+hh+min+rand;
    var qn = parseInt(localStorage.getItem("dq_quote_num")||"0")+1;
    localStorage.setItem("dq_quote_num",String(qn));
    document.getElementById("qDateSpan").textContent = "Mã: "+code+" | Số: "+qn+" | "+dd+"/"+mm+"/"+yy;
  }
  document.getElementById("qPreviewBody").scrollTop = 0;
}'''

new_show = '''function showQuotationPopup() {
  var data = getCalcPriceData();
  if (!data) {
    alert("Chọn sản phẩm và tính giá trước khi lên báo giá!");
    return;
  }
  document.getElementById("quotationPopup").classList.add("open");
  updateQuotationPreview();
  var now = new Date();
  var dd = String(now.getDate()).padStart(2,"0");
  var mm = String(now.getMonth()+1).padStart(2,"0");
  var yy = now.getFullYear();
  var hh = String(now.getHours()).padStart(2,"0");
  var min = String(now.getMinutes()).padStart(2,"0");
  var rand = String(Math.floor(1000+Math.random()*9000));
  var code = dd+mm+yy+hh+min+rand;
  var qn = parseInt(localStorage.getItem("dq_quote_num")||"0")+1;
  localStorage.setItem("dq_quote_num",String(qn));
  document.getElementById("qDateSpan").textContent = "Mã: "+code+" | Số: "+qn+" | "+dd+"/"+mm+"/"+yy;
  document.getElementById("qPreviewBody").scrollTop = 0;
}'''

assert old_show in d, "Cannot find showQuotationPopup!"
d = d.replace(old_show, new_show, 1)
print("✅ Fixed showQuotationPopup")

# Fix 2: Update updateQuotationPreview to not re-fetch data
old_update = '''function updateQuotationPreview() {
  var data=getCalcPriceData();
  var content=document.getElementById("qPreviewContent");
  var customer=document.getElementById("qCustomer").value||"______________________";'''

new_update = '''function updateQuotationPreview() {
  var data=getCalcPriceData();
  if (!data) return;
  var content=document.getElementById("qPreviewContent");
  var customer=document.getElementById("qCustomer").value||"______________________";'''

assert old_update in d, "Cannot find updateQuotationPreview!"
d = d.replace(old_update, new_update, 1)
print("✅ Fixed updateQuotationPreview (early return on no data)")

# Fix 3: Add render() call at end of script (after fmtNum)
old_end = '''function fmtNum(n, isUsd) {
  if (isUsd) return n.toLocaleString('en-US', {minimumFractionDigits:1, maximumFractionDigits:2});
  return Math.round(n).toLocaleString();
}
</script>'''

new_end = '''function fmtNum(n, isUsd) {
  if (isUsd) return n.toLocaleString('en-US', {minimumFractionDigits:1, maximumFractionDigits:2});
  return Math.round(n).toLocaleString();
}
render();</script>'''

assert old_end in d, "Cannot find script end!"
d = d.replace(old_end, new_end, 1)
print("✅ Added render() call after fmtNum")

# Fix 4: Remove duplicate "Chọn sản phẩm" message from popup HTML default
# It's inside qPreviewContent div
old_default_msg = '''<div class="q-modal-body" id="qPreviewBody"><div id="qPreviewContent"><p style="text-align:center;color:#94a3b8;font-size:13px">Chọn sản phẩm và tính giá trước khi lên báo giá</p></div></div>'''
new_default_msg = '''<div class="q-modal-body" id="qPreviewBody"><div id="qPreviewContent"><p style="text-align:center;color:#94a3b8;font-size:13px">Loading...</p></div></div>'''

# This might not exist if it's written differently
if old_default_msg in d:
    d = d.replace(old_default_msg, new_default_msg, 1)
    print("✅ Updated default popup message")
else:
    # Try to find it
    idx = d.find("qPreviewContent")
    if idx > 0:
        ctx = d[idx:idx+300]
        print(f"qPreviewContent context: {repr(ctx[:200])}")
    print("ℹ️ Default message not found in HTML (might be different format)")

with open("sites/kiem-tra-gia/index.html","w",encoding="utf-8") as f:
    f.write(d)

print("✅ Wrote file")

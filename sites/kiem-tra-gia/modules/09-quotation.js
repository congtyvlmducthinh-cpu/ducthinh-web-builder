// ====== QUOTATION POPUP ======
function showQuotationPopup() {
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
}
function closeQuotationPopup() {
  document.getElementById("quotationPopup").classList.remove("open");
}
function getCalcPriceData() {
  var psel=document.getElementById("calcProduct"), bsel=document.getElementById("calcBag");
  var bagSpecSel=document.getElementById("calcBagSpec"), sp=document.getElementById("calcSellPrice");
  if (!psel||!psel.value) return null;
  var prod=null;
  for (var i=0;i<DATA_PRODUCTS.length;i++) { if (DATA_PRODUCTS[i].code===psel.value) { prod=DATA_PRODUCTS[i]; break; } }
  if (!prod) return null;
  var isUsd=currency==="USD";
  var cc=isUsd?"USD":"VND";
  var bs=bagSpecSel?bagSpecSel.value:"25KG";
  var bcode=bsel?bsel.value:"";
  var bagLabel="";
  if (bcode) { for (var i=0;i<DATA_BAGS.length;i++) { if (DATA_BAGS[i].code===bcode) { bagLabel=DATA_BAGS[i].spec; break; } } }
  else { bagLabel=bs; }
  var sellPrice=sp&&sp.value?parseFloat(sp.value):0;
  var modeStr=calcPriceMode.toUpperCase();
  if (calcPriceMode==="fob") modeStr+=" ("+(calcLccType==="sub"?"Sub LCC":"No LCC")+")";
  if (calcPriceMode==="cif") modeStr+=" ("+(calcLccType==="sub"?"Sub":"No")+")";
  var spec="";
  if (prod.d50) spec+="D50: "+prod.d50;
  if (prod.d97) spec+=(spec?" | ":"")+"D97: "+prod.d97;
  if (prod.whiteness) spec+=(spec?" | ":"")+"White: "+prod.whiteness;
  if (prod.brightness) spec+=(spec?" | ":"")+"Bright: "+prod.brightness;
  return {
    product: prod.code+" - "+prod.size,
    code: prod.code,
    size: prod.size,
    machine: prod.machine,
    standard: prod.standard,
    spec: spec,
    bagSpec: bagLabel,
    bagCode: bcode||bagLabel,
    isJumbo: bs==="Jumbo",
    mode: modeStr,
    totalPrice: sellPrice,
    cc: cc,
    isUsd: isUsd
  };
}
function updateQuotationPreview() {
  var data=getCalcPriceData();
  if (!data) return;
  var content=document.getElementById("qPreviewContent");
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var qty=parseFloat(document.getElementById("qQty").value)||1;
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  if (!data) {
    content.innerHTML="<p style=\"text-align:center;color:#94a3b8;font-size:13px\">Chọn sản phẩm và tính giá trước khi lên báo giá</p>";
    return;
  }
  var totalFmt=data.totalPrice>0?data.totalPrice.toLocaleString("en-US",data.isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;
  var h="";
  h+="<p style=\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\">📄 BÁO GIÁ</p>";
  h+="<div class=\"q-row\"><strong>Khách hàng:</strong><span>"+customer+"</span></div>";
  if (contact) h+="<div class=\"q-row\"><strong>Người liên hệ:</strong><span>"+contact+"</span></div>";
  if (assigned) h+="<div class=\"q-row\"><strong>Người phụ trách:</strong><span>"+assigned+"</span></div>";
  if (custEmail) h+="<div class=\"q-row\"><strong>Email:</strong><span>"+custEmail+"</span></div>";
  h+="<div class=\"q-row\"><strong>Ngày:</strong><span>"+dateStr+"</span></div>";
  if (port) h+="<div class=\"q-row\"><strong>Cảng đi:</strong><span>"+port+"</span></div>";
  h+="<table class=\"q-table\">";
  h+="<thead><tr><th>STT</th><th>Code</th><th>Tên sản phẩm</th><th>Spec</th><th>Quy cách bao</th><th>ĐVT</th><th>SL</th><th>Giá</th><th>Tiền tệ</th></tr></thead>";
  h+="<tbody>";
  h+="<tr><td>1</td><td>"+data.code+"</td><td>"+data.size+"</td><td style=\"font-size:11px\">"+data.spec+"</td><td>"+data.bagSpec+"</td><td>Tấn</td><td>"+qty+"</td><td style=\"font-weight:700\">"+totalFmt+"</td><td>"+data.cc+"</td></tr>";
  h+="</tbody></table>";
  h+="<div class=\"q-terms\">";
  h+="<div class=\"q-row\"><strong>Delivery Terms:</strong><span>"+delivery+"</span></div>";
  if (port&&(delivery==="FOB"||delivery==="CIF")) h+="<div class=\"q-row\"><strong>Cảng đi:</strong><span>"+port+"</span></div>";
  h+="<div class=\"q-row\"><strong>Điều kiện:</strong><span>"+data.mode+"</span></div>";
  h+="<div class=\"q-row\"><strong>Hiệu lực:</strong><span>"+valid+"</span></div>";
  h+="<div class=\"q-row\"><strong>Thanh toán:</strong><span>"+payment+"</span></div>";
  if (note) h+="<div class=\"q-row\"><strong>Ghi chú:</strong><span>"+note+"</span></div>";
  h+="</div>";
  h+="<div class=\"q-footer\">";
  h+="- Giá không bao gồm thuế VAT<br>";
  h+="- "+(delivery==="Tại kho nhà máy Đức Thịnh"?"Giá chưa bao gồm chi phí vận chuyển đến kho người mua":"Giá đã bao gồm chi phí vận chuyển đến kho người mua")+"<br>";
  h+="- Báo giá này có hiệu lực trong vòng "+valid+"<br>";
  h+="- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)";
  h+="</div>";
  content.innerHTML=h;
}
function getQuotationText() {
  var data=getCalcPriceData();
  if (!data) return "Chưa có dữ liệu sản phẩm";
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var qty=parseFloat(document.getElementById("qQty").value)||1;
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  var totalFmt=data.totalPrice>0?data.totalPrice.toLocaleString("en-US",data.isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;
  var t=COMPANY+"\n";
  t+=ADDR+"\n";
  t+="Email: "+EMAIL+" - "+WEBSITE+"\n";
  t+="Tel: "+PHONE+" Ext: "+EXT+" - MST: "+MST+"\n";
  t+="──────────────────────────────────────────────────\n";
  t+="📄 BÁO GIÁ\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Khách hàng: "+customer+"\n";
  if (contact) t+="Người liên hệ: "+contact+"\n";
  if (assigned) t+="Người phụ trách: "+assigned+"\n";
  if (custEmail) t+="Email: "+custEmail+"\n";
  t+="Ngày: "+dateStr+"\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Sản phẩm: "+data.product+"\n";
  t+="Spec: "+data.spec+"\n";
  t+="Quy cách bao: "+data.bagSpec+"\n";
  t+="Số lượng: "+qty+" tấn\n";
  t+="Điều kiện: "+data.mode+"\n";
  if (port) t+="Cảng đi: "+port+"\n";
  t+="Delivery Terms: "+delivery+"\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Giá bán: "+totalFmt+" "+data.cc+" / tấn\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Hiệu lực: "+valid+"\n";
  t+="Thanh toán: "+payment+"\n";
  if (note) t+="Ghi chú: "+note+"\n";
  t+="\n";
  t+="- Giá không bao gồm thuế VAT\n";
  t+="- "+(delivery==="Tại kho nhà máy Đức Thịnh"?"Giá chưa bao gồm chi phí vận chuyển":"Giá đã bao gồm chi phí vận chuyển")+"\n";
  t+="- Báo giá này có hiệu lực "+valid+"\n";
  return t;
}
function copyQuotation() {
  var txt=getQuotationText();
  if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(function(){alert("✅ Đã copy báo giá vào clipboard");}); }
  else { prompt("Copy đoạn text dưới đây:",txt); }
}
function printQuotation() {
  var data=getCalcPriceData();
  if (!data) return alert("Chọn sản phẩm và tính giá trước!");
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var qty=parseFloat(document.getElementById("qQty").value)||1;
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  var totalFmt=data.totalPrice>0?data.totalPrice.toLocaleString("en-US",data.isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;
  var w=window.open("","_blank");
  w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Báo giá - '+data.product+'</title>');
  w.document.write('<style>body{font-family:"Arial",sans-serif;padding:40px;max-width:780px;margin:0 auto;color:#1e293b}h1{font-size:22px;text-align:center;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em}.sub{text-align:center;color:#64748b;font-size:12px;margin:0 0 20px;line-height:1.5}.divider{height:2px;background:#2563eb;margin:0 0 16px}.title{text-align:center;font-weight:700;font-size:15px;margin:0 0 20px}table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px}th{background:#f1f5f9;text-align:left;padding:8px 6px;font-size:11px;text-transform:uppercase;color:#475569;border:1px solid #e2e8f0}td{padding:8px 6px;border:1px solid #e2e8f0}.row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px;border-bottom:1px solid #f1f5f9}.row strong{color:#1e293b}.row span{color:#475569}.footer{margin-top:20px;font-size:11px;color:#94a3b8;line-height:1.6}@media print{body{padding:20px}}</style></head><body>');
  w.document.write('<h1>'+COMPANY+'</h1>');
  w.document.write('<p class="sub">'+ADDR+'<br>Email: '+EMAIL+' - '+WEBSITE+'<br>Tel: '+PHONE+' Ext: '+EXT+' - MST: '+MST+'</p>');
  w.document.write('<div class="divider"></div>');
  w.document.write('<p class="title">📄 BÁO GIÁ</p>');
  w.document.write('<div class="row"><strong>Khách hàng:</strong><span>'+customer+'</span></div>');
  if (contact) w.document.write('<div class="row"><strong>Người liên hệ:</strong><span>'+contact+'</span></div>');
  if (assigned) w.document.write('<div class="row"><strong>Người phụ trách:</strong><span>'+assigned+'</span></div>');
  if (custEmail) w.document.write('<div class="row"><strong>Email:</strong><span>'+custEmail+'</span></div>');
  w.document.write('<div class="row"><strong>Ngày:</strong><span>'+dateStr+'</span></div>');
  if (port) w.document.write('<div class="row"><strong>Cảng đi:</strong><span>'+port+'</span></div>');
  w.document.write('<table><thead><tr><th>STT</th><th>Code</th><th>Tên sản phẩm</th><th>Spec</th><th>Quy cách bao</th><th>ĐVT</th><th>SL</th><th>Giá</th><th>Tiền tệ</th></tr></thead><tbody>');
  w.document.write('<tr><td>1</td><td>'+data.code+'</td><td>'+data.size+'</td><td style="font-size:11px">'+data.spec+'</td><td>'+data.bagSpec+'</td><td>Tấn</td><td>'+qty+'</td><td><strong>'+totalFmt+'</strong></td><td>'+data.cc+'</td></tr>');
  w.document.write('</tbody></table>');
  w.document.write('<div class="row"><strong>Delivery Terms:</strong><span>'+delivery+'</span></div>');
  w.document.write('<div class="row"><strong>Điều kiện:</strong><span>'+data.mode+'</span></div>');
  w.document.write('<div class="row"><strong>Hiệu lực:</strong><span>'+valid+'</span></div>');
  w.document.write('<div class="row"><strong>Thanh toán:</strong><span>'+payment+'</span></div>');
  if (note) w.document.write('<div class="row"><strong>Ghi chú:</strong><span>'+note+'</span></div>');
  w.document.write('<div class="footer">- Giá không bao gồm thuế VAT<br>- '+(delivery==="Tại kho nhà máy Đức Thịnh"?"Giá chưa bao gồm chi phí vận chuyển đến kho người mua":"Giá đã bao gồm chi phí vận chuyển đến kho người mua")+'<br>- Báo giá này có hiệu lực trong vòng '+valid+'<br>- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)<br><br><strong>'+COMPANY_EN+'</strong></div>');
  w.document.write('</body></html>');
  w.document.close();
  setTimeout(function(){w.print();},500);
}
function fmtNum(n, isUsd) {
  if (isUsd) return n.toLocaleString('en-US', {minimumFractionDigits:1, maximumFractionDigits:2});
  return Math.round(n).toLocaleString();
}

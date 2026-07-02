// ====== QUOTATION TAB (Standalone) ======
// Multi-product quotation builder with TCKT spec data

var QUOT_CART = [];

function renderQuotationTab() {
  var h = '<div class="quot-grid">';
  h += '<div class="quot-left">';

  // Customer Info
  h += '<div class="quot-section"><div class="quot-section-title"><span class="badge blue">🏢</span><span class="title-text">Khách hàng</span></div>';
  h += '<div class="quot-form-row"><div class="quot-form-group"><label>🏢 Khách hàng</label><input type="text" id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotPreview()" class="quot-input"></div>';
  h += '<div class="quot-form-group"><label>👤 Người liên hệ</label><input type="text" id="qContact" placeholder="Người liên hệ..." oninput="updateQuotPreview()" class="quot-input"></div></div>';
  h += '<div class="quot-form-row"><div class="quot-form-group"><label>👤 Người phụ trách</label><input type="text" id="qAssigned" placeholder="Tên nhân viên..." oninput="updateQuotPreview()" class="quot-input"></div>';
  h += '<div class="quot-form-group"><label>📧 Email KH</label><input type="email" id="qCustEmail" placeholder="Email khách hàng..." oninput="updateQuotPreview()" class="quot-input"></div></div>';
  h += '</div>';

  // Delivery Terms
  h += '<div class="quot-section"><div class="quot-section-title"><span class="badge green">🚚</span><span class="title-text">Delivery Terms</span></div>';
  h += '<div class="quot-form-row">';
  h += '<div class="quot-form-group"><label>EXW/FOB/CIF</label>';
  h += '<select id="quotDeliveryMode" class="quot-input" onchange="onQuotDeliveryChange()">';
  h += '<option value="exw">EXW</option><option value="fob">FOB</option><option value="cif">CIF</option></select></div>';
  h += '<div class="quot-form-group" id="quotLccGroup" style="display:none"><label>LCC</label>';
  h += '<select id="quotLccType" class="quot-input" onchange="recalcQuotCart()">';
  h += '<option value="no">No LCC</option><option value="sub">Sub LCC</option></select></div>';
  h += '<div class="quot-form-group" id="quotFreightGroup" style="display:none"><label>🚂 Cước (USD)</label>';
  h += '<input type="number" id="quotFreight" class="quot-input" value="0" min="0" oninput="recalcQuotCart()" style="width:100px"></div></div>';
  h += '<div class="quot-form-row">';
  h += '<div class="quot-form-group"><label>💱 Loại tiền</label>';
  h += '<select id="quotCurrency" class="quot-input" onchange="recalcQuotCart()">';
  h += '<option value="VND">VND</option><option value="USD">USD</option></select></div>';
  h += '<div class="quot-form-group"><label>🌏 Thị trường</label>';
  h += '<select id="quotMarket" class="quot-input" onchange="recalcQuotCart()">';
  h += '<option value="other">🌏 Khác</option><option value="cn">🇨🇳 TQ</option></select></div>';
  h += '<div class="quot-form-group"><label>📦 ĐVT</label>';
  h += '<select id="quotUnit" class="quot-input" onchange="updateQuotPreview()">';
  h += '<option value="Tấn">Tấn</option><option value="MT">MT</option><option value="TON">TON</option></select></div></div>';
  h += '<div class="quot-form-row">';
  h += '<div class="quot-form-group"><label>⏱ Hiệu lực</label>';
  h += '<select id="qValid" class="quot-input" onchange="updateQuotPreview()">';
  h += '<option value="15 ngày">15 ngày</option><option value="30 ngày">30 ngày</option>';
  h += '<option value="7 ngày">7 ngày</option><option value="Kể từ ngày ký">Kể từ ngày ký</option></select></div>';
  h += '<div class="quot-form-group"><label>💰 Thanh toán</label>';
  h += '<select id="qPayment" class="quot-input" onchange="updateQuotPreview()">';
  h += '<option value="T/T 30 days">T/T 30 days</option><option value="T/T 60 days">T/T 60 days</option>';
  h += '<option value="L/C at sight">L/C at sight</option><option value="Negotiable">Negotiable</option></select></div></div>';
  h += '<div class="quot-form-row">';
  h += '<div class="quot-form-group"><label>🚢 Cảng đi</label><input type="text" id="qPort" placeholder="Cảng đi..." class="quot-input" oninput="updateQuotPreview()"></div>';
  h += '<div class="quot-form-group"><label>📬 Giao hàng</label><input type="text" id="qDelivery" placeholder="Điều kiện giao hàng..." class="quot-input" oninput="updateQuotPreview()"></div></div>';
  h += '<div class="quot-form-group"><label>📝 Ghi chú</label><input type="text" id="qNote" placeholder="Ghi chú..." class="quot-input" oninput="updateQuotPreview()" style="width:100%"></div>';

  // Products
  h += '<div class="quot-section"><div class="quot-section-title"><span class="badge purple">📦</span><span class="title-text">Sản phẩm</span>';
  h += '<button class="quot-add-btn" onclick="quotAddRow()">+ Thêm SP</button></div>';
  h += '<div class="quot-filter-row">';
  h += '<select id="quotMachFilter" class="quot-input quot-filter-sm" onchange="quotFilterProds()"><option value="">— Tất cả máy —</option></select>';
  h += '<select id="quotStdFilter" class="quot-input quot-filter-sm" onchange="quotFilterProds()"><option value="">— Tất cả TC —</option></select>';
  h += '<select id="quotSizeFilter" class="quot-input quot-filter-sm" onchange="quotFilterProds()"><option value="">— Tất cả KT —</option></select></div>';
  h += '<div id="quotCart"></div></div></div>';

  // Right panel
  h += '<div class="quot-right">';
  h += '<div class="quot-section-title"><span class="badge blue">📄</span><span class="title-text">Xem trước báo giá</span></div>';
  h += '<div class="quot-actions">';
  h += '<button class="quot-btn quot-btn-primary" onclick="quotPrint()">🖨️ In</button>';
  h += '<button class="quot-btn quot-btn-secondary" onclick="quotCopy()">📋 Copy</button>';
  h += '<button class="quot-btn quot-btn-secondary" onclick="quotClear()">🗑️ Xóa hết</button></div>';
  h += '<div class="quot-preview" id="quotPreview">';
  h += '<div class="quot-preview-empty">👈 Chọn sản phẩm và điền thông tin</div></div></div></div>';
  return h;
}

function quotInitRender() {
  QUOT_CART = [{ product:"", bagCode:"", bagSpec:"25KG", qty:1, sellPrice:0 }];
  quotPopulateFilters();
  quotRenderCart();
  var saved = localStorage.getItem("quot_last");
  if (saved) {
    try {
      var d = JSON.parse(saved);
      if (d.customer) { var el = document.getElementById("qCustomer"); if(el) el.value = d.customer; }
    } catch(e) {}
  }
}

function quotPopulateFilters() {
  var me = document.getElementById("quotMachFilter"); if (!me) return;
  var machines={}, standards={}, sizes={};
  for(var i=0;i<DATA_PRODUCTS.length;i++){var p=DATA_PRODUCTS[i]; machines[p.machine]=1; standards[p.standard]=1; sizes[p.size]=1;}
  var curM=me.value;
  me.innerHTML='<option value="">— Tất cả máy —</option>';
  Object.keys(machines).sort().forEach(function(k){me.innerHTML+='<option value="'+k.replace(/"/g,"&quot;")+'">'+k+'</option>';});
  me.value=curM;
  var se=document.getElementById("quotStdFilter");
  if(se) { se.innerHTML='<option value="">— Tất cả TC —</option>'; Object.keys(standards).sort().forEach(function(k){se.innerHTML+='<option value="'+k.replace(/"/g,"&quot;")+'">'+k+'</option>';}); }
  var sze=document.getElementById("quotSizeFilter");
  if(sze) { sze.innerHTML='<option value="">— Tất cả KT —</option>'; Object.keys(sizes).sort().forEach(function(k){sze.innerHTML+='<option value="'+k.replace(/"/g,"&quot;")+'">'+k+'</option>';}); }
}

// Filtered products helper
function getQuotFilteredProducts() {
  var m=document.getElementById("quotMachFilter").value;
  var s=document.getElementById("quotStdFilter").value;
  var sz=document.getElementById("quotSizeFilter").value;
  var list=[];
  for(var i=0;i<DATA_PRODUCTS.length;i++){
    var p=DATA_PRODUCTS[i];
    if((!m||String(p.machine)===m)&&(!s||p.standard===s)&&(!sz||p.size===sz)){
      list.push(p);
    }
  }
  return list;
}

function quotFilterProds() {
  var m=document.getElementById("quotMachFilter").value;
  var s=document.getElementById("quotStdFilter").value;
  var sz=document.getElementById("quotSizeFilter").value;
  document.querySelectorAll(".quot-prod-row").forEach(function(row){
    var pm=row.dataset.machine||"", ps=row.dataset.standard||"", pz=row.dataset.size||"";
    row.style.display=(!m||pm===m)&&(!s||ps===s)&&(!sz||pz===sz)?"":"none";
  });
  quotRefreshProdDropdowns();
}

function quotRefreshProdDropdowns() {
  var filtered=getQuotFilteredProducts();
  for(var idx=0;idx<QUOT_CART.length;idx++){
    var sel=document.getElementById("quotProd_"+idx);
    if(!sel) continue;
    var curVal=sel.value;
    sel.innerHTML='<option value="">— Chọn SP —</option>';
    var lastMach="";
    for(var i=0;i<filtered.length;i++){
      var p=filtered[i];
      var val=p.code+"||"+(p.standard||"");
      var lab=(p.machine?"["+p.machine+"] ":"")+p.code+" - "+p.size+(p.standard?" ("+p.standard+")":"");
      if(p.machine!==lastMach){sel.innerHTML+='<option disabled style="font-weight:700;background:#f0f2f5">━━━ '+p.machine+' ━━━</option>';lastMach=p.machine;}
      sel.innerHTML+='<option value="'+val.replace(/"/g,"&quot;")+'">'+escHtml(lab)+'</option>';
    }
    sel.value=curVal;
  }
}

function quotAddRow() { QUOT_CART.push({product:"", bagCode:"", bagSpec:"25KG", qty:1, sellPrice:0}); quotRenderCart(); }

function quotRemoveRow(idx) { if(QUOT_CART.length<=1) return; QUOT_CART.splice(idx,1); quotRenderCart(); }

function quotRenderCart() {
  var cartEl=document.getElementById("quotCart"); if(!cartEl) return;
  var h="";
  for(var i=0;i<QUOT_CART.length;i++) h+=quotRenderRow(i,QUOT_CART[i]);
  cartEl.innerHTML=h;
  for(var i=0;i<QUOT_CART.length;i++){
    var item=QUOT_CART[i];
    var psel=document.getElementById("quotProd_"+i);
    if(psel){for(var pi=0;pi<psel.options.length;pi++){if(psel.options[pi].value===item.product){psel.selectedIndex=pi;break;}}}
    var bagEl=document.getElementById("quotBagSpec_"+i);
    if(bagEl){for(var bi=0;bi<bagEl.options.length;bi++){if(bagEl.options[bi].value===item.bagSpec){bagEl.selectedIndex=bi;break;}}}
    onQuotBagSpecChange(i);
    var bagDetailEl=document.getElementById("quotBag_"+i);
    if(bagDetailEl&&bagDetailEl.tagName==="SELECT"&&item.bagCode){for(var bj=0;bj<bagDetailEl.options.length;bj++){if(bagDetailEl.options[bj].value===item.bagCode){bagDetailEl.selectedIndex=bj;break;}}}
    if(bagDetailEl&&bagDetailEl.tagName==="INPUT") bagDetailEl.value=item.otherCode||"";
    var qtyInput=document.getElementById("quotQty_"+i); if(qtyInput) qtyInput.value=item.qty;
    var sellInput=document.getElementById("quotSell_"+i); if(sellInput) sellInput.value=item.sellPrice;
    setupQuotRowEvents(i);
  }
  recalcQuotCart();
}

function quotRenderRow(idx, item) {
  var filtered=getQuotFilteredProducts();
  var h='<div class="quot-prod-row" id="quotRow_'+idx+'" data-machine="" data-standard="" data-size="">';
  h+='<div class="quot-row-header"><span class="quot-row-num">#'+(idx+1)+'</span><button class="quot-remove-btn" onclick="quotRemoveRow('+idx+')">✕</button></div>';
  h+='<div class="quot-form-group"><label>Sản phẩm</label><select id="quotProd_'+idx+'" class="quot-input" onchange="onQuotProdChange('+idx+')"><option value="">— Chọn SP —</option>';
  var lastMach="";
  for(var i=0;i<filtered.length;i++){
    var p=filtered[i];
    var val=p.code+"||"+(p.standard||"");
    var lab=(p.machine?"["+p.machine+"] ":"")+p.code+" - "+p.size+(p.standard?" ("+p.standard+")":"");
    if(p.machine!==lastMach){h+='<option disabled style="font-weight:700;background:#f0f2f5">━━━ '+p.machine+' ━━━</option>';lastMach=p.machine;}
    h+='<option value="'+val.replace(/"/g,"&quot;")+'">'+escHtml(lab)+'</option>';
  }
  h+='</select></div>';
  h+='<div class="quot-row-inline">';
  // Bag spec dropdown - dynamic unique specs from DATA_BAGS
  var bagSpecs={};
  for(var b=0;b<DATA_BAGS.length;b++){bagSpecs[DATA_BAGS[b].spec]=1;}
  var specKeys=Object.keys(bagSpecs).sort();
  h+='<div class="quot-form-group" style="flex:0.7"><label>Quy cách bao</label><select id="quotBagSpec_'+idx+'" class="quot-input" onchange="onQuotBagSpecChange('+idx+')">';
  for(var b=0;b<specKeys.length;b++){
    h+='<option value="'+specKeys[b].replace(/"/g,"&quot;")+'">'+specKeys[b]+'</option>';
  }
  h+='<option value="Khác">Khác</option></select></div>';
  h+='<div class="quot-form-group" style="flex:1" id="quotBagDetail_'+idx+'"><label>Bao</label><select id="quotBag_'+idx+'" class="quot-input" onchange="recalcQuotCart()"><option value="">— Mặc định —</option></select></div>';
  h+='<div class="quot-form-group" style="flex:0.4"><label>Số lượng</label><input type="number" id="quotQty_'+idx+'" class="quot-input" value="1" min="1" oninput="updateQuotPreview()"></div>';
  h+='</div>';
  h+='<div class="quot-price-row">';
  h+='<div class="quot-form-group" style="flex:1"><label style="color:#b45309;text-transform:none">💰 Giá bán</label><input type="number" id="quotSell_'+idx+'" class="quot-input quot-sell-input" placeholder="Giá bán..." min="0" step="0.01" oninput="onQuotSellChange('+idx+')"></div>';
  h+='<div class="quot-min-price" id="quotMin_'+idx+'" style="flex:1"><div class="quot-min-label">Giá tối thiểu</div><div class="quot-min-val">—</div></div>';
  h+='<div class="quot-comm-display" id="quotComm_'+idx+'" style="flex:1"><div class="quot-comm-label">Hoa hồng</div><div class="quot-comm-val">—</div></div>';
  h+='</div>';
  h+='<div class="quot-spec-row" id="quotSpec_'+idx+'"><span class="quot-spec-label">📊 Thông số KT:</span> <span class="quot-spec-val">Chọn SP trước</span></div>';
  h+='</div>';
  return h;
}

function setupQuotRowEvents(idx) { onQuotBagSpecChange(idx); onQuotProdChange(idx); }
function onQuotBagSpecChange(idx) {
  var spec=document.getElementById("quotBagSpec_"+idx); if(!spec) return;
  var val=spec.value; var detail=document.getElementById("quotBagDetail_"+idx);
  QUOT_CART[idx].bagSpec=val;
  QUOT_CART[idx].bagCode=""; // Reset bag code when spec changes
  var html="";
  if(val==="Khác"){
    html='<label>QC khác</label><input type="text" id="quotBag_'+idx+'" class="quot-input" placeholder="Nhập quy cách..." oninput="recalcQuotCart()">';
  } else {
    var bags=[], j=0;
    for(j=0;j<DATA_BAGS.length;j++){
      if(DATA_BAGS[j].spec===val){bags.push(DATA_BAGS[j]);}
    }
    html='<label>Bao</label><select id="quotBag_'+idx+'" class="quot-input" onchange="recalcQuotCart()"><option value="">— Mặc định —</option>';
    for(j=0;j<bags.length;j++){html+='<option value="'+bags[j].code.replace(/"/g,"&quot;")+'">'+escHtml(bags[j].code)+'</option>';}
    html+='</select>';
  }
  detail.innerHTML=html;
  recalcQuotCart();
}function onQuotProdChange(idx) {
  var sel=document.getElementById("quotProd_"+idx); if(!sel) return;
  var val=sel.value; QUOT_CART[idx].product=val;
  var specEl=document.getElementById("quotSpec_"+idx);
  if(!val){if(specEl)specEl.querySelector(".quot-spec-val").textContent="Chọn SP trước";recalcQuotCart();return;}
  var parts=val.split("||"), code=parts[0], std=parts[1]||"";
  var prod=null;
  for(var j=0;j<DATA_PRODUCTS.length;j++){
    if(DATA_PRODUCTS[j].code===code&&DATA_PRODUCTS[j].standard===std){prod=DATA_PRODUCTS[j];break;}
  }
  if(specEl&&prod){
    var row=document.getElementById("quotRow_"+idx);
    if(row){row.dataset.machine=prod.machine||""; row.dataset.standard=prod.standard||""; row.dataset.size=prod.size||"";}
    var s=DATA_SPECS[prod.code];
    if(s){
      var parts=[];
      if(s.d97) parts.push("D97: "+s.d97);
      if(s.d50_bet) parts.push("D50(BET): "+s.d50_bet);
      if(s.brightness_y) parts.push("Br(Y): "+s.brightness_y);
      if(s.whiteness_l) parts.push("W(L): "+s.whiteness_l);
      if(s.r457) parts.push("R457: "+s.r457);
      if(s.mesh) parts.push("Mesh: "+s.mesh);
      specEl.querySelector(".quot-spec-val").textContent=parts.join(" | ");
    } else {
      specEl.querySelector(".quot-spec-val").textContent="(Không có thông số TCKT)";
    }
  }
  recalcQuotCart();
}

function onQuotSellChange(idx) {
  var el=document.getElementById("quotSell_"+idx); if(!el) return;
  QUOT_CART[idx].sellPrice=parseFloat(el.value)||0;
  recalcQuotCart();
}

function onQuotDeliveryChange() {
  var mode=document.getElementById("quotDeliveryMode").value;
  document.getElementById("quotLccGroup").style.display=(mode==="exw"?"none":"block");
  document.getElementById("quotFreightGroup").style.display=(mode==="cif"?"block":"none");
  recalcQuotCart();
}
function recalcQuotCart() {
  var isUsd=document.getElementById("quotCurrency")&&document.getElementById("quotCurrency").value==="USD";
  var mode=document.getElementById("quotDeliveryMode")?document.getElementById("quotDeliveryMode").value:"exw";
  var lcc=document.getElementById("quotLccType")?document.getElementById("quotLccType").value:"no";
  var freight=document.getElementById("quotFreight")?parseFloat(document.getElementById("quotFreight").value)||0:0;
  var market=document.getElementById("quotMarket")?document.getElementById("quotMarket").value:"other";
  var cc=isUsd?"USD":"VND";

  for(var i=0;i<QUOT_CART.length;i++){
    var item=QUOT_CART[i];
    var sellPrice=item.sellPrice||0;
    var minPrice=0;
    var minPriceEl=document.getElementById("quotMin_"+i);
    var commEl=document.getElementById("quotComm_"+i);

    if(item.product){
      var parts=item.product.split("||"), code=parts[0], std=parts[1]||"";
      var prod=null;
      for(var j=0;j<DATA_PRODUCTS.length;j++){
        if(DATA_PRODUCTS[j].code===code&&DATA_PRODUCTS[j].standard===std){prod=DATA_PRODUCTS[j];break;}
      }
      if(prod){
        var lccKey = lcc==="sub"?"sub":"no";
        var bagSpec=item.bagSpec||"25KG";

        if(mode==="exw"){
          minPrice = isUsd ? getEXWPriceUSD(prod, bagSpec) : getEXWPriceVND(prod, bagSpec);
        } else if(mode==="fob"){
          var fobFn=isUsd?getFOB25PriceUSD:getFOB25PriceVND;
          if(bagSpec==="Jumbo") fobFn=isUsd?getFOBJumboPriceUSD:getFOBJumboPriceVND;
          minPrice = fobFn(prod, lccKey);
        } else if(mode==="cif"){
          var cifFn=isUsd?getCIF25PriceUSD:getCIF25PriceVND;
          if(bagSpec==="Jumbo") cifFn=isUsd?getCIFJumboPriceUSD:getCIFJumboPriceVND;
          minPrice = cifFn(prod, lccKey, freight);
        }
        minPrice = Math.round(minPrice*100)/100;
      }
    }

    var totalComm=0;
    if(sellPrice>0&&minPrice>0){
      totalComm=sellPrice-minPrice;
      if(totalComm<0) totalComm=0;
    }

    if(minPriceEl){
      minPriceEl.innerHTML='<div class="quot-min-label">💰 Giá tối thiểu</div><div class="quot-min-val">'+fmtNum(minPrice,isUsd)+' '+cc+'</div>';
    }
    if(commEl){
      commEl.innerHTML='<div class="quot-comm-label">💰 Hoa hồng</div><div class="quot-comm-val">'+fmtNum(totalComm,isUsd)+' '+cc+'</div>';
    }
  }
  updateQuotPreview();
}
function updateQuotPreview() {
  var previewEl=document.getElementById("quotPreview");
  if(!previewEl) return;
  var hasProd=false;
  for(var i=0;i<QUOT_CART.length;i++){if(QUOT_CART[i].product){hasProd=true;break;}}
  if(!hasProd){
    previewEl.innerHTML='<div class="quot-preview-empty">👈 Chọn sản phẩm để xem trước báo giá</div>';
    return;
  }
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  var unit=document.getElementById("quotUnit").value;
  var mode=document.getElementById("quotDeliveryMode").value.toUpperCase();
  var isUsd=document.getElementById("quotCurrency").value==="USD";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;

  var h='<div class="q-preview">';
  h+='<h1>'+COMPANY+'</h1>';
  h+='<p class="q-sub">'+ADDR+'<br>Email: '+EMAIL+' - '+WEBSITE+'<br>Tel: '+PHONE+' Ext: '+EXT+' - MST: '+MST+'</p>';
  h+='<div class="q-divider"></div>';
  h+='<p style="text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px">📄 BÁO GIÁ</p>';
  h+='<div class="q-row"><strong>Khách hàng:</strong><span>'+customer+'</span></div>';
  if(contact) h+='<div class="q-row"><strong>Người liên hệ:</strong><span>'+contact+'</span></div>';
  if(assigned) h+='<div class="q-row"><strong>Người phụ trách:</strong><span>'+assigned+'</span></div>';
  if(custEmail) h+='<div class="q-row"><strong>Email:</strong><span>'+custEmail+'</span></div>';
  h+='<div class="q-row"><strong>Ngày:</strong><span>'+dateStr+'</span></div>';
  if(port) h+='<div class="q-row"><strong>Cảng đi:</strong><span>'+port+'</span></div>';

  // Product table
  h+='<table class="q-table">';
  h+='<thead><tr><th>STT</th><th>Code</th><th>Sản phẩm</th><th>Spec</th><th>Bao</th><th>ĐVT</th><th>SL</th><th>Giá bán</th><th>Tiền tệ</th></tr></thead>';
  h+='<tbody>';
  for(var i=0;i<QUOT_CART.length;i++){
    var item=QUOT_CART[i];
    if(!item.product) continue;
    var parts=item.product.split("||"), code=parts[0], std=parts[1]||"";
    var prod=null;
    for(var j=0;j<DATA_PRODUCTS.length;j++){
      if(DATA_PRODUCTS[j].code===code&&DATA_PRODUCTS[j].standard===std){prod=DATA_PRODUCTS[j];code=prod.code;break;}
    }
    var size=prod?prod.code+" - "+prod.size:"";
    var specStr="";
    if(prod){
      var s=DATA_SPECS[prod.code];
      if(s){
        var sparts=[];
        if(s.d97) sparts.push("D97: "+s.d97);
        if(s.d50_bet) sparts.push("D50: "+s.d50_bet);
        if(s.brightness_y) sparts.push("Br: "+s.brightness_y);
        if(s.whiteness_l) sparts.push("W: "+s.whiteness_l);
        if(s.r457) sparts.push("R457: "+s.r457);
        specStr=sparts.join(" | ");
      }
    }
    var sp=item.sellPrice||0;
    var priceFmt=sp>0?sp.toLocaleString("en-US",isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
    var bagLabel=item.bagCode||item.bagSpec;
    var qty=item.qty||1;
    h+='<tr><td>'+(i+1)+'</td><td>'+code+'</td><td>'+size+'</td><td style="font-size:10px">'+specStr+'</td><td>'+bagLabel+'</td><td>'+unit+'</td><td>'+qty+'</td><td style="font-weight:700">'+priceFmt+'</td><td>'+(isUsd?"USD":"VND")+'</td></tr>';
  }
  h+='</tbody></table>';

  h+='<div class="q-terms" style="margin-top:8px">';
  h+='<div class="q-row"><strong>Điều kiện:</strong><span>'+mode+'</span></div>';
  if(port&&(mode==="FOB"||mode==="CIF")) h+='<div class="q-row"><strong>Cảng đi:</strong><span>'+port+'</span></div>';
  h+='<div class="q-row"><strong>Hiệu lực:</strong><span>'+valid+'</span></div>';
  h+='<div class="q-row"><strong>Thanh toán:</strong><span>'+payment+'</span></div>';
  if(note) h+='<div class="q-row"><strong>Ghi chú:</strong><span>'+note+'</span></div>';
  h+='</div>';
  h+='<div class="q-footer">';
  h+='- Giá không bao gồm thuế VAT<br>';
  h+='- Báo giá này có hiệu lực trong vòng '+valid+'<br>';
  h+='- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)';
  h+='</div></div>';
  previewEl.innerHTML = h;
}
function quotCopy() {
  var txt = quotGetText();
  if (!txt) { alert("Chưa có dữ liệu báo giá!"); return; }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt).then(function(){alert("✅ Đã copy báo giá vào clipboard");});
  } else {
    prompt("Copy đoạn text dưới đây:", txt);
  }
}

function quotGetText() {
  var hasProd = false;
  for (var i = 0; i < QUOT_CART.length; i++) { if (QUOT_CART[i].product) { hasProd = true; break; } }
  if (!hasProd) return null;
  var customer = document.getElementById("qCustomer").value || "______________________";
  var contact = document.getElementById("qContact").value || "";
  var assigned = document.getElementById("qAssigned").value || "";
  var custEmail = document.getElementById("qCustEmail").value || "";
  var valid = document.getElementById("qValid").value;
  var payment = document.getElementById("qPayment").value;
  var port = document.getElementById("qPort").value || "";
  var note = document.getElementById("qNote").value;
  var unit = document.getElementById("quotUnit").value;
  var mode = document.getElementById("quotDeliveryMode").value.toUpperCase();
  var isUsd = document.getElementById("quotCurrency").value === "USD";
  var now = new Date();
  var dd = String(now.getDate()).padStart(2,"0");
  var mm = String(now.getMonth()+1).padStart(2,"0");
  var yy = now.getFullYear();
  var dateStr = dd+"/"+mm+"/"+yy;
  var t = COMPANY + "\n";
  t += ADDR + "\n";
  t += "Email: " + EMAIL + " - " + WEBSITE + "\n";
  t += "Tel: " + PHONE + " Ext: " + EXT + " - MST: " + MST + "\n";
  t += "──────────────────────────────────\n";
  t += "📄 BÁO GIÁ\n";
  t += "──────────────────────────────────\n";
  t += "Khách hàng: " + customer + "\n";
  if (contact) t += "Người liên hệ: " + contact + "\n";
  if (assigned) t += "Người phụ trách: " + assigned + "\n";
  if (custEmail) t += "Email: " + custEmail + "\n";
  t += "Ngày: " + dateStr + "\n";
  if (port) t += "Cảng đi: " + port + "\n";
  t += "──────────────────────────────────\n";
  for (var i = 0; i < QUOT_CART.length; i++) {
    var item = QUOT_CART[i];
    if (!item.product) continue;
    var parts = item.product.split("||"), code = parts[0], std = parts[1] || "";
    var prod = null;
    for (var j = 0; j < DATA_PRODUCTS.length; j++) {
      if (DATA_PRODUCTS[j].code === code && DATA_PRODUCTS[j].standard === std) { prod = DATA_PRODUCTS[j]; code = prod.code; break; }
    }
    var specStr = "";
    if (prod) {
      var s = DATA_SPECS[prod.code];
      if (s) {
        var sparts = [];
        if (s.d97) sparts.push("D97: " + s.d97);
        if (s.d50_bet) sparts.push("D50: " + s.d50_bet);
        if (s.brightness_y) sparts.push("Br: " + s.brightness_y);
        if (s.whiteness_l) sparts.push("W: " + s.whiteness_l);
        specStr = sparts.join(" | ");
      }
    }
    var sp = item.sellPrice || 0;
    var priceFmt = sp > 0 ? sp.toLocaleString("en-US", isUsd ? {minimumFractionDigits:0, maximumFractionDigits:2} : {}) : "__________";
    t += (i+1) + ". " + code + " - " + (prod?prod.size:"") + "\n";
    if (specStr) t += "   Spec: " + specStr + "\n";
    t += "   Bao: " + (item.bagCode || item.bagSpec) + " | SL: " + (item.qty || 1) + " " + unit + "\n";
    t += "   Giá: " + priceFmt + " " + (isUsd ? "USD" : "VND") + "\n";
  }
  t += "──────────────────────────────────\n";
  t += "Điều kiện: " + mode + "\n";
  t += "Hiệu lực: " + valid + "\n";
  t += "Thanh toán: " + payment + "\n";
  if (note) t += "Ghi chú: " + note + "\n";
  t += "──────────────────────────────────\n";
  t += "- Giá không bao gồm thuế VAT\n";
  t += "- Báo giá này có hiệu lực " + valid + "\n";
  return t;
}
function quotPrint() {
  var hasProd = false;
  for (var i = 0; i < QUOT_CART.length; i++) { if (QUOT_CART[i].product) { hasProd = true; break; } }
  if (!hasProd) { alert("Chưa có sản phẩm để in báo giá!"); return; }
  var customer = document.getElementById("qCustomer").value || "______________________";
  var contact = document.getElementById("qContact").value || "";
  var assigned = document.getElementById("qAssigned").value || "";
  var custEmail = document.getElementById("qCustEmail").value || "";
  var valid = document.getElementById("qValid").value;
  var payment = document.getElementById("qPayment").value;
  var port = document.getElementById("qPort").value || "";
  var note = document.getElementById("qNote").value;
  var unit = document.getElementById("quotUnit").value;
  var mode = document.getElementById("quotDeliveryMode").value.toUpperCase();
  var isUsd = document.getElementById("quotCurrency").value === "USD";
  var now = new Date();
  var dd = String(now.getDate()).padStart(2,"0");
  var mm = String(now.getMonth()+1).padStart(2,"0");
  var yy = now.getFullYear();
  var dateStr = dd+"/"+mm+"/"+yy;
  var w = window.open("", "_blank");
  w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Báo giá - Đức Thịnh</title>');
  w.document.write('<style>body{font-family:"Arial",sans-serif;padding:40px;max-width:780px;margin:0 auto;color:#1e293b}h1{font-size:22px;text-align:center;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em}.sub{text-align:center;color:#64748b;font-size:12px;margin:0 0 20px;line-height:1.5}.divider{height:2px;background:#2563eb;margin:0 0 16px}.q-title{text-align:center;font-weight:700;font-size:15px;margin:0 0 20px}table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px}th{background:#f1f5f9;text-align:left;padding:8px 6px;font-size:11px;text-transform:uppercase;color:#475569;border:1px solid #e2e8f0}td{padding:8px 6px;border:1px solid #e2e8f0}.row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px;border-bottom:1px solid #f1f5f9}.row strong{color:#1e293b}.row span{color:#475569}.footer{margin-top:20px;font-size:11px;color:#94a3b8;line-height:1.6}@media print{body{padding:20px}}</style></head><body>');
  w.document.write('<h1>'+COMPANY+'</h1>');
  w.document.write('<p class="sub">'+ADDR+'<br>Email: '+EMAIL+' - '+WEBSITE+'<br>Tel: '+PHONE+' Ext: '+EXT+' - MST: '+MST+'</p>');
  w.document.write('<div class="divider"></div>');
  w.document.write('<p class="q-title">📄 BÁO GIÁ</p>');
  w.document.write('<div class="row"><strong>Khách hàng:</strong><span>'+customer+'</span></div>');
  if (contact) w.document.write('<div class="row"><strong>Người liên hệ:</strong><span>'+contact+'</span></div>');
  if (assigned) w.document.write('<div class="row"><strong>Người phụ trách:</strong><span>'+assigned+'</span></div>');
  if (custEmail) w.document.write('<div class="row"><strong>Email:</strong><span>'+custEmail+'</span></div>');
  w.document.write('<div class="row"><strong>Ngày:</strong><span>'+dateStr+'</span></div>');
  if (port) w.document.write('<div class="row"><strong>Cảng đi:</strong><span>'+port+'</span></div>');
  w.document.write('<table><thead><tr><th>STT</th><th>Code</th><th>Sản phẩm</th><th>Spec</th><th>Bao</th><th>ĐVT</th><th>SL</th><th>Giá bán</th><th>Tiền tệ</th></tr></thead><tbody>');
  for (var i = 0; i < QUOT_CART.length; i++) {
    var item = QUOT_CART[i];
    if (!item.product) continue;
    var parts = item.product.split("||"), code = parts[0], std = parts[1] || "";
    var prod = null;
    for (var j = 0; j < DATA_PRODUCTS.length; j++) {
      if (DATA_PRODUCTS[j].code === code && DATA_PRODUCTS[j].standard === std) { prod = DATA_PRODUCTS[j]; code = prod.code; break; }
    }
    var specStr = "";
    if (prod) {
      var s = DATA_SPECS[prod.code];
      if (s) {
        var sparts = [];
        if (s.d97) sparts.push("D97: " + s.d97);
        if (s.d50_bet) sparts.push("D50: " + s.d50_bet);
        if (s.brightness_y) sparts.push("Br: " + s.brightness_y);
        if (s.whiteness_l) sparts.push("W: " + s.whiteness_l);
        specStr = sparts.join(" | ");
      }
    }
    var sp = item.sellPrice || 0;
    var priceFmt = sp > 0 ? sp.toLocaleString("en-US", isUsd ? {minimumFractionDigits:0, maximumFractionDigits:2} : {}) : "__________";
    w.document.write('<tr><td>'+(i+1)+'</td><td>'+code+'</td><td>'+(prod?prod.code+" - "+prod.size:"")+'</td><td style="font-size:11px">'+specStr+'</td><td>'+(item.bagCode||item.bagSpec)+'</td><td>'+unit+'</td><td>'+(item.qty||1)+'</td><td><strong>'+priceFmt+'</strong></td><td>'+(isUsd?"USD":"VND")+'</td></tr>');
  }
  w.document.write('</tbody></table>');
  w.document.write('<div class="row"><strong>Điều kiện:</strong><span>'+mode+'</span></div>');
  w.document.write('<div class="row"><strong>Hiệu lực:</strong><span>'+valid+'</span></div>');
  w.document.write('<div class="row"><strong>Thanh toán:</strong><span>'+payment+'</span></div>');
  if (note) w.document.write('<div class="row"><strong>Ghi chú:</strong><span>'+note+'</span></div>');
  w.document.write('<div class="footer">- Giá không bao gồm thuế VAT<br>- Báo giá này có hiệu lực trong vòng '+valid+'<br>- Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)<br><br><strong>'+COMPANY_EN+'</strong></div>');
  w.document.write('</body></html>');
  w.document.close();
  setTimeout(function(){w.print();}, 500);
}

function quotClear() {
  if (!confirm("Xóa hết dữ liệu báo giá?")) return;
  ["qCustomer","qContact","qAssigned","qCustEmail","qPort","qDelivery","qNote"].forEach(function(id){
    var el = document.getElementById(id); if (el) el.value = "";
  });
  QUOT_CART = [{ product:"", bagCode:"", bagSpec:"25KG", qty:1, sellPrice:0 }];
  quotRenderCart();
}

function setSel(id, val) {
  var el = document.getElementById(id);
  if (el) { for (var i = 0; i < el.options.length; i++) { if (el.options[i].value === val) { el.selectedIndex = i; return; } } }
}

function escHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ====== EXW PRICE HELPERS ======

function getEXWPriceVND(prod, bagSpec) {
  var isJumbo = bagSpec==="Jumbo";
  return isJumbo ? (prod.jumbo_vnd || prod.exw_vnd) : (prod.pkg25_vnd || prod.exw_vnd);
}

function getEXWPriceUSD(prod, bagSpec) {
  var isJumbo = bagSpec==="Jumbo";
  return isJumbo ? (prod.jumbo_usd || prod.exw_usd || getEXWPriceVND(prod, bagSpec)/26000) : (prod.pkg25_usd || prod.exw_usd || getEXWPriceVND(prod, bagSpec)/26000);
}

function fmtNum(val, isUsd) {
  if (val === undefined || val === null || isNaN(val)) return "—";
  if (isUsd) return val.toLocaleString("en-US", {minimumFractionDigits:0, maximumFractionDigits:2});
  return Math.round(val).toLocaleString("en-US");
}

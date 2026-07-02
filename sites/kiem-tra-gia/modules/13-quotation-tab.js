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
  QUOT_CART = [{ product:"", bagCode:"", bagSpec:"25KG", qty:1, sellPrice:0, rowJumboTons:1, rowOtherCode:"", rowOtherTons:1 }];
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
    // Skip empty rows (no product selected) - keep them visible
    if(!pm&&!ps&&!pz){row.style.display="";return;}
    row.style.display=(!m||pm===m)&&(!s||ps===s)&&(!sz||pz===sz)?"":"none";
  });
  quotRefreshProdDropdowns();
}function quotRefreshProdDropdowns() {
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

function quotAddRow() { QUOT_CART.push({product:"", bagCode:"", bagSpec:"25KG", qty:1, sellPrice:0, rowJumboTons:1, rowOtherCode:"", rowOtherTons:1}); quotRenderCart(); }

function quotRemoveRow(idx) { if(QUOT_CART.length<=1) return; QUOT_CART.splice(idx,1); quotRenderCart(); }

function quotRenderCart() {
  var cartEl=document.getElementById("quotCart"); if(!cartEl) return;
  var h="";
  for(var i=0;i<QUOT_CART.length;i++) h+=quotRenderRow(i,QUOT_CART[i]);
  cartEl.innerHTML=h;
  for(var i=0;i<QUOT_CART.length;i++){
    var item=QUOT_CART[i];
    // Restore cascading filters
    var machEl=document.getElementById("quotMach_"+i);
    var stdEl=document.getElementById("quotStd_"+i);
    var szEl=document.getElementById("quotSz_"+i);
    if(machEl&&item.rowFilterMachine){for(var fi=0;fi<machEl.options.length;fi++){if(machEl.options[fi].value===item.rowFilterMachine){machEl.selectedIndex=fi;break;}}}
    if(stdEl&&item.rowFilterStandard){for(var fi=0;fi<stdEl.options.length;fi++){if(stdEl.options[fi].value===item.rowFilterStandard){stdEl.selectedIndex=fi;break;}}}
    if(szEl&&item.rowFilterSize){for(var fi=0;fi<szEl.options.length;fi++){if(szEl.options[fi].value===item.rowFilterSize){szEl.selectedIndex=fi;break;}}}
    var psel=document.getElementById("quotProd_"+i);
    if(psel){for(var pi=0;pi<psel.options.length;pi++){if(psel.options[pi].value===item.product){psel.selectedIndex=pi;break;}}}
    var bagEl=document.getElementById("quotBagSpec_"+i);
    if(bagEl){for(var bi=0;bi<bagEl.options.length;bi++){if(bagEl.options[bi].value===item.bagSpec){bagEl.selectedIndex=bi;break;}}}
    onQuotBagSpecChange(i);
    var bagDetailEl=document.getElementById("quotBag_"+i);
    if(bagDetailEl&&bagDetailEl.tagName==="SELECT"&&item.bagCode){for(var bj=0;bj<bagDetailEl.options.length;bj++){if(bagDetailEl.options[bj].value===item.bagCode){bagDetailEl.selectedIndex=bj;break;}}}
    if(bagDetailEl&&bagDetailEl.tagName==="INPUT") bagDetailEl.value=item.otherCode||"";
    onQuotBagSpecChange(i);
    var jumboEl=document.getElementById("quotJumboTons_"+i);
    if(jumboEl&&item.rowJumboTons){for(var fi=0;fi<jumboEl.options.length;fi++){if(parseFloat(jumboEl.options[fi].value)===item.rowJumboTons){jumboEl.selectedIndex=fi;break;}}}
    var otherEl=document.getElementById("quotOther_"+i);
    if(otherEl&&item.rowOtherCode){for(var fi=0;fi<otherEl.options.length;fi++){if(otherEl.options[fi].value===item.rowOtherCode){otherEl.selectedIndex=fi;break;}}}
    var qtyInput=document.getElementById("quotQty_"+i); if(qtyInput) qtyInput.value=item.qty;
    var sellInput=document.getElementById("quotSell_"+i); if(sellInput) sellInput.value=item.sellPrice;
    setupQuotRowEvents(i);
  }}

function quotRenderRow(idx, item) {
  var filtered=getQuotFilteredProducts();
  var curMach=item.rowFilterMachine||"";
  var curStd=item.rowFilterStandard||"";
  var curSz=item.rowFilterSize||"";

  var allMachines={}, allStds={}, allSizes={};
  for(var i=0;i<DATA_PRODUCTS.length;i++){
    var p=DATA_PRODUCTS[i];
    allMachines[p.machine]=1;
    allStds[p.standard]=1;
    allSizes[p.size]=1;
  }
  var availStds={}, availSizes={};
  for(var i=0;i<DATA_PRODUCTS.length;i++){
    var p=DATA_PRODUCTS[i];
    var machOk=!curMach||String(p.machine)===curMach;
    var stdOk=!curStd||p.standard===curStd;
    if(machOk) availStds[p.standard]=1;
    if(machOk&&stdOk) availSizes[p.size]=1;
  }
  var machKeys=Object.keys(allMachines).sort();
  var stdKeys=Object.keys(availStds).sort();
  var sizeKeys=Object.keys(availSizes).sort();

  var h='<div class="quot-prod-row" id="quotRow_'+idx+'" data-machine="" data-standard="" data-size="">';
  h+='<div class="quot-row-header"><span class="quot-row-num">#'+(idx+1)+'</span><button class="quot-remove-btn" onclick="quotRemoveRow('+idx+')">✕</button></div>';

  // Product cascade + selector
  h+='<div class="quot-row-inline"><div class="quot-form-group" style="flex:1"><label>🏭 Máy</label><select id="quotMach_'+idx+'" class="quot-input" onchange="onQuotRowFilterChange('+idx+')"><option value="">— Máy —</option>';
  for(var i=0;i<machKeys.length;i++){h+='<option value="'+machKeys[i].replace(/"/g,"&quot;")+'"'+(curMach===machKeys[i]?' selected':'')+'>'+machKeys[i]+'</option>';}
  h+='</select></div>';
  h+='<div class="quot-form-group" style="flex:1"><label>📋 Tiêu chuẩn</label><select id="quotStd_'+idx+'" class="quot-input" onchange="onQuotRowFilterChange('+idx+')"><option value="">— TC —</option>';
  for(var i=0;i<stdKeys.length;i++){h+='<option value="'+stdKeys[i].replace(/"/g,"&quot;")+'"'+(curStd===stdKeys[i]?' selected':'')+'>'+stdKeys[i]+'</option>';}
  h+='</select></div>';
  h+='<div class="quot-form-group" style="flex:1"><label>📐 Kích thước</label><select id="quotSz_'+idx+'" class="quot-input" onchange="onQuotRowFilterChange('+idx+')"><option value="">— KT —</option>';
  for(var i=0;i<sizeKeys.length;i++){h+='<option value="'+sizeKeys[i].replace(/"/g,"&quot;")+'"'+(curSz===sizeKeys[i]?' selected':'')+'>'+sizeKeys[i]+'</option>';}
  h+='</select></div>';
  h+='<div class="quot-form-group" style="flex:2"><label>🔖 Sản phẩm</label><select id="quotProd_'+idx+'" class="quot-input" onchange="onQuotProdChange('+idx+')"><option value="">— Chọn SP —</option>';
  for(var i=0;i<DATA_PRODUCTS.length;i++){
    var p=DATA_PRODUCTS[i];
    var machOk=!curMach||String(p.machine)===curMach;
    var stdOk=!curStd||p.standard===curStd;
    var szOk=!curSz||p.size===curSz;
    if(!machOk||!stdOk||!szOk) continue;
    var val=p.code+"||"+(p.standard||"");
    var lab=p.code+" - "+p.size+(p.standard?" ("+p.standard+")":"");
    h+='<option value="'+val.replace(/"/g,"&quot;")+'">'+escHtml(lab)+'</option>';
  }
  h+='</select></div></div>';

  // Bag spec + bag detail + Jumbo tons + Other spec
  h+='<div class="quot-row-inline">';
  var bagSpecs={};
  for(var b=0;b<DATA_BAGS.length;b++){bagSpecs[DATA_BAGS[b].spec]=1;}
  var specKeys=Object.keys(bagSpecs).sort();
  h+='<div class="quot-form-group" style="flex:0.6"><label>📏 Quy cách bao</label><select id="quotBagSpec_'+idx+'" class="quot-input" onchange="onQuotBagSpecChange('+idx+')">';
  for(var b=0;b<specKeys.length;b++){
    var selAttr=item.bagSpec===specKeys[b]?' selected':'';
    h+='<option value="'+specKeys[b].replace(/"/g,"&quot;")+'"'+selAttr+'>'+specKeys[b]+'</option>';
  }
  h+='<option value="Khác">Khác</option></select></div>';
  h+='<div class="quot-form-group" style="flex:0.8" id="quotBagDetail_'+idx+'"><label>🛍️ Loại bao</label><select id="quotBag_'+idx+'" class="quot-input" onchange="recalcQuotCart()"><option value="">— Mặc định —</option></select></div>';

  // Jumbo tonnage (hidden unless Jumbo)
  var jumboDisplay=item.bagSpec==="Jumbo"?"flex":"none";
  h+='<div class="quot-form-group" style="flex:0.5;display:'+jumboDisplay+'" id="quotJumboRow_'+idx+'"><label>⚖️ Tấn/bao</label>';
  h+='<select id="quotJumboTons_'+idx+'" class="quot-input" onchange="onQuotJumboTonsChange('+idx+')">';
  var jumboTons=["0.5","0.7","1","1.1","1.2","1.25","1.3","1.35","1.375","1.38","1.4","1.5"];
  h+='<option value="1">— Chọn —</option>';
  for(var t=0;t<jumboTons.length;t++){
    var selAttr2=String(item.rowJumboTons)===jumboTons[t]?' selected':'';
    h+='<option value="'+jumboTons[t]+'"'+selAttr2+'>'+jumboTons[t]+' tấn</option>';
  }
  h+='</select></div>';

  // Other spec (hidden for Jumbo)
  var otherDisplay=item.bagSpec==="Jumbo"?"none":"flex";
  h+='<div class="quot-form-group" style="flex:0.7;display:'+otherDisplay+'" id="quotOtherRow_'+idx+'"><label>📦 QC khác</label>';
  h+='<select id="quotOther_'+idx+'" class="quot-input" onchange="onQuotOtherChange('+idx+')"><option value="">— Không —</option>';
  for(var o=0;o<DATA_OTHERS.length;o++){
    var selAttr3=item.rowOtherCode===DATA_OTHERS[o].code?' selected':'';
    h+='<option value="'+DATA_OTHERS[o].code.replace(/"/g,"&quot;")+'"'+selAttr3+'>'+escHtml(DATA_OTHERS[o].code)+'</option>';
  }
  h+='</select></div>';

  // Other tonnage
  h+='<div class="quot-form-group" style="flex:0.4" id="quotOtherTonsRow_'+idx+'"><label>Tấn QK</label>';
  h+='<select id="quotOtherTons_'+idx+'" class="quot-input" onchange="recalcQuotCart()">';
  var otherTons=["0.5","0.7","1","1.1","1.2","1.25","1.3","1.35","1.4","1.5"];
  h+='<option value="1">1 tấn</option>';
  for(var t=0;t<otherTons.length;t++){
    var selAttr4=String(item.rowOtherTons)===otherTons[t]?' selected':'';
    h+='<option value="'+otherTons[t]+'"'+selAttr4+'>'+otherTons[t]+' tấn</option>';
  }
  h+='</select></div>';

  h+='<div class="quot-form-group" style="flex:0.3"><label>Số lượng</label><input type="number" id="quotQty_'+idx+'" class="quot-input" value="'+item.qty+'" min="1" oninput="updateQuotPreview()"></div>';
  h+='</div>';

  // Price row
  h+='<div class="quot-price-row">';
  h+='<div class="quot-form-group" style="flex:1"><label style="color:#b45309;text-transform:none">💰 Giá bán</label><input type="number" id="quotSell_'+idx+'" class="quot-input quot-sell-input" placeholder="Giá bán..." min="0" step="0.01" value="'+(item.sellPrice||'')+'" oninput="onQuotSellChange('+idx+')"></div>';
  h+='<div class="quot-min-price" id="quotMin_'+idx+'" style="flex:1"><div class="quot-min-label">Giá tối thiểu</div><div class="quot-min-val">—</div></div>';
  h+='<div class="quot-comm-display" id="quotComm_'+idx+'" style="flex:1"><div class="quot-comm-label">Hoa hồng</div><div class="quot-comm-val">—</div></div>';
  h+='</div>';
  h+='<div class="quot-spec-row" id="quotSpec_'+idx+'"><span class="quot-spec-label">📊 Thông số KT:</span> <span class="quot-spec-val">Chọn SP trước</span></div>';
  h+='</div>';
  return h;
}function onQuotRowFilterChange(idx) {
  var machEl=document.getElementById("quotMach_"+idx);
  var stdEl=document.getElementById("quotStd_"+idx);
  var szEl=document.getElementById("quotSz_"+idx);
  if(!machEl) return;
  QUOT_CART[idx].rowFilterMachine=machEl.value;
  QUOT_CART[idx].rowFilterStandard=stdEl.value;
  QUOT_CART[idx].rowFilterSize=szEl.value;
  // Clear product selection when filter changes
  QUOT_CART[idx].product="";
  // Re-render just this row to update filters and product dropdown
  var rowEl=document.getElementById("quotRow_"+idx);
  if(rowEl){
    var newRow=quotRenderRow(idx, QUOT_CART[idx]);
    rowEl.outerHTML=newRow;
  }
  setupQuotRowEvents(idx);
  recalcQuotCart();
}function setupQuotRowEvents(idx) { onQuotBagSpecChange(idx); onQuotProdChange(idx); }
function onQuotBagSpecChange(idx) {
  var spec=document.getElementById("quotBagSpec_"+idx); if(!spec) return;
  var val=spec.value; var detail=document.getElementById("quotBagDetail_"+idx);
  QUOT_CART[idx].bagSpec=val;
  QUOT_CART[idx].bagCode="";
  var isJumbo=val==="Jumbo";
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
  // Show/hide Jumbo tonnage and Other spec rows
  var jumboRow=document.getElementById("quotJumboRow_"+idx);
  var otherRow=document.getElementById("quotOtherRow_"+idx);
  var otherTonsRow=document.getElementById("quotOtherTonsRow_"+idx);
  if(jumboRow) jumboRow.style.display=isJumbo?"flex":"none";
  if(otherRow) otherRow.style.display=isJumbo?"none":"flex";
  if(otherTonsRow) otherTonsRow.style.display=isJumbo?"none":"flex";
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

function onQuotJumboTonsChange(idx) {
  var el=document.getElementById("quotJumboTons_"+idx);
  if(!el) return;
  QUOT_CART[idx].rowJumboTons=parseFloat(el.value)||1;
  recalcQuotCart();
}
function onQuotOtherChange(idx) {
  var el=document.getElementById("quotOther_"+idx);
  if(!el) return;
  QUOT_CART[idx].rowOtherCode=el.value;
  var tonsRow=document.getElementById("quotOtherTonsRow_"+idx);
  if(tonsRow) tonsRow.style.display=el.value?"flex":"none";
  recalcQuotCart();
}
function recalcQuotCart() {
  var isUsd=document.getElementById("quotCurrency")&&document.getElementById("quotCurrency").value==="USD";
  var mode=document.getElementById("quotDeliveryMode")?document.getElementById("quotDeliveryMode").value:"exw";
  var lcc=document.getElementById("quotLccType")?document.getElementById("quotLccType").value:"no";
  var freight=document.getElementById("quotFreight")?parseFloat(document.getElementById("quotFreight").value)||0:0;
  var market=document.getElementById("quotMarket")?document.getElementById("quotMarket").value:"other";
  var lccKey = lcc==="sub"?"sub":"no";
  var cc=isUsd?"USD":"VND";

  for(var i=0;i<QUOT_CART.length;i++){
    var item=QUOT_CART[i];
    // Sync per-row values from DOM
    var bagEl=document.getElementById("quotBag_"+i); if(bagEl) item.bagCode=bagEl.value;
    var jumboEl=document.getElementById("quotJumboTons_"+i); if(jumboEl) item.rowJumboTons=parseFloat(jumboEl.value)||1;
    var otherEl=document.getElementById("quotOther_"+i); if(otherEl) item.rowOtherCode=otherEl.value;
    var otherTonsEl=document.getElementById("quotOtherTons_"+i); if(otherTonsEl) item.rowOtherTons=parseFloat(otherTonsEl.value)||1;
    var sellEl=document.getElementById("quotSell_"+i); if(sellEl) item.sellPrice=parseFloat(sellEl.value)||0;
    var sellPrice=item.sellPrice||0;
    var minPrice=0;
    var totalCost=0;
    var minPriceEl=document.getElementById("quotMin_"+i);
    var commEl=document.getElementById("quotComm_"+i);
    var prod=null;

    if(item.product){
      var parts=item.product.split("||"), code=parts[0], std=parts[1]||"";
      for(var j=0;j<DATA_PRODUCTS.length;j++){
        if(DATA_PRODUCTS[j].code===code&&DATA_PRODUCTS[j].standard===std){prod=DATA_PRODUCTS[j];break;}
      }
      if(prod){
        var bagSpec=item.bagSpec||"25KG";
        var isJumbo=bagSpec==="Jumbo";
        var bagTons = item.rowJumboTons||1;
        var otherTons = item.rowOtherTons||1;

        // === Compute exwBase, bagPrice, otherPrice (same for minPrice and totalCost) ===
        var exwBase = 0, bagPrice = 0, otherPrice = 0;
        if(item.bagCode){
          exwBase = isUsd ? prod.exw_usd : prod.exw_vnd;
          for(var j=0;j<DATA_BAGS.length;j++){
            if(DATA_BAGS[j].code===item.bagCode&&DATA_BAGS[j].spec===bagSpec){
              bagPrice = DATA_BAGS[j].price;
              break;
            }
          }
          if(isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;
        } else {
          exwBase = isUsd ? (isJumbo?prod.jumbo_usd:prod.pkg25_usd) : (isJumbo?prod.jumbo_vnd:prod.pkg25_vnd);
          bagPrice = 0;
        }
        if(item.rowOtherCode){
          for(var j=0;j<DATA_OTHERS.length;j++){
            if(DATA_OTHERS[j].code===item.rowOtherCode){
              otherPrice = DATA_OTHERS[j].price;
              break;
            }
          }
          if(!isJumbo && otherTons > 0) otherPrice = otherPrice / otherTons;
          if(isJumbo && bagTons > 0) otherPrice = otherPrice / bagTons;
        }

        // === Compute minPrice AND totalCost the same way ===
        // This matches calcPrice() logic exactly
        if(mode==="exw"){
          minPrice = exwBase + bagPrice + otherPrice;
        } else if(mode==="fob"){
          var ml = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
          var cfobCost = getCostFobVND(ml, lccKey);
          if(isUsd){
            bagPrice = Math.round(bagPrice / 26000);
            otherPrice = Math.round(otherPrice / 26000);
            cfobCost = Math.round(cfobCost / 26000);
          }
          minPrice = (exwBase + bagPrice + otherPrice + cfobCost) * 1.05;
        } else if(mode==="cif"){
          var ml = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
          var cfobCost = getCostFobVND(ml, lccKey);
          if(isUsd){
            bagPrice = Math.round(bagPrice / 26000);
            otherPrice = Math.round(otherPrice / 26000);
            cfobCost = Math.round(cfobCost / 26000);
          }
          minPrice = (exwBase + bagPrice + otherPrice + cfobCost) * 1.05;
          if(ml > 0){
            minPrice += isUsd ? (freight + 10) / ml : (freight + 10) * 26000 / ml;
          }
        }
        minPrice = Math.round(minPrice*100)/100;
        totalCost = minPrice; // Same value
      }
    }

    // === Commission ===
    var totalComm = 0;
    var effCommBase = 0;
    var commissionVar = 0;
    if(prod && sellPrice > 0 && totalCost > 0){
      var commBase = isUsd ? (prod.comm_usd||0) : (prod.comm_vnd||0);
      effCommBase = sellPrice < totalCost ? 0 : commBase;
      var diff;
      if(mode==="fob" || mode==="cif"){
        diff = Math.max(0, (sellPrice - totalCost) / 1.05);
      } else {
        diff = Math.max(0, sellPrice - totalCost);
      }
      commissionVar = diff * 0.3;
      totalComm = effCommBase + commissionVar;
    }

    if(minPriceEl){
      minPriceEl.innerHTML='<div class="quot-min-label">💰 Giá tối thiểu</div><div class="quot-min-val">'+fmtNum(minPrice,isUsd)+' '+cc+'</div>';
    }
    if(commEl){
      var h='<div class="quot-comm-label">💰 Hoa hồng</div><div class="quot-comm-val">'+fmtNum(totalComm,isUsd)+' '+cc+'</div>';
      h+='<div style="font-size:10px;color:var(--muted);margin-top:2px">';
      if(effCommBase>0) h+='Base: '+fmtNum(effCommBase,isUsd)+' | ';
      h+='30% chênh: '+fmtNum(commissionVar,isUsd)+' '+cc+'</div>';
      commEl.innerHTML=h;
    }
  }
  updateQuotPreview();
}function updateQuotPreview() {
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

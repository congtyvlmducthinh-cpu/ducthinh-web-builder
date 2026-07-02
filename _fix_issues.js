var fs = require("fs");
var c = fs.readFileSync("sites/kiem-tra-gia/modules/13-quotation-tab.js", "utf-8");

// --- FIX 1: onQuotRowFilterChange — remove old subrow before outerHTML ---
var oldFn = "function onQuotRowFilterChange(idx) {\r\n  var machEl=document.getElementById(\"quotMach_\"+idx);\r\n  var stdEl=document.getElementById(\"quotStd_\"+idx);\r\n  var szEl=document.getElementById(\"quotSz_\"+idx);\r\n  if(!machEl) return;\r\n  QUOT_CART[idx].rowFilterMachine=machEl.value;\r\n  QUOT_CART[idx].rowFilterStandard=stdEl.value;\r\n  QUOT_CART[idx].rowFilterSize=szEl.value;\r\n  // Clear product selection when filter changes\r\n  QUOT_CART[idx].product=\"\";\r\n  // Re-render just this row to update filters and product dropdown\r\n  var rowEl=document.getElementById(\"quotRow_\"+idx);\r\n  if(rowEl){\r\n    var newRow=quotRenderRow(idx, QUOT_CART[idx]);\r\n    rowEl.outerHTML=newRow;\r\n  }\r\n  setupQuotRowEvents(idx);\r\n  recalcQuotCart();\r\n}";

var newFn = "function onQuotRowFilterChange(idx) {\r\n  var machEl=document.getElementById(\"quotMach_\"+idx);\r\n  var stdEl=document.getElementById(\"quotStd_\"+idx);\r\n  var szEl=document.getElementById(\"quotSz_\"+idx);\r\n  if(!machEl) return;\r\n  QUOT_CART[idx].rowFilterMachine=machEl.value;\r\n  QUOT_CART[idx].rowFilterStandard=stdEl.value;\r\n  QUOT_CART[idx].rowFilterSize=szEl.value;\r\n  // Clear product selection when filter changes\r\n  QUOT_CART[idx].product=\"\";\r\n  // Re-render just this row to update filters and product dropdown\r\n  var rowEl=document.getElementById(\"quotRow_\"+idx);\r\n  var subEl=document.getElementById(\"quotSubRow_\"+idx);\r\n  if(rowEl){\r\n    var newRow=quotRenderRow(idx, QUOT_CART[idx]);\r\n    rowEl.outerHTML=newRow;\r\n  }\r\n  // Remove old subrow if it became orphaned\r\n  if(subEl&&subEl.parentNode) subEl.parentNode.removeChild(subEl);\r\n  setupQuotRowEvents(idx);\r\n  recalcQuotCart();\r\n}";

c = c.replace(oldFn, newFn);
if(c.indexOf(oldFn) >= 0) { console.log("FIRST REPLACE FAILED - trying simpler match"); c = c.replace("function onQuotRowFilterChange", "FUNC_MARKER"); var idx2 = c.indexOf("FUNC_MARKER"); var brace = c.indexOf("{", idx2); var depth = 0, end = brace; for(var i=brace;i<c.length;i++){if(c[i]==="{")depth++;if(c[i]==="}")depth--;if(depth===0){end=i;break;}} c = c.substring(0, idx2) + newFn + c.substring(end+1); }

// Check
if (c.indexOf("quotRenderRow(idx, QUOT_CART[idx]);") > 0 && c.indexOf("subEl.parentNode") > 0) console.log("✓ Fix 1 applied");
else { console.log("✗ Fix 1 FAILED"); process.exit(1); }

// --- FIX 2: quotPreviewOpen — generate preview directly instead of relying on hidden quotPreview div ---
var previewFnIdx = c.indexOf("function quotPreviewOpen()");
var brace = c.indexOf("{", previewFnIdx);
var depth = 0, end = brace;
for (var i = brace; i < c.length; i++) { if (c[i] === "{") depth++; if (c[i] === "}") depth--; if (depth === 0) { end = i; break; } }

var newPreview =
"function quotPreviewOpen() {\r\n" +
"  var overlay=document.getElementById(\"quotPreviewOverlay\");\r\n" +
"  if(!overlay){\r\n" +
"    overlay=document.createElement(\"div\");overlay.id=\"quotPreviewOverlay\";\r\n" +
"    overlay.style.cssText=\"position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center\";\r\n" +
"    document.body.appendChild(overlay);\r\n" +
"    var popup=document.createElement(\"div\");popup.id=\"quotPreviewPopup\";\r\n" +
"    popup.style.cssText=\"background:#fff;border-radius:12px;padding:24px;max-width:90vw;max-height:85vh;overflow:auto;box-shadow:0 8px 32px rgba(0,0,0,0.2);position:relative\";\r\n" +
"    overlay.appendChild(popup);\r\n" +
"    var closeBtn=document.createElement(\"button\");closeBtn.textContent=\"\u2715 \u0110\u00F3ng\";\r\n" +
"    closeBtn.style.cssText=\"position:sticky;top:0;float:right;background:var(--primary,#3b82f6);color:#fff;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;font-size:14px;z-index:1\";\r\n" +
"    closeBtn.onclick=function(){document.body.removeChild(overlay);};\r\n" +
"    popup.appendChild(closeBtn);\r\n" +
"    var content=document.createElement(\"div\");content.id=\"quotPreviewContent\";\r\n" +
"    content.style.cssText=\"clear:both\";\r\n" +
"    popup.appendChild(content);\r\n" +
"    overlay.onclick=function(e){if(e.target===overlay){document.body.removeChild(overlay);}};\r\n" +
"  }\r\n" +
"  var content=document.getElementById(\"quotPreviewContent\");\r\n" +
"  if(content) content.innerHTML=_generateQuotPreviewHtml();\r\n" +
"}";

c = c.substring(0, previewFnIdx) + newPreview + c.substring(end + 1);

// --- FIX 3: Add _generateQuotPreviewHtml() that returns HTML without needing DOM element ---
// Find updateQuotPreview function and extract its logic into a new function
var uptIdx = c.indexOf("function updateQuotPreview()");
var brace2 = c.indexOf("{", uptIdx);
var depth2 = 0, end2 = brace2;
for (var i = brace2; i < c.length; i++) { if (c[i] === "{") depth2++; if (c[i] === "}") depth2--; if (depth2 === 0) { end2 = i; break; } }

// Keep updateQuotPreview for backward compat (it's called from recalcQuotCart)
// Just add _generateQuotPreviewHtml before it
var genFn =
"\r\nfunction _generateQuotPreviewHtml() {\r\n" +
"  var hasProd=false;\r\n" +
"  for(var i=0;i<QUOT_CART.length;i++){if(QUOT_CART[i].product){hasProd=true;break;}}\r\n" +
"  if(!hasProd) return '<div class=\"quot-preview-empty\" style=\"padding:40px;text-align:center;color:#94a3b8\">Ch\u01B0a c\u00F3 s\u1EA3n ph\u1EA9m n\u00E0o. H\u00E3y th\u00EAm s\u1EA3n ph\u1EA9m tr\u01B0\u1EDBc.</div>';\r\n" +
"  var customer=document.getElementById(\"qCustomer\")?document.getElementById(\"qCustomer\").value||\"______________________\":\"\";\r\n" +
"  var contact=document.getElementById(\"qContact\")?document.getElementById(\"qContact\").value||\"\":\"\";\r\n" +
"  var assigned=document.getElementById(\"qAssigned\")?document.getElementById(\"qAssigned\").value||\"\":\"\";\r\n" +
"  var custEmail=document.getElementById(\"qCustEmail\")?document.getElementById(\"qCustEmail\").value||\"\":\"\";\r\n" +
"  var valid=document.getElementById(\"qValid\")?document.getElementById(\"qValid\").value:\"15 ng\u00E0y\";\r\n" +
"  var payment=document.getElementById(\"qPayment\")?document.getElementById(\"qPayment\").value:\"\";\r\n" +
"  var port=document.getElementById(\"qPort\")?document.getElementById(\"qPort\").value||\"\":\"\";\r\n" +
"  var delivery=document.getElementById(\"qDelivery\")?document.getElementById(\"qDelivery\").value:\"\";\r\n" +
"  var note=document.getElementById(\"qNote\")?document.getElementById(\"qNote\").value:\"\";\r\n" +
"  var unit=document.getElementById(\"quotUnit\")?document.getElementById(\"quotUnit\").value:\"T\u1EA5n\";\r\n" +
"  var mode=document.getElementById(\"quotDeliveryMode\")?document.getElementById(\"quotDeliveryMode\").value.toUpperCase():\"EXW\";\r\n" +
"  var isUsd=document.getElementById(\"quotCurrency\")?document.getElementById(\"quotCurrency\").value===\"USD\":false;\r\n" +
"  var now=new Date();\r\n" +
"  var dd=String(now.getDate()).padStart(2,\"0\");\r\n" +
"  var mm=String(now.getMonth()+1).padStart(2,\"0\");\r\n" +
"  var yy=now.getFullYear();\r\n" +
"  var dateStr=dd+\"/\"+mm+\"/\"+yy;\r\n" +
"  var h='<div class=\"q-preview\" style=\"font-family:Arial,sans-serif;max-width:800px;margin:0 auto;font-size:13px;color:#333;line-height:1.5\">';\r\n" +
"  h+='<h1 style=\"text-align:center;font-size:20px;color:#1e293b;margin:0 0 2px\">'+COMPANY+'</h1>';\r\n" +
"  h+='<p style=\"text-align:center;font-size:11px;color:#64748b;margin:0 0 12px;line-height:1.6\">'+ADDR+'<br>Email: '+EMAIL+' - '+WEBSITE+'<br>Tel: '+PHONE+' Ext: '+EXT+' - MST: '+MST+'</p>';\r\n" +
"  h+='<div style=\"border-top:2px solid #3b82f6;margin-bottom:12px\"></div>';\r\n" +
"  h+='<p style=\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\">\uD83D\uDCC4 B\u00C1O GI\u00C1</p>';\r\n" +
"  h+='<div style=\"display:flex;gap:16px;flex-wrap:wrap;font-size:12px;margin-bottom:12px\"><span><strong>Kh\u00E1ch h\u00E0ng:</strong> '+customer+'</span>';\r\n" +
"  if(contact) h+='<span><strong>LH:</strong> '+contact+'</span>';\r\n" +
"  if(assigned) h+='<span><strong>NV:</strong> '+assigned+'</span>';\r\n" +
"  if(custEmail) h+='<span><strong>Email:</strong> '+custEmail+'</span>';\r\n" +
"  h+='<span><strong>Ng\u00E0y:</strong> '+dateStr+'</span>';\r\n" +
"  if(port) h+='<span><strong>C\u1EA3ng \u0111i:</strong> '+port+'</span>';\r\n" +
"  h+='</div>';\r\n" +
"  h+='<table style=\"width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px\">';\r\n" +
"  h+='<thead><tr style=\"background:#f1f5f9\"><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">STT</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">Code</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">S\u1EA3n ph\u1EA9m</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">Bao b\u00EC</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">\u0110VT</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">SL</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:right;font-weight:600;color:#475569\">Gi\u00E1 b\u00E1n</th><th style=\"padding:6px 8px;border:1px solid #e2e8f0;text-align:left;font-weight:600;color:#475569\">Ti\u1EC1n t\u1EC7</th></tr></thead>';\r\n" +
"  h+='<tbody>';\r\n" +
"  for(var i=0;i<QUOT_CART.length;i++){\r\n" +
"    var item=QUOT_CART[i];\r\n" +
"    if(!item.product) continue;\r\n" +
"    var parts=item.product.split(\"||\"), code=parts[0], std=parts[1]||\"\";\r\n" +
"    var prod=null;\r\n" +
"    for(var j=0;j<DATA_PRODUCTS.length;j++){\r\n" +
"      if(DATA_PRODUCTS[j].code===code&&DATA_PRODUCTS[j].standard===std){prod=DATA_PRODUCTS[j];code=prod.code;break;}\r\n" +
"    }\r\n" +
"    var size=prod?prod.code+\" - \"+prod.size:\"\";\r\n" +
"    var sp=item.sellPrice||0;\r\n" +
"    var priceFmt=sp>0?sp.toLocaleString(\"en-US\",isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):\"__________\";\r\n" +
"    var bagLabel=item.bagCode||item.bagSpec||\"\";\r\n" +
"    var qty=item.qty||1;\r\n" +
"    h+='<tr><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+(i+1)+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+code+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+size+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+bagLabel+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+unit+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+qty+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px;text-align:right;font-weight:700\">'+priceFmt+'</td><td style=\"padding:6px 8px;border:1px solid #e2e8f0;font-size:12px\">'+(isUsd?\"USD\":\"VND\")+'</td></tr>';\r\n" +
"  }\r\n" +
"  h+='</tbody></table>';\r\n" +
"  h+='<div style=\"font-size:12px;line-height:1.8\">';\r\n" +
"  h+='<span><strong>\u0110i\u1EC1u ki\u1EC7n:</strong> '+mode+'</span><br>';\r\n" +
"  if(port&&(mode===\"FOB\"||mode===\"CIF\")) h+='<span><strong>C\u1EA3ng \u0111i:</strong> '+port+'</span><br>';\r\n" +
"  var dest=document.getElementById(\"qDest\")?document.getElementById(\"qDest\").value:\"\";\r\n" +
"  if(dest&&mode===\"CIF\") h+='<span><strong>C\u1EA3ng \u0111\u1EBFn:</strong> '+dest+'</span><br>';\r\n" +
"  h+='<span><strong>Hi\u1EC7u l\u1EF1c:</strong> '+valid+'</span><br>';\r\n" +
"  h+='<span><strong>Thanh to\u00E1n:</strong> '+payment+'</span>';\r\n" +
"  if(note) h+='<br><span><strong>Ghi ch\u00FA:</strong> '+note+'</span>';\r\n" +
"  h+='</div>';\r\n" +
"  h+='<div style=\"margin-top:12px;padding-top:8px;border-top:1px solid #e2e8f0;font-size:11px;color:#64748b\">';\r\n" +
"  h+='- Gi\u00E1 kh\u00F4ng bao g\u1ED3m thu\u1EBF VAT<br>';\r\n" +
"  h+='- B\u00E1o gi\u00E1 n\u00E0y c\u00F3 hi\u1EC7u l\u1EF1c trong v\u00F2ng '+valid+'<br>';\r\n" +
"  h+='- S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i thi\u1EC3u: 1 container 20 feet (kho\u1EA3ng 21 t\u1EA5n)';\r\n" +
"  h+='</div></div>';\r\n" +
"  return h;\r\n" +
"}\r\n";

c = c.substring(0, uptIdx) + genFn + c.substring(uptIdx);

// Also fix updateQuotPreview to use the new function (but keep existing behavior for backward compat)
// The updateQuotPreview function updates the hidden quotPreview div, we'll keep it for backward compat
// but now it's no longer needed for the popup

fs.writeFileSync("sites/kiem-tra-gia/modules/13-quotation-tab.js", c, "utf-8");
console.log("✓ Fixes applied");
try{require("child_process").execSync("node --check sites/kiem-tra-gia/modules/13-quotation-tab.js");console.log("OK");}catch(e){console.log("ERR");}

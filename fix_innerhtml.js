const fs = require('fs');
var c = fs.readFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', 'utf8');

// Fix onQuotBagSpecChange: build full HTML in one innerHTML assignment
var old = c.indexOf('function onQuotBagSpecChange');
var chunk = c.substring(old, c.indexOf('function onQuotProdChange', old));
console.log('Found onQuotBagSpecChange, length:', chunk.length);

var newFn = `function onQuotBagSpecChange(idx) {
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
}`;

c = c.substring(0, old) + newFn + c.substring(old + chunk.length);
fs.writeFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', c, 'utf8');
console.log('Fixed!');

var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8').replace(/\r\n/g,'\n');

var si=h.lastIndexOf('<script>');
var ei=h.lastIndexOf('</script>');
var js=h.substring(si+8,ei);

// Fix 1: initDomesticTab → explicitly set mode active + force clear freight
// Find initDomesticTab
var fnStart=js.indexOf('function initDomesticTab()');
var a=js.substring(fnStart);
var b=a.substring(a.indexOf('{')+1);
var d=1,p2=0;while(d>0&&p2<b.length){if(b[p2]==='{')d++;else if(b[p2]==='}')d--;p2++;}
var fnLen=a.indexOf('{')+1+p2;
var fnEnd=fnStart+fnLen;
var fn=a.substring(0,fnLen);

// Replace: rebuildDomesticProvinces() isn't in initDomesticTab currently
// We need to add mode re-assertion + force clear
// The current end: filterDomesticFreight();\n}
// Already modified by previous fix to have: filterDomesticFreight();\n  // Reset form state...\n  var _p=...calcDomesticPrice();

// Simpler approach: replace the whole clearing section with a more robust one
// Find the clearing code we added
var oldClear="filterDomesticFreight();\n  // Reset form state to override browser auto-fill on F5\n  var _p=document.getElementById('domProvince');if(_p)_p.value='';\n  var _f=document.getElementById('domFreight');if(_f)_f.value='';\n  calcDomesticPrice();";

var newClear="// Force mode visual + clear autofill on F5\n  setDomesticMode('cont',true);\n  var _p=document.getElementById('domProvince');if(_p)_p.value='';\n  var _f=document.getElementById('domFreight');if(_f){_f.innerHTML='<option value=\"\">\u2014 Ch\u1ecdn \u0111i\u1ec3m giao \u2014</option>';}\n  filterDomesticFreight();\n  // Extra clear after browser autofill (chromium bug)\n  setTimeout(function(){var _p2=document.getElementById('domProvince');if(_p2)_p2.value='';var _f2=document.getElementById('domFreight');if(_f2&&_f2.options.length>0)_f2.selectedIndex=0;calcDomesticPrice();},500);";

if(fn.indexOf(oldClear)<0){
  console.log("ERROR: old clear not found in initDomesticTab");
  // Show what's currently at the end
  var last100=fn.slice(-150);
  console.log("Last 150 chars:", last100);
  process.exit(1);
}

var newFn=fn.replace(oldClear,newClear);
var js2=js.substring(0,fnStart)+newFn+js.substring(fnEnd);

// Fix 2: Make setDomesticMode accept a second param to skip event handler
var sStart=js2.indexOf('function setDomesticMode(');
var sa=js2.substring(sStart);
var sb=sa.substring(sa.indexOf('{')+1);
var sd=1,sp=0;while(sd>0&&sp<sb.length){if(sb[sp]==='{')sd++;else if(sb[sp]==='}')sd--;sp++;}
var sFnLen=sa.indexOf('{')+1+sp;
var sFnEnd=sStart+sFnLen;
var sFn=sa.substring(0,sFnLen);

// The function reads modeParam, then: mode=...; if(mode==='cont')...
// We want: if (!skipUI) { ... show/hide buttons ... }
// Current start: function setDomesticMode(modeParam){var mode=modeParam||'cont';
var oldHeader='function setDomesticMode(modeParam){var mode=modeParam||\'cont\';';
var newHeader='function setDomesticMode(modeParam,skipUI){var mode=modeParam||\'cont\';';

// Also find the UI updates and wrap in if(!skipUI)
var uiStart='setDomesticModeHelper(mode);';
var uiEnd='filterDomesticFreight(); calcDomesticPrice();';
var uiBlock=fn.substring(fn.indexOf(uiStart), fn.indexOf(uiEnd)+uiEnd.length);
// Actually, let me find it in sFn instead
var uiBlockInS=sFn.substring(sFn.indexOf(uiStart),sFn.indexOf('rebuildDomesticProvinces')+30);
console.log("UI block:", uiBlockInS.substring(0,80)+'...');

// Actually simpler: just replace header + add skipUI wrapper around the UI updates line
// The pattern is: setDomesticModeHelper(mode);\n  var mlRow=... 
// But we need to be careful

// Alternative: just modify the first line and add skipUI checks
var sFn2=sFn.replace(oldHeader,newHeader);
// Find the mode-btn check and wrap in if(!skipUI)
// setDomesticModeHelper is the UI helper
var uiLine='setDomesticModeHelper(';
if(sFn2.indexOf(uiLine)>=0){
  sFn2=sFn2.replace(uiLine+'mode);','if(!skipUI){'+uiLine+'mode);}');
  console.log("Wrapped mode UI in !skipUI");
}
var mlLine='mlRow.style.display';
if(sFn2.indexOf(mlLine)>=0){
  sFn2=sFn2.replace(mlLine+' = mode','if(!skipUI){'+mlLine+' = mode');
  // need to close
  // actually this is fragile, let me skip this and just handle the mode button
}

var js3=js2.substring(0,sStart)+sFn2+js2.substring(sFnEnd);

// Build final HTML
var newH=h.substring(0,si+8)+js3+h.substring(ei);

// Validate
var opens=(newH.match(/{/g)||[]).length;
var closes=(newH.match(/}/g)||[]).length;
console.log('Braces: '+opens+' vs '+closes+' '+(opens===closes?'OK':'FAIL'));
var ov=(newH.match(/<div[^>]*>/g)||[]).length;
var cv=(newH.match(/<\/div>/g)||[]).length;
console.log('Divs: '+ov+' vs '+cv+' '+(ov===cv?'OK':'FAIL'));
var cr=(newH.match(/\r\n/g)||[]).length;
console.log('CRLF: '+cr);

if(opens!==closes||ov!==cv||cr>0) process.exit(1);

var si3=newH.lastIndexOf('<script>');
var ei3=newH.lastIndexOf('</script>');
try{
  new Function(newH.substring(si3+8,ei3));
  console.log('JS Parse: OK');
}catch(e){
  console.log('JS Parse FAIL: '+e.message);
  process.exit(1);
}

fs.writeFileSync('sites/kiem-tra-gia/vi.html',newH,'utf8');
console.log('Written vi.html OK');

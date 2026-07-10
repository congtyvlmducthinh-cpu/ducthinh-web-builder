var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8').replace(/\r\n/g, '\n');

var si = h.lastIndexOf('<script>');
var ei = h.lastIndexOf('</script>');
var js = h.substring(si + 8, ei);

// Fix: In the tab switch code, use a longer timeout to clear auto-filled fields
// Find: container.innerHTML = renderDomesticTab(); setTimeout(function(){ initDomesticTab(); }, 0);
var tabSwitch = 'container.innerHTML = renderDomesticTab();\n    setTimeout(function(){ initDomesticTab(); }, 0);';
var newTabSwitch = 'container.innerHTML = renderDomesticTab();\n    setTimeout(function(){ initDomesticTab(); }, 0);\n    setTimeout(function(){ var _p=document.getElementById(\'domProvince\');if(_p)_p.value=\'\';var _f=document.getElementById(\'domFreight\');if(_f){var _m=getDomesticMode();_f.innerHTML=\'\';DATA_DOMESTIC_FREIGHT.forEach(function(fx,i){if(!fx.freight_mooc||fx.freight_mooc===_m){_f.innerHTML+=\'<option value=\"\'+i+\'\">\'+fx.ward+\' - \'+fx.address+\'</option>\';}});}_f.value=\'\';calcDomesticPrice(); }, 100);';

if (js.indexOf(tabSwitch) < 0) {
  console.log("ERROR: tab switch pattern not found");
  // Try without newline
  var alt = 'container.innerHTML = renderDomesticTab();\n    setTimeout(function(){ initDomesticTab(); }, 0);';
  if (js.indexOf(alt) >= 0) {
    tabSwitch = alt;
    console.log("Found alt pattern");
  } else {
    // Search for it
    var idx = js.indexOf('renderDomesticTab()');
    console.log("Context at renderDomesticTab(): ");
    console.log(js.substring(idx-50, idx+200));
    process.exit(1);
  }
}

console.log("Found tab switch pattern, replacing...");
var js2 = js.replace(tabSwitch, newTabSwitch);

// Also add autocomplete="off" to domProvince and domFreight in renderDomesticTab
var rStart = js2.indexOf('function renderDomesticTab()');
var rAfter = js2.substring(rStart);
var rBody = rAfter.substring(rAfter.indexOf('{') + 1);
var rD = 1, rP = 0;
while (rD > 0 && rP < rBody.length) {
  if (rBody[rP] === '{') rD++;
  else if (rBody[rP] === '}') rD--;
  rP++;
}
var rFnLen = rAfter.indexOf('{') + 1 + rP;
var rFnEnd = rStart + rFnLen;
var rFn = rAfter.substring(0, rFnLen);

// Add autocomplete="off" to the province select
var oldProv = '<select class="calc-select" id="domProvince"';
var newProv = '<select class="calc-select" id="domProvince" autocomplete="off"';
if (rFn.indexOf(oldProv) >= 0) {
  var rFn2 = rFn.replace(oldProv, newProv);
  js2 = js2.substring(0, rStart) + rFn2 + js2.substring(rFnEnd);
  console.log("Added autocomplete=off to domProvince");
} else {
  console.log("WARNING: domProvince select not found in renderDomesticTab");
}

// domFreight select
rStart = js2.indexOf('function renderDomesticTab()');
rAfter = js2.substring(rStart);
rBody = rAfter.substring(rAfter.indexOf('{') + 1);
rD = 1; rP = 0;
while (rD > 0 && rP < rBody.length) {
  if (rBody[rP] === '{') rD++;
  else if (rBody[rP] === '}') rD--;
  rP++;
}
rFnLen = rAfter.indexOf('{') + 1 + rP;
rFnEnd = rStart + rFnLen;
rFn = rAfter.substring(0, rFnLen);

var oldF = '<select class="calc-select" id="domFreight"';
var newF = '<select class="calc-select" id="domFreight" autocomplete="off"';
if (rFn.indexOf(oldF) >= 0) {
  var rFn3 = rFn.replace(oldF, newF);
  js2 = js2.substring(0, rStart) + rFn3 + js2.substring(rFnEnd);
  console.log("Added autocomplete=off to domFreight");
}

// Build HTML
var newH = h.substring(0, si + 8) + js2 + h.substring(ei);

// Validate
var opens = (newH.match(/{/g) || []).length;
var closes = (newH.match(/}/g) || []).length;
console.log('\nBraces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
var ov = (newH.match(/<div[^>]*>/g) || []).length;
var cv = (newH.match(/<\/div>/g) || []).length;
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov === cv ? 'OK' : 'FAIL'));
var cr = (newH.match(/\r\n/g) || []).length;
console.log('CRLF: ' + cr);

if (opens !== closes || ov !== cv || cr > 0) process.exit(1);

var si3 = newH.lastIndexOf('<script>');
var ei3 = newH.lastIndexOf('</script>');
try {
  new Function(newH.substring(si3 + 8, ei3));
  console.log('JS Parse: OK');
} catch (e) {
  console.log('JS Parse FAIL: ' + e.message);
  process.exit(1);
}

fs.writeFileSync('sites/kiem-tra-gia/vi.html', newH, 'utf8');
console.log('Written vi.html OK');

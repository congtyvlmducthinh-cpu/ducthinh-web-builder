var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8').replace(/\r\n/g, '\n');

var si = h.lastIndexOf('<script>');
var ei = h.lastIndexOf('</script>');
var js = h.substring(si + 8, ei);

// ===== 1. Fix renderDomesticTab(): filter provinces by mode =====
var rStart = js.indexOf('function renderDomesticTab()');
var rAfter = js.substring(rStart);
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

// Replace the var provinces line — use comma to avoid double var
var oldProv = "var provinces={};DATA_DOMESTIC_FREIGHT.forEach(function(f){provinces[f.province]=true;});";
var newProv = "var dm=getDomesticMode(),provinces={};DATA_DOMESTIC_FREIGHT.forEach(function(f){if(!f.freight_mooc||f.freight_mooc===dm)provinces[f.province]=true;});";

if (rFn.indexOf(oldProv) < 0) {
  console.log("ERROR: old province building not found");
  // Try without var prefix
  var oldProv2 = "provinces={};DATA_DOMESTIC_FREIGHT.forEach(function(f){provinces[f.province]=true;});";
  if (rFn.indexOf(oldProv2) >= 0) {
    oldProv = oldProv2;
    newProv = "var dm=getDomesticMode(),provinces={};DATA_DOMESTIC_FREIGHT.forEach(function(f){if(!f.freight_mooc||f.freight_mooc===dm)provinces[f.province]=true;});";
    console.log("Found without var prefix");
  } else {
    console.log("Cannot find old province pattern");
    process.exit(1);
  }
}
console.log("Found old province building, replacing...");

var rFnNew = rFn.replace(oldProv, newProv);
var js2 = js.substring(0, rStart) + rFnNew + js.substring(rFnEnd);

// ===== 2. Fix setDomesticMode(): update province dropdown too =====
var sStart = js2.indexOf('function setDomesticMode(');
var sAfter = js2.substring(sStart);
var sBody = sAfter.substring(sAfter.indexOf('{') + 1);
var sD = 1, sP = 0;
while (sD > 0 && sP < sBody.length) {
  if (sBody[sP] === '{') sD++;
  else if (sBody[sP] === '}') sD--;
  sP++;
}
var sFnLen = sAfter.indexOf('{') + 1 + sP;
var sFnEnd = sStart + sFnLen;
var sFn = sAfter.substring(0, sFnLen);

var oldModeTail = "filterDomesticFreight(); calcDomesticPrice();";
var newModeTail = "rebuildDomesticProvinces(); setTimeout(filterDomesticFreight, 50); calcDomesticPrice();";

if (sFn.indexOf(oldModeTail) < 0) {
  console.log("ERROR: old mode tail not found");
  process.exit(1);
}
console.log("Found setDomesticMode tail, replacing...");

var sFnNew = sFn.replace(oldModeTail, newModeTail);
var js3 = js2.substring(0, sStart) + sFnNew + js2.substring(sFnEnd);

// ===== 3. Add rebuildDomesticProvinces() function =====
var sEnd = js3.indexOf('function setDomesticMode(') + sFnNew.length;
var newFunc = 
"\n\nfunction rebuildDomesticProvinces() {" +
"\n  var sel = document.getElementById(\"domProvince\");" +
"\n  if (!sel) return;" +
"\n  var curVal = sel.value;" +
"\n  var mode = getDomesticMode();" +
"\n  sel.innerHTML = '<option value=\"\">\\u2014 T\\u1ea5t c\\u1ea3 \\u2014</option>';" +
"\n  var provinces = {};" +
"\n  DATA_DOMESTIC_FREIGHT.forEach(function(f) {" +
"\n    if (!f.freight_mooc || f.freight_mooc === mode) provinces[f.province] = true;" +
"\n  });" +
"\n  Object.keys(provinces).sort().forEach(function(p) {" +
"\n    sel.innerHTML += '<option value=\"' + domEscape(p) + '\">' + domEscape(p) + '</option>';" +
"\n  });" +
"\n  if (sel.value !== curVal && curVal) sel.value = curVal;" +
"\n}\n";

var js4 = js3.substring(0, sEnd + 1) + newFunc + js3.substring(sEnd + 1);

// ===== 4. Ensure initial filterDomesticFreight on tab mount =====
// After renderDomesticTab() is called, we need to trigger rebuild+filter.
// Look for content.innerHTML = renderDomesticTab()
var renderCall = js4.indexOf('renderDomesticTab()');
console.log("renderDomesticTab() call at: " + renderCall);
console.log("Context: " + js4.substring(Math.max(0,renderCall-30), renderCall+60));

// Build final HTML
var newH = h.substring(0, si + 8) + js4 + h.substring(ei);

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

// Validate the new function exists
var finalJs = newH.substring(si3 + 8, ei3);
if (finalJs.indexOf('function rebuildDomesticProvinces') < 0) {
  console.log("ERROR: rebuildDomesticProvinces not in final JS");
  process.exit(1);
}
console.log("rebuildDomesticProvinces() exists: YES");

fs.writeFileSync('sites/kiem-tra-gia/vi.html', newH, 'utf8');
console.log('Written vi.html OK');

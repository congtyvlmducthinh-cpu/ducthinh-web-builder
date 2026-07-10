var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8').replace(/\r\n/g, '\n');

var si = h.lastIndexOf('<script>');
var ei = h.lastIndexOf('</script>');
var js = h.substring(si + 8, ei);

// ===== 1. Fix calcDomesticPrice: show/hide + auto-set max load =====
var fnStart = js.indexOf('function calcDomesticPrice()');
var after = js.substring(fnStart);
var body = after.substring(after.indexOf('{') + 1);
var depth = 1, pos = 0;
while (depth > 0 && pos < body.length) {
  if (body[pos] === '{') depth++;
  else if (body[pos] === '}') depth--;
  pos++;
}
var fnLen = after.indexOf('{') + 1 + pos;
var fnEnd = fnStart + fnLen;
var fn = after.substring(0, fnLen);

// Show/hide block: currently "if (mode === 'cont' && bsel && bsel.value && !isJumbo)"
// Need to replace with: always show for cont, auto-set for Jumbo/no-bag cases
var oldShowHide = "// Show/hide max load input\n  var mode = getDomesticMode();\n  var mlRow = document.getElementById(\"domMaxLoadRow\");\n  if (mlRow) {\n    if (mode === 'cont' && bsel && bsel.value && !isJumbo) {\n      mlRow.style.display = \"flex\";\n    } else {\n      mlRow.style.display = \"none\";\n    }\n  }";

var newShowHide = 
"  // Show/hide max load input - always show for Container mode\n" +
"  var mode = getDomesticMode();\n" +
"  var mlRow = document.getElementById(\"domMaxLoadRow\");\n" +
"  var mlInput = document.getElementById(\"domMaxLoadInput\");\n" +
"  if (mlRow) {\n" +
"    if (mode === 'cont') {\n" +
"      mlRow.style.display = \"flex\";\n" +
"      // Auto-set max load for Jumbo or no-bag cases\n" +
"      if (mlInput) {\n" +
"        var isAuto = isJumbo || !bcode;\n" +
"        mlInput.disabled = isAuto;\n" +
"        if (isAuto) {\n" +
"          var autoVal = isJumbo ? (bagTons * 20) : (getMaxLoading(prod.code, \"max25\") || 0);\n" +
"          if (autoVal > 0) {\n" +
"            for (var ii = 0; ii < mlInput.options.length; ii++) {\n" +
"              if (parseFloat(mlInput.options[ii].value) === autoVal) {\n" +
"                mlInput.value = autoVal; break;\n" +
"              }\n" +
"            }\n" +
"          }\n" +
"        } else {\n" +
"          mlInput.disabled = false;\n" +
"        }\n" +
"      }\n" +
"    } else {\n" +
"      mlRow.style.display = \"none\";\n" +
"    }\n" +
"  }";

if (fn.indexOf(oldShowHide) < 0) {
  console.log("ERROR: Could not find old show/hide block in calcDomesticPrice()");
  process.exit(1);
}
var newFn = fn.replace(oldShowHide, newShowHide);

// Verify same length / structure
console.log("=== calcDomesticPrice() replacement ===");
console.log("Old fn length:", fn.length, "New fn length:", newFn.length);
console.log("Replacement ratio:", (newFn.length / fn.length).toFixed(3));

// Build new JS
var newJs = js.substring(0, fnStart) + newFn + js.substring(fnEnd);

// ===== 2. Fix renderDomesticTab: add product onchange to re-filter freight =====
// Add call to filterDomesticFreight when product changes
var renderStart = newJs.indexOf('function renderDomesticTab()');
var renderAfter = newJs.substring(renderStart);
var renderBody = renderAfter.substring(renderAfter.indexOf('{') + 1);
var d2 = 1, p2 = 0;
while (d2 > 0 && p2 < renderBody.length) {
  if (renderBody[p2] === '{') d2++;
  else if (renderBody[p2] === '}') d2--;
  p2++;
}
var renderFnLen = renderAfter.indexOf('{') + 1 + p2;
var renderFn = renderAfter.substring(0, renderFnLen);
var renderEnd = renderStart + renderFnLen;

// In the 4th card (Vận chuyển), the freight select already exists
// The product dropdown is in card 1 -> onchange="calcDomesticPrice()"
// We need to also filter freight when product changes
// Change: onchange="calcDomesticPrice()" → onchange="calcDomesticPrice();filterDomesticFreight()"
// But wait - filterDomesticFreight uses domProvince and domFreightSearch which are in card 3
// The product card is separate. Let's just ensure filterDomesticFreight gets called

// Find domProduct onchange in renderDomesticTab
var prodIdx = renderFn.indexOf('id="domProduct" onchange="calcDomesticPrice()"');
if (prodIdx >= 0) {
  var newRender = renderFn.replace(
    'id="domProduct" onchange="calcDomesticPrice()"',
    'id="domProduct" onchange="calcDomesticPrice();setTimeout(filterDomesticFreight,100)"'
  );
  console.log("\nAdded filterDomesticFreight trigger to product dropdown");
} else {
  console.log("\nWARNING: domProduct onchange pattern not found");
  newRender = renderFn;
}

var newJs2 = newJs.substring(0, renderStart) + newRender + newJs.substring(renderEnd);

// ===== 3. Apply to file =====
var newH = h.substring(0, si + 8) + newJs2 + h.substring(ei);

// ===== 4. Validate =====
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

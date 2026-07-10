var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8').replace(/\r\n/g, '\n');

var si = h.lastIndexOf('<script>');
var ei = h.lastIndexOf('</script>');
var js = h.substring(si+8, ei);

// Locate setDomesticMode function
var fnStart = js.indexOf('function setDomesticMode(');
var after = js.substring(fnStart);
var body = after.substring(after.indexOf('{')+1);
var depth = 1, pos = 0;
while (depth > 0 && pos < body.length) {
  if (body[pos] === '{') depth++;
  else if (body[pos] === '}') depth--;
  pos++;
}
var fnLen = after.indexOf('{') + 1 + pos;
var fn = after.substring(0, fnLen);
var fnEnd = fnStart + fnLen;

console.log('Old fn:', fn);

// Build new function with max load show/hide
var newFn = 
"function setDomesticMode(mode) {\n" +
"  document.getElementById(\"domModeCont\").className = mode === \"cont\" ? \"mode-btn active\" : \"mode-btn\";\n" +
"  document.getElementById(\"domModeMooc\").className = mode === \"mooc\" ? \"mode-btn active\" : \"mode-btn\";\n" +
"  localStorage.setItem(\"dq_domestic_mode\", mode);\n" +
"  // Show/hide max load row\n" +
"  var mlRow = document.getElementById(\"domMaxLoadRow\");\n" +
"  if (mlRow) mlRow.style.display = mode === \"cont\" ? \"flex\" : \"none\";\n" +
"  filterDomesticFreight(); calcDomesticPrice();\n" +
"}";

console.log('');
console.log('New fn:', newFn);

var newJs = js.substring(0, fnStart) + newFn + js.substring(fnEnd);
var newH = h.substring(0, si+8) + newJs + h.substring(ei);

// Validate
var opens = (newH.match(/{/g)||[]).length;
var closes = (newH.match(/}/g)||[]).length;
console.log('');
console.log('Braces: ' + opens + ' vs ' + closes + ' ' + (opens===closes?'OK':'FAIL'));
var ov = (newH.match(/<div[^>]*>/g)||[]).length;
var cv = (newH.match(/<\/div>/g)||[]).length;
console.log('Divs: ' + ov + ' vs ' + cv + ' ' + (ov===cv?'OK':'FAIL'));
var cr = (newH.match(/\r\n/g)||[]).length;
console.log('CRLF: ' + cr);

var si2 = newH.lastIndexOf('<script>');
var ei2 = newH.lastIndexOf('</script>');
try { new Function(newH.substring(si2+8, ei2)); console.log('JS Parse: OK'); }
catch(e) { console.log('JS Parse FAIL: ' + e.message); process.exit(1); }

if (opens !== closes || ov !== cv || cr > 0) process.exit(1);

fs.writeFileSync('sites/kiem-tra-gia/vi.html', newH, 'utf8');
console.log('Written vi.html OK');

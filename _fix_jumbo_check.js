var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8').replace(/\r\n/g, '\n');

var si = h.lastIndexOf('<script>');
var ei = h.lastIndexOf('</script>');
var js = h.substring(si + 8, ei);

// Find calcDomesticPrice function
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

// The Jumbo check: currently blocks when Jumbo && no tonnage
// New: only block when Jumbo && bag selected && no tonnage
var oldCheck = "if(isJumbo&&(!tnsel||!tnsel.value||tnsel.value==='')){";
var newCheck = "if(isJumbo&&bcode&&(!tnsel||!tnsel.value||tnsel.value==='')){";

if (fn.indexOf(oldCheck) < 0) {
  console.log("ERROR: old Jumbo check not found");
  process.exit(1);
}
console.log("Found old Jumbo check, replacing...");

var newFn = fn.replace(oldCheck, newCheck);
var newJs = js.substring(0, fnStart) + newFn + js.substring(fnEnd);
var newH = h.substring(0, si + 8) + newJs + h.substring(ei);

// Validate
var opens = (newH.match(/{/g) || []).length;
var closes = (newH.match(/}/g) || []).length;
console.log('Braces: ' + opens + ' vs ' + closes + ' ' + (opens === closes ? 'OK' : 'FAIL'));
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

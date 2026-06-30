var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

// Add 'STT' to both en and zh maps
// Find the zh section and add after 'STT' in en section equivalent

// The en map has: "'STT': 'No'"
// The zh map doesn't have it

// Find position to add in zh section (same position as in en)
var zhStart = build.indexOf('zh: {', build.indexOf('function getJSReplMap'));

// Find the "// Quotation" comment area in zh section, or find a good place
var zhQuotSection = build.indexOf("// Quotation", zhStart);
// Find the STT line in en section
var enStt = build.indexOf("'STT'");
var enAfterStt = build.indexOf(",\n", enStt);
var enValue = build.substring(enStt, enAfterStt+1);
console.log('EN line:', enValue);

// Check if zh has anything after the "Tên sản phẩm" section
var findAfter = build.indexOf("'产品名称'", zhStart);
console.log('Found 产品名称 in zh at', findAfter);
console.log('Context:', build.substring(findAfter-20, findAfter+30));

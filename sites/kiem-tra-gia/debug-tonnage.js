var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');

// Find exact lines manually via indexOf
var idx1 = src.indexOf('id="calcTonnage"');
var snippet = src.substring(idx1, idx1 + 150);
console.log('=== calcTonnage HTML ===');
console.log(snippet);
console.log('');

var idx2 = src.indexOf('id="calcOtherTonnage"');
var snippet2 = src.substring(idx2, idx2 + 150);
console.log('=== calcOtherTonnage HTML ===');
console.log(snippet2);

var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');
var CRLF = '\r\n';

// Fix 1: Jumbo tonnage dropdown - add default option
src = src.replace(
  'h += \'<select class="calc-select" id="calcTonnage" onchange="calcPrice()">\';' + CRLF + '  var jumboTons',
  'h += \'<select class="calc-select" id="calcTonnage" onchange="calcPrice()">\';' + CRLF + '  h += \'<option value="">— Chọn số tấn —</option>\';' + CRLF + '  var jumboTons'
);

// Fix 2: Other tonnage dropdown - add default option
src = src.replace(
  'h += \'<select class="calc-select" id="calcOtherTonnage" onchange="calcPrice()">\';' + CRLF + '  var otherTons',
  'h += \'<select class="calc-select" id="calcOtherTonnage" onchange="calcPrice()">\';' + CRLF + '  h += \'<option value="">— Chọn số tấn —</option>\';' + CRLF + '  var otherTons'
);

fs.writeFileSync('modules/05-calc.js', src, 'utf-8');
console.log('Fixed tonnage dropdowns!');

// Verify
src = fs.readFileSync('modules/05-calc.js', 'utf-8');
console.log('Has Chọn số tấn:', src.indexOf('Chọn số tấn') >= 0);
var idx = src.indexOf('calcTonnage"');
console.log('Snippet:', src.substring(idx, idx + 200));

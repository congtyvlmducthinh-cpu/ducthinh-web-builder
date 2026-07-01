var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');

// Check if the replacement happened
console.log('Has Chọn số tấn:', src.indexOf('Chọn số tấn') >= 0);
console.log('Has Vui lòng chọn:', src.indexOf('Vui lòng chọn') >= 0);

// Find exact line
var idx = src.indexOf('onchange="calcPrice()">');
var lines = src.substring(idx, idx + 300).split('\n');
lines.forEach(function(line, i) {
  console.log(i + ': ' + JSON.stringify(line));
});

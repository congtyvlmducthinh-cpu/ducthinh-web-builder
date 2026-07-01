var fs = require('fs');
var src = fs.readFileSync('modules/05-calc.js', 'utf-8');

// Find: the Jumbo validation block inside calcCommission()
// Locate "Jumbo validation: must select tonnage" and remove the whole if block
var marker1 = '  // Jumbo validation: must select tonnage\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {\n    res.innerHTML = \'<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>\';\n    return;\n  }\n';
// Also try with \r\n
var marker2 = '  // Jumbo validation: must select tonnage\r\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {\r\n    res.innerHTML = \'<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>\';\r\n    return;\r\n  }\r\n';

var idx = src.indexOf(marker1);
if (idx >= 0) {
  src = src.substring(0, idx) + src.substring(idx + marker1.length);
  console.log('Removed validation from calcCommission (LF)');
} else {
  var idx2 = src.indexOf(marker2);
  if (idx2 >= 0) {
    src = src.substring(0, idx2) + src.substring(idx2 + marker2.length);
    console.log('Removed validation from calcCommission (CRLF)');
  } else {
    // Try partial match
    var idx3 = src.indexOf('Jumbo validation: must select tonnage');
    if (idx3 >= 0) {
      // Find where the if block ends - from this point find the next return; } line
      var from = src.indexOf('\n', idx3);
      var blockStart = idx3;
      var blockEnd = src.indexOf('\n  var bagPrice', idx3);
      if (blockEnd < 0) blockEnd = src.indexOf('\n  var otherTons', idx3);
      if (blockEnd >= 0) {
        var block = src.substring(blockStart, blockEnd);
        console.log('Removing block:', JSON.stringify(block.substring(0, 80)) + '...');
        src = src.substring(0, blockStart) + src.substring(blockEnd);
      }
    }
  }
}

// Now add validation inside calcPrice()
// Find: '  var isJumbo = bs === "Jumbo";\n  // Determine base price:'
var calcPriceMarker = '  var isJumbo = bs === "Jumbo";\r\n  // Determine base price:';
var calcPriceIdx = src.indexOf(calcPriceMarker);
if (calcPriceIdx < 0) {
  calcPriceMarker = '  var isJumbo = bs === "Jumbo";\n  // Determine base price:';
  calcPriceIdx = src.indexOf(calcPriceMarker);
}

if (calcPriceIdx >= 0) {
  var injection = '  var isJumbo = bs === "Jumbo";\r\n  // Jumbo validation: must select tonnage\r\n  if (isJumbo && (!tnsel || !tnsel.value || tnsel.value === "")) {\r\n    res.innerHTML = \'<div class="calc-empty">⚠️ Vui lòng chọn <strong>Số tấn / bao Jumbo</strong> để xem kết quả</div>\';\r\n    return;\r\n  }\r\n  // Determine base price:';
  src = src.substring(0, calcPriceIdx) + injection + src.substring(calcPriceIdx + calcPriceMarker.length);
  console.log('Added validation to calcPrice');
} else {
  console.log('ERROR: Could not find calcPrice marker!');
}

fs.writeFileSync('modules/05-calc.js', src, 'utf-8');
console.log('Done!');

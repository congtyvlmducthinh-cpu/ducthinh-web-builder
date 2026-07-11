var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// Find ALL renderPriceTab functions
var count = 0;
var pos = -1;
while ((pos = h.indexOf('function renderPriceTab()', pos + 1)) >= 0) {
  count++;
  var end = h.indexOf('\nfunction ', pos + 1);
  if (end < 0) end = h.length;
  console.log('renderPriceTab #' + count + ' at ' + pos + '..' + end + ' (' + (end-pos) + ' chars)');
  // Check if it has OLD HTML signs
  var body = h.substring(pos, Math.min(pos + 3000, end));
  console.log('  Has controlBar:', body.indexOf('controlBar') >= 0 ? 'YES' : 'no');
  console.log('  Has priceModeBar:', body.indexOf('priceModeBar') >= 0 ? 'YES' : 'no');
  console.log('  Has price-card:', body.indexOf('price-card') >= 0 ? 'YES' : 'no');
  console.log('  Has class="container":', body.indexOf('class="container"') >= 0 ? 'YES' : 'no');
  console.log('');
}
console.log('Total renderPriceTab functions:', count);

// Also check for the original HTML rendering code outside the function (old event handlers)
console.log('\n=== OLD controls in rest of file ===');
var rest = h.substring(h.indexOf('function renderPriceTab()') + 1);
console.log('Has .container:', (rest.match(/class="container"/g)||[]).length);
console.log('Has controlBar:', (rest.match(/controlBar/g)||[]).length);
console.log('Has priceModeBar:', (rest.match(/priceModeBar/g)||[]).length);

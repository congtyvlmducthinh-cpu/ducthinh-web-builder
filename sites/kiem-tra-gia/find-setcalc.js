var vi = require('fs').readFileSync('vi.html', 'utf-8');

// Find setCalcMarket call added by main.js
var idx = vi.indexOf('setCalcMarket(currentMarket)');
console.log('setCalcMarket(currentMarket) at', idx);
if (idx >= 0) {
  console.log(vi.substring(Math.max(0, idx-150), idx+30));
} else {
  // The call might have different quote style
  var idx2 = vi.indexOf('setCalcMarket(');
  console.log('All setCalcMarket( calls:');
  var pos = 0;
  while (pos >= 0) {
    pos = vi.indexOf('setCalcMarket(', pos);
    if (pos < 0) break;
    console.log('  pos', pos, ':', vi.substring(pos, pos+50));
    pos++;
  }
}

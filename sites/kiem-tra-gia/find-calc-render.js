var vi = require('fs').readFileSync('vi.html', 'utf-8');

// Find the calc tab rendering section
var idx = vi.indexOf('filterCalcProducts(); filterBagSpec();');
console.log('Found calc rendering at', idx);
if (idx >= 0) {
  console.log(vi.substring(Math.max(0, idx-50), idx+400));
}

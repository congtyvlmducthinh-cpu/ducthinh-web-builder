var vi = require('fs').readFileSync('vi.html', 'utf-8');
var idx = vi.indexOf('filterCalcProducts(); filterBagSpec();');
var end = vi.indexOf('} else if (activeTab === "manage")', idx);
console.log(vi.substring(idx, end));

const fs = require('fs');
const DIR = __dirname;

// 1. Show the machine filter HTML
const viHtml = fs.readFileSync(DIR + '/vi.html', 'utf-8');
['searchInput','specFilter','machineFilter','renderPriceTab','switchTab','render()'].forEach(function(id){
  var pos = id === 'render()' ? viHtml.indexOf('function render()') : viHtml.indexOf(id);
  console.log('--- ' + id + ' pos=' + pos + ' ---');
  if (pos >= 0) {
    var start = Math.max(0, pos - 100);
    var end = Math.min(viHtml.length, pos + 200);
    console.log('[...]' + viHtml.substring(start, end) + '[...]');
    console.log('');
  }
});

// 2. Show the onchange event bindings - search for machineFilter onchange
var idx = viHtml.indexOf('machineFilter');
if (idx >= 0) {
  // Show context around machineFilter
  console.log('=== machineFilter context ===');
  console.log(viHtml.substring(Math.max(0,idx-20), idx+400));
}

// 3. Check what happens when onchange fires for any filter
idx = viHtml.indexOf('specFilter');
if (idx >= 0) {
  console.log('=== specFilter context ===');
  console.log(viHtml.substring(Math.max(0,idx-20), idx+400));
}

// 4. Search for "onchange" references
var onchanges = viHtml.match(/onchange\s*=/g);
console.log('\n=== onchange count:', onchanges ? onchanges.length : 0, '===');
var pos = 0, idx2;
while ((idx2 = viHtml.indexOf('onchange', pos)) >= 0) {
  console.log(viHtml.substring(idx2, idx2+80));
  pos = idx2 + 1;
}

var vm = require('vm');
var fs = require('fs');
var html = fs.readFileSync('vi.html', 'utf-8');

// First verify applyMarket doesn't call render
var idxFn = html.indexOf('function applyMarket');
var idxEnd = html.indexOf('function importProducts', idxFn);
if (idxEnd < 0) idxEnd = html.indexOf('function setMarket', idxFn);
console.log('=== applyMarket body ===');
console.log(html.substring(idxFn, idxEnd));

idxFn = html.indexOf('function setCalcMarket');
idxEnd = html.indexOf('function onCalcProduct', idxFn);
if (idxEnd < 0) idxEnd = html.indexOf('function ', idxFn+1);
console.log('\n=== setCalcMarket body ===');
console.log(html.substring(idxFn, idxEnd));

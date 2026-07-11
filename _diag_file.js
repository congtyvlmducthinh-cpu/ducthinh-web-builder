var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');
console.log('=== File on disk ===');
console.log('Size:', h.length);
var fnEnd = h.indexOf('function initPriceTab()', fnStart);
var fnBody = h.substring(fnStart, fnEnd);
console.log('No Lcc:', (fnBody.match(/No Lcc/g)||[]).length);
console.log('Sub Lcc:', (fnBody.match(/Sub Lcc/g)||[]).length);
console.log('lcc30:', (fnBody.match(/lcc30/g)||[]).length);
var khong = 'Kh\u00f4ng'; 
console.log('Kh\u00f4ng:', (fnBody.match(new RegExp(khong,'g'))||[]).length);
console.log('id=lccGroup:', (fnBody.match(/id="lccGroup"/g)||[]).length);
console.log('');
// Also check the injector
var inj = fs.readFileSync('sites/kiem-tra-gia/_ktg-data-injector.js', 'utf8');
console.log('=== Injector ===');
console.log('Size:', inj.length);
console.log('First 200 chars:', inj.substring(0, 200));

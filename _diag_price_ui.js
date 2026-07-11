var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');
var fnEnd = h.indexOf('function initPriceTab()', fnStart);
var fb = h.substring(fnStart, fnEnd);

console.log('=== Price Tab Function Size ===');
console.log(fb.length, 'chars');

console.log('\n=== controlBar ===');
var cb = fb.indexOf('controlBar');
console.log('Found:', cb >= 0 ? 'YES at ' + cb : 'NO');
if (cb >= 0) {
  var s = Math.max(0, cb-300);
  var e = Math.min(fb.length, cb+300);
  console.log('CONTEXT:', fb.substring(s, e));
}

console.log('\n=== priceModeBar ===');
var pm = fb.indexOf('priceModeBar');
console.log('Found:', pm >= 0 ? 'YES at ' + pm : 'NO');
if (pm >= 0) {
  var s = Math.max(0, pm-300);
  var e = Math.min(fb.length, pm+300);
  console.log('CONTEXT:', fb.substring(s, e));
}

console.log('\n=== Class "container" in function ===');
var cidx = fb.indexOf('class="container"');
var count = 0;
var pos = -1;
while ((pos = fb.indexOf('class="container"', pos+1)) >= 0) count++;
console.log('Count:', count);

console.log('\n=== price-card-filters ===');
var pcf = fb.indexOf('price-card-filters');
console.log('Found:', pcf >= 0 ? 'YES at ' + pcf : 'NO');
if (pcf >= 0) {
  var s = Math.max(0, pcf-500);
  var e = Math.min(fb.length, pcf+500);
  console.log('CONTEXT:', fb.substring(s, e));
}

console.log('\n=== price-card-mode ===');
var pcm = fb.indexOf('price-card-mode');
console.log('Found:', pcm >= 0 ? 'YES at ' + pcm : 'NO');
if (pcm >= 0) {
  var s = Math.max(0, pcm-500);
  var e = Math.min(fb.length, pcm+500);
  console.log('CONTEXT:', fb.substring(s, e));
}

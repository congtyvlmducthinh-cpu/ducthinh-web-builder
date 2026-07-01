var html = require('fs').readFileSync('vi.html', 'utf-8');

// Find applyMarket
var idx = html.indexOf('function applyMarket');
var idx2 = html.indexOf('function setMarket', idx);
console.log('=== applyMarket body (check: NO render call) ===');
var body = html.substring(idx, idx2);
console.log(body);
console.log('\nHas render(): ' + body.includes('render()'));

// Find setMarket
idx = html.indexOf('function setMarket', idx2 + 10);
// Find next function after setMarket
idx2 = html.indexOf('\n\n', idx + 200);
console.log('\n=== setMarket body (check: HAS render call) ===');
var setBody = html.substring(idx, idx2 > idx ? idx2 : idx + 300);
console.log(setBody);
console.log('\nHas render(): ' + setBody.includes('render()'));

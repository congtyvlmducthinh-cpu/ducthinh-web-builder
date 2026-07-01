var vi = require('fs').readFileSync('vi.html', 'utf-8');

// 1. Check pricelist market buttons (inline HTML) - find them
var cn1 = vi.indexOf('id="marketCn"');
var cn2 = vi.indexOf('id="marketOther"');
console.log('=== PRICELIST TAB MARKET BUTTONS ===');
console.log('marketCn context:', vi.substring(Math.max(0,cn1-30), cn1+80));
console.log('marketOther context:', vi.substring(Math.max(0,cn2-30), cn2+80));

// 2. Check calc market buttons  
var cc1 = vi.indexOf('id="calcMarketCn"');
var cc2 = vi.indexOf('id="calcMarketOther"');
console.log('=== CALC TAB MARKET BUTTONS ===');
console.log('calcMarketCn:', vi.substring(cc1, cc1+80));
console.log('calcMarketOther:', vi.substring(cc2, cc2+80));

// 3. Check setCalcMarket function
var fn = vi.indexOf('function setCalcMarket');
var fnEnd = vi.indexOf('function', fn+1);
console.log('=== setCalcMarket FUNCTION ===');
console.log(vi.substring(fn, fnEnd > 0 ? fnEnd : fn+300));

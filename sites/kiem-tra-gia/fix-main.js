var main = require('fs').readFileSync('modules/07-main.js', 'utf-8');
var lines = main.split('\r\n');
// Insert setCalcMarket call after the usdBtn line block (after line 79)
lines.splice(79, 0, '    if (typeof setCalcMarket === "function") setCalcMarket(currentMarket);');
var result = lines.join('\r\n');
require('fs').writeFileSync('modules/07-main.js', result, 'utf-8');
console.log('Inserted setCalcMarket call at line 80');

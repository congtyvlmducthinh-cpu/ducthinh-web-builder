var vi = require('fs').readFileSync('vi.html', 'utf-8');
var idx = vi.indexOf('class="market-group"');
var before = vi.substring(Math.max(0, idx-8000), idx);
var fnPos = before.lastIndexOf('function');
console.log('Nearest function:', vi.substring(fnPos, fnPos+60));
// Find the mlToggleBtn
var mlPos = before.lastIndexOf('mlToggleBtn');
var mlContext = vi.substring(idx-(before.length-mlPos)-50, idx-(before.length-mlPos)+50);
console.log('mlToggleBtn context:', mlContext);
// Find what comes AFTER market-group buttons to understand structure
var after = vi.substring(idx, idx+300);
console.log('After market-group:', after);

var fs = require('fs');
var c = fs.readFileSync('modules/09-quotation.js', 'utf8');

// In getCalcPriceData()
var old = "if (bcode) { for (var i=0;i<DATA_BAGS.length;i++) { if (DATA_BAGS[i].code===bcode) { bagLabel=DATA_BAGS[i].spec; break; } } }";
var newStr = "if (bcode) { for (var i=0;i<DATA_BAGS.length;i++) { if (DATA_BAGS[i].code===bcode && DATA_BAGS[i].spec===bs) { bagLabel=DATA_BAGS[i].spec; break; } } }";
c = c.split(old).join(newStr);

fs.writeFileSync('modules/09-quotation.js', c, 'utf8');
console.log('Done');

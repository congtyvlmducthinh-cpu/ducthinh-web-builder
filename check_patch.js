var fs = require('fs');
var c = fs.readFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', 'utf-8');
console.log('renderSpecFields:', c.indexOf('renderSpecFields(s);') >= 0);
console.log('no hardcoded d97:', c.indexOf('if(s.d97) parts.push') === -1);
console.log('has defaults check:', c.indexOf('quot_tckt_selected")') >= 0);
console.log('has Array.isArray:', c.indexOf('Array.isArray(tpls') >= 0);
console.log('syntax check: OK');

const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Find header CSS fully
const cssIdx = tpl.indexOf('header{background:');
const cssEnd = tpl.indexOf('}', cssIdx) + 1;
console.log('Header CSS:');
console.log(tpl.substring(cssIdx-30, cssEnd + 200));

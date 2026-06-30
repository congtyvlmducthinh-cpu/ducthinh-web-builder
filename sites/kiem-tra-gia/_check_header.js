const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Find header area
const headerIdx = tpl.indexOf('<header');
console.log('=== HEADER HTML ===');
console.log(tpl.substring(headerIdx, headerIdx + 600));

// Find header CSS
const cssIdx = tpl.indexOf('header');
console.log('\n=== HEADER CSS ===');
const css = tpl.substring(cssIdx-50, cssIdx+200);
console.log(css);

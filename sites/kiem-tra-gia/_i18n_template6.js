var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Company address - keep it fixed (company info, same in all langs)
// Actually it IS Vietnamese - ĐC:... but it's the company address which should be the same.
// Let's make it a template var
tpl = tpl.replace(
  '<p class="q-sub">ĐC: KCN NGHIA DAN, XA NGHIA THU, TINH NGHE AN, VIET NAM<br>Email: sales@ducthinh.com - https://ducthinh',
  '<p class="q-sub">{{COMPANY_ADDR}}<br>Email: sales@ducthinh.com - https://ducthinh'
);

// Add new keys to the lang files via the template placeholders
// Also add company name to lang files
var newKeys = [
  'COMPANY_NAME',
  'COMPANY_ADDR',
  'MANAGE_SAVE_SERVER',
  'MANAGE_DRAG_TEXT',
  'MANAGE_DRAG_SUB',
  'Q_VALID_7',
  'Q_VALID_FROM_SIGN'
];

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Done. Size:', tpl.length);

// List all {{KEYS}} in template now  
var keys = tpl.match(/\{\{[A-Z_]+\}\}/g);
var unique = [...new Set(keys)];
console.log('\nAll template keys (' + unique.length + '):');
unique.sort().forEach(function(k) { console.log('  ' + k); });

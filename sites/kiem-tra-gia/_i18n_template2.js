var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Small sub-texts (slightly different from what I assumed)
var subRepls = [
  ['Bảng giá', '{{TAB_PRICE_SUB}}'],
  ['Surcharge', '{{TAB_BAGS_SUB}}'],
  ['Phụ phÃ­', '{{TAB_OTHERS_SUB}}'],
  ['TÃ­nh giÃ¡ thÃ nh', '{{TAB_CALC_SUB}}'],
  ['Upload dữ liệu', '{{TAB_MANAGE_SUB}}'],
];

subRepls.forEach(function(r) {
  var idx = tpl.indexOf(r[0]);
  if (idx >= 0) {
    console.log('Found: [' + r[0] + '] at ' + idx);
    tpl = tpl.replace(r[0], r[1]);
  } else {
    console.log('NOT found: [' + r[0] + ']');
  }
});

// Save button
tpl = tpl.replace('LÆ°u lÃªn server', '{{MANAGE_SAVE_SERVER}}');

// Payment options
tpl = tpl.replace('T/T 30 ngÃ y', '{{Q_PAY_TT}}');
tpl = tpl.replace('L/C 60 ngÃ y', '{{Q_PAY_LC}}');

// Validity options
tpl = tpl.replace('15 ngÃ y', '{{Q_VALID_15}}');
// Be careful not to replace 30 days twice
// The option values already contain 15 ngay and 30 ngay in value attribute
// Let me just check what's there
var idx = tpl.indexOf('30 ngÃ y');
if (idx >= 0) {
  var before = tpl.substring(idx - 30, idx + 20);
  console.log('30 ngay context: [' + before + ']');
}

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Done. Total size: ' + tpl.length);

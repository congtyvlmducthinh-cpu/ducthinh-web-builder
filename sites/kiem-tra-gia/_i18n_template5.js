var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Company name - use partial match
var idx = tpl.indexOf('CONG TY TNHH CONG NGH');
if (idx >= 0) {
  var ctx = tpl.substring(idx, idx + 80);
  console.log('Company name found: [' + ctx + ']');
  tpl = tpl.replace(ctx, '{{COMPANY_NAME}}');
  console.log('Replaced');
}

// Save server button - search differently
var idx2 = tpl.indexOf('Lưu lên');
if (idx2 >= 0) {
  var ctx2 = tpl.substring(idx2 - 5, idx2 + 20);
  console.log('Lưu context: [' + ctx2 + ']');
}

// Check for any remaining Vietnamese in template
var viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;
var lines = tpl.split('\n');
var found = [];
lines.forEach(function(l, i) {
  if (viRegex.test(l) && l.indexOf('{{') < 0 && l.indexOf('<script') < 0 &&
      l.indexOf('content') < 0 && l.indexOf('charset') < 0 && l.indexOf('text-align') < 0 &&
      l.indexOf('.badge.') < 0 && l.indexOf('.lang-switcher') < 0) {
    var clean = l.trim();
    if (clean && clean.length > 5) {
      found.push((i+1) + ': ' + clean.substring(0, 120));
    }
  }
});
console.log('\nRemaining Vietnamese in template:');
found.forEach(function(f) { console.log(f); });

fs.writeFileSync('src/template.html', tpl, 'utf-8');

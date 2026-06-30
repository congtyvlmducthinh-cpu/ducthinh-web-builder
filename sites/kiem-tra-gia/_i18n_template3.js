var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Replace remaining Vietnamese sub-texts
tpl = tpl.replace('Phụ phí', '{{TAB_OTHERS_SUB}}');
tpl = tpl.replace('Tính giá thành', '{{TAB_CALC_SUB}}');

// Check the payment/validity options
var optRe = /<option value="([^"]+)">([^<]+)<\/option>/g;
var match;
while ((match = optRe.exec(tpl)) !== null) {
  if (match[1].indexOf('ngày') >= 0 || match[1].indexOf('T/T') >= 0 || match[1].indexOf('L/C') >= 0) {
    console.log('Option: value="' + match[1] + '" text="' + match[2] + '"');
  }
}

// Find the TT/LC payment options  
var idx = tpl.indexOf('30 ngày');
if (idx >= 0) {
  var ctx = tpl.substring(idx - 40, idx + 30);
  console.log('30 ngày context: [' + ctx + ']');
}

// Find save server button
var idx2 = tpl.indexOf('saveServerBtn');
if (idx2 >= 0) {
  // Find the text before it
  var btn = tpl.substring(idx2 - 200, idx2 + 50);
  console.log('saveServerBtn context: [' + btn + ']');
}

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Done');

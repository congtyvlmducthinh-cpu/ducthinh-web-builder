var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Remaining Vietnamese strings in template
var remaining = [
  // 7 ngày / Kể từ ngày ký
  ['<option value="7 ngày">7 ngày</option>', '<option value="7 ngày">{{Q_VALID_7}}</option>'],
  ['<option value="kể từ ngày ký">Kể từ ngày ký</option>', '<option value="kể từ ngày ký">{{Q_VALID_FROM_SIGN}}</option>'],
  // TT/LC - these are already in English (T/T 30 days, T/T 60 days, L/C at sight)
  // Company name in quotation
  ['CONG TY TNHH CONG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH', '{{COMPANY_NAME}}'],
  // Drag-drop
  ['Kéo thả file vào đây', '{{MANAGE_DRAG_TEXT}}'],
  ['hoặc bấm để chọn', '{{MANAGE_DRAG_SUB}}'],
  // Save button text  
  ['💾 Lưu lên server', '{{MANAGE_SAVE_SERVER}}'],
];

remaining.forEach(function(r) {
  var idx = tpl.indexOf(r[0]);
  if (idx >= 0) {
    tpl = tpl.replace(r[0], r[1]);
    console.log('✓ ' + r[0].substring(0, 40));
  } else {
    console.log('✗ NOT FOUND: ' + r[0].substring(0, 40));
  }
});

// Check: does the payment section have any remaining Vietnamese?
var idx = tpl.indexOf('T/T 30');
if (idx >= 0) {
  var ctx = tpl.substring(idx - 50, idx + 60);
  console.log('T/T 30 context: [' + ctx + ']');
}

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('\nDone. Size: ' + tpl.length);

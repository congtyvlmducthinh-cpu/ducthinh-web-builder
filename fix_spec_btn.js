var fs = require('fs');
var f = 'sites/kiem-tra-gia/modules/13-quotation-tab.js';
var c = fs.readFileSync(f, 'utf-8');
// Add the spec button right before the quot-add-btn
var old = '<button class="quot-add-btn" onclick="quotAddRow()">+ Thêm SP</button>';
var add = '<button class="tckt-spec-btn" onclick="quotSpecPickerOpen()" title="Chọn thông số KT hiển thị">\u{1F6E0}\uFE0F Spec</button>';
c = c.replace(old, add + old);
fs.writeFileSync(f, c, 'utf-8');
console.log('Done - inserted spec button');

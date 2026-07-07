const fs = require('fs');
let en = fs.readFileSync('en.html', 'utf8');

// Check if the old Vietnamese validation texts remain
let checks = [
  'Vui lòng nhập Tên khách hàng',
  'Email người phụ trách không đúng định dạng',
  'Chưa có sản phẩm',
  'Đã copy báo giá',
  'cập nhật'
];

for (let c of checks) {
  let count = (en.match(new RegExp(c, 'g')) || []).length;
  if (count > 0) console.log('STILL HAS:', c, 'x' + count);
  else console.log('OK - removed:', c);
}

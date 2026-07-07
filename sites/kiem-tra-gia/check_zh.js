const fs = require('fs');
let zh = fs.readFileSync('zh.html', 'utf8');
let checks = ['Vui lòng nhập','Email người phụ trách','Chưa có sản phẩm','Đã copy','cập nhật','Ngày báo giá','BÁO GIÁ','Xem báo giá','In báo giá'];
for(let c of checks){
  let n = (zh.match(new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if(n>0) console.log('STILL HAS:', c, 'x' + n);
  else console.log('OK:', c);
}

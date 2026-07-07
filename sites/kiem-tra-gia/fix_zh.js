const fs = require('fs');
let zh = fs.readFileSync('zh.html', 'utf8');

// Remaining Vietnamese texts
zh = zh.replace('Vui lòng nhập mật khẩu quản trị để tiếp tục.', '请输入管理员密码继续。');
zh = zh.replace('Vui lòng nhập Freight USD ở thanh công cụ bên trên.', '请输入上方工具栏中的运费美元值。');
zh = zh.replace('Vui lòng nhập tên template!', '请输入模板名称!');

// Email người phụ trách
zh = zh.replace(/Email người phụ trách/g, '负责人邮箱');

// cập nhật
zh = zh.replace('cập nhật', '已更新');

// Ngày báo giá (should be 日 already)
zh = zh.replace('Ngày báo giá:', '日期:');

fs.writeFileSync('zh.html', zh, 'utf8');
console.log('Done.');

// Final check
let checks = ['Vui lòng nhập','Email người phụ trách','cập nhật','Ngày báo giá'];
for(let c of checks){
  let n = (zh.match(new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if(n>0) console.log('STILL HAS:', c, 'x' + n);
  else console.log('OK:', c);
}

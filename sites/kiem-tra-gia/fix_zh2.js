const fs = require('fs');
let zh = fs.readFileSync('zh.html', 'utf8');

// Remaining
zh = zh.replace('Vui lòng nhập Freight USD ở thanh công cụ bên trên.', '请输入上方工具栏中的运费美元值。');
zh = zh.split('Ngày báo giá').join('日期');
zh = zh.split('thống kê').join('统计');

fs.writeFileSync('zh.html', zh, 'utf8');
console.log('Done.');

let checks = ['Vui lòng nhập','thống kê','Ngày báo giá'];
for(let c of checks){
  let n = (zh.match(new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if(n>0) console.log('STILL HAS:', c, 'x' + n);
  else console.log('OK:', c);
}

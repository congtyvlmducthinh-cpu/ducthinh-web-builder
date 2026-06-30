var fs = require('fs');
var zh = fs.readFileSync('zh.html', 'utf-8');

// Count all remaining Vietnamese strings
var checks = [
  'Giá bán (EXW)',
  'Giá bán tối thiểu',
  'Sản phẩm',
  'Tiêu chuẩn',
  'Kích thước',
  'Ngày',
  'Máy',
  'Giá bao gồm bao bì',
  'EXW chưa bao bì',
  'Hoa hồng',
  'Giá vốn',
  'Thông tin',
  'Mã',
  'Lợi nhuận',
  'Tổng loại bao',
  'Quy cách khác',
  'Tổng quy cách',
  'Khách hàng',
  'Người liên hệ',
  'Người phụ trách',
  'Giá bán:',
  'Giá:',
  'Giá',
  'Số lượng'
];

checks.forEach(function(s) {
  var re = new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  var matches = zh.match(re);
  if (matches) {
    console.log('[' + s + '] x' + matches.length + ' ✓ STILL VIETNAMESE');
  }
});

// Check how many "Giá" occurrences remain  
var allGia = zh.match(/Giá[^a-z]/g);
console.log('\nTotal "Giá" remaining (non-translated):', allGia ? allGia.length : 0);

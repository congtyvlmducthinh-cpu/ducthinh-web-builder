var fs = require('fs');
var zh = fs.readFileSync('zh.html', 'utf-8');

// Check remaining Vietnamese strings
var viKeys = [
  'Giá bán (EXW)', 'Giá bán tối thiểu', 'Sản phẩm', 'Tiêu chuẩn',
  'Kích thước', 'Ngày', 'Máy', 'Giá bao gồm bao bì', 'EXW chưa bao bì',
  'Hoa hồng', 'Giá vốn', 'Thông tin', 'Mã', 'Lợi nhuận',
  'Tổng loại bao', 'Quy cách khác', 'Tổng quy cách', 'Khách hàng',
  'Người liên hệ', 'Người phụ trách', 'Giá', 'Số lượng', 'Quy cách',
  'Giá bán', 'SL', 'Chọn sản phẩm', 'Ngày:', 'Cảng đi:',
  'STT', 'Tên sản phẩm', 'Quy cách bao', 'ĐVT', 'Tiền tệ',
  'Điều kiện:', 'Hiệu lực:', 'Thanh toán:', 'Ghi chú:',
  '- Giá không bao gồm thuế VAT', 'Hoa hồng cơ bản',
  'Giá chưa bao gồm chi phí vận chuyển', 'Giá đã bao gồm chi phí vận chuyển',
  '🚛 Phí FOB / tấn', '❌ Lỗi: ', '— Chọn máy —',
  '— Chọn tiêu chuẩn —', '— Chọn sản phẩm —', '— Không chọn —',
  'Hoa hồng (VND)', 'Hoa hồng (USD)', 'Tại kho nhà máy Đức Thịnh',
  'Chọn sản phẩm và tính giá trước khi lên báo giá',
  'Giá chưa bao gồm chi phí vận chuyển đến kho người mua',
  'Giá đã bao gồm chi phí vận chuyển đến kho người mua',
  '- Giá không bao gồm thuế VAT'
];

var found = false;
viKeys.forEach(function(k) {
  var count = 0;
  var pos = 0;
  while ((pos = zh.indexOf(k, pos)) !== -1) { count++; pos++; }
  if (count > 0) {
    console.log('[' + k + '] x' + count + ' ✓');
    found = true;
  }
});

if (!found) console.log('✅ Nothing! All Vietnamese replaced!');

// Count Chinese chars
var zhChars = (zh.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
console.log('\nChinese chars in zh.html:', zhChars);

var fs = require('fs');
var zh = fs.readFileSync('zh.html', 'utf-8');

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
  '- Giá không bao gồm thuế VAT',
  'C.nhất 25KG', 'C.nhất Jumbo', 'C.nhất EXW',
  'EXW 25KG bao tiêu chuẩn', 'EXW jumbo bao tiêu chuẩn',
  '— Tự động —', '— Tự động (theo quy cách bao) —', '— Không chọn bao bì —',
  '📏 Quy cách bao', '🛍️ Loại bao', '⚖️ Số tấn / bao Jumbo',
  '📋 Loại quy cách', 'Kết quả tính giá', '📡 Tra cước', '💱 Loại tiền:',
  'Chọn sản phẩm và bao bì để bắt đầu', 'Chọn sản phẩm trước',
  '👈 Vui lòng chọn sản phẩm', '❌ Không tìm thấy sản phẩm',
  '📦 Sản phẩm', '⚙️ Máy / Tiêu chuẩn', '📐 Kích thước',
  '🏷️ Tổng giá thành (', '💰 Giá bán', '📄 Lên báo giá',
  '❌ Chỉ hỗ trợ file Excel (.xlsx)', '⏳ Đang xử lý file...',
  '✅ Đã cập nhật ', ' bảng dữ liệu!', '⏳ Đang lưu...',
  '✅ Đã lưu lên server! Tải lại en.html, zh.html để thấy dữ liệu mới.',
  '❌ Không thể kết nối server!', ' tuyến',
  'Mã: ', ' | Số: ', 'Khách hàng', 'Người liên hệ', 'Người phụ trách',
  'Spec', 'Cỡ hạt', 'Máy chạy', 'Hoa hồng (VND)', 'Hoa hồng(VND)',
  'Hoa hồng (USD)', 'Hoa hồng(USD)', 'Mã SP', 'Mã sản phẩm',
  ' có bao bì', '🚛 Phí FOB / tấn', '🚢 Freight / tấn',
  'Chênh lệch (30%)', 'Tổng giá vốn', 'Tổng hoa hồng',
  'Tiêu chuẩn ', 'Thông tin bao bì', 'Mã bao'
];

var found = false;
viKeys.forEach(function(k) {
  var count = 0;
  var pos = 0;
  while ((pos = zh.indexOf(k, pos)) !== -1) { count++; pos++; }
  if (count > 0) {
    console.log('[' + k + '] x' + count);
    found = true;
  }
});

if (!found) console.log('✅ ALL CLEAR!');
else console.log('\n❌ Some Vietnamese remain - see above');

var zhChars = (zh.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
console.log('\nChinese chars:', zhChars);

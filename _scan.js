const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Find all Vietnamese text patterns in JS that might need translation
const patterns = [
  'Mã bao', 'Quy cách', 'Số lượng', 'Giá vốn', 'Giá bán', 'Lợi nhuận',
  'Tổng loại bao', 'Bao 25KG', 'Bao Jumbo',
  'Quy cách khác', 'Tổng quy cách',
  'Thông tin', 'Max tải', 'Giá bao gồm bao bì',
  'Sản phẩm', 'Tiêu chuẩn', 'Máy', 'Ngày',
  'Kết quả tính giá', 'Vui lòng chọn sản phẩm', 'Giá vốn (EXW)', 'Phụ phí',
  'Khách hàng:', 'Người liên hệ:', 'Người phụ trách:',
  'Sản phẩm:', 'Quy cách bao:', 'Số lượng:', 'Hiệu lực:', 'Thanh toán:', 'Cảng đi:',
  'BÁO GIÁ', 'Hiện max tải', 'Ẩn max tải'
];

// Check where each pattern appears (only in JS, not in data-lang)
for (const p of patterns) {
  let idx = h.indexOf(p);
  if (idx > -1) {
    // Get context
    let ctx = h.substring(Math.max(0, idx - 30), idx + p.length + 30);
    let isDataLang = h.substring(idx - 20, idx).indexOf('data-lang') > -1;
    console.log(`FOUND: "${p}" at ${idx} [in data-lang? ${isDataLang}]`);
    console.log(`  CTX: ${ctx.replace(/\n/g, '\\n')}`);
    console.log();
  }
}

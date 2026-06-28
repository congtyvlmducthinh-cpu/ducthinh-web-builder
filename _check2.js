const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Check what the actual strings look like in updateQuotationPreview
var idx = h.indexOf('function updateQuotationPreview()');
var end = h.indexOf('// ====== COPY QUOTATION', idx);
var content = h.substring(idx, end + 1);

// Show each Vietnamese string found
var lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  var line = lines[i];
  // Check for Vietnamese text patterns
  if (
    line.indexOf('BÁO GIÁ') > -1 ||
    line.indexOf('Khách hàng') > -1 ||
    line.indexOf('Người liên hệ') > -1 ||
    line.indexOf('Người phụ trách') > -1 ||
    line.indexOf('Ngày') > -1 ||
    line.indexOf('Cảng đi') > -1 ||
    line.indexOf('Điều kiện') > -1 ||
    line.indexOf('Hiệu lực') > -1 ||
    line.indexOf('Thanh toán') > -1 ||
    line.indexOf('Ghi chú') > -1 ||
    line.indexOf('Tấn') > -1 ||
    line.indexOf('Tên sản phẩm') > -1 ||
    line.indexOf('Chọn sản phẩm') > -1
  ) {
    console.log(`Line ${i}: ${line.trim()}`);
  }
}

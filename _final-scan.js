const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Full scan for Vietnamese text in JS render functions (not in data-lang or LANG_MAP)
// Look for all problematic patterns
var vietnamesePatterns = [
  'BÁO GIÁ', 'Khách hàng', 'Người liên hệ', 'Người phụ trách',
  'Cảng đi', 'Điều kiện', 'Hiệu lực', 'Thanh toán', 'Ghi chú',
  'Ngày:', 'Tấn', 'Chọn sản phẩm', 'Giá vốn', 'Giá bán',
  'Lợi nhuận', 'Mã bao', 'Quy cách', 'Số lượng',
  'Tổng loại bao', 'Bao 25KG', 'Bao Jumbo', 'Tổng quy cách',
  'Thông tin', 'Max tải', 'Giá bao gồm bao bì', 'Sản phẩm',
  'Tiêu chuẩn', 'Máy', 'Kết quả tính giá', 'Vui lòng',
  'Phụ phí', 'Hiện max tải', 'Ẩn max tải', 'Tên sản phẩm'
];

// Skip: data-lang strings, LANG_MAP values, comments
var problems = [];
for (var p of vietnamesePatterns) {
  var idx = 0;
  while ((idx = h.indexOf(p, idx)) > -1) {
    // Check context: is this in data-lang, LANG_MAP, or CSS?
    var before = h.substring(Math.max(0, idx - 30), idx);
    var after = h.substring(idx + p.length, idx + p.length + 40);
    
    // Skip if in data-lang attribute or LANG_MAP
    if (before.indexOf('data-lang') > -1 && idx - before.indexOf('data-lang') < 20) {
      idx++; continue;
    }
    // Check if in LANG_MAP value (after ":)
    var beforeColon = before.lastIndexOf(':') < before.lastIndexOf(',') ? before.lastIndexOf(',') : before.lastIndexOf(':');
    if (beforeColon > -1 && idx - beforeColon < 5) {
      idx++; continue;
    }
    // Skip CSS
    if (before.indexOf('{') > -1) { idx++; continue; }
    
    var ctx = (before + p + after).replace(/\n/g, ' ').trim();
    problems.push(ctx.substring(0, 100));
    idx++;
  }
}

if (problems.length === 0) {
  console.log('✅ No untranslated Vietnamese text found!');
} else {
  console.log('❌ Found ' + problems.length + ' potential issues:');
  for (var x of problems) console.log('  ' + x);
}

// Finally, generate a small test HTML to check for syntax errors
// We can use Node's syntax checker on the JS portion
// Extract JS between <script> tags
var jsStart = h.indexOf('<script>');
var jsEnd = h.lastIndexOf('</script>');
var js = h.substring(jsStart + 8, jsEnd);

try {
  new Function(js);
  console.log('✅ JavaScript parses without syntax errors');
} catch (e) {
  console.log('❌ JavaScript syntax error:', e.message);
  // Find line number
  var match = e.message.match(/line (\d+)/);
  if (match) {
    var lineNum = parseInt(match[1]);
    var lines = js.split('\n');
    for (var i = Math.max(0, lineNum - 3); i < Math.min(lines.length, lineNum + 2); i++) {
      console.log(`  L${i+1}: ${lines[i].substring(0, 120)}`);
    }
  }
}

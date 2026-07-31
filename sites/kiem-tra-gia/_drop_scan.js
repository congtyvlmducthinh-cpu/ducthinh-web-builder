const fs = require('fs');

const PATTERNS = [
  'Chọn', 'chọn', 'Điểm giao', 'điểm giao', 'Điểm nhận', 'điểm nhận',
  'điểm đến', 'Điểm đến', 'điểm đi', 'Điểm đi', 'Chọn máy', 'Chọn điểm',
  'Chọn tỉnh', 'Chọn kho', 'Chọn loại', 'Chọn sản phẩm', 'Chọn tiêu chuẩn',
  'Chọn kích thước', 'Chọn bao bì', 'Chọn khách hàng', 'Chọn hàng',
  'Tỉnh/TP', 'tỉnh/thành', 'Kho hàng', 'kho hàng', 'Bến', 'bến',
  'Nhà máy', 'nhà máy', 'Nhà cung cấp', 'nhà cung cấp', 'Khách hàng', 'khách hàng'
];

function scan(file) {
  const s = fs.readFileSync(file, 'utf8');
  const lines = s.split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    for (const p of PATTERNS) {
      if (l.indexOf(p) >= 0) {
        hits.push({ line: i + 1, pat: p, text: l.trim().substring(0, 180) });
        break;
      }
    }
  });
  return hits;
}

for (const f of ['sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html']) {
  console.log('########## ' + f + ' ##########');
  const hits = scan(f);
  console.log(hits.length + ' hits');
  hits.forEach(h => console.log('  L' + h.line + ' [' + h.pat + '] ' + h.text));
}

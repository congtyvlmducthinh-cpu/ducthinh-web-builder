const fs = require('fs');
const files = ['sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html'];

// Patterns to count (raw source text as it appears in the files)
const patterns = {
  'toggle Hiện logic': "indexOf('Hi\\u1ec7n')",
  'toggle show text': "\\ud83d\\udccb Hi\\u1ec7n max t\\u1ea3i",
  'toggle hide text': "\\ud83d\\udccb \\u1ea8n max t\\u1ea3i",
  'dom tonnage label': 'S\\u1ed1 tons',
  'no packaging': 'Kh\\u00f4ng ch\\u1ecdn bao b\\u00ec',
  'select machine': 'Ch\\u1ecdn m\\u00e1y',
  'select standard': 'Ch\\u1ecdn ti\\u00eau chu\\u1ea9n',
  'select size': 'Ch\\u1ecdn k\\u00edch th\\u01b0\\u1edbc',
  'select product': 'Ch\\u1ecdn s\\u1ea3n ph\\u1ea9m',
  'select delivery': 'Ch\\u1ecdn \\u0111i\\u1ec3m giao',
  'warn choose prod+delivery': 'Ch\\u1ecdn s\\u1ea3n ph\\u1ea9m v\\u00e0 \\u0111i\\u1ec3m giao h\\u00e0ng',
  'warn jumbo': 'Vui l\\u00f2ng ch\\u1ecdn',
  'warn maxload': 'ch\\u01b0a c\\u00f3 max loading',
  'result Sản phẩm': 'S\\u1ea3n ph\\u1ea9m</span>',
  'result Quy cách': 'Quy c\\u00e1ch</span>',
  'result Bao bì': 'Bao b\\u00ec</span>',
  'result Quy cách khác': 'Quy c\\u00e1ch kh\\u00e1c</span>',
  'result Điểm giao': '\\u0110i\\u1ec3m giao</span>',
  'result Cước chuyến': 'C\\u01b0\\u1edbc chuy\\u1ebfn</span>',
  'result Cước phân bổ': 'C\\u01b0\\u1edbc ph\\u00e2n b\\u1ed5</span>',
  'result Giá vốn chưa VAT': 'Gi\\u00e1 v\\u1ed1n (ch\\u01b0a VAT)',
  'result Giá vốn có VAT': 'Gi\\u00e1 v\\u1ed1n (c\\u00f3 VAT',
  'result Giá bán': 'Gi\\u00e1 b\\u00e1n</span>',
  'result Lợi nhuận': 'L\\u1ee3i nhu\\u1eadn</span>',
  'result Hoa hồng cơ bản': 'Hoa h\\u1ed3ng c\\u01a1 b\\u1ea3n</span>',
  'result Chênh lệch': 'Ch\\u00eanh l\\u1ec7ch (20%)',
  'result Tổng hoa hồng': 'T\\u1ed5ng hoa h\\u1ed3ng</span>',
  'formula line': 'C\\u00f4ng th\\u1ee9c: EXW',
  'export rows header': 'K\\u00edch th\\u01b0\\u1edbc',
  'manage error': 'Sai m\\u1eadt kh\\u1ea9u!',
  'đ/tấn': '\\u0111/t\\u1ea5n',
  "' tấn": "' t\\u1ea5n",
};

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  console.log('===== ' + f + ' =====');
  for (const [name, pat] of Object.entries(patterns)) {
    let n = 0, idx = 0;
    while ((idx = s.indexOf(pat, idx)) >= 0) { n++; idx += pat.length; }
    if (n > 0) console.log('  ' + name + ': ' + n);
  }
}

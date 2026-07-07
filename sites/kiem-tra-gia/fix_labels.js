const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Change 1: Email KH -> Email người phụ trách (form label)
c = c.replace('<label>📧 Email KH</label>', '<label>📧 Email người phụ trách</label>');

// Change 2: Ngày -> Ngày báo giá in summary cards
c = c.replace('<div class="lbl">Ngày</div>', '<div class="lbl">Ngày báo giá</div>');

// Change 3: Ngày: -> Ngày báo giá: in preview HTML
c = c.replace('<strong>Ngày:</strong>', '<strong>Ngày báo giá:</strong>');

// Change 4: Ngày: -> Ngày báo giá: in text copy
c = c.replace('"Ngày: "', '"Ngày báo giá: "');

// Also check for document.write Ngày:
c = c.replace('<strong>Ngày:</strong>', '<strong>Ngày báo giá:</strong>');

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
let countEmailKH = (c.match(/Email KH/g) || []).length;
let countNgayLbl = (c.match(/class="lbl">Ngày<\/div>/g) || []).length;
let countNgayBaoGia = (c.match(/Ngày báo giá/g) || []).length;
console.log('Remaining Email KH:', countEmailKH);
console.log('Remaining Ngày (lbl):', countNgayLbl);
console.log('Ngày báo giá count:', countNgayBaoGia);

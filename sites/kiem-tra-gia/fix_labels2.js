const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Remaining Ngày (one summary-card lbl in the second table)
// Find: class="lbl">Ngày</div>
c = c.replace('<div class="lbl">Ngày</div>', '<div class="lbl">Ngày báo giá</div>');

// The document.write one
c = c.replace('<strong>Ngày:</strong>', '<strong>Ngày báo giá:</strong>');

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');
let cnt = (c.match(/Ngày báo giá/g) || []).length;
console.log('Ngày báo giá count:', cnt);
let remaining = (c.match(/"[Nn]gày[:\"]/g) || []);
console.log('Remaining Ngày variants:', remaining.length);

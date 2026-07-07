const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Find the header area and clean it up properly
let headerStart = c.indexOf('<header');
let headerEnd = c.indexOf('</header>');

let header = c.substring(headerStart, headerEnd + 9);

// Replace the problematic header with clean version
let cleanHeader = '<header>\n<div>\n<h1>Kiểm Tra Giá <span>🔍</span></h1>\n<div class="sub" style="margin-top:6px;font-size:13px;opacity:.8;">Vật Liệu Mới Đức Thịnh - Bảng giá tháng 06/2026</div>\n</div>\n<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">\n<div class="lang-switcher"><a href="vi.html" class=" active">VI</a><a href="en.html" class="">EN</a><a href="zh.html" class="">ZH</a></div>\n</div>\n</header>';

c = c.replace(header, cleanHeader);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
let newHeader = c.substring(c.indexOf('<header'), c.indexOf('</header>') + 9);
console.log('=== CLEAN HEADER ===');
console.log(newHeader);

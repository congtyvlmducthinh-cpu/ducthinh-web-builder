const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Remove both badge spans from header
// Pattern: <span class="badge">🏭 VL MỚI ĐỨC THỊNH</span><span class="badge" id="dataInfo">📊 55 SP · 20 BB · 8 QC · 19 APP</span>

c = c.replace(
  '<span class="badge">🏭 VL MỚI ĐỨC THỊNH</span><span class="badge" id="dataInfo">📊 55 SP · 20 BB · 8 QC · 19 APP</span>',
  ''
);

// Also handle the case where dataInfo has dynamic content 
c = c.replace(
  '<span class="badge">🏭 VL MỚI ĐỨC THỊNH</span>',
  ''
);

c = c.replace(
  '<span class="badge" id="dataInfo">',
  ''
);

// Find the closing tag of dataInfo and remove it too
let idx = c.indexOf('id="dataInfo"');
if (idx >= 0) {
  let closeSpan = c.indexOf('</span>', idx);
  if (closeSpan >= 0) {
    let startSpan = c.lastIndexOf('<span', idx);
    if (startSpan >= 0) {
      c = c.substring(0, startSpan) + c.substring(closeSpan + 7);
    }
  }
}

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

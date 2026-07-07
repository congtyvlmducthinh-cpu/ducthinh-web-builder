const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Find the header area more precisely - look for flex-wrap:wrap which is near the badges
let idx = c.indexOf('align-items:center;flex-wrap:wrap');
if (idx >= 0) {
  // Find the containing header div and remove badges from it
  let start = c.indexOf('class="sub"', idx - 200);
  if (start < 0) start = idx;
}

// Remove both badges cleanly - match the exact header HTML
// The pattern is: <span class="badge">🏭 VL MỚI ĐỨC THỊNH</span><span class="badge" id="dataInfo">📊 ... </span>
// After our first fix, it left: <span class="badge">🏭 VL MỚI ĐỨC THỊNH</span>📊 0 SP</span>

// Let's just clean up by finding and removing all badge-related spans in header
// Find the header container
let headerStart = c.indexOf('<header');
let headerEnd = c.indexOf('</header>');

if (headerStart >= 0 && headerEnd > headerStart) {
  let headerContent = c.substring(headerStart, headerEnd + 9);
  
  // Remove all <span class="badge">...</span> from header
  headerContent = headerContent.replace(/<span class="badge"[^>]*>[\s\S]*?<\/span>/g, '');
  
  c = c.substring(0, headerStart) + headerContent + c.substring(headerEnd + 9);
}

// Clean up any remaining bare text from dataInfo
c = c.replace(/📊 \d+ SP · \d+ BB · \d+ QC · \d+ APP/g, '');

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
let remaining = c.match(/class="badge"/g);
console.log('Remaining badge spans:', remaining ? remaining.length : 0);

const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Show area around header to verify
let headerStart = c.indexOf('<header');
let headerEnd = c.indexOf('</header>');
console.log('=== HEADER CONTENT ===');
console.log(c.substring(headerStart, Math.min(headerEnd+20, headerStart+500)));
console.log('=== END HEADER ===');

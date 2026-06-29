const fs = require('fs');
const s = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/sites/kiem-tra-gia/vi.html', 'utf-8');
const htmlPart = s.substring(0, 27028);
console.log('Has lucide:', htmlPart.includes('lucide'));
console.log('Has tailwind:', htmlPart.includes('tailwind'));
console.log('Has xlsx:', s.includes('xlsx'));
console.log('Has /static/', htmlPart.includes('/static/'));

// Find all script src in HTML part
const scriptRe = /<script[^>]*src="([^"]*)"/g;
let m;
let i = 0;
while ((m = scriptRe.exec(htmlPart)) !== null) {
  console.log('Script ' + (i++) + ': ' + m[1]);
}

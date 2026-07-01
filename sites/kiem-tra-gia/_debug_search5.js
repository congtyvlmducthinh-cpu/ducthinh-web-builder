const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Find the actual render function
const idx = js.indexOf('// ====== MAIN RENDER ======');
console.log('=== render() function ===');
console.log(js.substring(idx, idx + 3000));

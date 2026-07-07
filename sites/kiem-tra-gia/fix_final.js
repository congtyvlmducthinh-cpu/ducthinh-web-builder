const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Replace ALL remaining "<strong>Email:</strong>" -> use split/join for global
c = c.split('<strong>Email:</strong>').join('<strong>Email người phụ trách:</strong>');

// Also check the q-row pattern
c = c.split('"Email: "').join('"Email người phụ trách: "');

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done. Count:', (c.match(/Email người phụ trách/g)||[]).length);
console.log('Old Email: (should be 0):', (c.match(/<strong>Email:<\/strong>/g)||[]).length);

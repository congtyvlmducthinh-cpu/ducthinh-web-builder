const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Clean up the leftover "📊 0 SP</span>" from header
// Find it and remove
c = c.replace('📊 0 SP</span>', '');

// Also clean up any leftover dangling </span>
// Check if there's a mismatched </span> in header
let headerStart = c.indexOf('<header');
let headerEnd = c.indexOf('</header>');
let headerContent = c.substring(headerStart, headerEnd);
let openSpans = (headerContent.match(/<span/g) || []).length;
let closeSpans = (headerContent.match(/<\/span>/g) || []).length;
console.log('Header span balance:', openSpans, 'open,', closeSpans, 'close');

if (closeSpans > openSpans) {
  // Remove extra closing spans from header
  let diff = closeSpans - openSpans;
  for(let i = 0; i < diff; i++) {
    c = c.replace('</span>', '');
  }
}

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Final check
headerContent = c.substring(c.indexOf('<header'), c.indexOf('</header>'));
console.log('Header:', headerContent);

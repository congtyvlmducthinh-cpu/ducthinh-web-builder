const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Add var hasProd = false; before the for loop in quotPrint
let target = `  }

  for (var i = 0; i < QUOT_CART.length; i++) { if (QUOT_CART[i].product) { hasProd = true;`;  

let replacement = `  }
  var hasProd = false;
  for (var i = 0; i < QUOT_CART.length; i++) { if (QUOT_CART[i].product) { hasProd = true;`;

c = c.replace(target, replacement);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Final verification of all 3 functions
let idx = c.indexOf('function quotPreviewOpen()');
console.log('=== quotPreviewOpen ===');
console.log(c.substring(idx, idx+500));
idx = c.indexOf('function quotPrint()');
console.log('=== quotPrint ===');
console.log(c.substring(idx, idx+800));
idx = c.indexOf('function quotCopy()');
console.log('=== quotCopy ===');
console.log(c.substring(idx, idx+500));

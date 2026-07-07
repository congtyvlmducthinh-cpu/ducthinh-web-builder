const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Add var hasProd = false; after the validation block in quotPrint
// The pattern is: the closing of email regex block followed by whitespace then for loop
let target = `      return;
    }
  }

  for (var i = 0; i < QUOT_CART`;
  
let replacement = `      return;
    }
  }
  var hasProd = false;
  for (var i = 0; i < QUOT_CART`;

c = c.replace(target, replacement);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Also verify the _generateQuotPreviewHtml function - that's what the preview popup uses
let idx = c.indexOf('_generateQuotPreviewHtml');
if (idx >= 0) {
  // Check if it has "Email:" or "Email người phụ trách:"
  let func = c.substring(idx, idx + 2000);
  let emailStrong = func.indexOf('Email:</strong>');
  let emailNew = func.indexOf('Email người phụ trách:</strong>');
  console.log('_generateQuotPreviewHtml has old Email:</strong>:', emailStrong >= 0);
  console.log('_generateQuotPreviewHtml has new Email người phụ trách:</strong>:', emailNew >= 0);
}

// Check Emails in the template for _generateQuotPreviewHtml (the generated HTML preview)
let i1 = c.indexOf('q-row"><strong>Email người phụ trách');
let i2 = c.indexOf('q-row"><strong>Email:</strong>');
console.log('Email người phụ trách in q-row:', i1 >= 0);
console.log('Email: in q-row (should be 0):', i2 >= 0);
console.log('Ngày báo giá count:', (c.match(/Ngày báo giá/g) || []).length);
console.log('Email người phụ trách count:', (c.match(/Email người phụ trách/g) || []).length);

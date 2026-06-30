var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Search for all texts that should have been replaced with {{Q_PREVIEW_EMPTY}} but weren't
// The Vietnamese text "Chọn sản phẩm và tính giá trước khi lên báo giá" exists in template
// But it was also supposed to be a placeholder {{Q_PREVIEW_EMPTY}}
// However from the build.js STEP 1, it replaces {{KEY}} in template, but the template still has the raw Vietnamese text

// The issue: "Chọn sản phẩm và tính giá trước khi lên báo giá" is in BOTH:
// 1. The template HTML (as <p>text</p>)
// 2. The JS modules (as 'text')

// For #1, it should have been replaced with {{Q_PREVIEW_EMPTY}} but it wasn't
// Let's fix the template

// Replace the HTML text with the placeholder
tpl = tpl.replace('Chọn sản phẩm và tính giá trước khi lên báo giá', '{{Q_PREVIEW_EMPTY}}');
fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Fixed template: replaced Vietnamese text with {{Q_PREVIEW_EMPTY}}');

// Verify
var tpl2 = fs.readFileSync('src/template.html', 'utf-8');
console.log('Q_PREVIEW_EMPTY in template now:', tpl2.indexOf('Q_PREVIEW_EMPTY') >= 0);

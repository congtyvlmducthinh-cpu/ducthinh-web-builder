var fs = require('fs');

// The issue is: "Chọn sản phẩm và tính giá trước khi lên báo giá" comes from the template
// It was NOT replaced by {{Q_PREVIEW_EMPTY}} because let me check why

// Check template.html for Q_PREVIEW_EMPTY
var tpl = fs.readFileSync('src/template.html', 'utf-8');
var idx = tpl.indexOf('Q_PREVIEW_EMPTY');
console.log('Q_PREVIEW_EMPTY in template:', idx >= 0);
if (idx >= 0) {
  console.log('Context:', tpl.substring(idx-20, idx+40));
}

// Check if the Vietnamese text is in the template  
var viIdx = tpl.indexOf('Chọn sản phẩm và tính giá trước khi lên báo giá');
console.log('Vietnamese text in template:', viIdx >= 0);
if (viIdx >= 0) {
  console.log('Context:', tpl.substring(viIdx-20, viIdx+50));
}

// Check the zh lang file
var zhLang = fs.readFileSync('src/lang/zh.js', 'utf-8');
var qpIdx = zhLang.indexOf('Q_PREVIEW_EMPTY');
console.log('\nQ_PREVIEW_EMPTY in zh lang:', zhLang.substring(qpIdx, qpIdx+80));

// Check build.js - STEP 1 replacement
var build = fs.readFileSync('build.js', 'utf-8');
var step1 = build.indexOf("// STEP 1");
console.log('\nSTEP 1 code:');
console.log(build.substring(step1, step1 + 300));

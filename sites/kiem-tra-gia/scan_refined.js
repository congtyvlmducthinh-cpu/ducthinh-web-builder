const fs = require('fs');

const vi = fs.readFileSync('vi.html', 'utf8');
const en = fs.readFileSync('en.html', 'utf8');
const zh = fs.readFileSync('zh.html', 'utf8');

// Helper: extract text between > and < in HTML tags (visible UI text)
function extractVisibleTexts(html) {
  let texts = [];
  let matches = html.match(/>([^<]{2,})</g) || [];
  for (let m of matches) {
    let t = m.slice(1, -1).trim();
    if (t && t.length >= 2) texts.push(t);
  }
  return texts;
}

// Helper: extract strings from JS ('...', "...", `...`)
function extractJSStrings(html) {
  let texts = [];
  let matches = html.match(/['"`]([^'"`]{2,})['"`]/g) || [];
  for (let m of matches) {
    let t = m.slice(1, -1);
    if (t && t.length >= 2 && t.length < 150) texts.push(t);
  }
  return texts;
}

// Vietnamese diacritic test
const vnChars = /[àáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđĐ]/;

function hasVN(t) { return vnChars.test(t); }

// === STEP 1: Extract all VI strings from visible HTML ===
let viHTMLtexts = [...new Set(extractVisibleTexts(vi).filter(t => hasVN(t) && t.length >= 3))];

// === STEP 2: Extract all VI strings from JS in vi.html ===
let viJStexts = [...new Set(extractJSStrings(vi).filter(t => hasVN(t) && t.length >= 3 && !/^[A-Z0-9\s\/\-.,:;()]+$/.test(t)))];

// === STEP 3: Check which still exist in en.html and zh.html ===
console.log('=== UNTRANSLATED HTML TEXT in en.html ===');
let enUntranslatedHTML = [];
for (let s of viHTMLtexts) {
  if (en.includes(s)) {
    enUntranslatedHTML.push(s);
  }
}
console.log('Count:', enUntranslatedHTML.length);
enUntranslatedHTML.forEach(s => console.log('  ' + s));

console.log('\n=== UNTRANSLATED HTML TEXT in zh.html ===');
let zhUntranslatedHTML = [];
for (let s of viHTMLtexts) {
  if (zh.includes(s)) {
    zhUntranslatedHTML.push(s);
  }
}
console.log('Count:', zhUntranslatedHTML.length);
zhUntranslatedHTML.forEach(s => console.log('  ' + s));

console.log('\n=== UNTRANSLATED JS STRINGS in en.html ===');
let enUntranslatedJS = [];
for (let s of viJStexts) {
  if (en.includes(s)) {
    enUntranslatedJS.push(s);
  }
}
console.log('Count:', enUntranslatedJS.length);
// Group by category
let categories = {
  'Form/Labels': [],
  'Price terms': [],
  'Product attributes': [],
  'Placeholders': [],
  'Errors/Alerts': [],
  'Other': []
};
for (let s of enUntranslatedJS) {
  if (s.includes('Chọn') || s.includes('Tất cả') || s.includes('Không chọn') || s.includes('Tự động'))
    categories['Placeholders'].push(s);
  else if (s.includes('Giá') || s.includes('bao bì') || s.includes('Hoa hồng') || s.includes('EXW') || s.includes('FOB') || s.includes('CIF') || s.includes('VND') || s.includes('USD') || s.includes('Lợi nhuận') || s.includes('Giá vốn'))
    categories['Price terms'].push(s);
  else if (s.includes('Kích thước') || s.includes('Tiêu chuẩn') || s.includes('Máy') || s.includes('Quy cách') || s.includes('Số tấn') || s.includes('Bao bì') || s.includes('Ứng dụng') || s.includes('Mã SP') || s.includes('Loại'))
    categories['Product attributes'].push(s);
  else if (s.includes('Vui lòng') || s.includes('Sai mật khẩu') || s.includes('lỗi') || s.includes('Lỗi') || s.includes('⚠'))
    categories['Errors/Alerts'].push(s);
  else
    categories['Other'].push(s);
}

for (let [cat, items] of Object.entries(categories)) {
  if (items.length > 0) {
    console.log('\n  [' + cat + ']');
    for (let s of items) console.log('    ' + s);
  }
}

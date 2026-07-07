const fs = require('fs');

const vi = fs.readFileSync('vi.html', 'utf8');
const en = fs.readFileSync('en.html', 'utf8');
const zh = fs.readFileSync('zh.html', 'utf8');

// Vietnamese diacritics
const vnChars = /[àáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđĐ]/;

// Extract JS blocks
let viJS = (vi.match(/<script>([\s\S]*?)<\/script>/) || [,''])[1];
let enJS = (en.match(/<script>([\s\S]*?)<\/script>/) || [,''])[1];
let zhJS = (zh.match(/<script>([\s\S]*?)<\/script>/) || [,''])[1];

// Find ALL strings in JS: single-quoted, double-quoted, template literals
// But exclude very long ones
function extractJSStringLiterals(js) {
  let strings = [];
  // Template literals (backtick)
  let tmpls = js.match(/`([^`]{2,200})`/g) || [];
  for (let s of tmpls) strings.push(s.slice(1,-1));
  // Double-quoted
  let dqs = js.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g) || [];
  for (let s of dqs) strings.push(s.slice(1,-1));
  // Single-quoted
  let sqs = js.match(/'([^'\\]*(?:\\.[^'\\]*)*)'/g) || [];
  for (let s of sqs) strings.push(s.slice(1,-1));
  return strings;
}

// Extract HTML visible text (between > and <)
function extractHTMLText(html) {
  let texts = [];
  let ms = html.match(/>([^<]{2,200})</g) || [];
  for (let m of ms) {
    let t = m.slice(1,-1).trim();
    if (t && t.length >= 2) texts.push(t);
  }
  return texts;
}

let viStrings = extractJSStringLiterals(viJS);
let enStrings = extractJSStringLiterals(enJS);
let zhStrings = extractJSStringLiterals(zhJS);

let viHTML = extractHTMLText(vi);
let enHTML = extractHTMLText(en);
let zhHTML = extractHTMLText(zh);

// Find Vietnamese strings that still exist in en.html
console.log('=== VIETNAMESE STRINGS STILL IN en.html JS ===');
let remained = [];
for (let vs of viStrings) {
  if (!vnChars.test(vs)) continue; // skip if no Vietnamese
  if (/^[A-Z0-9_./\s\-:;]+$/.test(vs)) continue; // mostly code/identifiers
  if (vs.length < 3) continue;
  // Check if this exact string is still in en.html JS
  if (en.includes(vs) && !zh.includes(vs)) {
    remained.push(vs);
  }
}
remained = [...new Set(remained)].sort((a,b) => b.length - a.length);
console.log('Count:', remained.length);
for (let s of remained) console.log('  "' + s + '"');

console.log('\n=== VIETNAMESE STRINGS STILL IN zh.html JS ===');
remained = [];
for (let vs of viStrings) {
  if (!vnChars.test(vs)) continue;
  if (/^[A-Z0-9_./\s\-:;]+$/.test(vs)) continue;
  if (vs.length < 3) continue;
  if (zh.includes(vs) && !en.includes(vs)) {
    remained.push(vs);
  }
}
remained = [...new Set(remained)].sort((a,b) => b.length - a.length);
console.log('Count:', remained.length);
for (let s of remained) console.log('  "' + s + '"');

// Check HTML visible text
console.log('\n=== VIETNAMESE VISIBLE HTML TEXT IN en.html ===');
let enHTMLvn = enHTML.filter(t => vnChars.test(t) && t.length >= 3 && !/^[A-Z\s]+$/.test(t));
enHTMLvn = [...new Set(enHTMLvn)];
console.log('Count:', enHTMLvn.length);
for (let t of enHTMLvn) console.log('  >' + t + '<');

console.log('\n=== VIETNAMESE VISIBLE HTML TEXT IN zh.html ===');
let zhHTMLvn = zhHTML.filter(t => vnChars.test(t) && t.length >= 3 && !/^[A-Z\s]+$/.test(t));
zhHTMLvn = [...new Set(zhHTMLvn)];
console.log('Count:', zhHTMLvn.length);
for (let t of zhHTMLvn) console.log('  >' + t + '<');

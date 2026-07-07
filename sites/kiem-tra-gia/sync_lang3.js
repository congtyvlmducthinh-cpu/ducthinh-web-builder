const fs = require('fs');

const vi = fs.readFileSync('vi.html', 'utf8');
const enOld = fs.readFileSync('en.html', 'utf8');
const zhOld = fs.readFileSync('zh.html', 'utf8');

// Extract localized strings from EN old file
function extractVars(s) {
  let res = {};
  ['COMPANY','ADDR','WEBSITE','EMAIL','PHONE','EXT','MST'].forEach(k => {
    let m = s.match(new RegExp('var\\s+' + k + '\\s*=\\s*["\']([^"\']+)["\']'));
    if (m) res[k] = m[1];
  });
  return res;
}

let enVars = extractVars(enOld);
let zhVars = extractVars(zhOld);

console.log('EN vars:', enVars);
console.log('ZH vars:', zhVars);

// Extract localized header text from originals
function extract(el, startStr, endStr) {
  let s = el.indexOf(startStr);
  if (s < 0) return null;
  s += startStr.length;
  let e = el.indexOf(endStr, s);
  return el.substring(s, e).trim();
}

let enTitle = extract(enOld, '<h1>', '</h1>');
let enSub = extract(enOld, 'class="sub" style="margin-top:6px;font-size:13px;opacity:.8;">', '</div>');
let zhTitle = extract(zhOld, '<h1>', '</h1>');
let zhSub = extract(zhOld, 'class="sub" style="margin-top:6px;font-size:13px;opacity:.8;">', '</div>');
let viTitle = extract(vi, '<h1>', '</h1>');
let viSub = extract(vi, 'class="sub" style="margin-top:6px;font-size:13px;opacity:.8;">', '</div>');

console.log('Titles:', viTitle, '|', enTitle, '|', zhTitle);
console.log('Subs:', viSub, '|', enSub, '|', zhSub);

// Extract all labels/buttons from quote form in old en/zh
// Find the form section
function extractFormLabel(el, findStart) {
  let s = el.indexOf(findStart);
  if (s < 0) return null;
  let end = el.indexOf('</div>', s + 200);
  if (end < 0) end = el.indexOf('<details', s);
  if (end < 0) end = s + 3000;
  return el.substring(s, end);
}

// Look for the specific form labels
let enFormStart = enOld.indexOf('📧 Email');
if (enFormStart < 0) enFormStart = enOld.indexOf('Email');
let zhFormStart = zhOld.indexOf('📧 Email');
if (zhFormStart < 0) zhFormStart = zhOld.indexOf('Email');

console.log('EN form at:', enFormStart);
console.log('ZH form at:', zhFormStart);

// Check if there's a simpler way: the files have single <script> block
// What differs between scripts? Let's diff the script blocks
let viScriptMatch = vi.match(/<script>([\s\S]*?)<\/script>/);
let enScriptMatch = enOld.match(/<script>([\s\S]*?)<\/script>/);
let zhScriptMatch = zhOld.match(/<script>([\s\S]*?)<\/script>/);

if (viScriptMatch && enScriptMatch && zhScriptMatch) {
  let viScript = viScriptMatch[1];
  let enScript = enScriptMatch[1];
  let zhScript = zhScriptMatch[1];
  
  // The data section - find where DATA_PRODUCTS starts
  let viDataStart = viScript.indexOf('var DATA_PRODUCTS');
  let enDataStart = enScript.indexOf('var DATA_PRODUCTS');
  // Everything before DATA_PRODUCTS is the app code, everything after is data
  // We should keep the app code from vi but replace the data from en/zh... 
  // Actually no - we want the vi version of everything, just replacing display text
  
  // Better approach: copy vi entirely, then do find/replace for locale-specific strings
  // We'll build replacement maps
}

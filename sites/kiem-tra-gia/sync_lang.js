const fs = require('fs');

// Get en/zh localized text from original files
const enOld = fs.readFileSync('en.html', 'utf8');
const zhOld = fs.readFileSync('zh.html', 'utf8');
const vi = fs.readFileSync('vi.html', 'utf8');

// === Extract localized strings from originals ===
function extract(s, re, group) {
  let m = s.match(re);
  return m ? m[group||1] : '';
}

// en
const enTitle = extract(enOld, /<h1>(.*?)<\/h1>/, 1);
const enSubtitle = extract(enOld, /class="sub"[^>]*>(.*?)<\/div>/, 1);
const enCompany = extract(enOld, /class="badge"[^>]*>🏭 (.*?)</, 1);
console.log('EN title:', enTitle);
console.log('EN subtitle:', enSubtitle);

// zh
const zhTitle = extract(zhOld, /<h1>(.*?)<\/h1>/, 1);
const zhSubtitle = extract(zhOld, /class="sub"[^>]*>(.*?)<\/div>/, 1);
const zhCompany = extract(zhOld, /class="badge"[^>]*>🏭 (.*?)</, 1);
console.log('ZH title:', zhTitle);
console.log('ZH subtitle:', zhSubtitle);

// EN form labels and buttons
let enStart = enOld.indexOf('<h2>BÁO GIÁ');
let enFormLabels = '';
if (enStart >= 0) {
  enFormLabels = enOld.substring(enStart, enStart + 4000);
}

// Find all the label texts and button texts by looking between en form area
// Actually, simpler: find all .lang-vi texts in vi.html that correspond to .lang-en in en.html
// Or even simpler: extract the config/lang translation object

// Let's find the LANG object
let enLangMatch = enOld.match(/var LANG = ({[\s\S]*?});/);
let zhLangMatch = zhOld.match(/var LANG = ({[\s\S]*?});/);
let viLangMatch = vi.match(/var LANG = ({[\s\S]*?});/);

if (enLangMatch && zhLangMatch && viLangMatch) {
  // Parse LANG objects
  let enLang = eval('(' + enLangMatch[1] + ')');
  let zhLang = eval('(' + zhLangMatch[1] + ')');
  let viLang = eval('(' + viLangMatch[1] + ')');
  
  console.log('EN LANG keys:', Object.keys(enLang).length);
  console.log('ZH LANG keys:', Object.keys(zhLang).length);
  console.log('VI LANG keys:', Object.keys(viLang).length);
  
  // Copy all VI LANG keys, then replace values with EN/ZH
  let newEnLang = {...viLang};
  let newZhLang = {...viLang};
  
  // Replace with original translations
  for (let k in viLang) {
    if (enLang[k] !== undefined) newEnLang[k] = enLang[k];
    if (zhLang[k] !== undefined) newZhLang[k] = zhLang[k];
  }
  
  console.log('Sample EN LANG keys:');
  console.log(Object.entries(newEnLang).slice(0,5));
}

// Also extract the CSS-variables/runtime config
// Look for CONST/COMPANY/ADDR etc config
let enConst = enOld.match(/const COMPANY\s*=\s*["']([^"']+)["']/);
let enAddr = enOld.match(/const ADDR\s*=\s*["']([^"']+)["']/);
let enWebsite = enOld.match(/const WEBSITE\s*=\s*["']([^"']+)["']/);
let enMST = enOld.match(/const MST\s*=\s*["']([^"']+)["']/);
let enPhone = enOld.match(/const PHONE\s*=\s*["']([^"']+)["']/);
let enExt = enOld.match(/const EXT\s*=\s*["']([^"']+)["']/);

console.log('EN COMPANY:', enConst?.[1]);
console.log('EN ADDR:', enAddr?.[1]);

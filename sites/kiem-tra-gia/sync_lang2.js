const fs = require('fs');

const enOld = fs.readFileSync('en.html', 'utf8');
const zhOld = fs.readFileSync('zh.html', 'utf8');
const vi = fs.readFileSync('vi.html', 'utf8');

// Find the config section - it's probably var COMPANY, var ADDR etc (not const)
function extractVar(s, name) {
  let re = new RegExp('var\\s+' + name + '\\s*=\\s*["\']([^"\']+)["\']');
  let m = s.match(re);
  return m ? m[1] : null;
}

let enCompany = extractVar(enOld, 'COMPANY');
let enAddr = extractVar(enOld, 'ADDR');
let enWebsite = extractVar(enOld, 'WEBSITE');
let enMST = extractVar(enOld, 'MST');
let enPhone = extractVar(enOld, 'PHONE');
let enExt = extractVar(enOld, 'EXT');
let enEmail = extractVar(enOld, 'EMAIL');

console.log('EN COMPANY:', enCompany);
console.log('EN ADDR:', enAddr);
console.log('EN WEBSITE:', enWebsite);
console.log('EN PHONE:', enPhone);
console.log('EN MST:', enMST);

let zhCompany = extractVar(zhOld, 'COMPANY');
let zhAddr = extractVar(zhOld, 'ADDR');
let zhWebsite = extractVar(zhOld, 'WEBSITE');
let zhMST = extractVar(zhOld, 'MST');
let zhPhone = extractVar(zhOld, 'PHONE');
let zhEmail = extractVar(zhOld, 'EMAIL');

console.log('ZH COMPANY:', zhCompany);
console.log('ZH ADDR:', zhAddr);
console.log('ZH WEBSITE:', zhWebsite);

// Find the LANG objects
function extractLang(s) {
  let match = s.match(/var LANG\s*=\s*({[\s\S]*?});\s*(var|\/\/|function)/);
  if (!match) match = s.match(/var LANG\s*=\s*({[\s\S]*?});
/);
  if (!match) match = s.match(/var LANG\s*=\s*({[\s\S]*?};)/);
  return match ? eval('(' + match[1] + ')') : null;
}

let viLang = extractLang(vi);
let enLang = extractLang(enOld);
let zhLang = extractLang(zhOld);

console.log('ViLang keys:', viLang ? Object.keys(viLang).length : null);
console.log('EnLang keys:', enLang ? Object.keys(enLang).length : null);
console.log('ZhLang keys:', zhLang ? Object.keys(zhLang).length : null);

if (viLang && enLang && zhLang) {
  // Show which keys are new in viLang that aren't in enLang
  let newKeys = Object.keys(viLang).filter(k => enLang[k] === undefined);
  console.log('New VI keys not in EN:', newKeys);
  
  // Show key differences
  let diffKeys = {};
  for (let k in viLang) {
    if (enLang[k] !== undefined && viLang[k] !== enLang[k]) {
      diffKeys[k] = {vi: viLang[k], en: enLang[k], zh: zhLang[k]};
    }
  }
  console.log('Changed keys:', Object.keys(diffKeys).slice(0,10));
}

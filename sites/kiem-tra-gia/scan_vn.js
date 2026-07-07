const fs = require('fs');

const vi = fs.readFileSync('vi.html', 'utf8');
const en = fs.readFileSync('en.html', 'utf8');
const zh = fs.readFileSync('zh.html', 'utf8');

// Vietnamese characters (including diacritics)
const vnChars = /[àáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđĐ]/;

// Find all Vietnamese words/phrases in vi.html that are outside HTML tags
// Simple approach: extract text nodes from HTML
function extractTextNodes(html) {
  // Remove script and style blocks
  let clean = html.replace(/<script>[\s\S]*?<\/script>/g, ' ');
  clean = clean.replace(/<style>[\s\S]*?<\/style>/g, ' ');
  // Remove HTML tags
  clean = clean.replace(/<[^>]*>/g, ' ');
  // Remove CSS class names and JS identifiers (only keep text with spaces and Vietnamese chars)
  return clean;
}

// Extract all unique Vietnamese words from vi.html
let viText = extractTextNodes(vi);
let vnWordSet = new Set();
let vnWords = viText.match(/[\u00C0-\u1EF9a-zA-Z]+/g) || [];
for (let w of vnWords) {
  if (vnChars.test(w) && w.length >= 2) {
    vnWordSet.add(w.toLowerCase());
  }
}

// Also extract Vietnamese phrases/UI strings
function extractUIVisibleStrings(html) {
  let results = [];
  // Between tags: >text<
  let matches = html.match(/>([^<]+)</g) || [];
  for (let m of matches) {
    let txt = m.slice(1, -1).trim();
    if (txt && vnChars.test(txt) && txt.length >= 3) {
      results.push(txt);
    }
  }
  // In JS template literals: 'text' or "text"
  let jsMatches = html.match(/['"]([^'"]{4,})['"]/g) || [];
  for (let m of jsMatches) {
    let txt = m.slice(1, -1);
    if (vnChars.test(txt) && txt.length >= 3) {
      results.push(txt);
    }
  }
  // In JS template strings: `text`
  let tmplMatches = html.match(/`([^`]{4,})`/g) || [];
  for (let m of tmplMatches) {
    let txt = m.slice(1, -1);
    if (vnChars.test(txt) && txt.length >= 3) {
      // Don't add long template strings
      if (txt.length < 200) results.push(txt);
    }
  }
  return [...new Set(results)];
}

let viUIStrings = extractUIVisibleStrings(vi);
console.log('=== VIETNAMESE UI STRINGS FOUND ===');
console.log('Total:', viUIStrings.length);

// Now check which ones still exist in en.html and zh.html
function checkUntranslated(str, html, lang) {
  let count = (html.match(new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  return count;
}

console.log('\n=== UNTRANSLATED STRINGS IN en.html ===');
let enUntranslated = [];
for (let s of viUIStrings) {
  if (s.length < 4) continue;
  // Skip pure HTML entity/symbol strings
  if (/^[&;.\s\-/\\()]+$/.test(s)) continue;
  // Skip pure numbers/symbols
  if (/^[\d\s.\-,:;%]+$/.test(s)) continue;
  
  let c = checkUntranslated(s, en);
  if (c > 0 && !/^[A-Z\s]+$/.test(s)) {
    enUntranslated.push({str: s, count: c});
  }
}

console.log('Found', enUntranslated.length, 'untranslated strings:');
enUntranslated.sort((a,b) => b.count - a.count);
for (let item of enUntranslated) {
  console.log('  [' + item.count + 'x] "' + item.str.substring(0, 80) + '"');
}

console.log('\n=== UNTRANSLATED STRINGS IN zh.html ===');
let zhUntranslated = [];
for (let s of viUIStrings) {
  if (s.length < 4) continue;
  if (/^[&;.\s\-/\\()]+$/.test(s)) continue;
  if (/^[\d\s.\-,:;%]+$/.test(s)) continue;
  
  let c = checkUntranslated(s, zh);
  if (c > 0 && !/^[A-Z\s]+$/.test(s)) {
    zhUntranslated.push({str: s, count: c});
  }
}

console.log('Found', zhUntranslated.length, 'untranslated strings:');
zhUntranslated.sort((a,b) => b.count - a.count);
for (let item of zhUntranslated) {
  console.log('  [' + item.count + 'x] "' + item.str.substring(0, 80) + '"');
}

// === DEEP SCAN: Check for Vietnamese characters in en.html and zh.html ===
console.log('\n\n=== DEEP SCAN for Vietnamese characters in en.html ===');
let matches = en.match(/>([^<]{3,})</g) || [];
let enVN = [];
for (let m of matches) {
  let txt = m.slice(1, -1).trim();
  if (vnChars.test(txt) && txt.length >= 3) {
    enVN.push(txt);
  }
}
if (enVN.length > 0) {
  console.log('Found', enVN.length, 'visible Vietnamese text snippets:');
  enVN.forEach(t => console.log('  >' + t + '<'));
} else {
  console.log('None found - all visible text is translated.');
}

console.log('\n=== DEEP SCAN for Vietnamese characters in zh.html ===');
matches = zh.match(/>([^<]{3,})</g) || [];
let zhVN = [];
for (let m of matches) {
  let txt = m.slice(1, -1).trim();
  if (vnChars.test(txt) && txt.length >= 3) {
    zhVN.push(txt);
  }
}
if (zhVN.length > 0) {
  console.log('Found', zhVN.length, 'visible Vietnamese text snippets:');
  zhVN.forEach(t => console.log('  >' + t + '<'));
} else {
  console.log('None found - all visible text is translated.');
}

// Also check JS strings in template literals
console.log('\n=== DEEP SCAN JS strings in en.html ===');
let jsStrings = en.match(/['"`][^'"`]{4,}['"`]/g) || [];
let enJSvn = [];
for (let m of jsStrings) {
  let txt = m.slice(1, -1);
  if (vnChars.test(txt) && txt.length >= 3 && txt.length < 200) {
    enJSvn.push(txt);
  }
}
console.log('Found', enJSvn.length, 'Vietnamese strings in JS:');
enJSvn.forEach(t => console.log('  "' + t.substring(0, 100) + '"'));

console.log('\n=== DEEP SCAN JS strings in zh.html ===');
jsStrings = zh.match(/['"`][^'"`]{4,}['"`]/g) || [];
let zhJSvn = [];
for (let m of jsStrings) {
  let txt = m.slice(1, -1);
  if (vnChars.test(txt) && txt.length >= 3 && txt.length < 200) {
    zhJSvn.push(txt);
  }
}
console.log('Found', zhJSvn.length, 'Vietnamese strings in JS:');
zhJSvn.forEach(t => console.log('  "' + t.substring(0, 100) + '"'));

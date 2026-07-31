const fs = require('fs');
const s = fs.readFileSync('sites/kiem-tra-gia/en.html', 'utf8');
const lines = s.split(/\r?\n/);

function find(pat, max) {
  const out = [];
  for (let i = 0; i < lines.length && out.length < max; i++) {
    if (lines[i].indexOf(pat) >= 0) out.push(i + 1);
  }
  return out;
}

console.log('title:', find('<title>', 5));
console.log('h1:', find('<h1', 5));
console.log('tab-btn:', find('tab-btn', 10));
console.log('lang-switcher:', find('lang-switcher', 6));

// find where body html starts (after </style> and <body ...>)
const bodyIdx = s.indexOf('<body');
console.log('body starts at line:', s.substring(0, bodyIdx).split(/\r?\n/).length);

// Show the region right after <body> — the header + tabs
const afterBody = s.substring(bodyIdx, bodyIdx + 6000);
console.log('--- after <body> (first 6000 chars) ---');
console.log(afterBody);

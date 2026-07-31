const fs = require('fs');
const s = fs.readFileSync('sites/kiem-tra-gia/zh.html', 'utf8');
const lines = s.split(/\r?\n/);
console.log('--- zh L3694 ---');
console.log(lines[3693].substring(0, 400));
console.log('--- zh L5600-5602 (2nd copy) ---');
for (let i = 5598; i < 5602; i++) console.log((i + 1) + ': ' + lines[i].substring(0, 400));

const en = fs.readFileSync('sites/kiem-tra-gia/en.html', 'utf8').split(/\r?\n/);
console.log('--- en formula full L4573 ---');
console.log(en[4572]);

// vi.html mojibake full list
const vi = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
const vil = vi.split(/\r?\n/);
console.log('--- vi mojibake candidates ---');
vil.forEach((l, i) => {
  if (/â†º|âœ•|ðŸ|KhÃ¡c|táº¥n|tấn|Ã¡|â€|Ÿ|º/.test(l)) console.log((i + 1) + ': ' + l.trim().substring(0, 150));
});
// VNĐ in vi
vil.forEach((l, i) => { if (l.indexOf('VNĐ') >= 0) console.log('vi VNĐ at L' + (i + 1) + ': ' + l.trim().substring(0, 120)); });
// ngày in vi fobptsc
vil.forEach((l, i) => { if (l.indexOf("ng\u00e0y") >= 0 && l.indexOf('fobPtsc') >= 0) console.log('vi ngày fob L' + (i + 1)); });

const fs = require('fs');
const s = fs.readFileSync('sites/kiem-tra-gia/en.html', 'utf8');
const lines = s.split(/\r?\n/);
function show(a, b, label) {
  console.log('--- ' + label + ' (L' + a + '-' + b + ') ---');
  for (let i = a - 1; i < b && i < lines.length; i++) console.log((i + 1) + ': ' + lines[i].substring(0, 320));
}
show(12540, 12620, 'FOB PTSC part 1');
show(12620, 12695, 'FOB PTSC part 2');
// find mlToggleBtn
lines.forEach((l, i) => { if (l.indexOf('mlToggleBtn') >= 0) console.log('mlToggleBtn at L' + (i + 1) + ': ' + l.trim().substring(0, 200)); });

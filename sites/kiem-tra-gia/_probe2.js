const fs = require('fs');
const s = fs.readFileSync('sites/kiem-tra-gia/en.html', 'utf8');
const lines = s.split(/\r?\n/);

function show(a, b, label) {
  console.log('--- ' + label + ' (L' + a + '-' + b + ') ---');
  for (let i = a - 1; i < b && i < lines.length; i++) console.log((i + 1) + ': ' + lines[i].substring(0, 300));
}

show(3800, 3830, 'toggleMaxLoad #1');
show(4370, 4380, 'domestic tonnage label');
show(4410, 4420, 'no packaging option');
show(4450, 4495, 'select placeholders');
show(4500, 4520, 'domestic warnings');
show(4545, 4575, 'domestic result labels');
show(4615, 4665, 'export rows + manage error');
show(5715, 5735, 'toggleMaxLoad #2');
show(12540, 12580, 'FOB PTSC VND/ngay');
show(12600, 12730, 'FOB PTSC summary');

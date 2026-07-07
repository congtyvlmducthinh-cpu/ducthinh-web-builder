var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
var lines = s.split('\n');

console.log('Lines around 8719:');
for (var i = 8715; i < 8725 && i < lines.length; i++) {
  console.log('L' + (i+1) + ': ' + lines[i].substring(0,150));
}

console.log('\n--- Checking brace balance from L8700 ---');
var brace = 0;
var paren = 0;
for (var i = 8699; i < Math.min(lines.length, 8750); i++) {
  var line = lines[i];
  for (var j = 0; j < line.length; j++) {
    var ch = line[j];
    if (ch === '{') brace++;
    else if (ch === '}') brace--;
    else if (ch === '(') paren++;
    else if (ch === ')') paren--;
  }
  if (brace < 0) {
    console.log('BRACE NEGATIVE at L' + (i+1) + ' brace=' + brace + ' paren=' + paren);
    console.log('  ' + line.substring(0,120));
  }
}

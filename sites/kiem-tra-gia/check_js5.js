var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
var lines = s.split('\n');

// Check entire script for brace/paren issues
var brace = 0;
var paren = 0;
var negLines = [];
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var bBefore = brace;
  for (var j = 0; j < line.length; j++) {
    var ch = line[j];
    if (ch === '{') brace++;
    else if (ch === '}') brace--;
    else if (ch === '(') paren++;
    else if (ch === ')') paren--;
  }
  if (brace < 0) {
    negLines.push({ln: i+1, brace: brace, paren: paren, text: line.substring(0,100)});
    // Reset brace to 0 to continue checking
    // Actually, let's not reset - just track
  }
}

console.log('Final brace:', brace, 'Final paren:', paren);
console.log('Negative brace lines:', negLines.length);
negLines.forEach(function(n) {
  console.log('L' + n.ln + ' brace=' + n.brace + ' paren=' + n.paren + ' ' + n.text);
});

// Also check for the rest of file after L8719
console.log('\n--- Lines after L8719 ---');
for (var i = 8719; i < Math.min(lines.length, 8770); i++) {
  console.log((i+1) + ': ' + lines[i].substring(0,140));
}

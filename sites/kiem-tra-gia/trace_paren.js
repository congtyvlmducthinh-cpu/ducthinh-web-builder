var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var s = h.match(/<script>([\s\S]*?)<\/script>/)[1];
var lines = s.split('\n');

// Find where paren reaches 1 for the first time and stays
var paren = 0;
var firstParen1 = -1;
for (var i = 0; i < lines.length; i++) {
  var opens = (lines[i].match(/\(/g) || []).length;
  var closes = (lines[i].match(/\)/g) || []).length;
  paren += opens - closes;
  if (paren === 1 && firstParen1 < 0) {
    firstParen1 = i;
    console.log('First time paren=1 at L' + (i+1) + ': ' + lines[i].substring(0,120));
  }
  // Show around area where paren first becomes and stays at 1
  if (i > firstParen1 - 5 && i < firstParen1 + 5 && firstParen1 > 0) {
    console.log('  L'+(i+1)+' paren='+paren+' '+lines[i].substring(0,120));
  }
}
console.log('\nFinal paren:', paren);
console.log('First paren=1 line:', firstParen1+1);

// Also check line 29 area since it shows paren=1 early too
paren = 0;
for (var i = 0; i < 70; i++) {
  var opens = (lines[i].match(/\(/g) || []).length;
  var closes = (lines[i].match(/\)/g) || []).length;
  paren += opens - closes;
  if (i >= 20 && i < 60) {
    console.log('  Early L'+(i+1)+' paren='+paren+' '+lines[i].substring(0,100));
  }
}

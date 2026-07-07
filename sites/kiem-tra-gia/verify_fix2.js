var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('Total JS lines:', lines.length);

// Verify fobPtscLoadCfg
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscLoadCfg') >= 0) {
    console.log('\n=== fobPtscLoadCfg at L' + (i+1) + ' ===');
    for (var j = i; j < Math.min(i + 25, lines.length); j++) {
      if (lines[j].indexOf('function fobPtscSaveCfg') >= 0) break;
      console.log('  L'+(j+1)+': '+lines[j].substring(0,100));
    }
    break;
  }
}

// Verify fobPtscSaveCfg
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscSaveCfg') >= 0) {
    console.log('\n=== fobPtscSaveCfg at L' + (i+1) + ' ===');
    for (var j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].indexOf('function fobPtscResetCfg') >= 0) break;
      console.log('  L'+(j+1)+': '+lines[j].substring(0,100));
    }
    break;
  }
}

// Full brace/paren balance
var brace = 0, paren = 0, inStr = false, inStrChar = '';
var negBrace = false, negParen = false;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  for (var j = 0; j < line.length; j++) {
    var ch = line[j], prev = j > 0 ? line[j-1] : '';
    if (inStr) {
      if (ch === inStrChar && prev !== '\\') inStr = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') { inStr = true; inStrChar = ch; }
      else if (ch === '{') brace++;
      else if (ch === '}') { brace--; if (brace < 0) { if (!negBrace) console.log('NEG BRACE at L'+(i+1)+': '+line.substring(0,80)); negBrace = true; brace = 0; } }
      else if (ch === '(') paren++;
      else if (ch === ')') { paren--; if (paren < 0) { if (!negParen) console.log('NEG PAREN at L'+(i+1)+': '+line.substring(0,80)); negParen = true; paren = 0; } }
    }
  }
}
console.log('\nFinal brace:', brace, 'Final paren:', paren);
console.log(negBrace ? '❌ Has negative brace' : '✅ Brace always >= 0');
console.log(negParen ? '❌ Has negative paren' : '✅ Paren always >= 0');

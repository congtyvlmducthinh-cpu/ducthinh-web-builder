var fs = require('fs');

// Fix vi.html JS syntax: remove duplicate copy-paste code in fobPtscLoadCfg and fobPtscSaveCfg
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('Before fix - total JS lines:', lines.length);

// Fix 1: fobPtscLoadCfg (L8694-L8719)
// L8714: `};` → `}` (close function properly)
// L8715-L8719: remove orphan duplicate for loop + extra close brace
lines[8713] = lines[8713].replace(';', '');
// Remove L8715-L8719 (indices 8714-8718)
var removed = lines.splice(8714, 5);

console.log('Fix 1: removed', removed.length, 'lines');
console.log('  Removed:', removed.map(function(l){return l.trim()}).join(' | '));
console.log('  After fix, around L8713:', lines[8712].trim(), '→', lines[8713].trim(), '→', lines[8714].trim());

// Fix 2: fobPtscSaveCfg
// L8738 (index 8737 now since we removed 5 lines above) was `};` → `}`
// Wait, line numbers shifted. Let me recount.
// After fix 1, original L8719 is gone, so fobPtscSaveCfg shifts from L8721 to L8716
// L8738 → L8733, L8739→L8734, etc.

// Let me find fobPtscSaveCfg position
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function fobPtscSaveCfg') >= 0) {
    console.log('\nfobPtscSaveCfg found at new line', i+1);
    // Show lines around the issue
    for (var j = i; j < Math.min(i+30, lines.length); j++) {
      console.log('  L'+(j+1)+': '+lines[j].substring(0,100));
    }
    
    // Find the `};` that prematurely closes the function
    // It should be around i+17 or so (for loop close + localStorage + fobPtscCalc + close)
    for (var j = i; j < Math.min(i+25, lines.length); j++) {
      if (lines[j].trim() === '};' || lines[j].trim() === ';}' || lines[j].trim().startsWith('};')) {
        console.log('\nFound }; at L'+(j+1));
        // Fix it: `};` → `}`
        lines[j] = lines[j].replace(';', '');
        console.log('Fixed to:', lines[j].trim());
        
        // Remove duplicate block immediately after (starts with for loop)
        var k = j + 1;
        if (k < lines.length && lines[k].trim().indexOf('for (var id in map)') >= 0) {
          var dupLines = [];
          while (k < lines.length && lines[k].trim() !== '') {
            if (lines[k].trim().startsWith('function ')) break;
            dupLines.push(lines[k]);
            k++;
          }
          console.log('Removing duplicate block:', dupLines.length, 'lines starting at L'+(j+2));
          lines.splice(j+1, dupLines.length);
        }
        break;
      }
    }
    break;
  }
}

console.log('\nAfter fix - total JS lines:', lines.length);

// Verify brace balance
var brace = 0;
var paren = 0;
var inStr = false;
var inStrChar = '';
var negLines = [];
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  for (var j = 0; j < line.length; j++) {
    var ch = line[j];
    var prev = j > 0 ? line[j-1] : '';
    
    if (inStr) {
      if (ch === inStrChar && prev !== '\\') inStr = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = true;
        inStrChar = ch;
      } else if (ch === '{') brace++;
      else if (ch === '}') brace--;
      else if (ch === '(') paren++;
      else if (ch === ')') paren--;
    }
  }
  if (brace < 0) { negLines.push(i+1); brace = 0; }
}
console.log('Final brace:', brace, 'Final paren:', paren);
console.log('Negative brace lines:', negLines.length);

// Write fixed JS back
var newJs = lines.join('\n');
var newHtml = h.substring(0, m.index + 8) + newJs + h.substring(m.index + m[0].length - 8);
fs.writeFileSync(__dirname + '/vi.html', newHtml, 'utf8');
console.log('\n✅ Written fixed vi.html');

// Verify by trying to parse
try {
  new Function(newJs);
  console.log('✅ JS syntax OK!');
} catch (e) {
  console.log('❌ JS syntax still broken:', e.message);
}

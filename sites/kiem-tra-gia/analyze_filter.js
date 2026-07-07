var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

// Find filter functions in main tab
var mainFilters = [];
var inFob = false;
var fobFilters = [];

for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  
  // Main tab filter
  if (l.indexOf('function filter') >= 0 && l.indexOf('fob') < 0 && l.indexOf('//') !== 0) {
    if (!inFob) mainFilters.push({ fn: l.trim(), line: i+1 });
  }
  
  // FOB PTSC functions
  if (l.indexOf('function fobPtsc') >= 0 && l.indexOf('//') !== 0) {
    inFob = true;
    fobFilters.push({ fn: l.trim(), line: i+1 });
  }
  if (l.indexOf('function fobPtsc') >= 0) continue;
  if (l.indexOf('function search') >= 0 && !inFob) {
    mainFilters.push({ fn: l.trim(), line: i+1 });
  }
}

console.log('=== Main tab filter/search functions ===');
mainFilters.forEach(function(f) {
  console.log('  L' + f.line + ': ' + f.fn);
});

console.log('\n=== FOB PTSC functions ===');
fobFilters.forEach(function(f) {
  console.log('  L' + f.line + ': ' + f.fn);
});

// Now dump the actual filter/search functions in main tab
console.log('\n\n=== DUMP: Main tab filter function ===');
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('function filter') >= 0 && lines[i].indexOf('fob') < 0 && lines[i].indexOf('//') !== 0) {
    // Find where it ends (next function or blank line after })
    for (var j = i; j < Math.min(i + 60, lines.length); j++) {
      if (j > i && lines[j].indexOf('function') >= 0 && lines[j].indexOf('fob') < 0) break;
      console.log('L'+(j+1)+': '+lines[j].substring(0,120));
    }
    break;
  }
}

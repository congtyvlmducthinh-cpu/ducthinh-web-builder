var fs = require('fs');
var h = fs.readFileSync('vi.html', 'utf-8');
var ds = h.indexOf('var DATA_PRODUCTS =');
var start = ds + 'var DATA_PRODUCTS ='.length;

// Find balanced closing bracket
var end = start;
var depth = 0;
var inStr = false;
var esc = false;
while (end < h.length) {
  var c = h[end];
  if (esc) { esc = false; }
  else if (c === '\\') { esc = true; }
  else if (c === '"') { inStr = !inStr; }
  else if (!inStr) {
    if (c === '[' || c === '{') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end++; break; } }
    else if (c === '}') depth--;
  }
  end++;
}

var raw = h.substring(start, end);
console.log('Array length=' + raw.length);

var data = JSON.parse(raw);
console.log('Parsed OK, items=' + data.length);

var m1700 = data.filter(function(p) { return p.machine === '1700'; });
console.log('machine=1700 count=' + m1700.length);

console.log('\n--- Test filter logic (exact copy from renderPriceTab) ---');
var search = '';
var specFilter = '';
var machineFilter = '1700';

var filtered = data.filter(function(p) {
    if (search && (!p.code || p.code.toLowerCase().indexOf(search) < 0) && (!p.size || p.size.toLowerCase().indexOf(search) < 0) && (!p.machine || p.machine.toLowerCase().indexOf(search) < 0) && (!p.standard || p.standard.toLowerCase().indexOf(search) < 0)) return false;
    if (specFilter && p.standard !== specFilter) return false;
    if (machineFilter && p.machine !== machineFilter) return false;
    return true;
});

console.log('Filter result count=' + filtered.length);
filtered.forEach(function(p) { console.log('  OK: ' + p.code + ' ' + p.machine); });

if (filtered.length === 0) {
  console.log('\n--- DEBUG: checking machine values ---');
  data.forEach(function(p, i) {
    if (i < 10) {
      console.log('  [' + i + '] machine=' + JSON.stringify(p.machine) + ' === ' + JSON.stringify(machineFilter) + ' -> ' + (p.machine === machineFilter));
    }
  });
  
  console.log('\n--- Check machineFilter condition directly ---');
  var test = data.filter(function(p) { return p.machine === machineFilter; });
  console.log('Direct filter machine===' + JSON.stringify(machineFilter) + ': ' + test.length + ' results');
  test.forEach(function(p) { console.log('  ' + p.code); });
}

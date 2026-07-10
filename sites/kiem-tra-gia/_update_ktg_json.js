var fs = require('fs');
var path = require('path');

// Read current vi.html with updated DATA_DOMESTIC_FREIGHT
var h = fs.readFileSync('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'utf8').replace(/\r\n/g, '\n');

// Extract DATA_DOMESTIC_FREIGHT declaration from vi.html
var start = h.indexOf('var DATA_DOMESTIC_FREIGHT = [');
var end = h.indexOf('];', start);
var fullDecl = h.substring(start, end + 2);

console.log('Full declaration length:', fullDecl.length);
console.log('First 150 chars:', fullDecl.substring(0, 150));
console.log('Last 100 chars:', fullDecl.substring(fullDecl.length - 100));

// Update all 3 JSON files
var langs = ['vi', 'en', 'zh'];
var ktgDir = 'C:/Users/Admin/.openclaw/canvas/ktg-data/';

langs.forEach(function(lang) {
  var f = path.join(ktgDir, 'ktg-data-' + lang + '.json');
  var data;
  try { data = JSON.parse(fs.readFileSync(f, 'utf8')); } catch(e) { console.log('Error reading', f, e.message); return; }
  
  data.DATA_DOMESTIC_FREIGHT = fullDecl;
  
  fs.writeFileSync(f, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated ' + f);
  
  // Verify
  var check = JSON.parse(fs.readFileSync(f, 'utf8'));
  console.log('  Verified: DATA_DOMESTIC_FREIGHT length =', check.DATA_DOMESTIC_FREIGHT.length);
});

console.log('\nDone. All 3 ktg-data-*.json files updated.');

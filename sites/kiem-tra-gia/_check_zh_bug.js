var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

var enStart = build.indexOf('en: {');
var zhStart = build.indexOf('zh: {');

console.log('en block starts at:', enStart);
console.log('zh block starts at:', zhStart);

// Check if 'Giá bán (EXW)' exists in zh block (after zhStart)
var idx = build.indexOf("Giá bán (EXW)", zhStart);
console.log('Giá bán (EXW) in zh block:', idx >= 0, 'at', idx);

// Check if 'EXW chưa bao bì' exists in zh block
var idx2 = build.indexOf("EXW chưa bao bì", zhStart);
console.log('EXW chưa bao bì in zh block:', idx2 >= 0, 'at', idx2);

// Get context around Giá bán in the zh block
var idx3 = build.indexOf("Giá bán (EXW)");
console.log('\n--- Context for Giá bán (EXW) ---');
console.log(build.substring(Math.max(0,idx3-10), idx3+60));

// Check which section it's in - before zhStart?
console.log('\nIs Giá bán (EXW) before zhStart?', idx3 < zhStart);

// List all occurrences of Giá bán
var allIdxs = [];
var pos = 0;
while ((pos = build.indexOf("Giá bán", pos)) !== -1) {
  allIdxs.push(pos);
  pos++;
}
console.log('\nAll Giá bán occurrences:', allIdxs.length);
allIdxs.forEach(function(p, i) {
  var section = p < enStart ? 'en' : (p < zhStart ? 'zh' : 'after');
  console.log('  ' + i + ': at ' + p + ' (' + section + ') - ' + build.substring(p, p+30));
});

var fs = require('fs');

var main = fs.readFileSync('modules/07-main.js', 'utf8');

// Add resetFilters function after globalSearch
main = main.replace(
  'function globalSearch() { render(); }',
  'function globalSearch() { render(); }\n\n// ====== RESET FILTERS ======\nfunction resetFilters() {\n  var si = document.getElementById("searchInput");\n  if (si) si.value = "";\n  var sf = document.getElementById("specFilter");\n  if (sf) sf.value = "";\n  var szf = document.getElementById("sizeFilter");\n  if (szf) szf.value = "";\n  var mf = document.getElementById("machineFilter");\n  if (mf) mf.value = "";\n  render();\n}'
);

fs.writeFileSync('modules/07-main.js', main, 'utf8');
console.log('Updated 07-main.js');

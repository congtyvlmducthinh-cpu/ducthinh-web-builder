const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');

// Find the exact populateFilters function
const start = html.indexOf('function populateFilters()');
const end = html.indexOf('\n// ====== RENDER BAGS TAB ======', start);
const oldFunc = html.substring(start, end);

console.log('Old function length:', oldFunc.length);
console.log('Old function starts with:', oldFunc.substring(0, 80));

// Build new function with cross-linked filters
const newFunc = 
`function populateFilters() {
  var sf = document.getElementById("specFilter");
  var mf = document.getElementById("machineFilter");
  if (!sf || !mf) return;
  var curSpec = sf.value, curMach = mf.value;
  // Cross-link: when machine is selected, only show related standards; vice versa
  var machinesByStd = {}, standardsByMach = {};
  DATA_PRODUCTS.forEach(function(p) {
    if (!curMach || p.machine === curMach) standardsByMach[p.standard] = true;
    if (!curSpec || p.standard === curSpec) machinesByStd[p.machine] = true;
  });
  // Rebuild spec filter (standards available for selected machine)
  sf.innerHTML = '<option value="">Tất cả tiêu chuẩn</option>';
  var sk = Object.keys(standardsByMach).sort();
  for (var i = 0; i < sk.length; i++) { sf.innerHTML += '<option value="' + sk[i].replace(/"/g, '&quot;') + '">' + sk[i] + '</option>'; }
  sf.value = curSpec && sk.indexOf(curSpec) >= 0 ? curSpec : "";
  // Rebuild machine filter (machines available for selected standard)
  mf.innerHTML = '<option value="">Tất cả máy</option>';
  var mk = Object.keys(machinesByStd).sort();
  for (var i = 0; i < mk.length; i++) { mf.innerHTML += '<option value="' + mk[i].replace(/"/g, '&quot;') + '">' + mk[i] + '</option>'; }
  mf.value = curMach && mk.indexOf(curMach) >= 0 ? curMach : "";
}`;

const updated = html.replace(oldFunc, newFunc);
fs.writeFileSync('vi.html', updated, 'utf-8');
console.log('Done! populateFilters() has been cross-link fixed.');
console.log('File size:', fs.statSync('vi.html').size, 'bytes');

// Verify the new function is correct
const verify = fs.readFileSync('vi.html', 'utf-8');
const idx2 = verify.indexOf('function populateFilters()');
console.log('Verification snippet:', verify.substring(idx2, idx2 + 1200));

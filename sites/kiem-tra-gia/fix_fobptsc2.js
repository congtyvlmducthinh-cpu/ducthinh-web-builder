var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');

// Check if function definition exists (not just HTML reference)
var defStart = h.indexOf('function fobPtscFilterProducts');
if (defStart >= 0) {
  console.log('Function fobPtscFilterProducts already defined at L' + (h.substring(0,defStart).match(/\n/g)||[]).length+1);
  process.exit(0);
}

// Find fobPtscInitCalc end to insert after it
var initCalcEnd = h.indexOf('function fobPtscCalc()');
if (initCalcEnd < 0) { console.log('ERROR: fobPtscCalc not found'); process.exit(1); }

var filterFn = `
function fobPtscFilterProducts() {
  var sel = document.getElementById('fobProduct');
  var searchEl = document.getElementById('fobSearchInput');
  if (!sel || !searchEl) return;
  var q = searchEl.value.toLowerCase().trim();
  var curVal = sel.value;
  sel.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';
  if (typeof DATA_PRODUCTS !== 'undefined') {
    DATA_PRODUCTS.forEach(function(p) {
      var label = p.code + ' | ' + p.spec + ' | ' + p.size;
      if (p.machine) label += ' | ' + p.machine;
      if (q) {
        var haystack = (p.code + ' ' + p.spec + ' ' + p.size + ' ' + (p.machine||'')).toLowerCase();
        if (haystack.indexOf(q) < 0) return;
      }
      var opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = label;
      sel.appendChild(opt);
    });
  }
  if (curVal) { for (var i=0;i<sel.options.length;i++) { if (sel.options[i].value===curVal) { sel.value=curVal; break; } } }
  fobPtscCalc();
}
`;

h = h.slice(0, initCalcEnd) + filterFn + h.slice(initCalcEnd);
fs.writeFileSync(__dirname + '/vi.html', h, 'utf8');
console.log('Added fobPtscFilterProducts function');

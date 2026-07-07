var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var si = h.indexOf('id="fobptscPanel"');
var prefix = h.substring(0, si);
var lineNum = (prefix.match(/\n/g)||[]).length + 1;
console.log('Panel start at line:', lineNum);

var sc = h.indexOf('</div> <!-- .container -->');
var prefix2 = h.substring(0, sc);
var lineNum2 = (prefix2.match(/\n/g)||[]).length + 1;
console.log('Container close at line:', lineNum2);

var sm = h.indexOf('<div class="modal-overlay" id="pwModal"');
var prefix3 = h.substring(0, sm);
var lineNum3 = (prefix3.match(/\n/g)||[]).length + 1;
console.log('pwModal at line:', lineNum3);

// Check fob init call in render()
var ri = h.indexOf('fobPtscInitCalc');
while (ri >= 0) {
  var before = h.substring(0, ri);
  var l = (before.match(/\n/g)||[]).length + 1;
  console.log('fobPtscInitCalc ref at line:', l);
  ri = h.indexOf('fobPtscInitCalc', ri + 1);
}

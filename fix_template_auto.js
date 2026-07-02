var fs = require('fs');
var c = fs.readFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', 'utf-8');
var LF = '\r\n';

// Fix 1: Replace hardcoded spec rendering block with renderSpecFields(s)
var target1 = 
  'var parts=[];' + LF +
  '      if(s.d97) parts.push("D97: "+s.d97);' + LF +
  '      if(s.d50_bet) parts.push("D50(BET): "+s.d50_bet);' + LF +
  '      if(s.brightness_y) parts.push("Br(Y): "+s.brightness_y);' + LF +
  '      if(s.whiteness_l) parts.push("W(L): "+s.whiteness_l);' + LF +
  '      if(s.r457) parts.push("R457: "+s.r457);' + LF +
  '      if(s.mesh) parts.push("Mesh: "+s.mesh);' + LF +
  '      specEl.querySelector(".quot-spec-val").textContent=parts.join(" | ");';

var repl1 = '      specEl.querySelector(".quot-spec-val").textContent = renderSpecFields(s);';

var idx1 = c.indexOf(target1);
if (idx1 >= 0) {
  c = c.substring(0, idx1) + repl1 + c.substring(idx1 + target1.length);
  console.log('Fix 1 applied at', idx1);
} else {
  console.log('Fix 1: target not found!');
  // Find just the parts=[] start to debug
  var didx = c.indexOf('if(s.d97) parts.push');
  if (didx >= 0) console.log('  Found d97 at', didx, 'context:', JSON.stringify(c.substring(didx-50, didx+100)));
}

// Fix 2: Replace quotInitSpecPicker
var target2 = 
  '// Auto-load last template on page init (called from quotInitRender)' + LF +
  '// Also ensures the spec row renders using selected fields' + LF +
  'function quotInitSpecPicker() {' + LF +
  '  var lastTpl = quotGetLastTemplate();' + LF +
  '  if (lastTpl) {' + LF +
  '    var tpls = quotGetTemplates();' + LF +
  '    if (tpls[lastTpl]) {' + LF +
  '      quotSetSelectedFields(tpls[lastTpl]);' + LF +
  '    }' + LF +
  '  }' + LF +
  '}';

var repl2 = 
  '// Auto-load last template on page init (called from quotInitRender)' + LF +
  '// Also ensures the spec row renders using selected fields' + LF +
  'function quotInitSpecPicker() {' + LF +
  '  var raw = localStorage.getItem("quot_tckt_selected");' + LF +
  '  if (!raw) {' + LF +
  '    quotSetSelectedFields(["d97","d50_bet","brightness_y","whiteness_l","r457"]);' + LF +
  '  }' + LF +
  '  var lastTpl = quotGetLastTemplate();' + LF +
  '  if (lastTpl) {' + LF +
  '    var tpls = quotGetTemplates();' + LF +
  '    if (tpls[lastTpl] && Array.isArray(tpls[lastTpl]) && tpls[lastTpl].length > 0) {' + LF +
  '      quotSetSelectedFields(tpls[lastTpl]);' + LF +
  '    }' + LF +
  '  }' + LF +
  '}';

var idx2 = c.indexOf(target2);
if (idx2 >= 0) {
  c = c.substring(0, idx2) + repl2 + c.substring(idx2 + target2.length);
  console.log('Fix 2 applied at', idx2);
} else {
  console.log('Fix 2: target not found!');
  var pidx = c.indexOf('function quotInitSpecPicker()');
  if (pidx >= 0) console.log('  Found at', pidx, 'context:', JSON.stringify(c.substring(pidx, pidx+200)));
}

fs.writeFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', c, 'utf-8');
console.log('File written');

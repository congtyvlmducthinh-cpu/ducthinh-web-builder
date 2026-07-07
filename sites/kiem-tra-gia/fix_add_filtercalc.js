var fs = require('fs');
var trans = {
  en: { standard: 'Choose standard', size: 'Choose size' },
  zh: { standard: '选择标准', size: '选择尺寸' }
};

['en.html','zh.html'].forEach(function(fn) {
  var lang = fn === 'zh.html' ? 'zh' : 'en';
  var t = trans[lang];
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var m = h.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) { console.log(fn + ': ❌ no script'); return; }
  var js = m[1];
  
  // Insert fobPtscFilterCalc between fobPtscFilterProducts and fobPtscCalc
  // Look for: }\n(function fobPtscCalc\() - the closing of fobPtscFilterProducts
  var pattern = '\n}\nfunction fobPtscCalc()';
  var idx = js.indexOf(pattern);
  if (idx > 0) {
    var func = '\n}\n\n// Cascading filter for Machine → Standard → Size\nfunction fobPtscFilterCalc() {\n  var me = document.getElementById(\'fobCalcMachine\');\n  var se = document.getElementById(\'fobCalcStandard\');\n  var sze = document.getElementById(\'fobCalcSize\');\n  if (!me || !se) return;\n  var m = me.value, s = se.value;\n  \n  // Collect standards by machine, sizes by machine+standard\n  var standardsByMach = {}, sizesByMachStd = {};\n  if (typeof DATA_PRODUCTS !== \'undefined\') {\n    DATA_PRODUCTS.forEach(function(p) {\n      var machOk = !m || String(p.machine) === m;\n      var stdOk = !s || p.standard === s;\n      if (machOk) standardsByMach[p.standard] = true;\n      if (machOk && stdOk && sze) sizesByMachStd[p.size] = true;\n    });\n  }\n  \n  // Rebuild standard dropdown\n  var prevStd = se.value;\n  se.innerHTML = \'<option value="">— ' + t.standard + ' —</option>\';\n  var sk = Object.keys(standardsByMach).sort();\n  sk.forEach(function(k) { se.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : \'\';\n  \n  // Rebuild size dropdown\n  if (sze) {\n    var prevSz = sze.value;\n    sze.innerHTML = \'<option value="">— ' + t.size + ' —</option>\';\n    var szk = Object.keys(sizesByMachStd).sort();\n    szk.forEach(function(k) { sze.innerHTML += \'<option value="\' + k.replace(/"/g,\'&quot;\') + \'">\' + k + \'</option>\'; });\n    sze.value = prevSz && szk.indexOf(prevSz) >= 0 ? prevSz : \'\';\n  }\n  \n  // Filter products\n  fobPtscFilterProducts();\n}\n\nfunction fobPtscCalc()';
    
    js = js.substring(0, idx) + func + js.substring(idx + pattern.length);
    
    // Rebuild
    var prefix = h.substring(0, m.index + 8);
    var suffix = h.substring(m.index + m[0].length - 9);
    h = prefix + js + suffix;
    
    try {
      new Function(js);
      console.log(fn + ': ✅ fobPtscFilterCalc added, JS syntax OK!');
      fs.writeFileSync(__dirname + '/' + fn, h, 'utf8');
    } catch(e) {
      console.log(fn + ': ❌ JS syntax error:', e.message);
    }
  } else {
    console.log(fn + ': ❌ pattern not found');
  }
});

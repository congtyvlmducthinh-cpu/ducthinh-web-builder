var fs = require('fs');
var path = require('path');

// Scan JS modules for Vietnamese strings
var modsDir = 'modules';
var files = fs.readdirSync(modsDir).filter(function(f) { return f.endsWith('.js'); }).sort();
var viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;

console.log('=== Vietnamese strings in JS modules ===\n');
files.forEach(function(f) {
  var content = fs.readFileSync(path.join(modsDir, f), 'utf-8');
  var lines = content.split('\n');
  lines.forEach(function(l, i) {
    var matches = l.match(/['"`]([^'"`]{4,})['"`]/g);
    if (matches) {
      matches.forEach(function(m) {
        var clean = m.replace(/['"`]/g, '');
        if (viRegex.test(clean) && clean.indexOf('\\') < 0 && clean.indexOf('function') < 0 && clean.indexOf('return') < 0 && clean.indexOf('var ') < 0 && clean.indexOf('let ') < 0 && clean.indexOf('const ') < 0) {
          console.log(f + ':' + (i+1) + '  =>  ' + clean);
        }
      });
    }
  });
});

var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

var fnStart = build.indexOf("function getJSReplMap");
var enStart = build.indexOf("en: {", fnStart);
var zhStart = build.indexOf("zh: {", enStart);

// Get the complete en and zh sections
var enSection = build.substring(enStart, zhStart);
var zhSection = build.substring(zhStart);

// Build a function to compare keys
var enLines = enSection.split('\n');
var missing = [];

enLines.forEach(function(line) {
  var m = line.match(/^\s+'([^']+)':/);
  if (m) {
    var key = m[1];
    // Check if this key exists in zh section
    if (zhSection.indexOf("'" + key + "'") === -1) {
      // Find the English value
      var valM = line.match(/:\s*'([^']+)'/);
      var val = valM ? valM[1] : '?';
      missing.push({ key: key, val: val });
    }
  }
});

console.log('Missing from ZH (' + missing.length + '):');
missing.forEach(function(m) {
  console.log("  '" + m.key + "': '" + m.val + "',");
});

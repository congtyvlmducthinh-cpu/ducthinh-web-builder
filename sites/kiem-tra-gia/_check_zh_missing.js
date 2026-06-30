var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

// Find the en map section
var fnStart = build.indexOf("function getJSReplMap");
var enStart = build.indexOf("en: {", fnStart);
var zhStart = build.indexOf("zh: {", enStart);
var mapsEnd = build.indexOf("};", zhStart + 5); // end of zh map
var fnEnd = build.indexOf("}", mapsEnd + 3); // end of function

// Get the en section
var enSection = build.substring(enStart, zhStart);
console.log('=== EN section size:', enSection.length);

// Get zh section  
var zhSection = build.substring(zhStart, mapsEnd + 2);
console.log('=== ZH section size:', zhSection.length);

// Extract Vietnamese keys from each
var enViKeys = enSection.match(/'([^']+)':/g);
var zhViKeys = zhSection.match(/'([^']+)':/g);
if (enViKeys) console.log('EN Vietnamese keys:', enViKeys.length);
if (zhViKeys) console.log('ZH Vietnamese keys:', zhViKeys.length);

// Find missing keys in zh
if (enViKeys && zhViKeys) {
  var missing = [];
  enViKeys.forEach(function(k) {
    if (zhSection.indexOf(k) === -1) {
      missing.push(k);
    }
  });
  console.log('\nMissing from ZH map:');
  missing.forEach(function(k) {
    // Find the English value
    var valMatch = enSection.match(new RegExp(RegExp.escape(k) + "\\s*'([^']+)'"));
    console.log('  ' + k + ' (en: ' + (valMatch ? valMatch[1] : '?') + ')');
  });
}

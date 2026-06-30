var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');
var oldCode = "fullJs = fullJs.replace(vi, function() { return en; });";
var newCode = "fullJs = fullJs.split(vi).join(en);";

if (build.indexOf(oldCode) >= 0) {
  build = build.replace(oldCode, newCode);
  fs.writeFileSync('build.js', build, 'utf-8');
  console.log('Fixed: replaced first-occurrence replace with split/join (all occurrences)');
} else {
  console.log('Old code not found - checking...');
  console.log('Looking for: [' + oldCode + ']');
  // Search around that area
  var idx = build.indexOf("fullJs.replace");
  if (idx >= 0) {
    console.log('Found at', idx, ':', build.substring(idx, idx+70));
  }
}

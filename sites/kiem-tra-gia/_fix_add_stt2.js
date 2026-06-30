var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

// Add STT to zh map - find the position after "'Spec': '规格',"
var insertAfter = "'Spec': '规格',";
var idx = build.indexOf(insertAfter);
console.log('Found Spec at:', idx);

// Insert STT line after Spec
var insertLine = "\n      'STT': '序号',";
build = build.substring(0, idx + insertAfter.length) + insertLine + build.substring(idx + insertAfter.length);

fs.writeFileSync('build.js', build, 'utf-8');
console.log('Added STT to zh map');

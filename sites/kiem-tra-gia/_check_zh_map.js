var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');
var fnStart = build.indexOf("function getJSReplMap");
var objStart = build.indexOf("en: {", fnStart);
var obj2Start = build.indexOf("zh: {", objStart);
var objEnd = build.indexOf("};", obj2Start);
console.log("en section:", build.substring(objStart, obj2Start).substring(0, 100) + "...");
console.log("zh section:", build.substring(obj2Start, objEnd).substring(0, 200));

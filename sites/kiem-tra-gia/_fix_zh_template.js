var fs = require('fs');
var zhLang = fs.readFileSync('src/lang/zh.js', 'utf-8');
// Check Q_PREVIEW_EMPTY
var m = zhLang.match(/Q_PREVIEW_EMPTY[^;]+/);
console.log('zh Q_PREVIEW_EMPTY:', m ? m[0] : 'NOT FOUND');

// Check STT in build.js zh map
var build = fs.readFileSync('build.js', 'utf-8');
var zhStart = build.indexOf('zh: {', build.indexOf('function getJSReplMap'));
var zhEnd = zhStart + 6000; // approximate
var zhSection = build.substring(zhStart, zhEnd);
var sttIdx = zhSection.indexOf("'STT'");
console.log('\nSTT in zh JS map:', sttIdx >= 0, sttIdx >= 0 ? zhSection.substring(sttIdx, sttIdx+50) : '');

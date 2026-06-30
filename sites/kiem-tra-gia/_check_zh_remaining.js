var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

var fnStart = build.indexOf("function getJSReplMap");
var enStart = build.indexOf("en: {", fnStart);
var zhStart = build.indexOf("zh: {", enStart);

var zhSection = build.substring(zhStart);

var checks = [
  "Chọn sản phẩm và tính giá trước khi lên báo giá!",
  "Chọn sản phẩm và tính giá trước khi lên báo giá",
  "Chọn sản phẩm",
  "STT"
];

checks.forEach(function(s) {
  var idx = zhSection.indexOf("'" + s + "'");
  if (idx >= 0) {
    // Find the value - look for 'value' part after colon
    var line = zhSection.substring(idx, idx + 200);
    var newlineIdx = line.indexOf("\n");
    line = line.substring(0, newlineIdx > 0 ? newlineIdx : 100);
    console.log("zh [" + s + "] -> " + line);
  } else {
    console.log("zh [" + s + "] -> NOT FOUND IN MAP");
  }
});

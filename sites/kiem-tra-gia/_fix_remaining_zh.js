var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

// The issue: "Chọn sản phẩm" is a substring of "Chọn sản phẩm và tính giá trước khi lên báo giá"
// Since we sorted by length desc, it should replace the longer one first...
// But after replace, the longer string is gone, so the shorter "Chọn sản phẩm" won't find it anymore.
// Wait, but the issue is the shorter one IS in the map too...

// Actually let me check: the sort order
var fnStart = build.indexOf("function getJSReplMap");
var enStart = build.indexOf("en: {", fnStart);
var zhStart = build.indexOf("zh: {", enStart);

var enSection = build.substring(enStart, zhStart);
var keys = [];
var re = /'([^']{2,})':/g;
var match;
while ((match = re.exec(enSection)) !== null) {
  keys.push(match[1]);
}
keys.sort(function(a, b) { return b.length - a.length; });

// Check if "Chọn sản phẩm" appears before or after the longer string
console.log("Sorted order for Chọn sản phẩm*:");
keys.filter(function(k) { return k.indexOf("Chọn sản phẩm") >= 0; }).forEach(function(k) {
  var idx = keys.indexOf(k);
  console.log("  #" + idx + " [" + k + "] len=" + k.length);
});

// Now check zh.html for the remaining Vietnamese
var zh = fs.readFileSync('zh.html', 'utf-8');
// Check if "Chọn sản phẩm và tính giá" still exists (longer string)
console.log("\nLong string exists:", zh.indexOf("Chọn sản phẩm và tính giá trước khi lên báo giá") >= 0);
console.log("Short string exists:", zh.indexOf("Chọn sản phẩm") >= 0);

// Find context of remaining "Chọn sản phẩm"
var idx = zh.indexOf("Chọn sản phẩm");
var ctx = zh.substring(Math.max(0, idx-20), idx+60);
console.log("Context: [" + ctx + "]");

// Also check STT - this maps to "No" in EN but doesn't exist in ZH map
// STT is coming from the table headers
var idx2 = zh.indexOf("<th>STT</th>");
console.log("\nSTT in table:", idx2 >= 0);
if (idx2 >= 0) {
  console.log("  ctx:", zh.substring(idx2-20, idx2+30));
}

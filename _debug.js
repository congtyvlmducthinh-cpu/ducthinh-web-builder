const fs = require('fs');
const h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Look for common issues
console.log("=== Checking for issues ===");

// 1. Check if there are broken string concatenations in JS
// Look for patterns like '+t('key')+' that might have issues
var tCalls = h.match(/\+t\('[^']+'\)\+/g);
console.log("t() calls in string concat:", tCalls ? tCalls.length : 0, "found");

// 2. Check for double-encoded data-lang (from the transform script running multiple times)
var dlAttr = h.match(/data-lang="[^"]+"/g);
var dlPhAttr = h.match(/data-lang-ph="[^"]+"/g);
console.log("data-lang attributes:", dlAttr ? dlAttr.length : 0);
console.log("data-lang-ph attributes:", dlPhAttr ? dlPhAttr.length : 0);

// 3. Check for the specific renderBagsTab function
var bagsIdx = h.indexOf("function renderBagsTab()");
console.log("\n=== renderBagsTab ===");
if (bagsIdx > -1) {
  var bagsEnd = h.indexOf("// ====== RENDER OTHERS TAB", bagsIdx);
  console.log(h.substring(bagsIdx, bagsIdx + 1600));
}

// 4. Check renderPriceTab function
var rptIdx = h.indexOf("function renderPriceTab()");
console.log("\n=== renderPriceTab (first 1500 chars) ===");
if (rptIdx > -1) {
  console.log(h.substring(rptIdx, rptIdx + 1500));
}

// 5. Check the tab switching logic
var tabIdx = h.indexOf("function switchTab");
console.log("\n=== switchTab ===");
if (tabIdx > -1) {
  console.log(h.substring(tabIdx, tabIdx + 600));
}

// 6. Check for any remaining transform scripts or artifacts
console.log("\nFile size:", h.length, "bytes");

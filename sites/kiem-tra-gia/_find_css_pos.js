const fs = require("fs");
const tpl = fs.readFileSync("src/template.html", "utf-8");

// Find CSS for .price-mode-bar
const cssIdx = tpl.indexOf(".price-mode-bar");
console.log("CSS .price-mode-bar at", cssIdx);
console.log(tpl.substring(cssIdx, cssIdx + 20));

// Find lcc-group CSS after it
const lccCssIdx = tpl.indexOf(".lcc-group");
console.log("CSS .lcc-group at", lccCssIdx);
if (lccCssIdx >= 0) {
  console.log(tpl.substring(lccCssIdx, lccCssIdx + 200));
}

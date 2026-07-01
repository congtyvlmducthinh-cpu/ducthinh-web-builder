var fs = require("fs");
var h = fs.readFileSync("vi.html", "utf8");
var idx = h.indexOf("searchInput");
if (idx >= 0) {
  console.log("=== Around searchInput ===");
  console.log(h.substring(Math.max(0, idx - 500), idx + 2000));
} else {
  console.log("NO searchInput found in HTML");
}

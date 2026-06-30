const fs = require("fs");
["vi.html", "en.html", "zh.html"].forEach(f => {
  const html = fs.readFileSync(f, "utf-8");
  const initIdx = html.lastIndexOf("(function()");
  console.log("=== " + f + " ===");
  console.log("Init:", html.slice(initIdx, initIdx + 100));
  const mkt = html.indexOf("market-group");
  console.log("Market HTML:", html.slice(mkt, mkt + 180));
  console.log("");
});

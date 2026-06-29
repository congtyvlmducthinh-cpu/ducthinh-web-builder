var fs = require("fs");
var path = process.env.TEMP + "/prod-vi.html";
var h = fs.readFileSync(path, "utf-8");

function countOccur(s, sub) {
  var c = 0, i = -1;
  while ((i = s.indexOf(sub, i+1)) >= 0) c++;
  return c;
}

console.log("Data declarations:");
console.log("  DATA_PRODUCTS asign:", countOccur(h, "var DATA_PRODUCTS"));
console.log("  DATA_BAGS asign:", countOccur(h, "var DATA_BAGS"));
console.log("  DATA_OTHERS asign:", countOccur(h, "var DATA_OTHERS"));

console.log("");
console.log("JavaScript structure:");
console.log("  <script> tags:", countOccur(h, "<script>"));
console.log("  </script> tags:", countOccur(h, "</script>"));
console.log("  function saveToServer():", countOccur(h, "function saveToServer()"));
console.log("  function renderPriceTab:", countOccur(h, "function renderPriceTab"));
console.log("  function populateFilters:", countOccur(h, "function populateFilters"));
console.log("  function render:", countOccur(h, "function render"));

console.log("");
console.log("String(p.machine) fix present:", h.indexOf("String(p.machine)") >= 0);

// Check for duplicate DATA_PRODUCTS - is there a stale empty one from injector?
console.log("");
var lines = h.split("\n");
var dpLines = [];
lines.forEach(function(l, i) {
  if (l.indexOf("var DATA_PRODUCTS = ") >= 0) {
    dpLines.push({line: i+1, text: l.substring(0, 80)});
  }
});
console.log("VAR DATA_PRODUCTS occurrences:", dpLines.length);
dpLines.forEach(function(d) { console.log("  Line " + d.line + ": " + d.text); });

// Look for DATA_PRODUCTS = [] (empty) - that's the injector variable
console.log("");
var emptyDp = lines.filter(function(l) { return l.indexOf("DATA_PRODUCTS = []") >= 0; });
console.log("DATA_PRODUCTS = [] lines:", emptyDp.length);
emptyDp.forEach(function(l) { console.log("  " + l.trim()); });

// Check for the injector section - look for ktg-data
var injectorLines = lines.filter(function(l) { return l.indexOf("ktg-data") >= 0 || l.indexOf("injector") >= 0 || (l.indexOf("DATA_PRODUCTS") >= 0 && l.indexOf("[]") >= 0); });
console.log("");
console.log("Injector-related lines:", injectorLines.length);
injectorLines.forEach(function(l) { console.log("  " + l.trim().substring(0, 100)); });

// Check the last portion of the file for loading order issues
console.log("");
var lastScriptStart = h.lastIndexOf("<script>");
var lastScriptEnd = h.lastIndexOf("</script>", h.length - 10);
if (lastScriptStart >= 0 && lastScriptEnd >= 0) {
  var lastBlock = h.substring(lastScriptStart, lastScriptEnd + 9);
  console.log("Last <script> block (first 500 chars):");
  console.log(lastBlock.substring(0, 500));
}

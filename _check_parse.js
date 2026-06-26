var fs = require("fs");
var js = fs.readFileSync("_temp_check.js", "utf8");
try {
  new Function(js);
  console.log("JS PARSE OK");
} catch(e) {
  console.log("PARSE ERROR: " + e.message);
}

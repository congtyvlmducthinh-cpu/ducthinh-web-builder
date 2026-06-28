const fs = require("fs");
let tpl = fs.readFileSync("sites/doccheck/template.html","utf-8");

// Fix: "function toggleGuide(e() {" -> "function toggleGuide() {"
// This is a syntax error that disables the entire script block
tpl = tpl.replace("function toggleGuide(e() {", "function toggleGuide() {");

fs.writeFileSync("sites/doccheck/template.html", tpl, "utf-8");
console.log("Fixed toggleGuide syntax. Size: " + fs.statSync("sites/doccheck/template.html").size + " bytes");

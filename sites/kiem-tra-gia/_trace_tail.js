const fs = require("fs");
const html = fs.readFileSync("vi.html", "utf-8");
const jsStart = html.indexOf("// Data");
const jsEnd = html.lastIndexOf("})();") + 4;
const initCode = html.slice(jsEnd - 400);
console.log(initCode);

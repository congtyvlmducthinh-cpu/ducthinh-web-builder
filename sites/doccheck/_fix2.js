const fs = require("fs");
let tpl = fs.readFileSync("sites/doccheck/template.html","utf-8");

// Fix the duplicate toggleGuide
// "function clickSample(k){ if(SAMPLES[k]) exampleClick(SAMPLES[k]); }\n\nfunction toggleGuide()function toggleGuide() {"
// Replace with: "function clickSample(k){ if(SAMPLES[k]) exampleClick(SAMPLES[k]); }\n\nfunction toggleGuide() {"

const dupeIdx = tpl.indexOf("function toggleGuide()function toggleGuide()");
if (dupeIdx >= 0) {
  tpl = tpl.substring(0, dupeIdx + 21) + tpl.substring(dupeIdx + 21 + 20); 
  // "function toggleGuide()" is 21 chars, second one starts right after
}

fs.writeFileSync("sites/doccheck/template.html", tpl, "utf-8");
console.log("Fixed dupe at " + dupeIdx + ", size: " + fs.statSync("sites/doccheck/template.html").size + " bytes");
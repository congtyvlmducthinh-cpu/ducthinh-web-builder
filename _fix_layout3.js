var c=require("fs").readFileSync("sites/kiem-tra-gia/modules/13-quotation-tab.js","utf-8");

// Before "h += '<div class=\"quot-right\">'" add closing div for quot-left
var old="h += '<div class=\"quot-right\">'";
var beforeIdx=c.indexOf(old);
// Find the last closing before this point that closes products section
// Insert close for quot-left
c = c.replace(
  "h += '<div class=\"quot-right\">'",
  "h += '</div>'; // close quot-left\r\n  h += '<div class=\"quot-right\">'"
);

// Now need to remove one </div> from the end (line 66)
// Old ending: </div></div></div></div></div>
// Should be: </div></div></div></div> (preview, section-content, quot-right, quot-grid)
c = c.replace(
  "h += '<div class=\"quot-preview-empty\">\uD83D\uDC48 Ch\u1ECDn s\u1EA3n ph\u1EA9m v\u00E0 \u0111i\u1EC1n th\u00F4ng tin</div></div></div></div></div>';",
  "h += '<div class=\"quot-preview-empty\">\uD83D\uDC48 Ch\u1ECDn s\u1EA3n ph\u1EA9m v\u00E0 \u0111i\u1EC1n th\u00F4ng tin</div></div></div></div>';"
);

require("fs").writeFileSync("sites/kiem-tra-gia/modules/13-quotation-tab.js", c, "utf-8");
try{require("child_process").execSync("node --check sites/kiem-tra-gia/modules/13-quotation-tab.js");console.log("OK");}catch(e){console.log("ERROR");}

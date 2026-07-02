var fs = require('fs');
var f = 'sites/kiem-tra-gia/modules/13-quotation-tab.js';
var c = fs.readFileSync(f, 'utf-8');

// Fix quotPrint: replace hardcoded spec with renderSpecFields
var old1 = "        if (s.d50_bet) sparts.push(\"D50: \" + s.d50_bet);\n        if (s.brightness_y) sparts.push(\"Br: \" + s.brightness_y);\n        if (s.whiteness_l) sparts.push(\"W: \" + s.whiteness_l);\n        specStr = sparts.join(\" | \");";
var new1 = "        specStr = renderSpecFields(s);";
c = c.replace(old1, new1);

// Fix updateQuotPreview: replace hardcoded spec with renderSpecFields
var old2 = "        if(s.d97) sparts.push(\"D97: \"+s.d97);\n        if(s.d50_bet) sparts.push(\"D50: \"+s.d50_bet);\n        if(s.brightness_y) sparts.push(\"Br: \"+s.brightness_y);\n        if(s.whiteness_l) sparts.push(\"W: \"+s.whiteness_l);\n        if(s.r457) sparts.push(\"R457: \"+s.r457);\n        specStr=sparts.join(\" | \");";
var new2 = "        specStr=renderSpecFields(s);";
c = c.replace(old2, new2);

fs.writeFileSync(f, c, 'utf-8');
console.log('Done - written');

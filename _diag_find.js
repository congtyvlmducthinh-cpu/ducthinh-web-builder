var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// Find all structure markers
function findAll(pattern, str) {
  var r = [], p = -1;
  while ((p = str.indexOf(pattern, p + 1)) >= 0) r.push(p);
  return r;
}

var htmlPos = findAll('<html', h);
var scriptPos = findAll('<script>', h);
var endScriptPos = findAll('</script>', h);
var stylePos = findAll('<style>', h);
var endStylePos = findAll('</style>', h);

console.log('html:', htmlPos);
console.log('script:', scriptPos);
console.log('/script:', endScriptPos);
console.log('style:', stylePos);
console.log('/style:', endStylePos);

// What's between script[0] and /script[?]
console.log('\n=== Between script[0] at 64456 and section 1 ===');
// Find the /script that ends the first section
var afterS0 = h.indexOf('<!DOCTYPE', scriptPos[0]);
console.log('Next DOCTYPE after script[0]:', afterS0);
console.log('Content:', h.substring(scriptPos[0]+8, Math.min(scriptPos[0]+200, h.length)).replace(/\n/g, ' ').substring(0, 150));

// Find /script that's before 2nd html
var s0End = endScriptPos[1]; // 155727 - wait, that's AFTER 2nd html starts at 155234
// Actually let me check what's at 155234-155250
console.log('\n=== At 2nd html start ===');
console.log(JSON.stringify(h.substring(htmlPos[1]-20, htmlPos[1]+20)));

// Find script area in section 0
// The 1st </script> at 510 is probably closing a tiny script in head
// The real script starts at scriptPos[0]=64456... but wait, there might be a ghost script outside
console.log('\n=== Check /script at 510 ===');
console.log('Context:', JSON.stringify(h.substring(500, 520)));

// What are all the script boundaries?
console.log('\n=== Script sections ===');
console.log('Before 1st script:', h.substring(0, 100).replace(/\n/g, ' '));
// The script at 64456 - where does it end?
// Find the closest /script after 64456
for (var i = 0; i < endScriptPos.length; i++) {
  if (endScriptPos[i] > scriptPos[0]) {
    console.log('script[0] at 64456 -> /script at', endScriptPos[i], '(diff:', endScriptPos[i]-scriptPos[0], ')');
    console.log('  Next 10 chars after /script:', JSON.stringify(h.substring(endScriptPos[i], endScriptPos[i]+10)));
    break;
  }
}

// So Section 0 script goes from 64456 to some /script
// Let me find which /script that is
var firstScriptContent = h.substring(8, 500); // script tag might be in head
console.log('\n=== Very beginning ===');
console.log(JSON.stringify(h.substring(0, 100)));

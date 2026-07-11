var fs = require('fs');

// Normalise LF
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
h = h.replace(/\r\n/g, '\n');

// Find sections
var htmlPos = [];
var p = -1;
while ((p = h.indexOf('<html', p + 1)) >= 0) htmlPos.push(p);

// Section 0
var s0End = h.indexOf('<!DOCTYPE', htmlPos[1]);
var s0 = h.substring(0, s0End);

// Section 2 JS
var s2Script = h.indexOf('<script>', htmlPos[2]);
var s2Js = h.substring(s2Script + 8, h.indexOf('</script>', s2Script));

var rpStart = s2Js.indexOf('function renderPriceTab()');
var rpEnd = s2Js.indexOf('\nfunction populateFilters', rpStart);
var rpt = s2Js.substring(rpStart, rpEnd);

// Section 0 JS
var s0Script = s0.indexOf('<script>');
var s0ScriptEnd = s0.indexOf('</script>', s0Script);
var s0Js = s0.substring(s0Script + 8, s0ScriptEnd);

// Count braces in old RPT
var s0RpStart = s0Js.indexOf('function renderPriceTab()');
var s0RpEnd = s0Js.indexOf('\nfunction populateFilters', s0RpStart);
var oldRpt = s0Js.substring(s0RpStart, s0RpEnd);
var oldOpen = (oldRpt.match(/{/g) || []).length;
var oldClose = (oldRpt.match(/}/g) || []).length;
console.log('Old RPT braces:', oldOpen, 'vs', oldClose);

var newOpen = (rpt.match(/{/g) || []).length;
var newClose = (rpt.match(/}/g) || []).length;
console.log('New RPT braces:', newOpen, 'vs', newClose);

// Check if both have function wrap
console.log('Old starts with function:', oldRpt.substring(0, 30));
console.log('New starts with function:', rpt.substring(0, 30));

// Check closing
var oldEnd = oldRpt.substring(oldRpt.length - 100);
var newEnd = rpt.substring(rpt.length - 100);
console.log('Old end:', oldEnd);
console.log('New end:', newEnd);

// Count opening { in js section0 before replacement
var beforeOpen = (s0Js.match(/{/g) || []).length;
var beforeClose = (s0Js.match(/}/g) || []).length;
console.log('\nSection0 JS before: opens=' + beforeOpen + ' closes=' + beforeClose + ' diff=' + (beforeOpen - beforeClose));

// Simulate replacement
var s0JsNew = s0Js.substring(0, s0RpStart) + '\n' + rpt + '\n' + s0Js.substring(s0RpEnd);
var afterOpen = (s0JsNew.match(/{/g) || []).length;
var afterClose = (s0JsNew.match(/}/g) || []).length;
console.log('Section0 JS after: opens=' + afterOpen + ' closes=' + afterClose + ' diff=' + (afterOpen - afterClose));

// The diff should be 0 if old/new braces match
// Let me count braces in the old replaced part and new part
// The old replaced part: the old function's braces
// The new part: the new function's braces
// diff should = (newOpen - newClose) - (oldOpen - oldClose) + (oldOpen - oldClose) ... no
// diff = after - before = (all - oldPart + newPart) - (all) = newPart - oldPart
// So diff = (newOpen - newClose) - (oldOpen - oldClose)
var diff = (newOpen - newClose) - (oldOpen - oldClose);
console.log('\nExpected brace diff: ' + diff);

// Old had: function() { var... return h; }
// The function body: function renderPriceTab() { ... }
// Old has 1 open for function body + all inner opens
// New should be the same
// But wait, old might have an extra brace somewhere

// Also check the "if (isCif)" block
var oldHasExtra = oldRpt.indexOf('  }'); // the closing of if block
console.log('\nOld has "  }" lines:', (oldRpt.match(/^  }$/gm) || []).length);
console.log('New has "  }" lines:', (rpt.match(/^  }$/gm) || []).length);

// Check the replacement at "if (isCif)"
var cifIdx = rpt.indexOf('if (isCif)');
console.log('\nNew CIF block:');
console.log(rpt.substring(cifIdx - 5, cifIdx + 200));

const fs = require('fs');
let mod = fs.readFileSync('modules/02-pricelist.js', 'utf-8');

// After the first fix, let's check the current state
const idx = mod.indexOf('mlToggleBtn');
const chunk = mod.substring(idx, idx+300);
console.log('Current state:');
console.log(JSON.stringify(chunk));

// Now the pattern at the end:
// {{MARKET_OTHER}}</button>\n</div>'\n  h += '<div class="summary-bar"
// We need to remove ' and make it just: ...</div>\n  h += ...
// But actually, since we removed the opening '; + ', the end ' needs to go too
// The full line should be: h += '<button...mlToggleBtn...>📋 Hiện max tải</button>\n<div class="market-group">...{{MARKET_OTHER}}</button>\n</div>'
// Wait, no. Let me reconsider.

// Original code was:
// h += '<button ...mlToggleBtn...></button>'; + '\n<div ...>...</div>'
//        ^--- h += 'string1'         ^-- ; + 'string2'
//
// I already changed first | to make it: h += 'string1\n<div ...>...'
// But the second ' at the end of string2 is still orphaned

// Current: h += '<button ...mlToggleBtn...</button>\n<div ...>{{MARKET_OTHER}}</button>\n</div>'
//                                                                                           ^-- plus remaining ' + newline + h +=
// The remaining after </div> is: '<newline>  h += ...

// So we have: ...</div>'\n  h += ...
// This is wrong. The ' before \n should be part of the outer h += string.

// Let me look at this more carefully
const endIdx = mod.indexOf('{{MARKET_OTHER}}');
const afterEndChunk = mod.substring(endIdx, endIdx+200);
console.log('\nEnd chunk:');
console.log(JSON.stringify(afterEndChunk));

// The issue: the first fix removed the '; + ' but left the rest intact
// So now we have:
// h += '<button ...>📋 Hiện max tải</button>\n<div class="market-group">\n...{{MARKET_OTHER}}</button>\n</div>'
//                                                                                                          ^-- this ' is still here
// Then: \n  h += '<div class="summary-bar"...
//
// So the ' is closing the outer h += string, which is correct!
// Wait, let me re-read...

// Original: h += '<button...mlToggleBtn...></button>'; + '\n<div...>...</div>'
// After first fix: h += '<button...mlToggleBtn...></button>\n<div...>...</div>'
// But there's still the trailing ' after </div> which was the opening of '\n<div...>...'
// So now: h += '<button...mlToggleBtn...></button>\n<div...>...</div>''\n  h += ...
// See the double ''? That's a problem.

// Actually with the fix: the opening ' from '\n<div...> was removed when we changed the beginning.
// But the closing ' of that same string fragment is still there at the end.
// So we need to remove that too.

// Wait, let me trace more carefully:
// Original concatenation (in the built vi.html):
// h += '<button>📋 Hiện max tải</button>'; + '\n<div class="market-group">...{{MARKET_OTHER}}</button>\n</div>'
//                                         ^^    ^                                                        ^
//                                         |     |--- start of second string                              |
//                                        ; +                                                        end quote of 2nd
// The first string is: '<button>📋 Hiện max tải</button>'  (closed by ')
// The second string is: '\n<div>...{{MARKET_OTHER}}</button>\n</div>' (the ' before \n opens it, ' after </div> closes it)
//
// After fix: I replaced '; + '\n<div class="market-group">' with '\n<div class="market-group">'
// But I only removed the first ', the ;, the +, and the second \n<div...> start quote
// The closing ' at the very end is still there
//
// So now: h += '<button>📋 Hiện max tải</button>\n<div class="market-group">...{{MARKET_OTHER}}</button>\n</div>''
//                                                                                                           ^^
// There's an extra ' here that shouldn't be

// Let me look at exactly what's there now
const beforeQuote = mod.lastIndexOf('"', endIdx+100);
console.log('\nAround end of market-group in source:');
const sourceChunk = mod.substring(endIdx, endIdx+150);
console.log(JSON.stringify(sourceChunk));

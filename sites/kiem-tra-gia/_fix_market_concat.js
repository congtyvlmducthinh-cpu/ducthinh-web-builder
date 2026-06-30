const fs = require('fs');
let mod = fs.readFileSync('modules/02-pricelist.js', 'utf-8');

// Fix: Move the market-group concatenation into the h += assignment
// Current: h += '<button ...mlToggleBtn...></button>'; + '\n<div class="market-group">...'
// Fix: h += '<button ...mlToggleBtn...></button>\n<div class="market-group">...'

const oldStr = "style=\"cursor:pointer\">📋 Hiện max tải</button>'; + '\\n<div class=\"market-group\">";
const newStr = "style=\"cursor:pointer\">📋 Hiện max tải</button>\\n<div class=\"market-group\">";

const idx = mod.indexOf(oldStr);
if (idx >= 0) {
  mod = mod.substring(0, idx) + newStr + mod.substring(idx + oldStr.length);
  // Also fix: remove the extra ' after market-group closing
  const mktEnd = mod.indexOf("</div>'", idx);
  if (mktEnd >= 0) {
    // The pattern is: </div>' + '...continues... or </div>';\n h +=
    // We need to see what's after </div>'
    const after = mod.substring(mktEnd, mktEnd + 30);
    console.log('After market closing:', JSON.stringify(after));
  }
  console.log('✅ Fixed concatenation in pricelist.js');
} else {
  console.log('❌ Pattern not found');
  // Try to find the pattern without escaping
  const idx2 = mod.indexOf('tton">📋 Hiện max tải</button>');
  if (idx2 >= 0) {
    console.log('Found near:', mod.substring(idx2-50, idx2+100));
  }
}

fs.writeFileSync('modules/02-pricelist.js', mod, 'utf-8');

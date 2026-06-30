const fs = require('fs');
let mod = fs.readFileSync('modules/02-pricelist.js', 'utf-8');

// Fix: merge the two concatenated strings into a single h +=
// Current: h += '<button ...mlToggleBtn...</button>'; + '\n<div class="market-group">...'
// Fix: h += '<button ...mlToggleBtn...</button>\n<div class="market-group">...'

const old = "cursor:pointer\">📋 Hiện max tải</button>'; + '\\n<div class=\"market-group\">";
const repl = "cursor:pointer\">📋 Hiện max tải</button>\\n<div class=\"market-group\">";

if (mod.indexOf(old) >= 0) {
  mod = mod.split(old).join(repl);
  // Also need to fix the end: ...</div>' → ...</div>
  // The pattern at the end: </div>' → … but now we removed the '; + ' wrapper so we need </div> to be inside the string
  const old2 = "TQ</button>\\n<button class=\"btn-sm\" id=\"marketOther\" onclick=\"setMarket(\\'other\\')\">{{MARKET_OTHER}}</button>\\n</div>'";
  const repl2 = "TQ</button>\\n<button class=\"btn-sm\" id=\"marketOther\" onclick=\"setMarket(\\'other\\')\">{{MARKET_OTHER}}</button>\\n</div>";
  const idx2 = mod.indexOf(old2);
  if (idx2 >= 0) {
    mod = mod.substring(0, idx2) + repl2 + mod.substring(idx2 + old2.length);
    console.log('✅ Fixed both ends');
  } else {
    console.log('❌ End pattern not found');
    // Try to find what's after </div>
    const midx = mod.indexOf("{{MARKET_OTHER}}");
    if (midx >= 0) {
      console.log('After MARKET_OTHER:', JSON.stringify(mod.substring(midx, midx+100)));
    }
  }
} else {
  console.log('❌ Start pattern not found');
  const midx = mod.indexOf("cursor:pointer\">");
  if (midx >= 0) console.log('Near:', JSON.stringify(mod.substring(midx, midx+150)));
}

fs.writeFileSync('modules/02-pricelist.js', mod, 'utf-8');
console.log('✅ Done');

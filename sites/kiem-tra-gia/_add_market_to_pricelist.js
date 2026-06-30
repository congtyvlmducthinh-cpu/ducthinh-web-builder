const fs = require('fs');
let mod = fs.readFileSync('modules/02-pricelist.js', 'utf-8');

// Find the mlToggleBtn line: h += '<button class="btn-sm" id="mlToggleBtn"...'
const mlIdx = mod.indexOf('mlToggleBtn');
const btnStart = mod.lastIndexOf('h += \'', mlIdx);
const btnEnd = mod.indexOf('\';', mlIdx) + 2;

console.log('mlToggleBtn from', btnStart, 'to', btnEnd);
console.log(mod.substring(btnStart, btnEnd));

// Add market buttons after mlToggleBtn
const marketHTML = ` + '\\n<div class="market-group">\\n<span class="ext-label">{{MARKET_LABEL}}</span>\\n<button class="btn-sm" id="marketCn" onclick="setMarket(\\'cn\\')">{{MARKET_CN}}</button>\\n<button class="btn-sm" id="marketOther" onclick="setMarket(\\'other\\')">{{MARKET_OTHER}}</button>\\n</div>'`;

const newMod = mod.substring(0, btnEnd) + marketHTML + mod.substring(btnEnd);
fs.writeFileSync('modules/02-pricelist.js', newMod, 'utf-8');
console.log('\n✅ Added market buttons to pricelist.js');

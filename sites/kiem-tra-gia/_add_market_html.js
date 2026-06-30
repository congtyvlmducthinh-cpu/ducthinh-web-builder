const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// 1. Add CSS after .lcc-group block
const cssInsertPoint = tpl.indexOf('price-mode-bar .lcc-btn');
const cssEnd = tpl.indexOf('}', cssInsertPoint) + 1;
const cssInsert = tpl.substring(0, cssEnd) + 
  `\n.market-group{display:flex;gap:4px;align-items:center;margin-left:auto}
.market-group .btn-sm.active{background:#1a56db;color:#fff;border-color:#1a56db}
.market-group .btn-sm{background:#fff;color:#333;border:1px solid #d0d5dd;padding:4px 10px;font-size:11px;font-weight:600;border-radius:6px;cursor:pointer;transition:all .15s ease}
.market-group .btn-sm:hover{opacity:.85}` +
  tpl.substring(cssEnd);

// 2. Add market toggle HTML inside price-mode-bar (before closing </div>)
const barEnd = cssInsert.lastIndexOf('</div>\n\n<div id="mainContainer"');
const marketHTML = `<div class="market-group">
<span class="ext-label">{{MARKET_LABEL}}</span>
<button class="btn-sm" id="marketCn" onclick="setMarket('cn')">{{MARKET_CN}}</button>
<button class="btn-sm" id="marketOther" onclick="setMarket('other')">{{MARKET_OTHER}}</button>
</div>\n`;

const result = cssInsert.substring(0, barEnd) + marketHTML + cssInsert.substring(barEnd);

fs.writeFileSync('src/template.html', result, 'utf-8');
console.log('Added market CSS + HTML to template');

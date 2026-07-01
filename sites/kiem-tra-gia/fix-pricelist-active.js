var p2 = require('fs').readFileSync('modules/02-pricelist.js', 'utf-8');
// Add active class to marketOther button (since default is "other")
p2 = p2.replace(
  '<button class="btn-sm" id="marketOther" onclick="setMarket(\'other\')">{{MARKET_OTHER}}</button>',
  '<button class="btn-sm active" id="marketOther" onclick="setMarket(\'other\')">{{MARKET_OTHER}}</button>'
);
require('fs').writeFileSync('modules/02-pricelist.js', p2, 'utf-8');
console.log('Fixed 02-pricelist.js — added active to marketOther');

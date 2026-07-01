var p2 = require('fs').readFileSync('modules/02-pricelist.js', 'utf-8');

// Make pricelist market buttons dynamic based on currentMarket
p2 = p2.replace(
  '<button class="btn-sm" id="marketCn" onclick="setMarket(\'cn\')">{{MARKET_CN}}</button>',
  '<button class="btn-sm{{#CN_ACTIVE#}}" id="marketCn" onclick="setMarket(\'cn\')">{{MARKET_CN}}</button>'
);
p2 = p2.replace(
  '<button class="btn-sm active" id="marketOther" onclick="setMarket(\'other\')">{{MARKET_OTHER}}</button>',
  '<button class="btn-sm{{#OTHER_ACTIVE#}}" id="marketOther" onclick="setMarket(\'other\')">{{MARKET_OTHER}}</button>'
);

require('fs').writeFileSync('modules/02-pricelist.js', p2, 'utf-8');
console.log('Added placeholder markers');

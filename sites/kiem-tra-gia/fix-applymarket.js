// ====== MARKET SWITCHING FIX ======
// Remove render() from applyMarket() - it causes calc tab dropdowns to lose their populated options

var mkt = require('fs').readFileSync('modules/10-market.js', 'utf-8');

// 1. Remove render() call from applyMarket()
mkt = mkt.replace(
  '  render();\n}\n\n// Market switching\nvar currentMarket = "other";',
  '}\n\n// Market switching\nvar currentMarket = "other";'
);

// 2. Add render() to setMarket() after applyMarket()
mkt = mkt.replace(
  '  applyMarket();\n}',
  '  applyMarket();\n  render();\n}'
);

require('fs').writeFileSync('modules/10-market.js', mkt, 'utf-8');
console.log('Fixed applyMarket/setMarket');

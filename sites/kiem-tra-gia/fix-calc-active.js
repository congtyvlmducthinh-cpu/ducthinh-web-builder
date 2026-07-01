var calc = require('fs').readFileSync('modules/05-calc.js', 'utf-8');

// 1. Add active class to calcMarketOther button
calc = calc.replace(
  'class="btn-sm" id="calcMarketOther"',
  'class="btn-sm active" id="calcMarketOther"'
);

// 2. Add setCalcMarket(currentMarket) call in renderCalcTab after adding the HTML
// Find where the market group div is closed after buttons
var idx = calc.indexOf('calcMarketOther');
// Find the closing </div> line for market-group
var divEnd = calc.indexOf('h += \'</div>\';', idx);
if (divEnd > 0) {
  // After the market group, we need to add: setCalcMarket(currentMarket);
  // Insert after the market group div close
  var insertPoint = calc.indexOf("\nh += '<div class=\"calc-result\"", idx);
  if (insertPoint > 0) {
    // Insert a function call to sync buttons
    // Actually simpler: add a call after the HTML is appended
    // The issue is renderCalcTab builds HTML and returns string
    // best to just call setCalcMarket in switchTab
  }
}

require('fs').writeFileSync('modules/05-calc.js', calc, 'utf-8');
console.log('Fixed calc marketOther active class');

// 3. Fix setCalcMarket to also use inline styles (like setMarket does)
var mkt = require('fs').readFileSync('modules/10-market.js', 'utf-8');
// Already done - setMarket has both classList.toggle AND inline styles

// 4. Add setCalcMarket call in switchTab when switching to calc tab
var main = require('fs').readFileSync('modules/07-main.js', 'utf-8');
if (main.indexOf('setCalcMarket') < 0) {
  // Find switchTab function
  var swIdx = main.indexOf('function switchTab');
  if (swIdx > 0) {
    // Find the tab === 'calc' case
    var calcCaseIdx = main.indexOf("'calc'", swIdx);
    if (calcCaseIdx > 0) {
      // Find the closing of this case / next case
      var nextCase = main.indexOf("'apps'", calcCaseIdx);
      if (nextCase > 0) {
        var insertStr = "\n    if (typeof setCalcMarket === 'function') setCalcMarket(currentMarket);";
        main = main.substring(0, nextCase) + insertStr + main.substring(nextCase);
        require('fs').writeFileSync('modules/07-main.js', main, 'utf-8');
        console.log('Added setCalcMarket call in switchTab');
      }
    }
  }
}

var main = require('fs').readFileSync('modules/07-main.js', 'utf-8');

// After the calc tab setTimeout, add setCalcMarket call
var calcInsert = "    setTimeout(function(){ filterCalcProducts(); filterBagSpec();\n" +
  "    var vndBtn = document.getElementById(\"calcCcyVnd\");\n" +
  "    var usdBtn = document.getElementById(\"calcCcyUsd\");\n" +
  "    if (vndBtn && usdBtn) {\n" +
  "      vndBtn.classList.toggle(\"active\", currency === \"VND\");\n" +
  "      usdBtn.classList.toggle(\"active\", currency === \"USD\");\n" +
  "    }\n" +
  "    if (typeof setCalcMarket === 'function') setCalcMarket(currentMarket);\n" +
  "  }, 0);";

main = main.replace(
  "    setTimeout(function(){ filterCalcProducts(); filterBagSpec();\n" +
  "    var vndBtn = document.getElementById(\"calcCcyVnd\");\n" +
  "    var usdBtn = document.getElementById(\"calcCcyUsd\");\n" +
  "    if (vndBtn && usdBtn) {\n" +
  "      vndBtn.classList.toggle(\"active\", currency === \"VND\");\n" +
  "      usdBtn.classList.toggle(\"active\", currency === \"USD\");\n" +
  "    }\n" +
  "  }, 0);",
  calcInsert
);

require('fs').writeFileSync('modules/07-main.js', main, 'utf-8');
console.log('Added setCalcMarket call in calc tab render');

var fs = require('fs');
var c = fs.readFileSync('modules/05-calc.js', 'utf8');

// In calcCommission() — line ~280
var old1 = "for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;";
var new1 = "var bsSpec = document.getElementById(\"calcBagSpec\"); var curBagSpec = bsSpec ? bsSpec.value : \"\"; for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode && DATA_BAGS[i].spec === curBagSpec) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;";
c = c.split(old1).join(new1);

// In calcPrice() — line ~370
var old2 = "for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;";
var new2 = "var curBagSpec = bs; for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode && DATA_BAGS[i].spec === curBagSpec) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;";
c = c.split(old2).join(new2);

fs.writeFileSync('modules/05-calc.js', c, 'utf8');
console.log('Done');

import fs from 'fs';

// --- FIX 1: modules/10-market.js ---
let js = fs.readFileSync('modules/10-market.js', 'utf-8');
js = js.replace('currentMarket = "cn"', 'currentMarket = "other"');
// Also swap the active class in template so default shows "Khác" as active
fs.writeFileSync('modules/10-market.js', js, 'utf-8');
console.log('1/3 modules/10-market.js — default → other');

// --- FIX 2: src/template.html ---
let tpl = fs.readFileSync('src/template.html', 'utf-8');
// Swap active class on the two market buttons in pricelist (around line 40)
// Look for marketCn with active and marketOther without
tpl = tpl.replace(
  '<button class="btn-sm active" id="marketCn"',
  '<button class="btn-sm" id="marketCn"'
);
tpl = tpl.replace(
  '<button class="btn-sm" id="marketOther"',
  '<button class="btn-sm active" id="marketOther"'
);
fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('2/3 src/template.html — swapped active to Other');

// --- FIX 3: modules/05-calc.js ---
let calc = fs.readFileSync('modules/05-calc.js', 'utf-8');
// Swap active class on the two calc market buttons
calc = calc.replace(
  'class="btn-sm active" id="calcMarketCn"',
  'class="btn-sm" id="calcMarketCn"'
);
calc = calc.replace(
  'class="btn-sm" id="calcMarketOther"',
  'class="btn-sm active" id="calcMarketOther"'
);
fs.writeFileSync('modules/05-calc.js', calc, 'utf-8');
console.log('3/3 modules/05-calc.js — swapped active to Other');

console.log('\n✓ All 3 fixes applied');

import fs from 'fs';
let js = fs.readFileSync('modules/05-calc.js', 'utf-8');
// The problem: outer string is single-quoted: h += '...setCalcMarket(\'cn\')...'
// When the build puts this in <script> tag, the single quotes conflict.
// Fix: use double quotes for the attribute value, then argument can use single quotes
js = js.replace(
  `onclick="setCalcMarket('cn')"`,
  `onclick="setCalcMarket(&apos;cn&apos;)"`
);
js = js.replace(
  `onclick="setCalcMarket('other')"`,
  `onclick="setCalcMarket(&apos;other&apos;)"`
);
fs.writeFileSync('modules/05-calc.js', js, 'utf-8');
console.log('Fixed with &apos; entities');

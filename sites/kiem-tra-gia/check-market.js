import fs from 'fs';

let m = fs.readFileSync('modules/10-market.js', 'utf-8');
console.log('currentMarket default other:', m.indexOf('currentMarket = "other"') >= 0);

let tpl = fs.readFileSync('src/template.html', 'utf-8');
let cnIdx = tpl.indexOf('id="marketCn"');
let otherIdx = tpl.indexOf('id="marketOther"');
console.log('Template marketCn has active:', tpl.substring(Math.max(0,cnIdx-20), cnIdx).indexOf('active') >= 0);
console.log('Template marketOther has active:', tpl.substring(Math.max(0,otherIdx-20), otherIdx).indexOf('active') >= 0);

let calc = fs.readFileSync('modules/05-calc.js', 'utf-8');
let calcCnIdx = calc.indexOf('id="calcMarketCn"');
let calcOtherIdx = calc.indexOf('id="calcMarketOther"');
console.log('Calc marketCn has active:', calc.substring(Math.max(0,calcCnIdx-20), calcCnIdx).indexOf('active') >= 0);
console.log('Calc marketOther has active:', calc.substring(Math.max(0,calcOtherIdx-20), calcOtherIdx).indexOf('active') >= 0);

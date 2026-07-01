var fs = require('fs');
var src = fs.readFileSync('modules/02-pricelist.js', 'utf-8');

// Find the line with market buttons and add active class dynamically
var oldBtn1 = '<button class="btn-sm" id="marketCn" onclick=';
var newBtn1 = '<button class="btn-sm' + "' + (currentMarket === 'cn' ? ' active' : '') + '\" id=\"marketCn\" onclick=";

var oldBtn2 = '<button class="btn-sm" id="marketOther" onclick=';
var newBtn2 = '<button class="btn-sm' + "' + (currentMarket === 'other' ? ' active' : '') + '\" id=\"marketOther\" onclick=";

// Apply
src = src.split(oldBtn1).join(newBtn1);
src = src.split(oldBtn2).join(newBtn2);

fs.writeFileSync('modules/02-pricelist.js', src, 'utf-8');
console.log('Done! Updated market buttons with dynamic active class');

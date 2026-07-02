var fs = require('fs');
var c = fs.readFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', 'utf-8');
var LF = '\r\n';

// Find the line where market is read from DOM but unused
// "var market=document.getElementById("quotMarket")?document.getElementById("quotMarket").value:"other";"
var oldLine = 'var market=document.getElementById("quotMarket")?document.getElementById("quotMarket").value:"other";';
var idxOld = c.indexOf(oldLine);
if (idxOld < 0) { console.log('ERROR: line not found!'); process.exit(1); }

var newBlock = 
  'var market=document.getElementById("quotMarket")?document.getElementById("quotMarket").value:"other";' + LF +
  '  // Apply market pricing to DATA_PRODUCTS' + LF +
  '  currentMarket = market;' + LF +
  '  applyMarket();';

c = c.substring(0, idxOld) + newBlock + c.substring(idxOld + oldLine.length);
console.log('Patched at', idxOld);

fs.writeFileSync('sites/kiem-tra-gia/modules/13-quotation-tab.js', c, 'utf-8');
console.log('Done');

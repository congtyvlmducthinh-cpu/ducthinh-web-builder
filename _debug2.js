const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');
var jStart = h.indexOf('<script>');
var jEnd = h.lastIndexOf('</script>');
var js = h.substring(jStart + 8, jEnd);
var lines = js.split('\n');

// Show lines with t() calls
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.indexOf('t(') > -1) {
    // Check if it has matching quotes
    // Count unescaped quotes
    var sq = 0, dq = 0;
    for (var k = 0; k < l.length; k++) {
      if (l[k] === "'" && (k === 0 || l[k-1] !== '\\')) sq++;
      if (l[k] === '"' && (k === 0 || l[k-1] !== '\\')) dq++;
    }
    var bad = false;
    if (sq % 2 !== 0) { bad = true; console.log('SQ err L' + (i+1) + ': ' + l.substring(0, 120)); }
    if (dq % 2 !== 0) { bad = true; console.log('DQ err L' + (i+1) + ': ' + l.substring(0, 120)); }
  }
}

// Also check lines near our replacements for broken t() patterns
// Broken pattern: "+ t('key')
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  // Check for "+t('...')\"+" (issue from fix8)
  if (l.indexOf("+t('") > -1 || l.indexOf('+t("') > -1) {
    // Check: does the t() call end properly?
    var ts = l.indexOf("+t('");
    if (ts > -1) {
      var te = l.indexOf("'", ts + 4);
      if (te > -1 && l[te + 1] === ')') {
        // Check what follows
        var rest = l.substring(te + 2).trim();
        if (rest.indexOf('+') !== 0 && rest.indexOf('"') !== 0 && rest.indexOf("'") !== 0 && rest.length > 0) {
          console.log('SUSPICIOUS L' + (i+1) + ': ' + l.substring(0, 120));
        }
        // Check for broken pattern: '+t('key')+' is correct
        // But '"+t('key')+"' is also correct for JS strings
      }
    }
  }
}

console.log('--- Checking common break patterns ---');

// Our fix8 might have created: +t("table.product.name")+" rather than "+t("table.product.name")+"
// The +t("table.product.name")+ needs to be inside a concatenation context

// Find the line with table headers
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('table.product.name') > -1) {
    console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
  }
  if (lines[i].indexOf('quotation.excl.vat') > -1) {
    console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
  }
  if (lines[i].indexOf('quotation.min.qty') > -1) {
    console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
  }
  if (lines[i].indexOf('calc.not.found') > -1 && lines[i].indexOf('h+=') > -1) {
    console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
  }
  if ((lines[i].indexOf('calc.result.empty') > -1 || lines[i].indexOf("calc.empty") > -1) && lines[i].indexOf('h+=') > -1) {
    console.log('L' + (i+1) + ': ' + lines[i].substring(0, 150));
  }
}

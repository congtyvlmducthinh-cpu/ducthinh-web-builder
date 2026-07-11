var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');
var fnStart = h.indexOf('function renderPriceTab()');

// Find end by counting braces
var d = 1; // for the opening brace after ()
var braceStart = h.indexOf('{', fnStart);
var pos = braceStart;
while (d > 0 && pos < h.length) {
  pos++;
  if (h[pos] === '{') d++;
  else if (h[pos] === '}') d--;
}
console.log('Function at: ' + fnStart + '..' + pos + ' (' + (pos-fnStart) + ' chars)');

var fb = h.substring(fnStart, pos+1);
fs.writeFileSync('memory/_func_body.txt', fb, 'utf8');
console.log('Written to memory/_func_body.txt');

// Now find the HTML rendering part (h += string concatenation)
var htmlStart = fb.indexOf("h += '");
if (htmlStart < 0) htmlStart = fb.indexOf('h += "');
console.log('\nHTML render starts at offset in function:', htmlStart);

// Find card 2: filters
var card2 = fb.indexOf('price-card-filters');
console.log('price-card-filters at:', card2);
var card3 = fb.indexOf('price-card-summary');
console.log('price-card-summary at:', card3);
var card4 = fb.indexOf('price-card-mode');
console.log('price-card-mode at:', card4);
var card5 = fb.indexOf('price-card" style="padding:0;overflow:hidden"');
console.log('price-card(table) at:', card5);

// Find OLD container classes
var oc = fb.indexOf('class="container"');
console.log('\n=== OLD class=container ===');
var count = 0;
var lastP = -1;
while ((lastP = fb.indexOf('class="container"', lastP+1)) >= 0) {
  count++;
  var start = Math.max(0, lastP-300);
  var end = Math.min(fb.length, lastP+400);
  console.log('\n' + count + '. at ' + lastP);
  console.log('CONTEXT:', fb.substring(start, end));
}

// Check for controlBar HTML
console.log('\n=== controlBar HTML ===');
var cbIdx = fb.indexOf('id="controlBar"');
console.log('at:', cbIdx);
if (cbIdx >= 0) {
  var s = fb.lastIndexOf('<div', cbIdx);
  // find matching close
  var d2=1, p2=cbIdx;
  while(d2>0){
    var no=fb.indexOf('<div',p2+1);
    var nc=fb.indexOf('</div>',p2+1);
    if(nc<0)break;
    if(no>=0&&no<nc){d2++;p2=no+4;}
    else{d2--;p2=nc+5;}
  }
  console.log('BLOCK:', s, '->', p2);
  console.log(fb.substring(s, p2));
}

// Check for priceModeBar HTML
console.log('\n=== priceModeBar HTML ===');
var pmIdx = fb.indexOf('id="priceModeBar"');
console.log('at:', pmIdx);
if (pmIdx >= 0) {
  var s = fb.lastIndexOf('<div', pmIdx);
  var d2=1, p2=pmIdx;
  while(d2>0){
    var no=fb.indexOf('<div',p2+1);
    var nc=fb.indexOf('</div>',p2+1);
    if(nc<0)break;
    if(no>=0&&no<nc){d2++;p2=no+4;}
    else{d2--;p2=nc+5;}
  }
  console.log('BLOCK:', s, '->', p2);
  console.log(fb.substring(s, p2));
}

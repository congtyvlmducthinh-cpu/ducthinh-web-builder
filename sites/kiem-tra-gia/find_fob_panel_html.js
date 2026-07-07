var fs = require('fs');
['en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  
  // Find <div class="fobptsc-panel" ...> in HTML
  var pat = 'fobptsc-panel" id="fobptscPanel"';
  var idx = h.indexOf(pat);
  if (idx > 0) {
    // Shift idx to start of opening tag
    var openStart = h.lastIndexOf('<div', idx);
    console.log(fn + ': fobptsc-panel starts at char ' + openStart);
    console.log(h.substring(openStart, openStart + 300));
  }
});

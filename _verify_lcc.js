var http = require('http');
http.get('http://localhost:8080/kiem-tra-gia/vi.html', function(r) {
  var d = [];
  r.on('data', function(c) { d.push(c); });
  r.on('end', function() {
    var h = Buffer.concat(d).toString('utf8');
    var fnStart = h.indexOf('function renderPriceTab()');
    var fnBody = h.substring(fnStart, fnStart + 8000);
    console.log('No Lcc:', (fnBody.match(/No Lcc/g)||[]).length);
    console.log('Sub Lcc:', (fnBody.match(/Sub Lcc/g)||[]).length);
    console.log('lcc30:', (fnBody.match(/lcc30/g)||[]).length);
    var khong = 'Kh\u00f4ng'; console.log('Kh\u00f4ng:', (fnBody.match(new RegExp(khong,'g'))||[]).length);
    console.log('id=lccGroup:', (fnBody.match(/id="lccGroup"/g)||[]).length);
    console.log('LCC section:', fnBody.substring(fnBody.indexOf('LCC:') - 10, fnBody.indexOf('LCC:') + 250));
  });
});

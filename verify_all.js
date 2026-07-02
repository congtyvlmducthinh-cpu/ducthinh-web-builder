const https = require('https');
https.get('https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html', function(res) {
  var d = '';
  res.on('data', function(c) { d += c; });
  res.on('end', function() {
    // Check 1: Dynamic bag specs
    var b = d.indexOf('Bag spec dropdown - dynamic unique specs from DATA_BAGS');
    console.log('1. Dynamic bag specs:', b > -1 ? '✅' : '❌');
    if (b > -1) {
      var s = d.substring(b, b + 300);
      console.log('   Context:', s);
    }

    // Check 2: Reset bagCode on spec change (single innerHTML)
    var ck2 = d.indexOf('QUOT_CART[idx].bagCode=""');
    console.log('2. bagCode reset:', ck2 > -1 ? '✅' : '❌');
    if (ck2 > -1) {
      // Check innerHTML is single assignment
      var s2 = d.substring(ck2, ck2 + 600);
      var plusCount = s2.split(/detail\.innerHTML\s*\+=/g).length - 1;
      console.log('   innerHTML+= count:', plusCount, '(should be 0)');
      console.log('   Context:', s2.substring(0, 400));
    }

    // Check 3: quotFilterProds keeps empty rows
    var ck3 = d.indexOf('// Skip empty rows (no product selected) - keep them visible');
    console.log('3. Filter keeps empty rows:', ck3 > -1 ? '✅' : '❌');
  });
});

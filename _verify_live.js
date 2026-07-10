var http = require('http');
http.get('http://localhost:8080/kiem-tra-gia/vi.html', function(r) {
  var d = [];
  r.on('data', function(c) { d.push(c); });
  r.on('end', function() {
    var h = Buffer.concat(d).toString('utf8');
    var si = h.lastIndexOf('<script>');
    var ei = h.lastIndexOf('</script>');
    var js = h.substring(si + 8, ei);
    var s = js.indexOf('function calcDomesticPrice()');
    var a = js.substring(s);
    var b = a.substring(a.indexOf('{') + 1);
    var dp = 1, p2 = 0;
    while (dp > 0 && p2 < b.length) { if (b[p2] === '{') dp++; else if (b[p2] === '}') dp--; p2++; }
    var fn = a.substring(0, a.indexOf('{') + 1 + p2);
    console.log('Container always shows:', fn.indexOf("mode === \"cont\"") >= 0 && fn.indexOf("!isJumbo") >= 0 ? 'OLD (needs bag)' : 'NEW (always shows)');
    console.log('mlInput.disabled:', fn.indexOf('mlInput.disabled') >= 0 ? 'YES' : 'NO');
    console.log('bagTons * 20:', fn.indexOf('* 20') >= 0 ? 'YES' : 'NO');
    console.log('max25:', fn.indexOf('max25') >= 0 ? 'YES' : 'NO');
    console.log('isAuto:', fn.indexOf('isAuto') >= 0 ? 'YES' : 'NO');
    console.log('renderDomesticTab freightFilter:', h.indexOf('filterDomesticFreight') >= 0 ? 'YES' : 'NO');
  });
});

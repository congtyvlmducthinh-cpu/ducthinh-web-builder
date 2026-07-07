var fs = require('fs');
['vi.html','en.html','zh.html'].forEach(function(fn) {
  var h = fs.readFileSync(__dirname + '/' + fn, 'utf8');
  var lines = h.split('\n');
  
  // Split HTML chunks (skip script content)
  var htmlLines = [];
  var inScript = false;
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    if (l.indexOf('<script>') >= 0 && l.indexOf('src=') < 0) {
      inScript = true;
      htmlLines.push(l.substring(0, l.indexOf('<script>')));
      continue;
    }
    if (inScript && l.indexOf('</script>') >= 0) {
      inScript = false;
      htmlLines.push(l.substring(l.indexOf('</script>') + 9));
      continue;
    }
    if (!inScript) htmlLines.push(l);
  }
  
  // Count div depth in HTML only
  var d = 0;
  var hasNeg = false;
  var maxDepth = 0;
  var finalCloseLine = -1;
  
  for (var i = 0; i < htmlLines.length; i++) {
    var o = (htmlLines[i].match(/<div[ >]/g) || []).length;
    var c = (htmlLines[i].match(/<\/div>/g) || []).length;
    d += o - c;
    if (d > maxDepth) maxDepth = d;
    if (d < 0 && !hasNeg) {
      console.log(fn + ': First NEGATIVE depth at HTML line', i+1, 'depth=', d);
      hasNeg = true;
    }
    if (htmlLines[i].indexOf('</body>') >= 0 || htmlLines[i].indexOf('</html>') >= 0) {
      finalCloseLine = i;
    }
  }
  
  console.log(fn + ': HTML-only depth=', d, 'max=', maxDepth, 'neg=', hasNeg);
  
  // Also find container close in HTML-only (by line number)
  for (var i = 0; i < htmlLines.length; i++) {
    if (htmlLines[i].indexOf('<!-- .container -->') >= 0) {
      console.log('  .container close at HTML line', i+1);
    }
  }
});

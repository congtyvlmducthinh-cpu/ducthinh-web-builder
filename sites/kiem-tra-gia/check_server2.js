const https = require('https');
https.get('https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html', function(res) {
  var d = '';
  res.on('data', function(c) { d += c; });
  res.on('end', function() {
    var start = d.indexOf('var DATA_BAGS');
    if (start === -1) { console.log('DATA_BAGS not found'); return; }
    var snippet = d.substring(start, start + 3000);
    // Find actual bag entries with "spec:"
    var pos = snippet.indexOf('spec:"');
    console.log('First spec: position', pos);
    if (pos > -1 && pos < 200) {
      // DATA_BAGS is empty array? Check the format
      console.log('Context around var DATA_BAGS:');
      console.log(d.substring(start, start + 300));
      var braceStart = snippet.indexOf('[');
      var braceEnd = snippet.indexOf(']');
      if (braceStart > -1 && braceEnd > -1) {
        var arrContent = snippet.substring(braceStart, braceEnd+1);
        console.log('Array content:', arrContent.substring(0, 200));
      }
    } else if (pos > -1) {
      console.log('Found spec entries, first 500 of DATA_BAGS:', snippet.substring(0, 500));
    } else {
      // Check what follows var DATA_BAGS =
      var assignPos = snippet.indexOf('=');
      if (assignPos > -1) {
        console.log('After =:', snippet.substring(assignPos+1, assignPos+200));
      }
    }
  });
});

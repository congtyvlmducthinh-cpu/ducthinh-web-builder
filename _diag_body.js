var fs = require('fs');
var h = fs.readFileSync('sites/kiem-tra-gia/vi.html', 'utf8');

// Find all <body> tags to understand duplication
var bodyIdx = -1;
var bodyCount = 0;
while ((bodyIdx = h.indexOf('<body', bodyIdx + 1)) >= 0) {
  bodyCount++;
  var lineNum = h.substring(0, bodyIdx).split('\n').length;
  var context = h.substring(Math.max(0, bodyIdx - 50), Math.min(h.length, bodyIdx + 100));
  console.log('BODY #' + bodyCount + ' (line ~' + lineNum + '):', context.replace(/\n/g, ' ').trim().substring(0, 150));
}

// Find all <html> tags
var htmlIdx = -1;
var htmlCount = 0;
while ((htmlIdx = h.indexOf('<html', htmlIdx + 1)) >= 0) {
  htmlCount++;
  var lineNum = h.substring(0, htmlIdx).split('\n').length;
  console.log('HTML #' + htmlCount + ' (line ~' + lineNum + ')');
}

// Find all </html> tags
var closeHtmlIdx = -1;
var closeHtmlCount = 0;
while ((closeHtmlIdx = h.indexOf('</html>', closeHtmlIdx + 1)) >= 0) {
  closeHtmlCount++;
  var lineNum = h.substring(0, closeHtmlIdx).split('\n').length;
  console.log('/HTML #' + closeHtmlCount + ' (line ~' + lineNum + ')');
}

console.log('\nTotal file lines:', h.split('\n').length);
console.log('Total file chars:', h.length);

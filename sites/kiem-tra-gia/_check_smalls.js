var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

// Get all small blocks
var re = /<small[^>]*>.*?<\/small>/g;
var match;
var i = 0;
while ((match = re.exec(tpl)) !== null) {
  // Get the text content
  var text = match[0].replace(/<[^>]+>/g, '');
  console.log((++i) + ': [' + text + '] at ' + match.index);
}

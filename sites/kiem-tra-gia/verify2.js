var html = require('fs').readFileSync('vi.html','utf-8');
var idx = html.indexOf('id="marketCn"');
var snippet = html.substring(Math.max(0,idx-250), idx+300);
console.log(snippet);

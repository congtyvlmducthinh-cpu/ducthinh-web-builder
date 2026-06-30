var fs = require('fs');
var html = fs.readFileSync('vi.html', 'utf-8');
// The init should be at the very end. Let's search from the end
var lastIife = html.lastIndexOf('(function()');
console.log('Last IIFE at', lastIife);
console.log(html.substring(lastIife, lastIife + 200));

var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var js = m[1];
var lines = js.split('\n');

console.log('m.index:', m.index);
console.log('m[0].length:', m[0].length);
console.log('First 50 chars of html around m.index:', h.substring(m.index - 10, m.index + 60));
console.log('Last 50 chars of m[0]:', m[0].substring(m[0].length - 30));
console.log('After m[0], next 30 chars:', h.substring(m.index + m[0].length, m.index + m[0].length + 30));

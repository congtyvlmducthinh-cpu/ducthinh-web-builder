var fs = require('fs');
var vi = fs.readFileSync('vi.html', 'utf-8');
var en = fs.readFileSync('en.html', 'utf-8');
var zh = fs.readFileSync('zh.html', 'utf-8');

console.log('vi.html lang:', vi.match(/lang="([^"]+)"/)[1]);
console.log('en.html lang:', en.match(/lang="([^"]+)"/)[1]);
console.log('zh.html lang:', zh.match(/lang="([^"]+)"/)[1]);

console.log('vi.html title:', vi.match(/<title>([^<]+)<\/title>/)[1]);
console.log('en.html title:', en.match(/<title>([^<]+)<\/title>/)[1]);
console.log('zh.html title:', zh.match(/<title>([^<]+)<\/title>/)[1]);

console.log('en.html has {{}}:', en.indexOf('{{') >= 0);
console.log('en.html has "Price List":', en.indexOf('Price List</span>') >= 0);
console.log('zh.html has "价格表":', zh.indexOf('价格表</span>') >= 0);
console.log('vi.html has "Giá bán":', vi.indexOf('Giá bán</span>') >= 0);

console.log('vi.html size:', vi.length);
console.log('en.html size:', en.length);
console.log('zh.html size:', zh.length);

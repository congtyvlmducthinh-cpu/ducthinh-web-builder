var fs=require('fs');
var h=fs.readFileSync('C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder\\sites\\kiem-tra-gia\\vi.html','utf8').replace(/\r\n/g,'\n');

// Find saveToServer
var idx=h.indexOf('function saveToServer');
if(idx<0) idx=h.indexOf('saveToServer');
console.log('Found at:', idx);
console.log(h.substring(idx, idx+2000));

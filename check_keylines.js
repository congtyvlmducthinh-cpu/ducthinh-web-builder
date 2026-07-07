var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var lines=h.split('\n');
for(var i=385;i<395;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');
for(var i=459;i<466;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');
for(var i=510;i<520;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');

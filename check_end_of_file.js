var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var l=h.split('\n');
console.log('Total lines: '+l.length);
for(var i=Math.max(0,l.length-40);i<l.length;i++) console.log('L'+(i+1)+': |'+l[i].substring(0,60)+'|');

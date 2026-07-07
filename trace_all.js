var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var lines=h.split('\n');
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
var out=[];
for(var i=bs;i<Math.min(bs+165,lines.length);i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
  if(t.indexOf('<div')>=0||t.indexOf('</div>')>=0)
    out.push('L'+(i+1)+' d='+d+' '+t.substring(0,65));
}
out.forEach(function(s){console.log(s);});
console.log('\n--- Depth after first 165 lines from body: '+d+' ---');

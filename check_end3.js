var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var lines=h.split('\n');
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
for(var i=bs;i<lines.length-20;i++){
  var ln=lines[i];
  var t=ln.trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
}
console.log('Depth before last 20 lines: '+d);
// Now scan last 20 lines
for(var i=Math.max(bs,lines.length-20);i<lines.length;i++){
  var ln=lines[i];
  var t=ln.trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
  if(t.indexOf('html')>=0||t.indexOf('body')>=0||t.indexOf('</div>')>=0||t.indexOf('<div')>=0)
    console.log('L'+(i+1)+' d='+d+' '+t.substring(0,60));
}
console.log('=== Final depth: '+d+' ===');
